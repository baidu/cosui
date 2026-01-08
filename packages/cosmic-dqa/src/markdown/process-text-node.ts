/**
 * @file 文本节点处理器
 * @description 用于将文本节点按标点符号拆分并包装为 span 元素，便于后续的样式处理和渲染控制
 */

/**
 * 中英文标点符号正则表达式
 * 匹配常见的句末标点和分隔符
 */
const PUNCTUATION_REGEX = /([，。！？；、…!,?])/g;

const IGNORED_CLASS_NAMES = ['cosd-citation'];

/**
 * 文本分段结果接口
 */
interface TextSegment {
    content: string;
    isPunctuation: boolean;
}

/**
 * 按标点符号分割文本并生成分段信息
 * @param text 原始文本内容
 * @returns 文本分段数组
 */
function segmentTextByPunctuation(text: string): TextSegment[] {
    if (!text.trim()) {
        return [];
    }

    const parts = text.split(PUNCTUATION_REGEX);
    const segments: TextSegment[] = [];

    for (const part of parts) {
        if (!part) {
            continue;
        }

        // 重置正则表达式状态以确保正确匹配
        PUNCTUATION_REGEX.lastIndex = 0;
        const isPunctuation = PUNCTUATION_REGEX.test(part);

        segments.push({
            content: part,
            isPunctuation
        });
    }

    return segments;
}

/**
 * 创建包装文本的span元素
 * @param content 文本内容
 * @returns 创建的span元素
 */
function createTextSpan(content: string): HTMLSpanElement {
    const span = document.createElement('span');
    span.textContent = content;
    return span;
}

/**
 * 合并相邻的标点符号和文本段落
 * @param segments 文本分段数组
 * @returns 合并后的分段数组
 */
function mergeAdjacentSegments(segments: TextSegment[]): TextSegment[] {
    const merged: TextSegment[] = [];

    for (let i = 0; i < segments.length; i++) {
        const current = segments[i];
        const next = segments[i + 1];

        if (current && next?.isPunctuation) {
            merged.push({
                content: current.content + next.content,
                isPunctuation: false
            });
            // 跳过下一个元素，因为已经合并了
            i++;
        }
        else {
            merged.push(current);
        }
    }

    return merged;
}

/**
 * 处理单个文本节点，将其按标点符号拆分并包装为span元素
 * @param textNode 要处理的文本节点
 */
function processTextNode(textNode: Text): void {
    const text = textNode.textContent || '';

    if (!text.trim() || !textNode.parentNode) {
        return;
    }

    // 按标点符号分割文本
    const segments = segmentTextByPunctuation(text);

    // 如果没有找到标点符号，直接包装整个文本
    if (segments.length <= 1) {
        const span = createTextSpan(text);
        textNode.parentNode.replaceChild(span, textNode);
        return;
    }

    // 合并相邻的标点符号和文本
    const mergedSegments = mergeAdjacentSegments(segments);

    // 创建文档片段来包含所有新节点
    const fragment = document.createDocumentFragment();

    for (const segment of mergedSegments) {
        if (segment.content.trim()) {
            const span = createTextSpan(segment.content);
            fragment.appendChild(span);
        }
    }
    textNode.parentNode.replaceChild(fragment, textNode);
}

/**
 * 检查节点是否应该被忽略处理
 * @param node 要检查的节点
 * @returns 如果应该被忽略则返回true
 */
function shouldIgnoreNode(node: Node): boolean {
    let parent = node.parentElement;

    while (parent) {
        // 检查是否包含需要忽略的类名
        const className = parent.className;
        if (className && IGNORED_CLASS_NAMES.some(ignoredClass =>
            className.includes(ignoredClass)
        )) {
            return true;
        }

        parent = parent.parentElement;
    }

    return false;
}


/**
 * 收集指定根元素下的所有文本节点
 * @param root 根元素
 * @returns 文本节点数组
 */
function collectTextNodes(root: Element): Text[] {
    const textNodes: Text[] = [];

    // 创建 TreeWalker 来遍历所有文本节点
    const treeWalker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: (node: Node): number => {
                // 检查是否应该忽略此节点
                if (shouldIgnoreNode(node)) {
                    return NodeFilter.FILTER_REJECT;
                }
                // 只处理有实际文本内容的节点
                const text = node.textContent || '';
                return text.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
        }
    );

    // 收集所有需要处理的文本节点
    let currentNode = treeWalker.nextNode() as Text;
    while (currentNode) {
        textNodes.push(currentNode);
        currentNode = treeWalker.nextNode() as Text;
    }

    return textNodes;
}

/**
 * 处理根元素下的所有文本节点
 * @param root 要处理的根元素
 */
function processRootTextNode(root: Element): void {
    // 收集所有需要处理的文本节点
    const textNodes = collectTextNodes(root);

    // 处理每个文本节点
    textNodes.forEach(textNode => {
        processTextNode(textNode);
    });
}

/**
 * 将指定元素数组中的文本节点包装为span元素
 * @param nodes 要处理的元素数组
 * @description 这是主要的导出函数，用于批量处理多个DOM元素中的文本节点
 */
export function wrapTextNodesBySpan(nodes: Element[]): void {
    if (!Array.isArray(nodes)) {
        return;
    }

    if (nodes.length === 0) {
        return;
    }

    nodes.forEach(node => {
        if (!(node instanceof Element)) {
            return;
        }
        processRootTextNode(node);
    });
}