import {EditorView, ViewUpdate} from '@codemirror/view';
import {basicSetup} from 'codemirror';
import {markdown} from '@codemirror/lang-markdown';
import {EditorState} from '@codemirror/state';
import {githubLight} from '@uiw/codemirror-theme-github';

export default class MarkdownEditor extends HTMLElement {
    state: EditorState;
    view: EditorView;

    /**
     * 构造函数，用于创建一个新的富文本编辑器实例。
     *
     * @param root 可选，ShadowRoot或HTMLElement类型，默认值为undefined。如果传入了root参数，则将编辑器挂载到该元素上；否则，将在body中创建一个div元素作为编辑器容器。
     * @param doc 可选，字符串类型，默认值为''。指定要加载的HTML内容，如果不传入任何内容，则会使用一个空的div元素。
     *
     * @throws 无异常抛出。
     */
    constructor(private readonly root?: ShadowRoot | HTMLElement, doc: string = '') {
        super();

        // 初始化编辑器
        this.initializeEditor(doc);
        // 设置编辑器的样式
        this.setEditorStyle();
    }

    /**
     * @description 初始化编辑器，并监听更新事件
     * @param {string} doc 要显示的文本内容
     */
    initializeEditor(doc: string) {
        const onUpdate = EditorView.updateListener.of((v: ViewUpdate) => {
            if (v.docChanged) {
                const event = new CustomEvent('change', {
                    detail: v.state.doc.toString()
                });
                this.dispatchEvent(event);
            }
        });

        this.state = EditorState.create({
            doc,
            extensions: [githubLight, basicSetup, markdown(), onUpdate]
        });

        this.view = new EditorView({
            state: this.state,
            parent: this,
            root: this.root as ShadowRoot || this.shadowRoot || window.document
        });
    }

    /**
     * @description 更新文档内容
     * @param {string} doc 需要更新的文本内容
     */
    update(doc: string) {
        this.view.dispatch({changes: {
            from: 0,
            to: this.view.state.doc.length,
            insert: doc
        }});
    }

    /**
     * 获取当前文档内容
     *
     * @returns {string} 返回字符串类型的文档内容
     */
    doc() {
        return this.view.state.doc.toString();
    }

    /**
     * @description 设置编辑器样式，包括 z-index、margin-left 和 width。
     * margin-left 的值为 navigation wrapper 的宽度加一，用于避免导航栏与编辑器重叠。
     * width 的值为 content wrapper 的宽度，用于调整编辑器的大小。
     * 如果 navigation wrapper 或 content wrapper 未找到，则会在控制台输出警告信息。
     *
     * @returns {void} 无返回值，直接修改了组件的样式。
     */
    setEditorStyle() {
        this.style.zIndex = '100';

        const navWrapper = document.querySelector('.web-navigation-wrapper');
        if (navWrapper) {
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const {width} = entry.contentRect;
                    this.style.marginLeft = `${width + 1}px`;
                }
            });
            resizeObserver.observe(navWrapper);
        }
        else {
            console.warn('Navigation wrapper not found');
        }

        const contentWrapper = document.querySelector('.web-content-wrapper');
        if (contentWrapper) {
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const {width} = entry.contentRect;
                    this.style.width = `${width}px`;
                }
            });
            resizeObserver.observe(contentWrapper);
        }
        else {
            console.warn('Content wrapper not found');
        }
    }
}
customElements.define('co-md-editor', MarkdownEditor);
