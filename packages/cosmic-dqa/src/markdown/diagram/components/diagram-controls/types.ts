import type {DiagramOptions, DiagramViewType} from '../../types';

export interface DiagramControlsData {
    viewMode: DiagramOptions['viewMode'];
    renderStatus?: DiagramOptions['renderStatus'];
    actionControls: DiagramOptions['actionControls'];
    viewportControls: DiagramOptions['viewportControls'];
}

export interface AttachDiagramControlsOptions extends DiagramControlsData {
    raw: DiagramOptions['raw'];
    /** 图表类型中文名，随 fullscreen / toggle-landscape 事件抛给业务 */
    type?: DiagramOptions['type'];
    /** 图表 canonical 语言（mermaid/markmap/mindmap），随 fullscreen 事件抛给业务用于重建围栏 */
    lang?: DiagramOptions['lang'];
    onRenderDiagram?: () => void;
    onRenderCode?: () => void;
    onViewModeWillChange?: (viewMode: DiagramOptions['viewMode']) => void;
    onViewModeChanged?: (viewMode: DiagramOptions['viewMode']) => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onReset: () => void;
    onCopy: (params: {viewMode: DiagramOptions['viewMode']}) => void;
    onDownload: (params: {viewMode: DiagramOptions['viewMode']}) => void;
    onFullscreen?: (context: {raw?: string, type?: string, lang?: DiagramOptions['lang']}) => void;
    /** 横竖屏切换：landscape 为切换后的目标态，与 DiagramOptions.onToggleLandscape 签名保持一致 */
    onToggleLandscape?: (params: {landscape: boolean, viewMode: DiagramViewType, type?: string}) => void;
}
