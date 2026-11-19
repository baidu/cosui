import {commonThemeVariables, customThemeVariables} from './common';
import type {MermaidThemeConfig} from './types';

export const flowchartTheme: MermaidThemeConfig = {
    theme: 'base',
    themeVariables: commonThemeVariables,
    // 顶层开关：mermaid v11 流程图「节点」标签只读这个顶层 htmlLabels
    // （labelHelper: node.useHtmlLabels = config.htmlLabels;
    //   useHtmlLabels = node.useHtmlLabels || evaluate(config.htmlLabels)）。
    // 只设下方 flowchart.htmlLabels 不生效（那只管 cluster/子图标题与边标签），必须两处都关。
    htmlLabels: false,
    themeCSS: `
    /* 流程图节点图形：矩形、多边形、圆形和椭圆 */
    /* 多边形（菱形等）圆角后由 polygon 替换为带标记的 path，一并套用填充/描边 */
    .node rect,
    .node polygon,
    .node path[data-cos-rounded-polygon],
    .node circle,
    .node ellipse {
      fill: ${commonThemeVariables.primaryColor} !important;
      stroke: ${commonThemeVariables.primaryBorderColor} !important;
      rx: ${customThemeVariables.borderRadius} !important;
      ry: ${customThemeVariables.borderRadius} !important;
    }

    /* 流程图节点文本：htmlLabels:false 下为 SVG <text>/<tspan>，用 fill 着色、font-size 固定；
       SVG 文本不受端上 HTML 字号放大影响，测量与显示一致，不会偏移/截断 */
    .node .label,
    .nodeLabel,
    .label,
    .node text,
    .nodeLabel tspan {
      fill: ${commonThemeVariables.primaryTextColor} !important;
      color: ${commonThemeVariables.primaryTextColor} !important;
      font-size: ${commonThemeVariables.fontSize} !important;
    }

    /* 流程图连接线 */
    .edgePath .path,
    .flowchart-link {
      stroke: ${customThemeVariables.lineColor} !important;
    }

    /* 流程图箭头 */
    .arrowheadPath,
    marker path {
      fill: ${customThemeVariables.lineColor} !important;
      stroke: ${customThemeVariables.lineColor} !important;
    }

    /* 流程图连接线辅助信息，如“是”“否”等标签（SVG text） */
    .edgeLabel,
    .edgeLabel .label,
    .edgeLabel text,
    .edgeLabel tspan {
      background-color: ${customThemeVariables.edgeLabelBackground} !important;
      fill: ${commonThemeVariables.primaryTextColor} !important;
      color: ${commonThemeVariables.primaryTextColor} !important;
      font-size: ${commonThemeVariables.fontSize} !important;
    }

    /* 边标签背景色块（htmlLabels:false 时为 .edgeLabel 下的 rect） */
    .edgeLabel rect,
    .edgeLabels .label rect {
      fill: ${customThemeVariables.edgeLabelBackground} !important;
    }

    /* 流程图子图(cluster)：背景透明透出外层底色，与外层统一；仅保留描边界定子图范围。
       base 主题默认给 cluster 浅底，会在容器里显出一块方块，故透明化。 */
    .cluster rect {
      fill: transparent !important;
      stroke: ${customThemeVariables.lineColor} !important;
    }
  `,
    flowchart: {
        curve: 'basis',
        // 用 SVG <text> 而非 foreignObject HTML 渲染标签：规避端上 HTML 字号放大导致的
        // 「测量用一个字号、显示用另一个字号」从而节点框装不下文字被截断的问题（与甘特图一致走 SVG 文本）
        htmlLabels: false
    }
};
