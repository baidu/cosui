export class MarkdownBanner extends HTMLElement {
    constructor() {
        super();
        const title = this.getAttribute('title') || '';
        const desc = this.getAttribute('desc') || '';
        const source = this.getAttribute('source') || '';
        const frontImage = this.getAttribute('front') || '';
        const backgroundImage = this.getAttribute('background') || '';
        // const backgroundColor = this.getAttribute('backgroundColor') || '';

        const html = `<div
            class="co-md-widget-banner cos-flex cos-items-center cos-justify-between"
            style="background-image: url(${backgroundImage})"
        >
            <div
                class="cos-flex cos-flex-col"
                style="height: 100%; padding-left: 48px; flex-grow: 1;"
            >
                <div class="co-md-widget-banner-title">${title}</div>
                <a
                    href="${source}"
                    target="_blank"
                    class="cos-text-subtitle cos-leading-none cos-space-mt-lg cos-color-text-primary"
                >
                    Figma UIKit
                </a>
                <div class="co-md-widget-banner-desc">${desc}</div>
            </div>
            <div
                class="co-md-widget-banner-example"
                style="background-image: url(${frontImage})"
            />
        </div>`;
        // bca-disable-line
        this.innerHTML = html;
    }
}

customElements.define('md-banner', MarkdownBanner);
