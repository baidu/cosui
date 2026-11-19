import {DatasetKey} from '../../utils/dataset-keys';
import {
    CLASS_NAME_DIAGRAM_CODE_VIEW,
    CLASS_NAME_DIAGRAM_VIEW,
    DiagramViewMode
} from '../../utils/const';
import type {DiagramOptions} from '../../types';

export enum RenderStatus {
    rendering = 'rendering',
    success = 'success',
    complete = 'complete',
    fail = 'fail',
}

export function switchDiagramView(diagramElement: HTMLElement, viewMode: DiagramOptions['viewMode']): void {
    if (!diagramElement || !viewMode) {
        return;
    }
    const diagramView = diagramElement?.querySelector<HTMLElement>(`.${CLASS_NAME_DIAGRAM_VIEW}`);
    const codeView = diagramElement?.querySelector<HTMLElement>(`.${CLASS_NAME_DIAGRAM_CODE_VIEW}`);
    if (!diagramView || !codeView) {
        return;
    }
    diagramElement.dataset[DatasetKey.viewMode] = viewMode;
    const isCodeView = viewMode === DiagramViewMode.code;
    diagramView.style.display = isCodeView ? 'none' : '';
    codeView.style.display = isCodeView ? '' : 'none';
}

/**
 * 无条件将 host 标记为渲染完成
 * 仅当 raw 已闭合时才写入标记，保证标记与内容一致。
 */
export function markHostRenderComplete(host: HTMLElement): void {
    host.dataset[DatasetKey.renderStatus] = RenderStatus.complete;
}

/**
 * 无条件将 host 标记为渲染失败
 */
export function markHostRenderFail(host: HTMLElement): void {
    host.dataset[DatasetKey.renderStatus] = RenderStatus.fail;
}

/**
 * 获取 host 渲染状态
 */
export function getHostRenderStatus(host: HTMLElement): DiagramOptions['renderStatus'] | undefined {
    return host.dataset[DatasetKey.renderStatus] as unknown as DiagramOptions['renderStatus'];
}

/**
 * 判断节点是否渲染完成
 */
export function isHostRenderComplete(host: HTMLElement): boolean {
    return getHostRenderStatus(host) === RenderStatus.complete;
}
