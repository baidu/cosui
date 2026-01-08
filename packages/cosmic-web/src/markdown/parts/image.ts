export class MarkdownImage extends HTMLElement {
    constructor() {
        super();
        const attrs = this.getAttributeNames();
        const img = document.createElement('img');
        attrs.forEach(attr => {
            if (this.getAttribute(attr) !== null) {
                img.setAttribute(attr, this.getAttribute(attr) || '');
            }
        });
        this.appendChild(img);
    }
}

customElements.define('md-img', MarkdownImage);
