import {switchDiagramView} from '../../render/render-manager/render-status';
import {getParams} from '../../render/render-manager/params';
import {DiagramViewMode, DIRECTIVE_NAME_DIAGRAM} from '../../utils/const';
import {DatasetKey} from '../../utils/dataset-keys';
import type {DiagramOptions} from '../../types';
import type {AttachDiagramControlsOptions} from './types';
import type DiagramControls from './base';

interface CallbackRefs {
    onViewModeWillChange?: AttachDiagramControlsOptions['onViewModeWillChange'];
    onViewModeChanged?: AttachDiagramControlsOptions['onViewModeChanged'];
    onZoomIn: AttachDiagramControlsOptions['onZoomIn'];
    onZoomOut: AttachDiagramControlsOptions['onZoomOut'];
    onReset: AttachDiagramControlsOptions['onReset'];
    onCopy: AttachDiagramControlsOptions['onCopy'];
    onDownload: AttachDiagramControlsOptions['onDownload'];
    onFullscreen?: AttachDiagramControlsOptions['onFullscreen'];
    onToggleLandscape?: AttachDiagramControlsOptions['onToggleLandscape'];
}

const controlsMap = new WeakMap<HTMLElement, DiagramControls>();
const callbackRefsMap = new WeakMap<HTMLElement, CallbackRefs>();

/**
 * 取指定 root 下所有图表的控件实例
 */
export function getDiagramControlsUnderRoot(root: Element): DiagramControls[] {
    const els = Array.from(root.querySelectorAll<HTMLElement>(DIRECTIVE_NAME_DIAGRAM));
    return els.map(el => controlsMap.get(el)).filter(Boolean) as DiagramControls[];
}

export function attachDiagramControls(
    diagramElement: HTMLElement,
    options: AttachDiagramControlsOptions,
): DiagramControls | undefined {
    const {
        viewMode = DiagramViewMode.diagram,
        renderStatus,
        actionControls = [],
        viewportControls,
        raw,
        type,
        lang,
        onViewModeWillChange,
        onViewModeChanged,
        onZoomIn,
        onZoomOut,
        onReset,
        onCopy,
        onDownload,
        onFullscreen,
        onToggleLandscape
    } = options;

    if (!diagramElement) {
        return;
    }

    let controls = controlsMap.get(diagramElement);
    if (controls && diagramElement?.dataset[DatasetKey.viewMode]) {
        controls.data.set('viewMode', viewMode);
        controls.data.set('renderStatus', renderStatus);
        controls.data.set('actionControls', actionControls);
        controls.data.set('viewportControls', viewportControls);
        switchDiagramView(diagramElement, viewMode);
        // 同步更新回调引用，确保后续事件触发时调用最新的回调
        const refs = callbackRefsMap.get(diagramElement);
        if (refs) {
            refs.onViewModeWillChange = onViewModeWillChange;
            refs.onViewModeChanged = onViewModeChanged;
            refs.onZoomIn = onZoomIn;
            refs.onZoomOut = onZoomOut;
            refs.onReset = onReset;
            refs.onCopy = onCopy;
            refs.onDownload = onDownload;
            refs.onFullscreen = onFullscreen;
            refs.onToggleLandscape = onToggleLandscape;
        }
        return;
    }

    switchDiagramView(diagramElement, viewMode);

    // 控件类由双端组件入口注入（pc / mobile 各一份），渲染层不感知平台
    const Controls = getParams()?.controls;
    if (!Controls) {
        return;
    }

    // 用 ref 对象持有所有回调，事件监听通过 ref 间接调用，
    // 后续 update 时只替换 ref 内容即可
    const refs: CallbackRefs = {
        onViewModeWillChange,
        onViewModeChanged,
        onZoomIn,
        onZoomOut,
        onReset,
        onCopy,
        onDownload,
        onFullscreen,
        onToggleLandscape
    };
    callbackRefsMap.set(diagramElement, refs);

    controls = new Controls({
        data: {
            viewMode,
            renderStatus,
            actionControls,
            viewportControls
        }
    });

    const instance = controls;

    controls.on('view-mode-changed', (viewMode: DiagramOptions['viewMode']) => {
        refs.onViewModeWillChange?.(viewMode);
        switchDiagramView(diagramElement, viewMode);
        refs.onViewModeChanged?.(viewMode);
    });
    controls.on('zoom-in', () => refs.onZoomIn());
    controls.on('zoom-out', () => refs.onZoomOut());
    controls.on('reset', () => refs.onReset());
    controls.on('fullscreen', () => {
        refs.onFullscreen?.({raw, type, lang});
    });
    controls.on('copy', () => {
        refs.onCopy({
            viewMode: (diagramElement.dataset[DatasetKey.viewMode]
                || DiagramViewMode.diagram) as unknown as DiagramOptions['viewMode']
        });
    });
    controls.on('download', () => {
        refs.onDownload({
            viewMode: (diagramElement.dataset[DatasetKey.viewMode]
                || DiagramViewMode.diagram) as unknown as DiagramOptions['viewMode']
        });
    });
    controls.on('toggle-landscape', (data: {landscape: boolean}) => {
        const currentViewMode = diagramElement.dataset[DatasetKey.viewMode] || DiagramViewMode.diagram;
        instance.updateLandscape(data.landscape);
        refs.onToggleLandscape?.({landscape: data.landscape, viewMode: currentViewMode, type});
    });
    controls.attach(diagramElement);
    controlsMap.set(diagramElement, controls);
}

export function updateDiagramControls(
    diagramElement: HTMLElement,
    options: {renderStatus?: DiagramOptions['renderStatus']},
) {
    const controls = controlsMap.get(diagramElement);
    if (!controls) {
        return;
    }
    if (options.renderStatus !== undefined) {
        controls.updateRenderStatus(options.renderStatus);
    }
}

/**
 * 卸载 root 下所有图表的控件实例。
 */
export function disposeDiagramControlsUnderRoot(root: Element): void {
    Array.from(root.querySelectorAll<HTMLElement>(DIRECTIVE_NAME_DIAGRAM)).forEach(el => {
        const controls = controlsMap.get(el);
        if (!controls) {
            return;
        }
        controls.detach();
        controls.dispose();
        controlsMap.delete(el);
        callbackRefsMap.delete(el);
    });
}

