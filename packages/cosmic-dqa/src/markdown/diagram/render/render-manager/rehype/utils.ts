/**
 * rehype 图表插件工具函数。
 *
 * 提供统一的能力来识别 markdown 中的特定语言代码块（如 ```mermaid / ```markmap），
 * 并将其 hast 节点替换为自定义的占位容器，以便后续在 DOM 阶段异步渲染。
 */

import {
    CLASS_NAME_DIAGRAM,
    CLASS_NAME_DIAGRAM_BODY,
    CLASS_NAME_DIAGRAM_CODE_VIEW,
    CLASS_NAME_DIAGRAM_MAIN,
    CLASS_NAME_DIAGRAM_HEADER,
    CLASS_NAME_DIAGRAM_VIEW,
    CLASS_NAME_DIAGRAM_WRAPPER,
    DiagramViewMode,
    DIRECTIVE_NAME_DIAGRAM
} from '../../../utils/const';
import {buildDiagramHast} from '../../../utils/diagram-hast';
import type {DiagramHastNode} from '../../../utils/diagram-hast';
import {getDiagramTypeName} from '../../../utils/diagram-type';
import {getCustomClassName, getParams} from '../params';
import type {RehypeOptions} from './types';

interface HastElement {
    type: string;
    tagName?: string;
    value?: string;
    properties?: Record<string, unknown>;
    children?: HastElement[];
    position?: {
        start: {offset: number};
        end: {offset: number};
    };
}

type Element = HastElement & {
    type: 'element';
    tagName: string;
};

export interface Root {
    type: 'root';
    children: HastElement[];
}

/**
 * 最小化 unified / vfile 类型：这两个包不是 cosmic-dqa 的依赖（由消费方的 marklang 提供），
 * 仅在类型层使用，直接 import 会 resolve 失败，故按实际用到的结构就地声明。
 */
interface VFileLike {
    toString: () => string;
}

type UnifiedPlugin = () => (tree: Root, file: VFileLike) => void;

/**
 * 最小化 hast 遍历（替代 unist-util-visit，去掉对外部包的运行时依赖，
 * 避免消费方 resolve 失败）。
 * 语义对齐：对每个 type 命中的节点调用 visitor(node, index, parent)，
 * 并始终递归进入被访问节点“原始的” children（即使 visitor 替换了 parent.children[index]）。
 */
function visit(
    tree: Root,
    type: string,
    visitor: (
        node: Element,
        index: number | undefined,
        parent: {children: HastElement[]} | undefined
    ) => void
): void {
    const walk = (
        node: HastElement,
        index: number | undefined,
        parent: {children: HastElement[]} | undefined
    ) => {
        if (node.type === type) {
            visitor(node as Element, index, parent);
        }
        const children = node.children;
        if (Array.isArray(children)) {
            for (let i = 0; i < children.length; i++) {
                walk(children[i], i, node as unknown as {children: HastElement[]});
            }
        }
    };
    walk(tree as unknown as HastElement, undefined, undefined);
}


/** 判断 hast 节点是否为 `<pre><code class="language-{targetLang}">` 结构，即该节点
 *  是否属于当前插件要处理的代码块 */
export function isTargetLangCode(node: Element, targetLang: string): boolean {
    if (node.tagName !== 'pre' || !node.children || node.children.length !== 1) {
        return false;
    }
    const code = node.children[0];
    if (code.type !== 'element' || code.tagName !== 'code') {
        return false;
    }
    const cls = (code.properties?.className as string[] | undefined) ?? [];
    return cls.includes(`language-${targetLang}`);
}

/**
 * 从 `<pre>` 节点提取代码块原始文本。
 *
 * 利用 VFile 原始源码 + code 节点的 position offset 切片，
 * 保留用户书写时的缩进和换行，避免 hast 文本节点丢失空白。
 */
export function extractText(preNode: Element, file?: VFileLike): string {
    const code = preNode.children?.[0];
    if (!(code && code.type === 'element' && file && code.position)) {
        return '';
    }
    const src = String(file);
    const {start, end} = code.position;

    return src.slice(start.offset, end.offset);
}

/**
 * 创建 rehype 图表替换插件的工厂函数。
 *
 * 扫描 hast 树中代码语言匹配 `targetLang` 的 `<pre><code>` 节点，
 * 将其替换为 `<div class="{hashedClassName}" data-lang data-raw>` 占位容器。
 * 后续渲染器通过 `data-raw` 取得原始代码文本进行异步渲染。
 */
export function createRehypeDiagramPlugin({
    targetLang,
    renderLang,
    className,
    canIUse
}: RehypeOptions): UnifiedPlugin {
    // data-lang 用 canonical 语言（供渲染器派发）；
    // targetLang 仅用于匹配代码块与头部展示（可为中文别名）。
    const lang = renderLang ?? targetLang;
    return () => (tree: Root, file: VFileLike) => {
        visit(tree, 'element', (
            node: Element,
            index: number | undefined,
            parent: {children: HastElement[]} | undefined
        ) => {
            if (!isTargetLangCode(node, targetLang) || index == null || !parent) {
                return;
            }

            const raw = extractText(node, file);
            if (!parent || !('children' in parent) || !Array.isArray(parent.children)) {
                return;
            }
            if (canIUse && !canIUse()) {
                console.warn('[diagram] 不支持当前环境，降级为代码块显示');
                return;
            }
            const {viewMode} = getParams() ?? {};
            const isCodeView = viewMode === DiagramViewMode.code;
            parent.children[index] = buildDiagramHast({
                rootClassName: [CLASS_NAME_DIAGRAM, getCustomClassName(DIRECTIVE_NAME_DIAGRAM)],
                wrapperClassName: [
                    CLASS_NAME_DIAGRAM_WRAPPER,
                    getCustomClassName(CLASS_NAME_DIAGRAM_WRAPPER)
                ],
                viewClassName: [
                    CLASS_NAME_DIAGRAM_VIEW,
                    getCustomClassName(CLASS_NAME_DIAGRAM_VIEW)
                ],
                headerClassName: [
                    CLASS_NAME_DIAGRAM_HEADER,
                    getCustomClassName(CLASS_NAME_DIAGRAM_HEADER)
                ],
                bodyClassName: [
                    CLASS_NAME_DIAGRAM_BODY,
                    getCustomClassName(CLASS_NAME_DIAGRAM_BODY)
                ],
                mainClassName: [
                    CLASS_NAME_DIAGRAM_MAIN,
                    getCustomClassName(CLASS_NAME_DIAGRAM_MAIN),
                    className,
                    getCustomClassName(className)
                ],
                codeViewClassName: [
                    CLASS_NAME_DIAGRAM_CODE_VIEW,
                    getCustomClassName(CLASS_NAME_DIAGRAM_CODE_VIEW)
                ],
                headerText: targetLang,
                lang,
                // 子类型中文名，写入 data-type
                type: getDiagramTypeName({lang, raw}),
                // 默认使用图表视图
                viewMode: viewMode ?? DiagramViewMode.diagram,
                raw,
                diagramViewHidden: isCodeView,
                codeViewHidden: !isCodeView,
                codeNode: node as DiagramHastNode
            }) as Element;
        });
    };
}
