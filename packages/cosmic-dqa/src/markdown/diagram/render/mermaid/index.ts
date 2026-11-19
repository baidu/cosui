/**
 * mermaid 渲染器：
 * - closed 必渲染
 * - !closed 时先 mermaid.parse 预检，成功才 render；避免未闭合语法 stacktrace 刷屏
 * - 渲染成功写入 host（清空旧内容 + 插入新 svg 字符串）
 * - 返回 Promise<boolean>，成功 true，失败/skip false
*/

import type {Mermaid} from 'mermaid';
import type svgPanZoom from 'svg-pan-zoom';
import {getDefinition, getDefLength, isDefinitionClosed} from '../../utils/definition';
import {DiagramLang, DiagramViewMode} from '../../utils/const';
import {attachDiagramControls} from '../../components/diagram-controls/helpers';
import type {DiagramOptions} from '../../types';
import {DatasetKey, ROUNDED_POLYGON_ATTR} from '../../utils/dataset-keys';
import {asyncImport, isAdvancedRegExpSupported} from '../../utils/module-loader';
import {isHostRenderComplete, markHostRenderComplete} from '../render-manager/render-status';
import {getDiagramElement} from '../utils';
import type {RenderAbleDefinitionOptions} from '../types';
import {
    clearResetStateListener,
    createCopyHandler,
    createDownloadHandler,
    createHostResizeRegistry,
    emitResetState,
    rafThrottle,
    renderByViewMode,
    setResetStateListener
} from '../shared';
import type {DiagramExportInfo} from '../shared';
import {getMermaidTheme} from './helpers';
import {defaultMermaidTheme} from './theme';
import {customThemeVariables} from './theme/common';
import {computeGanttLayoutWidth} from './theme/gantt';

export {updateDiagramControls} from '../utils';

type SvgPanZoomRenderer = typeof svgPanZoom;
interface CustomEventHandler {
    haltEventListeners: string[];
    init: (options: {svgElement: SVGSVGElement, instance: SvgPanZoomRenderer}) => void;
    destroy: () => void;
}

let mermaidPromise: Promise<Mermaid | null> | null = null;
let svgPanZoomPromise: Promise<SvgPanZoomRenderer | null> | null = null;
// 已加载的 svg-pan-zoom 构造函数缓存，供 ensurePanZoom 在拿到布局后同步补建实例
let loadedSvgPanZoom: SvgPanZoomRenderer | null = null;

async function loadMermaid(): Promise<Mermaid | null> {
    if (!mermaidPromise) {
        // structuredClone is not available in low-version Android WebView (< Chrome 98)
        if (typeof structuredClone === 'undefined') {
            (globalThis as any).structuredClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));
        }
        mermaidPromise = asyncImport(() => import('mermaid').then(m => m.default)).catch(err => {
            // 低版本浏览器（如 iOS 16.4-）加载 mermaid 时可能因不支持 lookbehind
            // 等语法抛出 SyntaxError，
            // 捕获后重置 Promise，避免后续调用拿到已失败的 Promise
            console.warn('[mermaid] load failed, unsupported environment:', err);
            mermaidPromise = null;
            return null;
        });
    }
    return mermaidPromise;
}

async function loadSvgPanZoom(): Promise<SvgPanZoomRenderer | null> {
    if (!svgPanZoomPromise) {
        svgPanZoomPromise = asyncImport(() => import('svg-pan-zoom').then(m => {
            const fn = ('default' in m ? m.default : m) as SvgPanZoomRenderer;
            loadedSvgPanZoom = fn;
            return fn;
        })).catch(error => {
            console.warn('[mermaid] svg-pan-zoom load failed:', error);
            svgPanZoomPromise = null;
            return null;
        });
    }
    return svgPanZoomPromise;
}

const resizeRegistry = createHostResizeRegistry(rafThrottle);
const {observeHostResize, unobserve, observe} = resizeRegistry;

const MERMAID_VISUAL_PADDING = 10;

const panZoomMap = new WeakMap<HTMLElement, SvgPanZoomRenderer>();
const fittedZoomMap = new WeakMap<HTMLElement, number>();
// 初始适配态的平移量，与 fittedZoomMap 一起作为「是否偏离初始态」的判定基准
const fittedPanMap = new WeakMap<HTMLElement, {x: number, y: number}>();
const fittingHosts = new WeakSet<HTMLElement>();

const ZOOM_TOLERANCE = 0.01;
const PAN_TOLERANCE = 1;

function setPanZoom(host: HTMLElement, panZoom: SvgPanZoomRenderer) {
    panZoomMap.set(host, panZoom);
}

function getPanZoom(host: HTMLElement): SvgPanZoomRenderer | undefined {
    return panZoomMap.get(host);
}

/** 当前视口是否已偏离初始适配态（缩放比或平移量任一超出容差） */
function isResettable(host: HTMLElement): boolean {
    const panZoom = getPanZoom(host);
    const fittedZoom = fittedZoomMap.get(host);
    const fittedPan = fittedPanMap.get(host);
    if (!panZoom || !fittedZoom || !fittedPan) {
        return false;
    }
    const currentZoom = panZoom.getZoom();
    if (Math.abs(currentZoom - fittedZoom) / fittedZoom > ZOOM_TOLERANCE) {
        return true;
    }
    const currentPan = panZoom.getPan();
    return Math.abs(currentPan.x - fittedPan.x) > PAN_TOLERANCE
        || Math.abs(currentPan.y - fittedPan.y) > PAN_TOLERANCE;
}

/** 视口发生变化时同步复位态；滚轮、拖拽、捏合、放大/缩小按钮都会走到这里 */
function syncResetState(host: HTMLElement): void {
    if (fittingHosts.has(host)) {
        return;
    }
    emitResetState(host, isResettable(host));
}

/**
 * 为 svg-pan-zoom 实例创建捏合缩放事件处理器。
 */
function createPinchZoomHandler(
    getInstance: () => SvgPanZoomRenderer | undefined,
): CustomEventHandler {
    let prevDistance = -1;
    let prevPanX = -1;
    let prevPanY = -1;
    let cleanup: (() => void) | null = null;

    function getTouchDistance(touches: TouchList): number {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function getTouchMidpoint(touches: TouchList, svgEl: Element): {x: number, y: number} {
        const rect = svgEl.getBoundingClientRect();
        return {
            x: (touches[0].clientX + touches[1].clientX) / 2 - rect.left,
            y: (touches[0].clientY + touches[1].clientY) / 2 - rect.top
        };
    }

    return {
        haltEventListeners: ['touchstart', 'touchmove', 'touchend', 'touchleave', 'touchcancel'],
        init(options) {
            const el = options.svgElement as SVGElement;

            const onTouchStart = (e: TouchEvent) => {
                if (e.touches.length === 2) {
                    e.preventDefault();
                    prevDistance = getTouchDistance(e.touches);
                    prevPanX = -1;
                    prevPanY = -1;
                }
                else if (e.touches.length === 1) {
                    prevPanX = e.touches[0].clientX;
                    prevPanY = e.touches[0].clientY;
                    prevDistance = -1;
                }
            };

            const onTouchMove = (e: TouchEvent) => {
                e.preventDefault();
                const instance = getInstance() as any;
                if (!instance) {
                    return;
                }

                if (e.touches.length === 2) {
                    prevPanX = -1;
                    prevPanY = -1;
                    const distance = getTouchDistance(e.touches);
                    if (prevDistance > 0 && distance > 0) {
                        const scaleDelta = distance / prevDistance;
                        const midpoint = getTouchMidpoint(e.touches, el);
                        instance.zoomAtPointBy(scaleDelta, midpoint);
                    }
                    prevDistance = distance;
                }
                else if (e.touches.length === 1 && prevPanX >= 0 && prevPanY >= 0) {
                    const dx = e.touches[0].clientX - prevPanX;
                    const dy = e.touches[0].clientY - prevPanY;
                    instance.panBy({x: dx, y: dy});
                    prevPanX = e.touches[0].clientX;
                    prevPanY = e.touches[0].clientY;
                }
            };

            const onTouchEnd = (e: TouchEvent) => {
                prevDistance = -1;
                if (e.touches.length === 1) {
                    prevPanX = e.touches[0].clientX;
                    prevPanY = e.touches[0].clientY;
                }
                else {
                    prevPanX = -1;
                    prevPanY = -1;
                }
            };

            el.addEventListener('touchstart', onTouchStart as EventListener, {passive: false});
            el.addEventListener('touchmove', onTouchMove as EventListener, {passive: false});
            el.addEventListener('touchend', onTouchEnd as EventListener);
            el.addEventListener('touchleave', onTouchEnd as EventListener);
            el.addEventListener('touchcancel', onTouchEnd as EventListener);

            cleanup = () => {
                el.removeEventListener('touchstart', onTouchStart as EventListener);
                el.removeEventListener('touchmove', onTouchMove as EventListener);
                el.removeEventListener('touchend', onTouchEnd as EventListener);
                el.removeEventListener('touchleave', onTouchEnd as EventListener);
                el.removeEventListener('touchcancel', onTouchEnd as EventListener);
            };
        },
        destroy() {
            // svg-pan-zoom 的 destroy() 会转调 customEventsHandler.destroy()
            cleanup?.();
            cleanup = null;
        }
    };
}

function getPaddedZoomRatio(host: HTMLElement): number {
    const minSize = Math.min(host.clientWidth, host.clientHeight);

    if (!minSize || minSize <= MERMAID_VISUAL_PADDING * 2) {
        return 1;
    }

    return Math.max(0.01, Math.min(1, 1 - MERMAID_VISUAL_PADDING * 2 / minSize));
}

// 相对于实际适配缩放比的倍率上下界（MAX/MIN × fit 后相对缩放 = 实际缩放上下界）
const MAX_ZOOM_MULTIPLIER = 3;
const MIN_ZOOM_MULTIPLIER = 0.5;

// 单次缩放灵敏度：按 30 次从 fit 态放大到 MAX_ZOOM_MULTIPLIER 倍反推，与基准无关，是常量。
const ZOOM_SCALE_SENSITIVITY = Math.pow(MAX_ZOOM_MULTIPLIER, 1 / 30) - 1;

/**
 * 按 host 计算缩放上下界：以该图实际 fit 后的相对缩放为基准（与 markmap 对齐）。
 * 按 host 分别计算，避免多图共用模块级变量互相覆盖导致放大/缩小按钮边界判断错乱。
 */
function getZoomRange(host: HTMLElement): {minZoom: number, maxZoom: number} {
    const fittedZoom = fittedZoomMap.get(host) ?? 1;
    return {
        minZoom: fittedZoom * MIN_ZOOM_MULTIPLIER,
        maxZoom: fittedZoom * MAX_ZOOM_MULTIPLIER
    };
}

function isCtmInvertible(el: Element): boolean {
    try {
        const ctm = (el as SVGGraphicsElement).getCTM?.();
        if (!ctm) {
            return false;
        }
        // 行列式为 0 时矩阵不可逆，svg-pan-zoom 调用 inverse() 会抛 InvalidStateError
        return ctm.a * ctm.d - ctm.b * ctm.c !== 0;
    }
    catch {
        return false;
    }
}

function isSvgCtmValid(host: HTMLElement): boolean {
    const svgEl = host.querySelector('svg');
    if (!svgEl) {
        return false;
    }
    // svg-pan-zoom 操作的是内层 viewport <g>，只需检查其 CTM 可逆性。
    // Firefox 下 SVG 根元素的 getCTM() 规范上允许返回 null（不在图形容器内），
    // 不能以此判断不可初始化，跳过对 svgEl 本身的检查。
    const viewportEl = svgEl.querySelector('g');
    return !viewportEl || isCtmInvertible(viewportEl);
}

// host 上的指针事件兜底监听，WeakMap 去重，避免同一 host 重复绑定。
const ctmGuardMap = new WeakMap<HTMLElement, (e: Event) => void>();

function attachCtmInteractionGuard(host: HTMLElement): void {
    if (ctmGuardMap.has(host)) {
        return;
    }
    const guard = (e: Event) => {
        if (!isSvgCtmValid(host)) {
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    };
    // 捕获阶段挂在 host（svg 的祖先）上，先于 svg-pan-zoom 在 svg 上的监听执行
    host.addEventListener('wheel', guard, {capture: true, passive: false});
    host.addEventListener('mousedown', guard, {capture: true, passive: false});
    ctmGuardMap.set(host, guard);
}

function getPanZoomOptions(host: HTMLElement) {
    return {
        controlIconsEnabled: false,
        fit: false,
        center: false,
        panEnabled: true,
        zoomEnabled: true,
        mouseWheelZoomEnabled: true,
        dblClickZoomEnabled: false,
        preventMouseEventsDefault: true,
        refreshRate: 'auto' as const,
        // 实例自身的视口变化回调
        onZoom: () => syncResetState(host),
        onPan: () => syncResetState(host),
        customEventsHandler: createPinchZoomHandler(() => getPanZoom(host)) as any
    };
}

function ensurePanZoom(host: HTMLElement): SvgPanZoomRenderer | undefined {
    if (!host.offsetParent || !host.clientWidth || !host.clientHeight) {
        return getPanZoom(host);
    }
    const existing = getPanZoom(host);
    if (existing && isSvgCtmValid(host)) {
        return existing;
    }
    if (!loadedSvgPanZoom) {
        return existing;
    }
    const svgElement = host.querySelector('svg');
    if (!svgElement) {
        return existing;
    }
    try {
        (existing as unknown as {destroy?: () => void})?.destroy?.();
    }
    catch {
        // 忽略销毁异常，继续重建
    }
    try {
        const instance = loadedSvgPanZoom(svgElement, getPanZoomOptions(host));
        setPanZoom(host, instance);
        attachCtmInteractionGuard(host);
        return instance;
    }
    catch (error) {
        console.warn('[mermaid] svg-pan-zoom init failed, diagram will display without pan/zoom:', error);
        return undefined;
    }
}

/**
 * 彻底释放 host 上的图表资源：断开 resize 观察、销毁 svg-pan-zoom 实例
 * （其 destroy 会转调捏合处理器的 destroy 解绑 touch 监听）、摘掉 host 上的
 * CTM 兜底监听。供组件卸载（detached）统一调用，避免长会话下实例与监听累积。
 */
export function destroyDiagram(host: HTMLElement): void {
    resizeRegistry.disconnect(host);
    clearResetStateListener(host);
    const guard = ctmGuardMap.get(host);
    if (guard) {
        host.removeEventListener('wheel', guard, {capture: true} as EventListenerOptions);
        host.removeEventListener('mousedown', guard, {capture: true} as EventListenerOptions);
        ctmGuardMap.delete(host);
    }
    try {
        (getPanZoom(host) as unknown as {destroy?: () => void})?.destroy?.();
    }
    catch (error) {
        console.warn('[mermaid] svg-pan-zoom destroy failed:', error);
    }
    panZoomMap.delete(host);
    fittedZoomMap.delete(host);
    fittedPanMap.delete(host);
}

function fitDiagramWithPadding(host: HTMLElement): void {
    if (!host.offsetParent || !host.clientWidth || !host.clientHeight) {
        return;
    }

    const panZoom = ensurePanZoom(host);
    if (!panZoom) {
        return;
    }

    // 适配过程中会连续触发 onZoom/onPan，先屏蔽中间态，待新基准写入后再统一同步一次
    fittingHosts.add(host);
    panZoom.resize();
    panZoom.setMinZoom(Number.EPSILON);
    panZoom.setMaxZoom(Infinity);

    panZoom.fit();
    panZoom.center();
    panZoom.zoomBy(getPaddedZoomRatio(host));
    panZoom.center();
    // 记录初始适配态作为复位态判定基准（缩放比 + 平移量）
    const fittedZoom = panZoom.getZoom();
    fittedZoomMap.set(host, fittedZoom);
    fittedPanMap.set(host, panZoom.getPan());

    const {minZoom, maxZoom} = getZoomRange(host);
    panZoom.setMaxZoom(maxZoom);
    panZoom.setMinZoom(minZoom);
    // zoomIn 基于倍率累乘，按 30 次从 fit 态放大到上限反推每次放大的灵敏度。
    panZoom.setZoomScaleSensitivity(ZOOM_SCALE_SENSITIVITY);
    fittingHosts.delete(host);
    // 已回到初始适配态
    emitResetState(host, false);
}

async function ensureMermaidInit(code: string, ganttWidth?: number): Promise<Mermaid | null> {
    const mermaid = await loadMermaid();
    const result = await getMermaidTheme(code);
    const type = result?.type;
    let theme = result?.theme;

    if (type === 'gantt' && theme && ganttWidth) {
        theme = {...theme, gantt: {...(theme.gantt as object), useWidth: ganttWidth}};
    }

    mermaid?.initialize({
        ...(theme ?? defaultMermaidTheme),
        startOnLoad: false,
        suppressErrorRendering: true,
        securityLevel: 'strict',
        htmlLabels: false,
        theme: 'base'
    } as Parameters<Mermaid['initialize']>[0]);

    return mermaid;
}

// 节点圆角半径，与矩形（rx/ry）保持一致，来源于主题的 borderRadius（如 '12px'）
const NODE_CORNER_RADIUS = parseFloat(customThemeVariables.borderRadius) || 0;
const SVG_NS = 'http://www.w3.org/2000/svg';

/** 解析 polygon 的 points 属性为坐标点数组，兼容逗号/空白混合分隔。 */
function parsePolygonPoints(raw: string): Array<[number, number]> {
    const nums = raw.trim().split(/[\s,]+/).map(Number).filter(n => !Number.isNaN(n));
    const points: Array<[number, number]> = [];
    for (let i = 0; i + 1 < nums.length; i += 2) {
        points.push([nums[i], nums[i + 1]]);
    }
    return points;
}

/**
 * 把多边形顶点序列转成「每个顶点带圆角」的 SVG path。
 */
function roundedPolygonPath(points: Array<[number, number]>, radius: number): string {
    const n = points.length;
    if (n < 3) {
        return '';
    }
    const seg: string[] = [];
    for (let i = 0; i < n; i++) {
        const prev = points[(i - 1 + n) % n];
        const curr = points[i];
        const next = points[(i + 1) % n];
        const inX = curr[0] - prev[0];
        const inY = curr[1] - prev[1];
        const outX = next[0] - curr[0];
        const outY = next[1] - curr[1];
        const lenIn = Math.hypot(inX, inY);
        const lenOut = Math.hypot(outX, outY);
        if (!lenIn || !lenOut) {
            return '';
        }
        const d = Math.min(radius, lenIn / 2, lenOut / 2);
        // 进入边上的切点（从 curr 朝 prev 回退 d）
        const startX = curr[0] - inX / lenIn * d;
        const startY = curr[1] - inY / lenIn * d;
        // 离开边上的切点（从 curr 朝 next 前进 d）
        const endX = curr[0] + outX / lenOut * d;
        const endY = curr[1] + outY / lenOut * d;
        seg.push(`${i === 0 ? 'M' : 'L'} ${startX} ${startY}`);
        seg.push(`Q ${curr[0]} ${curr[1]} ${endX} ${endY}`);
    }
    seg.push('Z');
    return seg.join(' ');
}

/**
 * 给流程图多边形节点（菱形判定框、六边形等）加圆角。
 */
function roundNodePolygons(host: HTMLElement, radius: number): void {
    if (radius <= 0) {
        return;
    }
    host.querySelectorAll<SVGPolygonElement>('.node polygon').forEach(polygon => {
        const pointsAttr = polygon.getAttribute('points');
        if (!pointsAttr) {
            return;
        }
        const d = roundedPolygonPath(parsePolygonPoints(pointsAttr), radius);
        if (!d) {
            return;
        }
        const path = document.createElementNS(SVG_NS, 'path');
        Array.from(polygon.attributes).forEach(attr => {
            if (attr.name !== 'points') {
                path.setAttribute(attr.name, attr.value);
            }
        });
        path.setAttribute('d', d);
        path.setAttribute(ROUNDED_POLYGON_ATTR, '');
        polygon.replaceWith(path);
    });
}

// 容器宽度拿不到时（host 尚未布局/离屏）用于测量的兜底宽度，px
const GANTT_MEASURE_FALLBACK_WIDTH = 600;

/**
 * 离屏测量甘特图布局宽度
 */
async function measureGanttLayoutWidth(
    mermaid: Mermaid,
    definition: string,
    containerWidth: number,
): Promise<number> {
    const width = containerWidth > 0 ? containerWidth : GANTT_MEASURE_FALLBACK_WIDTH;
    // getBBox / getBoundingClientRect 要求节点在渲染树中，故用离屏定位而非 display:none；
    // 容器宽度 = 真实容器宽，配合 useMaxWidth 使 SVG 按 scale≈1 渲染，量得的是 intrinsic 宽
    const container = document.createElement('div');
    container.style.cssText = `position:fixed;top:0;left:-99999px;width:${width}px;`;
    document.body.appendChild(container);
    try {
        const id = `mermaid-measure-${Math.random().toString(36).slice(2)}`;
        const measureDefinition = `${definition}\ntodayMarker off\n`;
        const {svg} = await mermaid.render(id, measureDefinition, container);
        container.innerHTML = svg;
        const labels = container.querySelectorAll<SVGTextElement>('.grid .tick text');
        let maxLabelWidth = 0;
        labels.forEach(label => {
            maxLabelWidth = Math.max(maxLabelWidth, label.getBoundingClientRect().width);
        });
        return computeGanttLayoutWidth(labels.length, maxLabelWidth);
    }
    finally {
        container.remove();
    }
}

async function renderDiagramTask(options: DiagramOptions): Promise<boolean> {
    const {host, definition, raw} = options || {};

    if (!host || !definition) {
        return false;
    }

    if (isHostRenderComplete(host)) {
        return true;
    }

    // 需要拿到图表类型，确保自定义样式生效
    if (definition.length < 10) {
        return false;
    }

    let mermaid = await ensureMermaidInit(definition);

    // ios@16.4- mermaid 模块存在兼容性问题，直接返回 false 跳过渲染
    if (!mermaid) {
        return false;
    }

    try {
        // 预检语法：parse 失败则跳过渲染，避免无效语法产生 stack trace
        await mermaid.parse(definition);
    }
    catch {
        return false;
    }

    try {
        const id = `mermaid-${Math.random().toString(36).slice(2)}`;

        // 甘特图：先离屏按容器宽度量出真实刻度，算出布局宽度后用它重新 initialize，
        // 再把最终 SVG 一次性写入 host —— 测量图离屏不可见，用户不会看到中间态/闪烁。
        const themeResult = await getMermaidTheme(definition);
        let renderDefinition = definition;
        if (themeResult?.type === 'gantt') {
            renderDefinition = `${definition}\ntodayMarker off\n`;
            const containerWidth = host.offsetWidth || host.parentElement?.offsetWidth || 0;
            const layoutWidth = await measureGanttLayoutWidth(mermaid, definition, containerWidth);
            mermaid = (await ensureMermaidInit(definition, layoutWidth)) || mermaid;
        }

        const {svg} = await mermaid.render(id, renderDefinition);
        host.innerHTML = svg;
        roundNodePolygons(host, NODE_CORNER_RADIUS);
        // 若代码块已闭合，标记为完成，后续不再重复渲染
        if (isDefinitionClosed(raw)) {
            markHostRenderComplete(host);
            await loadSvgPanZoom();
            ensurePanZoom(host);
        }
        return true;
    }
    catch (e) {
        console.warn('[mermaid] render failed:', e);
        return false;
    }
}

let renderQueue: Promise<unknown> = Promise.resolve();

function enqueueRender<T>(task: () => Promise<T>): Promise<T> {
    const result = renderQueue.then(task, task);
    // 无论本次成功/失败都继续队列，避免一次失败阻塞后续图表渲染
    renderQueue = result.catch(() => undefined);
    return result;
}

async function renderDiagram(options: DiagramOptions): Promise<boolean> {
    return enqueueRender(() => renderDiagramTask(options));
}

/**
 * 默认策略（用于 mermaid 等）：
 * 1. 无缓存 → 当前 definition 行数 >= 2 时首次渲染
 * 2. 当前 raw 完整 → true
 * 3. definition 未变化 → 跳过
 * 4. definition 变化且行数有增量 → 重新渲染
 */
export function shouldRender(options: DiagramOptions): boolean {
    const {definition, raw, cachedHost} = options;
    if (isDefinitionClosed(raw)) {
        return true;
    }

    const currentLines = getDefLength(definition ?? '');
    if (!cachedHost) {
        return currentLines > 2;
    }

    const cachedRaw = cachedHost?.dataset?.[DatasetKey.raw] || '';
    if (raw === cachedRaw) {
        return false;
    }

    const cachedDefinition = getDefinition(cachedRaw);
    if (definition === cachedDefinition) {
        return false;
    }

    const cachedLines = getDefLength(cachedDefinition);
    return currentLines - cachedLines > 0;
}

export async function render(options: DiagramOptions): Promise<boolean> {
    return renderByViewMode(options, renderDiagram);
}

export function getRenderAbleDefinition(options: RenderAbleDefinitionOptions): string {
    const {raw} = options;
    // 从原始文本中截取代码块定义部分
    const definition = getDefinition(raw ?? '');
    if (definition.endsWith('\n')) {
        return definition;
    }
    const lastNewLineIndex = definition.lastIndexOf('\n');
    if (lastNewLineIndex === -1) {
        return '';
    }
    return definition.slice(0, lastNewLineIndex + 1);
}

function getExportInfo(host: HTMLElement): DiagramExportInfo {
    const svgElement = host.querySelector('svg');
    const panZoom = getPanZoom(host);
    const viewBox = panZoom?.getSizes()?.viewBox;
    return {svgElement, viewBox};
}

export async function handleDiagramRenderComplete(options: DiagramOptions): Promise<void> {
    const {
        host, raw, actionControls, viewportControls, viewMode, renderStatus, type, lang,
        onReachMaxZoomRatio, onReachMinZoomRatio, onCopy, onDownload, onViewModeChanged, onToggleLandscape,
        onZoom, onReset: onResetEvent, onFullscreen
    } = options || {};
    if (!isDefinitionClosed(raw)) {
        return;
    }
    if (!host) {
        return;
    }
    markHostRenderComplete(host);
    // 复位态变化统一经 click(action=reset) 抛给宿主，供其控制自绘复位按钮显隐
    setResetStateListener(host, (resettable: boolean) => onResetEvent?.({resettable}));
    const fitDiagram = () => fitDiagramWithPadding(host);
    observeHostResize(host, fitDiagram);

    const diagramElement = getDiagramElement(host);
    if (!diagramElement) {
        return;
    }
    attachDiagramControls(diagramElement, {
        actionControls,
        viewportControls,
        raw,
        viewMode,
        renderStatus,
        type,
        lang,
        onViewModeChanged: (newViewMode: DiagramOptions['viewMode']) => {
            onViewModeChanged?.({viewMode: newViewMode ?? DiagramViewMode.diagram, type});
            if (newViewMode === DiagramViewMode.code) {
                unobserve(host);
                return;
            }
            observe(host);
            // host 已完成渲染，无需重新渲染，直接恢复即可
            if (isHostRenderComplete(host)) {
                return;
            }
            renderDiagram({
                ...options,
                viewMode: DiagramViewMode.code
            });
        },
        onZoomIn: () => {
            const panZoom = getPanZoom(host);
            const currentZoom = panZoom?.getZoom();
            // 缩放比例已经超出最大值
            if (currentZoom !== undefined && currentZoom >= getZoomRange(host).maxZoom) {
                onReachMaxZoomRatio?.();
                return;
            }
            panZoom?.zoomIn();
            onZoom?.('in');
        },
        onZoomOut: () => {
            const panZoom = getPanZoom(host);
            const currentZoom = panZoom?.getZoom();
            if (currentZoom !== undefined && currentZoom <= getZoomRange(host).minZoom) {
                onReachMinZoomRatio?.();
                return;
            }
            panZoom?.zoomOut();
            onZoom?.('out');
        },
        onReset: () => {
            // fitDiagramWithPadding 复位后会刷新基准并抛出 resettable=false
            fitDiagram();
        },
        onCopy: createCopyHandler({host, raw: raw ?? '', type, filename: 'mermaid.png', getExportInfo, onCopy}),
        onDownload: createDownloadHandler({
            host, raw: raw ?? '', type, filename: 'mermaid.png', getExportInfo, onDownload
        }),
        onToggleLandscape,
        onFullscreen
    });
}

/**
 * 检测当前环境是否支持 mermaid 渲染。
 * mermaid 依赖正向/负向断言，ios@16.4- 不支持，会在解析阶段抛出 SyntaxError。
 * rehype 阶段和 renderer 阶段共用此函数，保证两处逻辑一致。
 */
export function isMermaidSupported(): boolean {
    return isAdvancedRegExpSupported();
}

export function canIUse(options: DiagramOptions): boolean {
    const {lang} = options;
    if (lang !== DiagramLang.mermaid) {
        return false;
    }
    return isMermaidSupported();
}
