import {mermaidThemeByType} from './theme';

function getMermaidType(code = '') {
    const firstLine = code
        .split('\n')
        .map(line => line.trim())
        .find(line => line && !line.startsWith('%%')) || '';
    const [type] = firstLine.split(/\s+/);

    return type;
}

// 支持流式输出场景的贪心匹配，找到最长匹配的类型前缀
function matchMermaidType(partialType: string) {
    if (!partialType) {
        return undefined;
    }

    // 按长度降序排列，确保匹配到最长前缀
    const knownTypes = [
        'flowchart',
        'graph',
        'sequenceDiagram',
        'classDiagram',
        'stateDiagram',
        'erDiagram',
        'gantt',
        'journey',
        'mindmap',
        'timeline',
        'pie',
        'requirementDiagram'
    ].sort((a, b) => b.length - a.length);

    return knownTypes.find(type => type.startsWith(partialType) || partialType.startsWith(type));
}

// 异步从 theme/index.ts 加载主题配置，同时返回匹配到的图表类型
export async function getMermaidTheme(code?: string) {
    const partialType = getMermaidType(code);
    const type = matchMermaidType(partialType);
    if (!type) {
        return undefined;
    }
    return {type, theme: mermaidThemeByType[type]};
}
