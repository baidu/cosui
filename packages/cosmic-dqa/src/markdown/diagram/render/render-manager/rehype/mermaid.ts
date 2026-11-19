/**
 * rehype 插件：识别 ```mermaid 代码块，替换为占位容器。
 *
 * 只产占位 hast，**同步返回**，不做任何异步渲染。
 * 真实渲染延后到 unified 管道完成、innerHTML 写入 DOM 之后，
 * 由 renderer/render-diagrams.ts 扫描 .diagram-outer 容器并派发到对应渲染器。
 */

import {createRehypeDiagramPlugin} from './utils';
import {isMermaidSupported} from '../../mermaid';

export const rehypeMermaid = createRehypeDiagramPlugin({
    targetLang: 'mermaid',
    className: 'mermaid-container',
    canIUse: isMermaidSupported
});
