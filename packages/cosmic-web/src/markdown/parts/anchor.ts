export class MarkdownAnchor extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('click', () => {
            const doc: HTMLElement = this.getRootNode() as HTMLElement || document;
            const dom = doc.querySelector('#' + this.innerText);
            if (dom) {
                const rect = dom.getBoundingClientRect();
                const offset = 65;
                window.scroll({
                    top: rect.top - offset,
                    behavior: 'smooth'
                });
            }
        });
    }
}

customElements.define('md-a', MarkdownAnchor);