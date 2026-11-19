import {BORDER_COLORS, SELECTION_COLORS} from '../../../utils/colors';
import {commonThemeVariables, customThemeVariables} from './common';
import type {MermaidThemeConfig} from './types';

const getRingColor = (palette: string[], index: number) => palette[index % palette.length];

export const journeyThemeVariables = {
    emotionBackground: '#FFFDE5'
};

export const journeyTheme: MermaidThemeConfig = {
    theme: 'base',
    themeVariables: {
        ...commonThemeVariables,
        actorBkg: getRingColor(SELECTION_COLORS, 0),
        actorBorder: getRingColor(BORDER_COLORS, 0),
        actorTextColor: commonThemeVariables.primaryTextColor,
        taskBkgColor: getRingColor(SELECTION_COLORS, 0),
        taskBorderColor: getRingColor(BORDER_COLORS, 0),
        taskTextColor: commonThemeVariables.primaryTextColor,
        taskTextLightColor: commonThemeVariables.primaryTextColor,
        taskTextOutsideColor: commonThemeVariables.primaryTextColor,
        taskTextClickableColor: commonThemeVariables.primaryTextColor,
        sectionBkgColor: getRingColor(SELECTION_COLORS, 1),
        sectionBkgColor2: getRingColor(SELECTION_COLORS, 2),
        altSectionBkgColor: getRingColor(SELECTION_COLORS, 3),
        fillType0: getRingColor(SELECTION_COLORS, 0),
        fillType1: getRingColor(SELECTION_COLORS, 1),
        fillType2: getRingColor(SELECTION_COLORS, 2),
        fillType3: getRingColor(SELECTION_COLORS, 3),
        fillType4: getRingColor(SELECTION_COLORS, 4),
        fillType5: getRingColor(SELECTION_COLORS, 5),
        fillType6: getRingColor(SELECTION_COLORS, 6),
        fillType7: getRingColor(SELECTION_COLORS, 7)
    },
    themeCSS: `
    /* 旅程图任务和阶段通用圆角 */
    .task,
    .journey-section,
    [class*="task-type-"],
    [class*="section-type-"] {
      rx: ${customThemeVariables.borderRadius} !important;
      ry: ${customThemeVariables.borderRadius} !important;
    }

    /* 旅程图任务节点，背景色与边框色按色环顺序取色 */
    .task,
    .task-type-0 {
      fill: ${getRingColor(SELECTION_COLORS, 0)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 0)} !important;
    }

    .task-type-1 {
      fill: ${getRingColor(SELECTION_COLORS, 1)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 1)} !important;
    }

    .task-type-2 {
      fill: ${getRingColor(SELECTION_COLORS, 2)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 2)} !important;
    }

    .task-type-3 {
      fill: ${getRingColor(SELECTION_COLORS, 3)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 3)} !important;
    }

    .task-type-4 {
      fill: ${getRingColor(SELECTION_COLORS, 4)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 4)} !important;
    }

    .task-type-5 {
      fill: ${getRingColor(SELECTION_COLORS, 5)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 5)} !important;
    }

    .task-type-6 {
      fill: ${getRingColor(SELECTION_COLORS, 6)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 6)} !important;
    }

    .task-type-7 {
      fill: ${getRingColor(SELECTION_COLORS, 7)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 7)} !important;
    }

    .task-type-8 {
      fill: ${getRingColor(SELECTION_COLORS, 8)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 8)} !important;
    }

    /* 旅程图角色背景色，按色环顺序取色 */
    .actor-0,
    .actor:nth-of-type(8n + 1) {
      fill: ${getRingColor(SELECTION_COLORS, 0)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 0)} !important;
    }

    .actor-1,
    .actor:nth-of-type(8n + 2) {
      fill: ${getRingColor(SELECTION_COLORS, 1)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 1)} !important;
    }

    .actor-2,
    .actor:nth-of-type(8n + 3) {
      fill: ${getRingColor(SELECTION_COLORS, 2)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 2)} !important;
    }

    .actor-3,
    .actor:nth-of-type(8n + 4) {
      fill: ${getRingColor(SELECTION_COLORS, 3)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 3)} !important;
    }

    .actor-4,
    .actor:nth-of-type(8n + 5) {
      fill: ${getRingColor(SELECTION_COLORS, 4)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 4)} !important;
    }

    .actor-5,
    .actor:nth-of-type(8n + 6) {
      fill: ${getRingColor(SELECTION_COLORS, 5)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 5)} !important;
    }

    .actor-6,
    .actor:nth-of-type(8n + 7) {
      fill: ${getRingColor(SELECTION_COLORS, 6)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 6)} !important;
    }

    .actor-7,
    .actor:nth-of-type(8n) {
      fill: ${getRingColor(SELECTION_COLORS, 7)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 7)} !important;
    }

    /* 旅程图文字 */
    .actor,
    .label,
    .taskText,
    .taskTextOutsideRight,
    .taskTextOutsideLeft,
    text {
      color: ${commonThemeVariables.primaryTextColor} !important;
      fill: ${commonThemeVariables.primaryTextColor} !important;
      font-size: ${commonThemeVariables.fontSize} !important;
    }

    /* 旅程图连接表格线 */
    .grid line,
    .grid path {
      stroke: ${customThemeVariables.lineColor} !important;
    }

    /* section 背景和边框按色环顺序取色 */
    .journey-section.section-type-0,
    .section-type-0 {
      fill: ${getRingColor(SELECTION_COLORS, 0)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 0)} !important;
    }

    .journey-section.section-type-1,
    .section-type-1 {
      fill: ${getRingColor(SELECTION_COLORS, 1)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 1)} !important;
    }

    .journey-section.section-type-2,
    .section-type-2 {
      fill: ${getRingColor(SELECTION_COLORS, 2)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 2)} !important;
    }

    .journey-section.section-type-3,
    .section-type-3 {
      fill: ${getRingColor(SELECTION_COLORS, 3)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 3)} !important;
    }

    .journey-section.section-type-4,
    .section-type-4 {
      fill: ${getRingColor(SELECTION_COLORS, 4)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 4)} !important;
    }

    .journey-section.section-type-5,
    .section-type-5 {
      fill: ${getRingColor(SELECTION_COLORS, 5)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 5)} !important;
    }

    .journey-section.section-type-6,
    .section-type-6 {
      fill: ${getRingColor(SELECTION_COLORS, 6)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 6)} !important;
    }

    .journey-section.section-type-7,
    .section-type-7 {
      fill: ${getRingColor(SELECTION_COLORS, 7)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 7)} !important;
    }

    /* 旅程图虚线及箭头 */
    .journey-line,
    .edgePath .path,
    .arrowheadPath,
    marker path {
      stroke: ${commonThemeVariables.primaryTextColor} !important;
      fill: ${commonThemeVariables.primaryTextColor} !important;
    }

    /* 旅程图表情背景 */
    .face,
    .face-container,
    .emotion,
    .legend .face {
      fill: ${journeyThemeVariables.emotionBackground} !important;
      background-color: ${journeyThemeVariables.emotionBackground} !important;
    }
  `
};
