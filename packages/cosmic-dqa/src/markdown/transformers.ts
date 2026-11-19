/*
 * Copyright (c) Baidu, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {MdastNode, HastNode} from './interface';
import {
    CLASS_NAME_DIAGRAM,
    CLASS_NAME_DIAGRAM_BODY,
    CLASS_NAME_DIAGRAM_CODE_VIEW,
    CLASS_NAME_DIAGRAM_HEADER,
    CLASS_NAME_DIAGRAM_MAIN,
    CLASS_NAME_DIAGRAM_VIEW,
    CLASS_NAME_DIAGRAM_WRAPPER,
    DiagramLang,
    DiagramLangAlias,
    DiagramViewMode
} from './diagram/utils/const';
import {buildDiagramHast} from './diagram/utils/diagram-hast';
import type {DiagramHastNode} from './diagram/utils/diagram-hast';
import {getDiagramTypeName} from './diagram/utils/diagram-type';

// 图表代码块语言（含中文别名）。服务端命中这些语言时直接占位成图表盒子，
// 避免 SSR 首屏把图表画成高亮代码块、客户端重渲染再替换成图表造成闪烁。
const DIAGRAM_LANGS = new Set<string>([
    DiagramLang.mermaid,
    DiagramLang.markmap,
    DiagramLang.mindmap,
    ...Object.keys(DiagramLangAlias)
]);

// canonical 语言 → 占位盒子的容器类（决定首屏预留宽高比）
const DIAGRAM_CONTAINER_CLASS: Record<string, string> = {
    [DiagramLang.mermaid]: 'mermaid-container',
    [DiagramLang.mindmap]: 'mindmap-container',
    [DiagramLang.markmap]: 'markmap-container'
};

// 代码块语言 → 渲染器 canonical 语言（供 data-lang 派发）。
function toCanonicalDiagramLang(lang: string): string {
    if (lang === DiagramLang.mermaid || lang === DiagramLang.markmap || lang === DiagramLang.mindmap) {
        return lang;
    }
    return (DiagramLangAlias as Record<string, string>)[lang] || lang;
}

// 折叠阈值：折叠态锁定的纯内容区（.code-right）高度 448px = 28px 行高 × 16 行，不含 wrapper 的上下 padding。
// 超过才折叠。每次展开步进见 pc/index.ts（448 * 2）。
// 与 pc/index.ts 运行时测高逻辑及 code.less 的 max-height 保持一致。
export const CODE_FOLD_MAX_HEIGHT = 448;

export function getLanguage(node: HastNode) {
    const list = node.properties?.className;

    if (!Array.isArray(list)) {
        return 'text';
    }

    return list
        .filter(item => item.startsWith('language-'))
        .map(item => item.substring(9))[0] || '';
}

/**
 * 解析代码围栏 language 后面的配置项，形如 ```java {lineNumbers=false} 中的 `{lineNumbers=false}`。
 * marklang 会把这段元信息挂到 code 节点的 data.meta 上。
 * 支持 `key=value`（value 为 true/false 时转成布尔值）以及裸 `key`（等价于 key=true）。
 * 注意：优先级低于外侧全局 code 配置，仅在全局未显式设置对应项时生效。
 */
export function parseCodeMeta(meta?: string): Record<string, string | boolean> {
    const result: Record<string, string | boolean> = {};
    if (!meta) {
        return result;
    }
    // 取出 {...} 内的内容，没有花括号时直接解析整串
    const braceMatch = /\{([^}]*)\}/.exec(meta);
    const raw = braceMatch ? braceMatch[1] : meta;
    raw
        .split(/[\s,]+/)
        .filter(Boolean)
        .forEach(pair => {
            const [key, value] = pair.split('=');
            if (!key) {
                return;
            }
            if (value === undefined) {
                result[key] = true;
                return;
            }
            if (value === 'true' || value === 'false') {
                result[key] = value === 'true';
                return;
            }
            result[key] = value;
        });
    return result;
}

function getLineNumbers(node?: HastNode) {
    let lineNumber = 0;
    if (!node) {
        return 0;
    }
    if (node.type === 'text' && node.value && node.value.includes('\n')) {
        lineNumber += node.value.split('\n').length - 1;
    }
    if (node.type === 'element' && node.children) {
        node.children.forEach(childNode => {
            lineNumber += getLineNumbers(childNode);
        });
    }
    return lineNumber;
}

function createTextNode(value: string) {
    return {
        type: 'text',
        value
    } as HastNode;
}

function createElement(
    tagName: string,
    className?: string[],
    children: HastNode[] = [],
    properties: Record<string, unknown> = {}
) {
    return {
        type: 'element',
        tagName,
        properties: {className, ...properties},
        children
    } as HastNode;
}

/**
 * 把图表代码块（pre > code）包成 el-markdown-diagram 占位盒子（图表视图为空、代码视图隐藏）。
 * 仅服务端调用：让 SSR 首屏直接呈现图表盒子而非高亮代码块。
 * 能力检测（isMermaidSupported）与真实 SVG 渲染都交给客户端重渲染，这里只产占位结构。
 * 盒子宽高比由各端 CSS 决定（diagram/index.pc.less / index.mobile.less），首屏与客户端重渲染一致。
 */
/** 递归收集 hast 节点下的纯文本（用于从占位 pre 取出图表源码以解析子类型） */
function collectHastText(node: HastNode): string {
    if (!node) {
        return '';
    }
    if (node.type === 'text') {
        return node.value || '';
    }
    return (node.children || []).map(child => collectHastText(child)).join('');
}

function buildDiagramPlaceholder(
    lang: string,
    originalPre: HastNode
): HastNode {
    const canonical = toCanonicalDiagramLang(lang);
    const containerClass = DIAGRAM_CONTAINER_CLASS[canonical] ?? DIAGRAM_CONTAINER_CLASS[DiagramLang.markmap];

    return buildDiagramHast({
        rootClassName: [CLASS_NAME_DIAGRAM],
        wrapperClassName: [CLASS_NAME_DIAGRAM_WRAPPER],
        viewClassName: [CLASS_NAME_DIAGRAM_VIEW],
        headerClassName: [CLASS_NAME_DIAGRAM_HEADER],
        bodyClassName: [CLASS_NAME_DIAGRAM_BODY],
        mainClassName: [CLASS_NAME_DIAGRAM_MAIN, containerClass],
        codeViewClassName: [CLASS_NAME_DIAGRAM_CODE_VIEW],
        headerText: lang,
        lang: canonical,
        // 子类型中文名：SSR 占位虽会被客户端整体替换，但首屏扫描（如业务打点）可能先读到这份，
        // 故一并写上 data-type；体积仅一个短中文串，远小于 data-raw。
        type: getDiagramTypeName({lang: canonical, raw: collectHastText(originalPre)}),
        viewMode: DiagramViewMode.diagram,
        // data-raw 不写：代码已在隐藏的代码视图 pre 里存了一份，客户端重渲染会以源
        // markdown 重新生成正确的 data-raw，SSR 这份 host 会被整体替换、从不被读取，
        // 再塞一份 raw 纯属 HTML 体积浪费。
        codeViewHidden: true,
        codeNode: originalPre as DiagramHastNode
    }) as HastNode;
}

export function getTransformers() {
    return {
        mdast: {
            link: ({node}: { node: MdastNode }) => {
                if (!node.data) {
                    node.data = {};
                }
                if (!node?.data?.hProperties) {
                    node.data.hProperties = {};
                }
                const properties = node.data?.hProperties as Record<string, unknown>;
                if (node.url) {
                    properties['rl-type'] = 'stop';
                }
                if (properties && ['img', 'agent'].includes(properties.type as string) && properties.src) {
                    properties.style = `--marklang-link-img: url(${properties.src})`;
                }
            }
        },
        hast: {
            table: ({
                node,
                index,
                parent
            }: { node: HastNode, index: number, parent: HastNode }) => {
                // @ts-ignore
                const table = this.data.get('table');
                if (!table || !node.children?.length) {
                    return node;
                }

                const {copy, fullscreen, download} = table;
                const headerIconsNodes: HastNode[] = [];

                if (copy) {
                    // eslint-disable-next-line max-len
                    headerIconsNodes.push(createElement('i', ['cos-icon cos-icon-copy'], []));
                }
                if (download) {
                    // eslint-disable-next-line max-len
                    headerIconsNodes.push(createElement('i', ['cos-icon cos-icon-download'], []));
                }
                if (fullscreen) {
                    // eslint-disable-next-line max-len
                    headerIconsNodes.push(createElement('i', ['cos-icon cos-icon-full-screen'], []));
                }

                const leftNode = createElement('span', ['cosd-markdown-table-header-left'], [createTextNode('表格')]);
                const rightNode = createElement('span', ['cosd-markdown-table-header-right'], headerIconsNodes);
                const headerNode = createElement('div', ['cosd-markdown-table-header'], [leftNode, rightNode]);
                const newTableNode = createElement('div', ['cosd-markdown-table'], [headerNode, node]);
                if (parent.children) {
                    parent.children[index] = newTableNode;
                }
            },
            /**
             * 代码块增加头部：语言+复制按钮+放大按钮
             */
            pre: ({node, index, parent}: {node: HastNode, index?: number, parent?: HastNode}) => {
                if (!node.children?.length) {
                    return node;
                }
                // @ts-ignore
                const globalCode = this.data.get('code') || {};

                const codeIndex = node.children.findIndex(preItem =>
                    preItem.type === 'element' && preItem.tagName === 'code'
                );
                if (codeIndex === -1) {
                    return node;
                }

                const codeNode = node.children[codeIndex];
                const lang = getLanguage(codeNode);

                // 服务端：图表类型代码块直接占位成 el-markdown-diagram 盒子，避免 SSR 首屏
                // 把图表画成高亮代码块、客户端重渲染再替换造成「先 pre code 再闪成图表」。
                // 占位结构仍含隐藏的代码视图 pre，使客户端 hasPreCode 命中重渲染路径，
                // 由带 diagram 插件的客户端重渲染补齐真实 SVG；首屏不再出现代码块形态。
                // 客户端（typeof window !== 'undefined'）此处只会遇到已被 rehype 占位后、
                // 代码视图内的嵌套 pre，不应再次占位，故仅服务端生效。
                const isServer = typeof window === 'undefined';
                // 添加 diagram 开关门控：未启用 diagram 的业务不应转换图表代码块为占位，
                // 否则会导致：1) SSR 首屏被替换成空占位盒子；2) 客户端无法渲染，翻回代码块（闪烁）；
                // 3) 纯 SSR 场景丢失代码块内容。门控确保回归安全。
                // @ts-ignore this is from San component context
                const diagramEnabled = this.data.get('diagram');
                if (isServer && DIAGRAM_LANGS.has(lang) && diagramEnabled && parent?.children && index !== undefined) {
                    parent.children[index] = buildDiagramPlaceholder(lang, node);
                    return;
                }

                // 代码围栏 language 后面的配置项（如 ```java {lineNumbers=false}）。
                // 围栏配置优先级更高：围栏显式设置时以围栏为准，否则回退到全局 code 配置，最后取默认值。
                const meta = parseCodeMeta(codeNode.data?.meta);
                const resolveFlag = (
                    key: 'lineNumbers' | 'fullscreen' | 'foldable' | 'scrollable' | 'wrap',
                    defaultValue: boolean
                ) => {
                    if (typeof meta[key] === 'boolean') {
                        return meta[key] as boolean;
                    }
                    if (typeof globalCode[key] === 'boolean') {
                        return globalCode[key] as boolean;
                    }
                    return defaultValue;
                };
                const lineNumbers = resolveFlag('lineNumbers', true);
                // 无行号即引用块
                const isQuote = !lineNumbers;
                const fullscreen = resolveFlag('fullscreen', false);
                const scrollable = resolveFlag('scrollable', false);
                // wrap 仅控制无行号纯文本；有行号时保持现有不换行行为，避免行号与代码行错位。
                const wrap = resolveFlag('wrap', true);
                // scrollable 与 foldable 互斥，scrollable 优先：滚动块自身定高，不再挂折叠
                const foldable = !scrollable && resolveFlag('foldable', false);

                // 添加行号
                const lineNumberNodes: HastNode[] = [];
                let lineIndex = 1;
                codeNode.children?.forEach(item => {
                    const lineCount = getLineNumbers(item);
                    if (lineNumbers) {
                        for (let i = 0; i < lineCount; i++) {
                            lineNumberNodes.push({
                                type: 'element',
                                properties: {
                                    'data-line-number': lineIndex++,
                                    className: ['code-number']
                                },
                                tagName: 'div',
                                children: []
                            });
                        }
                    }
                });

                // 构建header
                const headerButtons: HastNode[] = [
                    createElement('i', ['cos-icon', 'cos-icon-copy'])
                ];
                if (fullscreen) {
                    headerButtons.push(createElement('i', ['cos-icon', 'cos-icon-full-screen']));
                }

                const headerNode = createElement('div', ['code-header'], [
                    createElement('span', ['code-header-left'], [createTextNode(lang)]),
                    createElement('span', ['code-header-right'], headerButtons)
                ]);

                // 包装代码节点
                const wrapperChildren: HastNode[] = lineNumbers
                    ? [
                        createElement('div', ['code-left'], lineNumberNodes),
                        createElement('div', ['code-right'], [codeNode])
                    ]
                    : [createElement('div', ['code-right'], [codeNode])];
                node.children[codeIndex] = createElement('div', ['code-wrapper'], wrapperChildren);
                node.children.unshift(headerNode);

                // 引用块（无行号纯文本，如原文/译文/关系图）打标记类，供业务层区分「引用」与「代码」日志。
                if (isQuote) {
                    const existingClass = (node.properties?.className as string[]) || [];
                    node.properties = {
                        ...(node.properties || {}),
                        className: [...existingClass, 'cosd-markdown-code-quote']
                    };
                }

                // 定高滚动块标记类，样式见 pc/index.less。由围栏/全局 code 的 scrollable 决定，与语言无关。
                if (scrollable) {
                    const existingClass = (node.properties?.className as string[]) || [];
                    node.properties = {
                        ...(node.properties || {}),
                        className: [...existingClass, 'cosd-markdown-code-scrollable']
                    };
                }

                // 无行号场景（如原文引用纯文本）统一使用 plain 样式；
                // wrap=false 时额外挂 nowrap，仅覆盖 plain 的自动换行规则。
                if (!lineNumbers) {
                    const existingClass = (node.properties?.className as string[]) || [];
                    const plainClass = [
                        ...existingClass,
                        'cosd-markdown-code-plain',
                        ...(wrap ? [] : ['cosd-markdown-code-nowrap'])
                    ];
                    node.properties = {
                        ...(node.properties || {}),
                        className: plainClass
                    };
                }

                // 折叠逻辑改为运行时按真实高度判定（见 pc/index.ts reconcileCollapsibleCode）：
                // 构建期无法拿到 DOM 高度，纯文本自动换行后的视觉高度更是无法静态估算，
                // 因此这里不再预判折叠，只保留 foldable 标记类，交给运行时测高决定是否折叠+挂按钮。
                if (foldable) {
                    const existingClass = (node.properties?.className as string[]) || [];
                    node.properties = {
                        ...(node.properties || {}),
                        className: [...existingClass, 'cosd-markdown-code-foldable']
                    };
                }

                return node;
            }
        }
    };
}
