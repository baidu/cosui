import {commonThemeVariables, customThemeVariables} from './common';
import type {MermaidThemeConfig} from './types';

export const stateDiagramTheme: MermaidThemeConfig = {
    theme: 'base',
    themeVariables: commonThemeVariables,
    themeCSS: `
    /* 状态图节点主体 */
    .stateGroup rect,
    .stateGroup circle,
    .stateGroup polygon,
    .stateGroup .state-start,
    .stateGroup .state-end {
      fill: ${commonThemeVariables.primaryColor} !important;
      stroke: ${commonThemeVariables.primaryBorderColor} !important;
      rx: ${customThemeVariables.borderRadius} !important;
      ry: ${customThemeVariables.borderRadius} !important;
    }

    /* 状态图节点文本 */
    .stateGroup text,
    .stateLabel,
    .label {
      fill: ${commonThemeVariables.primaryTextColor} !important;
      color: ${commonThemeVariables.primaryTextColor} !important;
      font-size: ${commonThemeVariables.fontSize} !important;
    }

    /* 状态图状态迁移连接线 */
    .transition,
    .edgePath .path,
    .flowchart-link {
      stroke: ${customThemeVariables.lineColor} !important;
    }

    /* 状态图箭头与端点标记 */
    .marker,
    .arrowheadPath,
    marker path {
      fill: ${customThemeVariables.lineColor} !important;
      stroke: ${customThemeVariables.lineColor} !important;
    }

    /* 状态图迁移辅助信息，如条件、事件等标签 */
    .edgeLabel,
    .edgeLabel .label,
    .edgeLabel foreignObject,
    .edgeLabel span,
    .edgeLabel p {
      background-color: ${customThemeVariables.edgeLabelBackground} !important;
      color: ${commonThemeVariables.primaryTextColor} !important;
    }
  `
};
