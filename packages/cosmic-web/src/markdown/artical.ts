import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';

export default class MarkdownArtical extends HTMLElement {
    unified: any;
    private content = document.createElement('div');
    constructor() {
        super();
        this.unified = unified()
            .use(remarkParse) // 将markdown转换成语法树
            .use(remarkRehype, {allowDangerousHtml: true}) // 将markdown语法树转换成html语法树，转换之后就可以使用rehype相关的插件
            .use(rehypeRaw)
            .use(rehypeSlug)
            .use(rehypeStringify);

        this.append(this.content);
    }

    update(markdownString: string) {
        this.unified.process(markdownString).then(
            (file: string) => {
                // bca-disable-line
                this.content.innerHTML = file.toString();
                // 派发设置标题锚点的事件
                const event = new CustomEvent('update-headings', {
                    bubbles: true,
                    composed: true
                });
                this.dispatchEvent(event);
            },
            (error: Error) => {
                throw error;
            }
        );
    }
}

customElements.define('co-md-artical', MarkdownArtical);
