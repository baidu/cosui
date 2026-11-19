import {commonThemeVariables, customThemeVariables} from './common';
import type {MermaidThemeConfig} from './types';

export const erDiagramThemeVariables = {
    whiteColor: '#ffffff'
};

export const erDiagramTheme: MermaidThemeConfig = {
    theme: 'base',
    themeVariables: commonThemeVariables,
    themeCSS: `
    /* 实体关系图表格通用圆角 */
    .er.entityBox,
    .er.entityBox rect,
    .entityBox,
    .er.entityLabel,
    .entityLabel {
      rx: ${customThemeVariables.borderRadius} !important;
      ry: ${customThemeVariables.borderRadius} !important;
    }

    /* 实体关系图表格外框与实体主体 */
    .er.entityBox,
    .er.entityBox rect,
    .entityBox {
      fill: ${erDiagramThemeVariables.whiteColor} !important;
      stroke: ${commonThemeVariables.primaryBorderColor} !important;
    }

    /* 实体关系图表头 */
    .er.entityLabel,
    .entityLabel {
      fill: ${commonThemeVariables.primaryColor} !important;
      stroke: ${commonThemeVariables.primaryBorderColor} !important;
    }

    /* 实体关系图字段分隔线与表格内部线 */
    .er.attributeBoxOdd,
    .er.attributeBoxEven,
    .attributeBoxOdd,
    .attributeBoxEven {
      fill: ${erDiagramThemeVariables.whiteColor} !important;
      stroke: ${customThemeVariables.lineColor} !important;
    }

    /* 实体关系图实体、字段、关系等文本 */
    .er text,
    .entityLabel text,
    .relationshipLabel,
    .label {
      fill: ${commonThemeVariables.primaryTextColor} !important;
      color: ${commonThemeVariables.primaryTextColor} !important;
      font-size: ${commonThemeVariables.fontSize} !important;
    }

    /* 实体关系图连接线 */
    .er.relationshipLine,
    .relationshipLine,
    .edgePath .path {
      stroke: ${customThemeVariables.lineColor} !important;
    }

    /* 实体关系图辅助信息，如关系名称、基数等标签 */
    .edgeLabel,
    .edgeLabel .label,
    .edgeLabel foreignObject,
    .edgeLabel span,
    .edgeLabel p,
    .relationshipLabelBox {
      background-color: ${customThemeVariables.edgeLabelBackground} !important;
      fill: ${customThemeVariables.edgeLabelBackground} !important;
      color: ${commonThemeVariables.primaryTextColor} !important;
    }
  `
};
