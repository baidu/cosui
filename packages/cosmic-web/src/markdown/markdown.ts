import $style from './markdown.less?inline';
import MarkdownEditor from './editor';
import MarkdownArtical from './artical';
import './parts';

export default class Markdown extends HTMLElement {
    root: HTMLDivElement;
    artical: MarkdownArtical;
    editor: MarkdownEditor;

    /**
     * @description 构造函数，创建MarkdownArtical组件的实例。
     * 在创建实例时，会将组件挂载到shadow DOM中，并添加必要的样式和工具条。
     * 同时，会更新组件的内容，使其与属性中的值一致。
     *
     * @returns {void} 无返回值，直接修改组件的DOM结构和样式。
     */
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'co-md-wrapper');
        this.root = wrapper;
        this.artical = new MarkdownArtical();
        this.updateArtical(this.getAttribute('value') || '');

        const style = document.createElement('style');
        style.textContent = $style;
        shadow.appendChild(style);

        this.root.appendChild(this.artical);

        shadow.appendChild(wrapper);
    }

    /**
     * @static
     * @returns {string[]}
     * 返回一个包含两个属性名的字符串数组，分别是'value'和'editable'。
     * 'value'表示文本框中显示的值，'editable'表示文本框是否可编辑。
     */
    static get observedAttributes() {
        return ['value', 'editable'];
    }

    /**
     * @method attributeChangedCallback
     * @param {string} name 属性名称
     * @param {string} oldValue 旧值
     * @param {string} newValue 新值
     * @description 当属性值发生变化时，调用此方法进行处理
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue && name === 'value') {
            this.updateArtical(newValue);
            this.updateEditor(newValue);
        }
    }


    /**
     * @description 更新文章内容
     * @param {string} markdownString 文章的Markdown字符串
     */
    updateArtical(markdownString: string) {
        this.artical.update(markdownString);
    }
    /**
     * @description 更新编辑器中的内容
     * @param {string} markdownString 要更新的 Markdown 字符串
     */
    updateEditor(markdownString: string) {
        if (this.editor) {
            this.editor.update(markdownString);
        }
    }
    /**
     * @description 显示编辑器，如果没有创建编辑器则先创建一个
     * @returns {void} 无返回值
     */
    showEditor() {
        if (!this.editor) {
            const markdownString = this.getAttribute('value') || '';
            this.editor = new MarkdownEditor(this.shadowRoot as ShadowRoot, markdownString);
            this.editor.classList.add('co-site-markdown-editor');
            this.root.appendChild(this.editor);
            this.editor.addEventListener('change', e => {
                this.onChange((e as CustomEvent).detail);
            });
        }
        this.editor.style.display = 'block';
    }
    /**
     * 隐藏编辑器
     *
     * @returns void
     */
    hideEditor() {
        if (this.editor) {
            this.editor.style.display = 'none';
        }
    }
    /**
     * onChange
     *
     * 当Markdown字符串发生变化时，调用此函数更新文章内容。
     *
     * @param markdownString Markdown字符串
     */
    onChange(markdownString: string) {
        this.updateArtical(markdownString);
    }
}

customElements.define('co-md', Markdown);
