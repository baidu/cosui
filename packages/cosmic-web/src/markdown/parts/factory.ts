import {Component} from 'san';

export function sanToCustomElement(
    tagName: string,
    SanComponent: new (option: Record<string, any>) => Component
) {
    class Element extends HTMLElement {
        constructor() {
            super();
            const data: Record<string, any> = {};
            this.getAttributeNames().forEach(name => {
                data[name] = this.getAttribute(name);
            });
            const instance = new SanComponent({data});
            instance.attach(this);
        }
    }
    customElements.define(tagName, Element);
}

// // 驼峰 转 camel
// function toHyphenate(str: string){
//     var reg=/\B([A-Z])/g;
//     return str.replace(reg,"-$1").toLowerCase();
// }
