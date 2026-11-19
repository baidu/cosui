import type {DiagramRendererOptions} from '../../types';
import DiagramRendererManager from './diagram-renderer-manager';

const manager = DiagramRendererManager.getInstance();

/**
 * 渲染入口函数：扫描 Markdown 容器中未渲染的图表占位块，按语言类型派发渲染。
 */
export function renderDiagrams(dom: HTMLElement, options?: DiagramRendererOptions) {
    return manager.render(dom, options);
}

/**
 * 获取指定 root 的渲染 Promise，供 mountDiagramWidgets await 使用。
 */
export function getRenderPromiseByRoot(root: Element) {
    return manager.getRenderPromise(root);
}

/**
 * 释放指定 root 下所有图表资源，供宿主组件 detached 调用。
 */
export function destroyDiagrams(root: Element) {
    return manager.destroy(root);
}
