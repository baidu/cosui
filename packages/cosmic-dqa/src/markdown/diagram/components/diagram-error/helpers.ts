import DiagramError from './index';

export function attachDiagramError(host: HTMLElement, options?: {
    onReload?: () => void;
}): DiagramError {
    const diagramError = new DiagramError();
    host.innerHTML = '';
    diagramError.attach(host);
    diagramError.on('reload', () => options?.onReload?.());
    return diagramError;
}
