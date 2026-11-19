import {DIRECTIVE_NAME_DIAGRAM} from './utils/const';
import {registerPlugin} from './render/render-manager/register-marklang-plugin';
import {updateParams, getParams} from './render/render-manager/params';
import {getDiagramControlsUnderRoot} from './components/diagram-controls/helpers';
import type {DiagramRendererOptions} from './types';
import * as renderManager from './render/render-manager';

export {DiagramViewMode, DiagramRenderStatus} from './utils/const';

type DiagramDirectives = Record<string, (_: any, dom: HTMLElement) => void>;

/**
 * 注册图表 Markdown 插件，并缓存图表渲染配置。
 * @param options - 图表渲染配置
 */
export function init(options: DiagramRendererOptions): void {
    updateParams(options);
    registerPlugin(options.marklang);
}

/**
 * 获取图表 Markdown 指令配置。
 * @returns 指令名称到渲染回调的映射
 */
export function getDirectives(): DiagramDirectives {
    return {
        [DIRECTIVE_NAME_DIAGRAM]: (_: any, dom: HTMLElement) => {
            renderManager.renderDiagrams(dom, getParams());
        }
    };
}

/**
 * 获取指定 root 的渲染 Promise，供 await 终帧使用。
 */
export async function getRenderPromiseByRoot(root: Element) {
    return renderManager.getRenderPromiseByRoot(root);
}

/**
 * 释放指定 root 下所有图表资源（ResizeObserver、pan/zoom 与 markmap 实例、
 * host 上的事件兜底监听、命令式挂载的控件组件），供宿主组件 detached 调用。
 */
export function destroyDiagrams(root: Element): void {
    renderManager.destroyDiagrams(root);
}

/** 复位 / 自适应 root 内所有图表 */
export function resetDiagram(root: Element): void {
    getDiagramControlsUnderRoot(root).forEach(c => c.fire('reset'));
}

export function diagramUpdateActionControls(
    root: Element,
    actionControls: DiagramRendererOptions['actionControls'],
    viewportControls?: DiagramRendererOptions['viewportControls'],
): void {
    // 刷新缓存配置：此后新渲染的图表沿用最新控件集，覆盖流式渲染「配置变更先于图表渲染」的竞态
    const params = getParams();
    if (params) {
        updateParams({
            ...params,
            actionControls,
            viewportControls: viewportControls ?? params.viewportControls
        });
    }
    // 更新已渲染图表的控件实例：San 响应式重算 sortedActionControls 后按钮即时显隐
    getDiagramControlsUnderRoot(root).forEach(controls => {
        controls.data.set('actionControls', actionControls);
        if (viewportControls !== undefined) {
            controls.data.set('viewportControls', viewportControls);
        }
    });
}
