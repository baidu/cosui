/**
 * markmap 渲染器：在宿主 div 内的 SVG 上直接创建 markmap 实例。
 * 代码块闭合后，添加浮动放大/缩小/自适应按钮。
 */

import type {Transformer} from 'markmap-lib';
import {getDefinition, isDefinitionClosed} from '../../utils/definition';
import {DiagramLang, DiagramViewMode} from '../../utils/const';
import {attachDiagramControls} from '../../components/diagram-controls/helpers';
import type {DiagramOptions} from '../../types';
import {DatasetKey} from '../../utils/dataset-keys';
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
    renderByViewMode,
    setResetStateListener,
    timeoutDebounce
} from '../shared';
import {getBranchConfig, resetBranchColors, createMarkmap} from './helpers';
import type {MarkmapInstance, MarkmapOptions, MarkmapZoomTransform} from './types';

export {updateDiagramControls} from '../utils';

let transformerPromise: Promise<Transformer> | null = null;

async function loadTransformer(): Promise<Transformer> {
    if (!transformerPromise) {
        transformerPromise = asyncImport(async () => {
            const {Transformer} = await import('markmap-lib');
            const transformer = new Transformer();
            transformer.md.options.html = false;
            return transformer;
        }).catch(err => {
            console.warn('[markmap] transformer load failed:', err);
            transformerPromise = null;
            throw err;
        });
    }
    return transformerPromise;
}

const MARKMAP_ZOOM_STEPS = 30;

// 相对于适配缩放比的倍率上下界（300% / 50%）
const MARKMAP_MAX_ZOOM_RATIO = 3;

const MARKMAP_MIN_ZOOM_RATIO = 0.5;

// 单次缩放倍率
const MARKMAP_SCALE_STEP_RATIO = Math.pow(MARKMAP_MAX_ZOOM_RATIO, 1 / MARKMAP_ZOOM_STEPS);

const MARKMAP_ANIMATION_DURATION = 200;

const MARKMAP_VISUAL_PADDING = 10;

const DEFAULT_MARKMAP_FIT_RATIO = 0.95;

function getMarkmapFitRatio(host: HTMLElement): number {
    const minSize = Math.min(host.clientWidth, host.clientHeight);

    if (!minSize || minSize <= MARKMAP_VISUAL_PADDING * 2) {
        return DEFAULT_MARKMAP_FIT_RATIO;
    }

    return Math.max(0.01, Math.min(1, 1 - MARKMAP_VISUAL_PADDING * 2 / minSize));
}

interface MarkmapZoomConfig {
    maxScale: number;
    minScale: number;
}

// 记录每个 host 实际 fit 后的 scale（markmap.fit() 真正达到的缩放比
const fitScaleMap = new WeakMap<HTMLElement, number>();

function getMarkmapZoomConfig(host: HTMLElement): MarkmapZoomConfig {
    // 缩放范围基准：优先用实际 fit scale（fit 完成后由 markFitted 记录），
    // 尚未 fit 时回退 fitRatio 作宽松估算。
    const baseScale = fitScaleMap.get(host) ?? getMarkmapFitRatio(host);

    return {
        maxScale: baseScale * MARKMAP_MAX_ZOOM_RATIO,
        minScale: baseScale * MARKMAP_MIN_ZOOM_RATIO
    };
}

// 完整参数详见：https://markmap.js.org/api/interfaces/markmap-view.IMarkmapOptions.html#togglerecursively
// 缩放范围不经 options 下发（markmap-view 不读取 zoomOptions），由 markFitted 直接设置 d3-zoom 的 scaleExtent。
function getMarkmapOptions(host: HTMLElement, duration = MARKMAP_ANIMATION_DURATION): Partial<MarkmapOptions> {
    return {
        // 使用自定义颜色方案，根据节点路径获取对应的连接线颜色
        color: node => getBranchConfig(node.state.path).lineColor,
        // 冻结第2层及以上的颜色，子节点继承父节点的颜色
        colorFreezeLevel: 2,
        // 节点展开/折叠的动画时长
        duration,
        pan: false,
        scrollForPan: false,
        // 通过限制自适应比例实现 svg 外围边距的效果
        fitRatio: getMarkmapFitRatio(host)
    };
}

const markmapMap = new WeakMap<HTMLElement, MarkmapInstance>();
const resizeRegistry = createHostResizeRegistry(timeoutDebounce(200));
const {observeHostResize, unobserve, observe} = resizeRegistry;

function setMarkmap(host: HTMLElement, markmap: MarkmapInstance) {
    markmapMap.set(host, markmap);
}

function getMarkmap(host: HTMLElement): MarkmapInstance | undefined {
    return markmapMap.get(host);
}

// 追加监听用的命名空间事件名：markmap-view 自身注册的是裸 'zoom'，
// 带命名空间不会互相覆盖
const ZOOM_LISTENER_NAME = 'zoom.cosd-diagram';
const SCALE_TOLERANCE = 0.01;
const TRANSLATE_TOLERANCE = 1;

// 最近一次 d3 zoom 变换 与 初始适配态变换，二者比对即「是否偏离初始态」
const lastTransformMap = new WeakMap<HTMLElement, MarkmapZoomTransform>();
const fittedTransformMap = new WeakMap<HTMLElement, MarkmapZoomTransform>();

function isSameTransform(a?: MarkmapZoomTransform, b?: MarkmapZoomTransform): boolean {
    if (!a || !b) {
        return false;
    }
    return Math.abs(a.k - b.k) / Math.max(b.k, Number.EPSILON) <= SCALE_TOLERANCE
        && Math.abs(a.x - b.x) <= TRANSLATE_TOLERANCE
        && Math.abs(a.y - b.y) <= TRANSLATE_TOLERANCE;
}

/**
 * 监听 markmap 自身的 d3 zoom 变换，统一派发复位态。
 * 滚轮 / 捏合缩放与放大、缩小按钮（rescale）都会经过 d3 zoom，一处覆盖。
 */
function watchZoomTransform(host: HTMLElement, markmap: MarkmapInstance): void {
    markmap.zoom?.on?.(ZOOM_LISTENER_NAME, (event: {transform?: MarkmapZoomTransform}) => {
        const transform = event?.transform;
        if (!transform) {
            return;
        }
        lastTransformMap.set(host, transform);
        emitResetState(host, !isSameTransform(transform, fittedTransformMap.get(host)));
    });
}

/**
 * 把当前变换登记为初始适配态基准
 */
function markFitted(host: HTMLElement): void {
    const last = lastTransformMap.get(host);
    if (last) {
        fittedTransformMap.set(host, last);
        fitScaleMap.set(host, last.k);
        const markmap = getMarkmap(host);
        if (markmap?.zoom) {
            const minScale = last.k * MARKMAP_MIN_ZOOM_RATIO;
            const maxScale = last.k * MARKMAP_MAX_ZOOM_RATIO;
            markmap.zoom.scaleExtent([minScale, maxScale]);
        }
    }
    emitResetState(host, false);
}

/**
 * 销毁 host 上的 markmap 实例
 */
function destroyMarkmap(host: HTMLElement): void {
    try {
        getMarkmap(host)?.destroy?.();
    }
    catch (error) {
        console.warn('[markmap] destroy failed:', error);
    }
    markmapMap.delete(host);
}

/** 彻底释放 host 上的图表资源，供视图切换 / 组件卸载统一调用 */
export function destroyDiagram(host: HTMLElement): void {
    resizeRegistry.disconnect(host);
    clearResetStateListener(host);
    getMarkmap(host)?.zoom?.on?.(ZOOM_LISTENER_NAME, null);
    lastTransformMap.delete(host);
    fittedTransformMap.delete(host);
    fitScaleMap.delete(host);
    destroyMarkmap(host);
}

async function renderDiagram(options: DiagramOptions): Promise<boolean> {
    const {host, definition, raw} = options || {};
    // host / definition 缺失时与渲染异常同路径兜底（catch → false）
    if (!host || !definition) {
        return false;
    }
    try {
        if (isHostRenderComplete(host)) {
            return true;
        }
        const transformer = await loadTransformer();
        const {root} = transformer.transform(definition);

        const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const markmapWidth = host.clientWidth || host.parentElement?.clientWidth || 300;
        const markmapHeight = host.clientHeight || host.parentElement?.clientHeight || 300;
        svgElement.setAttribute('width', String(markmapWidth));
        svgElement.setAttribute('height', String(markmapHeight));
        host.appendChild(svgElement);
        svgElement.innerHTML = '';
        resetBranchColors();
        // 新建实例前先销毁旧实例：否则旧实例会被 markmap-view 的模块级 Hook 永久持有
        destroyMarkmap(host);
        const markmap = await createMarkmap(svgElement, getMarkmapOptions(host, 0));
        setMarkmap(host, markmap);
        watchZoomTransform(host, markmap);
        await markmap.setData(root);
        await markmap.fit();
        markFitted(host);
        // 禁用双击缩放：d3 事件解绑 + SVG 元素事件拦截
        markmap.svg?.on('dblclick.zoom', null);
        svgElement.addEventListener('dblclick', e => {
            e.stopPropagation();
            e.preventDefault();
        }, {capture: true});

        host.innerHTML = '';
        host.appendChild(svgElement);
        // 若代码块已闭合，标记为完成，后续不再重复渲染
        if (isDefinitionClosed(raw)) {
            markHostRenderComplete(host);
        }
        return true;
    }
    catch {
        return false;
    }
}

/**
 * markmap 渲染策略：raw 完整或 definition 内容发生变化时重新渲染。
 * mindmap 复用同一策略。
 */
export function shouldRender(options: DiagramOptions): boolean {
    const {definition, raw, cachedHost} = options;
    if (!cachedHost) {
        return true;
    }
    const cachedRaw = cachedHost.dataset[DatasetKey.raw] || '';
    if (raw === cachedRaw) {
        return false;
    }
    if (isDefinitionClosed(raw)) {
        return true;
    }
    const cachedDefinition = getDefinition(cachedRaw);
    return definition !== cachedDefinition;
}

export async function render(options: DiagramOptions): Promise<boolean> {
    return renderByViewMode(options, renderDiagram);
}

/**
 * markmap 截断策略：丢弃末尾只含 # 号的不完整标题行。
 * mindmap 复用同一策略。
 */
export function getRenderAbleDefinition(options: RenderAbleDefinitionOptions): string {
    const {raw} = options;
    // 从原始文本中截取代码块定义部分（去掉围栏标记）
    const definition = getDefinition(raw ?? '');
    const lines = definition.split('\n');
    const lastLine = lines[lines.length - 1];
    if (!lastLine) {
        return definition;
    }
    if (lastLine && /^#+$/.test(lastLine)) {
        lines.pop();
    }
    return lines.join('\n');
}

function getExportInfo(host: HTMLElement) {
    const svgElement = host.querySelector('svg');
    const {x1, y1, x2, y2} = getMarkmap(host)?.state?.rect ?? {};
    const viewBox = x1 === undefined || y1 === undefined || x2 === undefined || y2 === undefined
        ? undefined
        : {x: x1, y: y1, width: x2 - x1, height: y2 - y1};
    return {svgElement, viewBox};
}

export function handleDiagramRenderComplete(options: DiagramOptions): void {
    const {
        host, raw, actionControls, onCopy, onDownload, onToggleLandscape, type, lang,
        onViewModeChanged, viewportControls, viewMode, renderStatus, onZoom, onReset: onResetEvent, onFullscreen
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
        onViewModeChanged: async (newViewMode: DiagramOptions['viewMode']) => {
            onViewModeChanged?.({viewMode: newViewMode ?? DiagramViewMode.diagram, type});
            if (newViewMode === DiagramViewMode.code) {
                unobserve(host);
                return;
            }
            await renderDiagram({
                ...options,
                viewMode: DiagramViewMode.diagram
            });
            observe(host);
        },
        onZoomIn: () => {
            getMarkmap(host)?.rescale(MARKMAP_SCALE_STEP_RATIO);
            onZoom?.('in');
        },
        onZoomOut: () => {
            getMarkmap(host)?.rescale(1 / MARKMAP_SCALE_STEP_RATIO);
            onZoom?.('out');
        },
        onReset: () => {
            const markmap = getMarkmap(host);
            if (!markmap) {
                return;
            }
            const {maxScale, minScale} = getMarkmapZoomConfig(host);
            markmap.zoom?.scaleExtent([minScale, maxScale]);
            markmap.setOptions(getMarkmapOptions(host, 0));
            markmap.fit().then(() => {
                markmap.setOptions({duration: MARKMAP_ANIMATION_DURATION});
                // 复位后回到初始适配态，刷新基准并抛出 resettable=false
                markFitted(host);
            });
        },
        onCopy: createCopyHandler({host, raw: raw ?? '', type, filename: 'markmap.png', getExportInfo, onCopy}),
        onDownload: createDownloadHandler({
            host, raw: raw ?? '', type, filename: 'markmap.png', getExportInfo, onDownload
        }),
        onToggleLandscape,
        onFullscreen
    });

    const fitDiagram = () => {
        if (!host.offsetParent || !host.clientWidth || !host.clientHeight) {
            return;
        }
        const markmap = getMarkmap(host);
        const {maxScale, minScale} = getMarkmapZoomConfig(host);
        markmap?.zoom?.scaleExtent([minScale, maxScale]);
        markmap?.setOptions(getMarkmapOptions(host));
        // 容器尺寸变化后重新适配，基准随之刷新
        markmap?.fit().then(() => markFitted(host));
    };
    observeHostResize(host, fitDiagram);
}

/**
 * 检测当前环境是否支持 markmap / mindmap 渲染
 */
export function isMarkmapSupported(): boolean {
    return isAdvancedRegExpSupported();
}

export function canIUse(options: DiagramOptions): boolean {
    const {lang} = options;
    // markmap 与 mindmap 共用同一渲染器
    if (lang !== DiagramLang.markmap && lang !== DiagramLang.mindmap) {
        return false;
    }
    return isMarkmapSupported();
}
