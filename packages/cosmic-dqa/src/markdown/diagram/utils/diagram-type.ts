/**
 * 图表类型解析工具。
 */

import {DiagramLang} from './const';
import {getDefinition} from './definition';
import type {DiagramOptions} from '../types';

/** mermaid 图表英文类型 → 中文名称。 */
const mermaidTypeNameMap: Record<string, string> = {
    flowchart: '流程图',
    graph: '流程图',
    sequenceDiagram: '时序图',
    classDiagram: '类图',
    stateDiagram: '状态图',
    stateDiagramV2: '状态图',
    erDiagram: '实体关系图',
    journey: '旅程图',
    gantt: '甘特图',
    pie: '饼图',
    gitGraph: 'Git 图',
    mindmap: '思维导图',
    timeline: '时间线图',
    quadrantChart: '象限图',
    requirementDiagram: '需求图',
    c4Context: 'C4 架构图',
    sankey: '桑基图',
    xychart: 'XY 图',
    block: '块图',
    packet: '包图',
    architecture: '架构图'
};

/** 从 mermaid 定义文本首关键字解析图表类型（中英文）。 */
function getMermaidDiagramName(definition: string): {en: string, ch: string} {
    const firstLine = definition.split('\n').find(line => line.trim());
    const type = firstLine?.trim().match(/^([a-zA-Z][\w-]*)/)?.[1] || '';
    const name = type.replace(/-beta$/, '').replace('-v2', 'V2');
    return {en: name, ch: mermaidTypeNameMap[name] || ''};
}

/**
 * 解析图表类型中文名，用于随事件抛给业务。
 * - markmap / mindmap → 思维导图
 * - mermaid → 按定义首关键字映射（流程图 / 时序图 / 甘特图 ...），未命中返回 ''
 */
export function getDiagramTypeName(options: {lang?: DiagramOptions['lang'], raw?: string}): string {
    const {lang, raw = ''} = options;
    if (lang === DiagramLang.markmap || lang === DiagramLang.mindmap) {
        return '思维导图';
    }
    if (lang === DiagramLang.mermaid) {
        return getMermaidDiagramName(getDefinition(raw)).ch;
    }
    return '';
}
