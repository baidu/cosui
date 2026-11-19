/**
 * cosd-markdown ↔ diagram 集成层
 */
import * as diagram from './index';
import {DiagramViewMode} from './utils/const';
import type {DiagramRendererOptions} from './types';
import type {DiagramControlsCtor} from './components/diagram-controls/base';

export {resetDiagram} from './index';

interface DiagramHost {
    data: {get: (key: string) => any};
    fire: (name: string, data?: unknown) => void;
    el?: Element | null;
}

// diagram 扁平布尔开关（与 interface.ts 的 DiagramConfig 对应）
interface DiagramFlatConfig {
    mode?: boolean;
    copy?: boolean;
    download?: boolean;
    fullscreen?: boolean;
    landscape?: boolean;
    'zoom-in'?: boolean;
    'zoom-out'?: boolean;
    reset?: boolean;
}

/**
 * 扁平布尔开关 → 内部动作控件 / 视口控件列表（单组）。
 */
function buildControlGroups(
    config: DiagramFlatConfig
): Pick<DiagramRendererOptions, 'actionControls' | 'viewportControls'> {
    const actionNames = [
        config.mode && 'viewMode',
        config.copy && 'copy',
        config.download && 'download',
        config.fullscreen && 'fullscreen',
        config.landscape && 'toggleLandscape'
    ].filter(Boolean) as string[];
    const viewportNames = [
        config['zoom-in'] && 'zoom-in',
        config['zoom-out'] && 'zoom-out',
        config.reset && 'reset'
    ].filter(Boolean) as string[];
    return {
        actionControls: actionNames.length ? [actionNames.map(name => ({name}))] : [],
        viewportControls: viewportNames.length ? [viewportNames.map(name => ({name}))] : []
    };
}

/**
 * 命中图表开关时初始化 diagram
 */
export function initDiagram(host: DiagramHost, marklang: unknown, controls: DiagramControlsCtor): void {
    const raw = host.data.get('diagram');
    const config = (raw && typeof raw === 'object') ? raw : {};
    const fireClick = (action: string, data?: unknown) => host.fire('click', {from: 'diagram', action, data});

    // 扁平布尔 → 内部动作控件 / 视口控件列表（单组）
    const {actionControls, viewportControls} = buildControlGroups(config);

    const options: DiagramRendererOptions = {
        marklang,
        controls,
        viewMode: DiagramViewMode.diagram,
        actionControls,
        viewportControls,
        onCopy: data => fireClick('copy', data),
        onDownload: data => fireClick('download', data),
        onViewModeChanged: data => fireClick('mode-change', data),
        onToggleLandscape: data => fireClick('landscape', data),
        onZoom: direction => fireClick('zoom', {direction}),
        onReset: data => fireClick('reset', data),
        onFullscreen: data => fireClick('fullscreen', data)
    };
    diagram.init(options);
}

export function syncDiagramControls(host: DiagramHost): void {
    if (!host.el) {
        return;
    }
    const raw = host.data.get('diagram');
    const config = (raw && typeof raw === 'object') ? raw : {};
    const {actionControls, viewportControls} = buildControlGroups(config);
    diagram.diagramUpdateActionControls(host.el, actionControls, viewportControls);
}

/**
 * 释放指定 root 内的图表资源，供宿主组件 detached 调用。
 */
export function destroyDiagramRender(root: Element | null | undefined): void {
    if (!root) {
        return;
    }
    try {
        diagram.destroyDiagrams(root);
    }
    catch {
        // 释放失败不影响 markdown 卸载主流程
    }
}

/**
 * 获取图表指令映射，供并入 marklangOptions.directives。
 */
export function getDiagramDirectives(): Record<string, (info: unknown, dom: HTMLElement) => void> {
    return diagram.getDirectives();
}

/**
 * 等待指定 root 内的图表渲染完成（终帧）。图表渲染失败不阻塞 render-complete。
 */
export async function awaitDiagramRender(root: Element | null | undefined): Promise<void> {
    if (!root) {
        return;
    }
    try {
        await diagram.getRenderPromiseByRoot(root);
    }
    catch {
        // 图表渲染失败不影响 markdown 主流程
    }
}
