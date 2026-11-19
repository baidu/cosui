import {DIRECTIVE_NAME_DIAGRAM} from '../utils/const';
import {updateDiagramControls as _updateDiagramControls} from '../components/diagram-controls/helpers';
import type {DiagramOptions} from '../types';

export function getDiagramElement(host: HTMLElement) {
    return host.closest(DIRECTIVE_NAME_DIAGRAM) as unknown as HTMLElement;
}

export function updateDiagramControls(host: HTMLElement, options: {
    renderStatus?: DiagramOptions['renderStatus'];
}) {
    const diagramElement = getDiagramElement(host);
    if (!diagramElement) {
        return;
    }
    _updateDiagramControls(diagramElement, options);
}
