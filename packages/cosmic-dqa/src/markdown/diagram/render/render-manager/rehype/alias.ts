/**
 * rehype 插件：识别中文别名代码块（```流程图 / ```时序图 / ```甘特图 / ```思维导图），
 * 复用对应渲染器。
 *
 * 产品数据产出会用中文标注代码块语言，内容仍是 mermaid / markmap 语法：
 * - 流程图 / 时序图 / 甘特图 —— mermaid 语法，走 mermaid 渲染器
 * - 思维导图 —— markmap 语法，走 markmap 渲染器
 *
 * 这些插件只负责匹配代码块并写入 canonical data-lang；头部展示保留中文别名。
 */

import {DiagramLang} from '../../../utils/const';
import {createRehypeDiagramPlugin} from './utils';
import {isMermaidSupported} from '../../mermaid';
import {isMarkmapSupported} from '../../markmap';

export const rehypeFlowchart = createRehypeDiagramPlugin({
    targetLang: '流程图',
    renderLang: DiagramLang.mermaid,
    className: 'mermaid-container',
    canIUse: isMermaidSupported
});

export const rehypeSequence = createRehypeDiagramPlugin({
    targetLang: '时序图',
    renderLang: DiagramLang.mermaid,
    className: 'mermaid-container',
    canIUse: isMermaidSupported
});

export const rehypeGantt = createRehypeDiagramPlugin({
    targetLang: '甘特图',
    renderLang: DiagramLang.mermaid,
    className: 'mermaid-container',
    canIUse: isMermaidSupported
});

export const rehypeMindMapZh = createRehypeDiagramPlugin({
    targetLang: '思维导图',
    renderLang: DiagramLang.markmap,
    className: 'markmap-container',
    canIUse: isMarkmapSupported
});
