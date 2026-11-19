import DiagramRendering from './index';

function removeDiagramRendering(component: DiagramRendering) {
    return component.detach();
}

export function attachDiagramRendering(host: HTMLElement) {
    const cmp = new DiagramRendering();
    host.innerHTML = '';
    cmp.attach(host);
    return () => removeDiagramRendering(cmp);
}
