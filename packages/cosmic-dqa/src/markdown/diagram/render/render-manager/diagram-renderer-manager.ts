/**
 * 图表渲染管理器（单例）。
 * 管理每个 Markdown root 的渲染缓存与并发控制，
 * 扫描未渲染的图表占位块并按语言类型派发渲染。
 */
import {isDefinitionClosed} from '../../utils/definition';
import {DatasetKey} from '../../utils/dataset-keys';
import {getDiagramKey} from '../../utils/diagram-key';
import {getDiagramTypeName} from '../../utils/diagram-type';
import {applyOverlayStyle, resetOverlayStyle, hideEl, showEl} from '../../utils/dom-utils';
import {attachDiagramRendering} from '../../components/diagram-rendering/helpers';
import {attachDiagramError} from '../../components/diagram-error/helpers';
import {attachDiagramControls, disposeDiagramControlsUnderRoot} from '../../components/diagram-controls/helpers';
import {DIRECTIVE_NAME_DIAGRAM, DiagramRenderStatus, DiagramViewMode, SELECTOR_DIAGRAM_HOST} from '../../utils/const';
import type {DiagramRendererOptions, DiagramRenderingOptions} from '../../types';
import {
    getHostRenderStatus,
    isHostRenderComplete,
    markHostRenderFail
    // switchDiagramView,
} from './render-status';
import type {DiagramRendererModule} from './types';
// mermaid/markmap 适配层改为静态引入：避免本地 import() 把 markdown 拆成异步 chunk、
// 入口沦为门面导致发布产物缺 index.js。
// 适配层内部对 mermaid/markmap-lib/d3/svg-pan-zoom 等第三方重库仍是动态 import（external），
// 按需在浏览器端加载、SSR 不触碰。
import * as mermaidRenderer from '../mermaid';
import * as markmapRenderer from '../markmap';

class DiagramRendererManager {
    static getInstance(): DiagramRendererManager {
        if (!DiagramRendererManager.instance) {
            DiagramRendererManager.instance = new DiagramRendererManager();
        }
        return DiagramRendererManager.instance;
    }

    /**
     * 渲染入口：扫描 Markdown 容器中未渲染的图表占位块，按语言类型派发渲染。
     *
     * @param dom - 触发渲染的 DOM 元素
     * @returns 所有渲染任务的 Promise 数组；若已有进行中的渲染则返回该 Promise；
     *          若无法定位 root 则返回 undefined
     */
    render(dom: HTMLElement, options?: DiagramRendererOptions): void {
        // 向上查找容器作为渲染边界；root 固定为组件模板根 .cosd-markdown，
        // 需与 awaitDiagramRender(this.el) 传入的元素保持一致，render-complete 才能命中缓存。
        const root = dom.closest(this.markdownRootSelector);
        const {
            style, actionControls, viewportControls, onCopy, onDownload,
            onViewModeChanged, onToggleLandscape, onZoom, onReset, onFullscreen
        } = options ?? {};
        if (!root) {
            console.warn('[diagram] 未找到 .cosd-markdown root，跳过图表渲染');
            return;
        }

        // 同一 root 若已有正在进行的渲染，不能直接丢弃本次调用：
        // 流式渲染（closed=false）在低性能环境（如模拟器）可能很慢，若此时「闭合后的最终渲染」
        // 调用被守卫直接丢弃，图表会停在未完成态（svg 写进了随后被 marklang 重建替换掉的旧 host，
        // 且 closed=false 不会 markHostRenderComplete / 挂控件）。
        // 因此缓存最新一次调用，待进行中的渲染结束后补跑一次（trailing re-render）。
        const existing = this.renderingRoots.get(root);
        if (existing) {
            this.pendingRender.set(root, {dom, options});
            return;
        }

        // 初始化该 root 的缓存槽位，用于存放已渲染的 host 元素
        let cacheSlots = this.cache.get(root);
        if (!cacheSlots) {
            cacheSlots = [];
            this.cache.set(root, cacheSlots);
        }

        // 该 root 的「已完成图表」内容身份缓存（用于冻结复用，
        // 避免流式重渲染时前序图表闪动）
        let frozenByKey = this.completedCache.get(root);
        if (!frozenByKey) {
            frozenByKey = new Map<string, HTMLElement>();
            this.completedCache.set(root, frozenByKey);
        }

        // const 别名供下方异步闭包捕获：let 变量在闭包里会丢失上面的非空窄化
        const rootCache = cacheSlots;
        const completedByKey = frozenByKey;

        // 收集所有图表
        const hosts = Array.from(root.querySelectorAll<HTMLElement>(SELECTOR_DIAGRAM_HOST));
        const taskList = hosts.map(async (host, index): Promise<boolean> => {
            // 从 data 属性中提取图表语言与原始定义文本
            const lang = host.dataset[DatasetKey.lang] as unknown as DiagramRendererOptions['lang'];
            const raw = host.dataset[DatasetKey.raw] || '';
            const viewMode = (host.dataset[DatasetKey.viewMode]) as unknown as DiagramRendererOptions['viewMode']
                 || DiagramViewMode.diagram;
            // 图表类型中文名（流程图 / 时序图 / 甘特图 / 思维导图 ...），
            // 随事件抛给业务。
            const type = getDiagramTypeName({lang, raw});

            // 流式生成中挂载 disabled 态按钮。
            // 由于 marklang 每包 innerHTML 替换会重建 diagramElement，需要每次重新挂载。
            // 此逻辑放在 getRenderAbleDefinition 之前，确保不被防重入守卫阻塞。
            // 代码块已闭合时跳过：闭合后由 handleDiagramRenderComplete 挂载
            // 带真实回调的完整版控件。
            const diagramElement = host.closest<HTMLElement>(DIRECTIVE_NAME_DIAGRAM);
            if (diagramElement && !isDefinitionClosed(raw)) {
                attachDiagramControls(diagramElement, {
                    actionControls,
                    viewportControls: [],
                    raw,
                    viewMode,
                    type,
                    renderStatus: DiagramRenderStatus.success,
                    onViewModeChanged: data => onViewModeChanged?.({
                        viewMode: data ?? DiagramViewMode.diagram, type
                    }),
                    onZoomIn: () => {},
                    onZoomOut: () => {},
                    onReset: () => {},
                    onCopy: () => {},
                    onDownload: () => {}
                });
            }

            // 冻结复用：已闭合且内容未变、且此前已渲染完成的图表，按内容身份命中缓存后
            // 原地把缓存节点换回当前占位处，跳过重渲染，消除"流式渲染后一个图表时，
            // 前一个已完成图表闪动"的问题。
            // 注意：marklang 每包整段 innerHTML 替换会重建 diagramElement，并冲掉命令式挂载的
            // 控件（DiagramControls 不在 markdown HTML 里），因此复用 svg host 后仍需重新挂控件 /
            // 重绑缩放，否则工具栏丢失、只剩 header。
            const renderKey = getDiagramKey(raw);
            if (lang && isDefinitionClosed(raw)) {
                const frozen = completedByKey.get(renderKey);
                if (frozen && frozen !== host && isHostRenderComplete(frozen)) {
                    host.parentElement?.insertBefore(frozen, host);
                    host.remove();
                    showEl(frozen);
                    rootCache[index] = frozen;
                    await this.handleRenderComplete({
                        index, lang, host: frozen, definition: '', raw, viewMode, type,
                        style, actionControls, viewportControls, cachedHost: undefined, rootCache,
                        frozenCache: completedByKey, renderKey,
                        onDownload, onCopy, onViewModeChanged, onToggleLandscape, onZoom, onReset, onFullscreen,
                        renderStatus: getHostRenderStatus(frozen)
                    });
                    return false;
                }
            }

            // 按语言规则获取当前可渲染的图表定义（流式场景下可能需要裁剪未完成内容）
            const definition = await this.getRenderAbleDefinition({lang, raw});
            if (!lang || !definition) {
                return false;
            }

            // 取出上一次渲染缓存的 host（流式更新时复用已渲染结果）
            const cachedHost = rootCache[index];
            if (cachedHost === host) {
                return false;
            }

            const renderOptions = {
                // lang, host, def: definition, raw, viewMode,
                index, lang, host, definition, raw, viewMode, type,
                style, actionControls, viewportControls, cachedHost, rootCache,
                frozenCache: completedByKey, renderKey,
                onDownload, onCopy, onViewModeChanged, onToggleLandscape, onZoom, onReset, onFullscreen,
                renderStatus: getHostRenderStatus(host)
            };

            const canIUse = await this.canIUse(renderOptions);
            if (!canIUse) {
                this.handleRenderFail(renderOptions);
                return false;
            }

            // 当前 host 已标记完成，跳过
            if (isHostRenderComplete(host)) {
                this.handleRenderComplete(renderOptions);
                return false;
            }
            if (cachedHost) {
                hideEl(host);
                // 将缓存的已渲染 host 插入到当前 host 前方，实现"覆盖式更新"
                host.parentElement?.insertBefore(cachedHost, host);
                // 缓存 host 已完成渲染，直接移除当前占位 host
                if (isHostRenderComplete(cachedHost)) {
                    rootCache[index] = cachedHost;
                    host.remove();
                    // 登记内容身份缓存，后续流式重渲染直接走冻结复用、不再重挂
                    completedByKey.set(renderKey, cachedHost);
                    // cachedHost 已完成渲染，触发 handleRenderComplete 挂载完整按钮和 viewport 控件
                    this.handleRenderComplete({...renderOptions, host: cachedHost});
                    return false;
                }
                // 缓存尚未完成，设置绝对定位覆盖 host，待新渲染完成后替换
                applyOverlayStyle(cachedHost);
            }

            // const renderOptions = {
            //     lang, host, def: stripDef, raw, viewMode,
            //     style, actionControls, viewportControls, onCopy,
            //     onDownload, onClose, cachedHost,
            //     index, rootCache,
            //     renderStatus: getHostRenderStatus(host)
            // };
            // 根据语言策略判断是否需要（重新）渲染
            const shouldRender = await this.shouldRender(renderOptions);
            if (shouldRender) {
                return (async () => {
                    try {
                        return await this.startRender(renderOptions);
                    }
                    catch (e) {
                        this.handleRenderFail(renderOptions);
                        console.error('[diagram] startRender failed:', e);
                        return false;
                    }
                })();
            }
            else {
                this.handleRenderFail(renderOptions);
                return false;
            }
        });

        // 汇总所有渲染任务，完成后清除该 root 的进行中标记
        const promise = Promise.all(taskList).finally(() => {
            this.renderingRoots.delete(root);
            // 补跑渲染进行中时被合并的最新一次调用，确保闭合后的最终渲染不丢失
            const pending = this.pendingRender.get(root);
            if (pending) {
                this.pendingRender.delete(root);
                this.render(pending.dom, pending.options);
            }
        });
        // 记录进行中的渲染 Promise，供后续调用去重 & 外部 await
        this.renderingRoots.set(root, promise);
        // return promise;
    }

    /**
     * 获取指定 root 的渲染 Promise，供外部 await 使用。
     */
    getRenderPromise(root: Element): Promise<boolean[]> | undefined {
        return this.renderingRoots.get(root);
    }

    /**
     * 释放指定 root 下所有图表占用的资源，供宿主组件 detached 调用。
     * 这些资源都挂在 DOM / 模块级 WeakMap 上，不随 markdown HTML 重建自动回收：
     * ResizeObserver、svg-pan-zoom 与 markmap 实例、host 上的 CTM 兜底监听、
     * 命令式挂载的 DiagramControls / DiagramRendering 组件。
     */
    destroy(root: Element): void {
        const hosts = Array.from(root.querySelectorAll<HTMLElement>(SELECTOR_DIAGRAM_HOST));
        // 冻结复用缓存里可能还存着已脱离文档的 host，同样需要释放
        const frozenHosts = Array.from(this.completedCache.get(root)?.values() ?? []);
        new Set([...hosts, ...frozenHosts]).forEach(host => {
            // 两个渲染器各自按 host 维度存实例，未命中的那个是空操作
            mermaidRenderer.destroyDiagram(host);
            markmapRenderer.destroyDiagram(host);
            this.removeDiagramRenderingMap.get(host)?.();
            this.removeDiagramRenderingMap.delete(host);
        });
        disposeDiagramControlsUnderRoot(root);
        this.cache.delete(root);
        this.completedCache.delete(root);
        this.renderingRoots.delete(root);
        this.pendingRender.delete(root);
    }

    private static instance: DiagramRendererManager;

    /**
     * 每个 Markdown 容器（root）对应一个已渲染的 host 元素数组。
     * 使用 WeakMap 确保 root 元素被回收后缓存也自动释放，避免内存泄漏。
     */
    private readonly cache = new WeakMap<Element, Array<HTMLElement | undefined>>();

    /**
     * 每个 root 下「已完成图表」的内容身份缓存：key(内容哈希) → 已渲染 host。
     * 用于流式全量重建时，按内容身份命中已完成且未变的图表，原地冻结复用、
     * 跳过重渲染与重挂控制条，消除“渲染后一个图表时前一个闪动”的问题。
     */
    private readonly completedCache = new WeakMap<Element, Map<string, HTMLElement>>();

    /**
     * 记录每个 root 当前正在执行的渲染 Promise。
     * 用于防止同一 root 在渲染期间重复触发 render，
     * 同时供外部通过 getRenderPromise await 结果。
     */
    private readonly renderingRoots = new WeakMap<Element, Promise<boolean[]>>();

    /**
     * 记录「渲染进行中时到达的最新一次 render 调用」，用于在当前渲染结束后补跑一次，
     * 避免并发守卫把闭合后的最终渲染丢弃（低性能环境流式渲染慢时尤为明显）。
     */
    private readonly pendingRender = new WeakMap<Element, {dom: HTMLElement, options?: DiagramRendererOptions}>();

    private readonly cachedLoaders:
        Partial<Record<NonNullable<DiagramRendererOptions['lang']>, DiagramRendererModule>> = {};

    private readonly removeDiagramRenderingMap = new WeakMap<HTMLElement, () => void>();

    private readonly markdownRootSelector = '.cosd-markdown';

    /**
     * 图表渲染器映射表。适配层静态引入，重库仍在适配层内部按需动态 import。
     */
    private readonly getRenderModule = async (
        lang: DiagramRendererOptions['lang']
    ): Promise<DiagramRendererModule | undefined> => {
        if (!lang) {
            return undefined;
        }
        if (this.cachedLoaders[lang]) {
            return this.cachedLoaders[lang];
        }
        switch (lang) {
            case 'mermaid':
                this.cachedLoaders[lang] = mermaidRenderer;
                break;
            case 'markmap':
            case 'mindmap':
                this.cachedLoaders[lang] = markmapRenderer;
                break;
            default:
                this.cachedLoaders[lang] = undefined;
                break;
        }
        return this.cachedLoaders[lang];
    };

    private async handleRenderComplete(options: DiagramRenderingOptions): Promise<void> {
        const {host, lang} = options;
        if (!host) {
            return;
        }
        try {
            const rendererModule = await this.getRenderModule(lang);
            await rendererModule?.handleDiagramRenderComplete?.(options);
            rendererModule?.updateDiagramControls(host, {renderStatus: getHostRenderStatus(host)});
        }
        catch (error) {
            console.error('[DiagramRendererManager] render complete failed:', error);
        }
    }

    /**
     * 各图表语言的"是否需要渲染"判断策略。
     *
     * - mermaid：基于行数增量节流，流式输出时每新增行才触发重渲染，
     *   避免逐字符频繁渲染造成性能问题。
     * - markmap：只要 definition 内容变化就重新渲染，因为 markmap 结构变化需要立即反映。
     */
    private async shouldRender(options: DiagramRenderingOptions): Promise<boolean> {
        const {lang} = options;
        try {
            const rendererModule = await this.getRenderModule(lang);
            // 未知语言（取不到渲染器）按「不需要渲染」处理，走错误兜底
            return rendererModule?.shouldRender?.(options) ?? false;
        }
        catch (error) {
            console.error('[DiagramRendererManager] shouldRender:', error);
        }
        return false;
    }

    /**
     * 根据图表语言获取当前可渲染的图表定义。
     */
    private async getRenderAbleDefinition(
        options: {lang: DiagramRendererOptions['lang'], raw: DiagramRendererOptions['raw']}
    ): Promise<string> {
        const {lang} = options;
        try {
            if (!lang) {
                return '';
            }
            const rendererModule = await this.getRenderModule(lang);
            return rendererModule?.getRenderAbleDefinition?.(options) || '';
        }
        catch (error) {
            console.error('[DiagramRendererManager] getRenderAbleDefinition:', error);
        }
        return '';
    }

    /**
     * 渲染失败或不渲染时回退
     */
    private async handleRenderFail(options: DiagramRenderingOptions) {
        const {host, cachedHost, index, rootCache, lang, raw} = options;
        if (!host || index === undefined || !rootCache) {
            return;
        }
        const rendererModule = await this.getRenderModule(lang);
        markHostRenderFail(host);
        // 渲染失败时不调用 handleDiagramRenderComplete挂载 viewport 控件，只更新状态
        rendererModule?.updateDiagramControls?.(host, {renderStatus: DiagramRenderStatus.fail});
        // host 闭合，说明渲染已经失败，挂载错误兜底组件。
        if (isDefinitionClosed(raw)) {
            cachedHost?.remove();
            attachDiagramError(host, {
                onReload: () => this.startRender(options)
            });
            // this.switchToCodeView(host);
            showEl(host);
            rootCache[index] = host;
            return;
        }

        // 有缓存则恢复缓存，否则显示当前 host 占位。
        if (cachedHost) {
            resetOverlayStyle(cachedHost);
            host.remove();
        }
        else {
            showEl(host);
        }
    }

    private async startRender(options: DiagramRenderingOptions) {
        const {
            host, lang, viewMode, cachedHost,
            index, rootCache, renderStatus,
            frozenCache, renderKey, raw
        } = options;
        if (!host || index === undefined || !rootCache) {
            return false;
        }
        this.removeDiagramRenderingMap.set(host, attachDiagramRendering(host));
        // 懒加载对应语言的渲染器模块
        const rendererModule = await this.getRenderModule(lang);
        rendererModule?.updateDiagramControls(host, {renderStatus});
        const renderRes = await rendererModule?.render(options);

        if (renderRes) {
            // 渲染成功：移除旧缓存 host，用新 host 替换缓存槽位
            showEl(host);
            rootCache[index] = host;
            cachedHost?.remove();
            // 已闭合的图表登记进「内容身份缓存」，后续流式重渲染时冻结复用、不再重挂
            if (frozenCache && renderKey && isDefinitionClosed(raw)) {
                frozenCache.set(renderKey, host);
            }
            // 标记单次渲染成功
            if (viewMode === DiagramViewMode.diagram) {
                rendererModule?.updateDiagramControls(host, {renderStatus: getHostRenderStatus(host)});
            }
            await this.handleRenderComplete(options);
            this.removeDiagramRenderingMap.get(host)?.();
            this.removeDiagramRenderingMap.delete(host);
            return true;
        }
        this.handleRenderFail(options);
        this.removeDiagramRenderingMap.get(host)?.();
        this.removeDiagramRenderingMap.delete(host);
        return false;
    }

    private async canIUse(
        options: {lang: DiagramRendererOptions['lang'], raw: DiagramRendererOptions['raw']}
    ): Promise<boolean> {
        const {lang} = options;
        try {
            // 取不到渲染器或渲染器未实现 canIUse，均视为「不支持」
            return (await this.getRenderModule(lang))?.canIUse?.(options) ?? false;
        }
        catch (error) {
            console.error('[DiagramRendererManager] canIUse:', error);
        }
        return false;
    }

    // private switchToCodeView(host: HTMLElement): void {
    //     const diagramElement = host.closest<HTMLElement>(DIRECTIVE_NAME_DIAGRAM);
    //     if (!diagramElement) {
    //         return;
    //     }
    //     switchDiagramView(diagramElement, DiagramViewMode.code);
    // }
}

export default DiagramRendererManager;
