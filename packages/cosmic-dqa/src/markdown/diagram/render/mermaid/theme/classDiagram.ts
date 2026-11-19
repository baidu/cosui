import {commonThemeVariables, customThemeVariables} from './common';
import type {MermaidThemeConfig} from './types';

export const classDiagramTheme: MermaidThemeConfig = {
    theme: 'base',
    themeVariables: commonThemeVariables,
    themeCSS: `
    /* 类图表格与类节点主体 */
    .classGroup rect,
    .classGroup .outer,
    .classGroup .divider {
      fill: ${commonThemeVariables.primaryColor} !important;
      stroke: ${commonThemeVariables.primaryBorderColor} !important;
      rx: ${customThemeVariables.borderRadius} !important;
      ry: ${customThemeVariables.borderRadius} !important;
    }

    /* 类图类名、属性、方法等文本 */
    .classGroup text,
    .classLabel,
    .classText,
    .label {
      fill: ${commonThemeVariables.primaryTextColor} !important;
      color: ${commonThemeVariables.primaryTextColor} !important;
      font-size: ${commonThemeVariables.fontSize} !important;
    }

    /* 类图关系连接线 */
    .relation,
    .edgePath .path,
    .flowchart-link {
      stroke: ${customThemeVariables.lineColor} !important;
    }

    /* 类图关系箭头与端点标记 */
    .marker,
    .arrowheadPath,
    marker path {
      fill: ${customThemeVariables.lineColor} !important;
      stroke: ${customThemeVariables.lineColor} !important;
    }

    /* 类图关系辅助信息，如关系名称、多重性等标签 */
    .edgeLabel,
    .edgeLabel .label,
    .edgeLabel foreignObject,
    .edgeLabel span,
    .edgeLabel p {
      background-color: ${customThemeVariables.edgeLabelBackground} !important;
      color: ${commonThemeVariables.primaryTextColor} !important;
    }

    /* 类图关系标签背景矩形（labelBkg） */
    .labelBkg,
    .edgeLabel rect {
      fill: ${customThemeVariables.edgeLabelBackground} !important;
      stroke: none !important;
    }
  `
};
