import {classDiagramTheme} from './classDiagram';
import {defaultMermaidTheme} from './default';
import {erDiagramTheme} from './erDiagram';
import {flowchartTheme} from './flowchart';
import {ganttTheme} from './gantt';
import {journeyTheme} from './journey';
import {mindmapTheme} from './mindmap';
import {sequenceDiagramTheme} from './sequenceDiagram';
import {stateDiagramTheme} from './stateDiagram';
import type {MermaidThemeConfig} from './types';

export type {MermaidThemeConfig};
export {defaultMermaidTheme};

export const mermaidThemeByType: Record<string, MermaidThemeConfig> = {
    flowchart: flowchartTheme,
    graph: flowchartTheme,
    mindmap: mindmapTheme,
    sequenceDiagram: sequenceDiagramTheme,
    classDiagram: classDiagramTheme,
    stateDiagram: stateDiagramTheme,
    erDiagram: erDiagramTheme,
    gantt: ganttTheme,
    journey: journeyTheme,
    timeline: defaultMermaidTheme,
    pie: defaultMermaidTheme,
    quadrantChart: defaultMermaidTheme,
    xyChart: defaultMermaidTheme,
    requirementDiagram: defaultMermaidTheme,
    gitGraph: defaultMermaidTheme,
    c4Diagram: defaultMermaidTheme,
    sankey: defaultMermaidTheme,
    block: defaultMermaidTheme,
    packet: defaultMermaidTheme,
    architecture: defaultMermaidTheme,
    radar: defaultMermaidTheme,
    treemap: defaultMermaidTheme,
    kanban: defaultMermaidTheme
};
