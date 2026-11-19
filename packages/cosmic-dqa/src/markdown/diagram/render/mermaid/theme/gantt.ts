import {BORDER_COLORS, SELECTION_COLORS} from '../../../utils/colors';
import {commonThemeVariables, customThemeVariables} from './common';
import type {MermaidThemeConfig} from './types';

const getRingColor = (palette: string[], index: number) => palette[index % palette.length];
const getSectionBackground = (index: number) => `${getRingColor(SELECTION_COLORS, index)}33`;

export const ganttThemeVariables = {
    weekendMaskColor: 'rgba(255, 255, 255, 0.6)',
    todayLineColor: '#FF4D4D',
    gridLineColor: '#DCDDE0'
};

/**
 * 甘特图自适应布局宽度（仿 markmap：先按完整尺寸布局，再整体等比缩放到容器）。
 *
 * mermaid 的日期轴刻度数由时间轴决定、不随可用宽度抽稀，窄容器下每个刻度分到的像素
 * 不足以放下日期文字，必然重叠。这里不去「猜」宽度，而是由调用方先在离屏按容器宽度渲染
 * 一次、量出真实刻度数与最宽日期标签，再调用本函数算出「刚好把所有刻度摊开不重叠」的布局
 * 宽度，注入 gantt.useWidth 做最终渲染；最终图再靠 useMaxWidth(width:100%+viewBox)
 * 等比缩放回容器，细节由 svg-pan-zoom 查看。
 *
 * 好处：宽度来自真实测量而非源码估算，长跨度/细粒度图不会估偏；且预览态渲染出的这张 SVG
 * 本身就是「完整内容」，结果页/全屏页下载都直接复用它，无需再为导出离屏重渲一次。
 */
// 轴左右两侧额外留白（leftPadding / gridLineStartPadding 等），px
const GANTT_AXIS_HORIZONTAL_PADDING = 100;
// 相邻日期标签之间要求的最小间距，低于它即视为重叠，px
// 注：Mermaid d3.scaleTime() 在月份交界线（如 10月31日→11月1日）刻度不均匀分布，
// 设置最小间距避免重叠
const GANTT_AXIS_LABEL_MIN_GAP = 50;
// 布局宽度上下界：下界保证基本展开，上界防止异常巨图
const GANTT_MIN_WIDTH = 480;
const GANTT_MAX_WIDTH = 4000;

/**
 * 由离屏测量到的真实刻度数与最宽日期标签，算出「摊开不重叠」所需的布局宽度。
 * @param tickCount 日期轴刻度数（`.grid .tick text` 的个数）
 * @param maxLabelWidth 最宽日期标签的像素宽度（scale≈1 下量得的 intrinsic 宽）
 */
export function computeGanttLayoutWidth(tickCount: number, maxLabelWidth: number): number {
    const width = GANTT_AXIS_HORIZONTAL_PADDING
        + tickCount * (maxLabelWidth + GANTT_AXIS_LABEL_MIN_GAP);
    return Math.round(Math.max(GANTT_MIN_WIDTH, Math.min(GANTT_MAX_WIDTH, width)));
}


export const ganttTheme: MermaidThemeConfig = {
    theme: 'base',
    themeVariables: {
        ...commonThemeVariables,
        textColor: commonThemeVariables.primaryTextColor,
        titleColor: commonThemeVariables.primaryTextColor,
        taskTextColor: commonThemeVariables.primaryTextColor,
        taskTextDarkColor: commonThemeVariables.primaryTextColor,
        taskTextOutsideColor: commonThemeVariables.primaryTextColor,
        taskTextClickableColor: commonThemeVariables.primaryTextColor,
        gridColor: ganttThemeVariables.gridLineColor,
        vertLineColor: ganttThemeVariables.gridLineColor,
        todayLineColor: ganttThemeVariables.todayLineColor,
        excludeBkgColor: ganttThemeVariables.weekendMaskColor,
        sectionBkgColor: getRingColor(SELECTION_COLORS, 0),
        sectionBkgColor2: getRingColor(SELECTION_COLORS, 1),
        altSectionBkgColor: getRingColor(SELECTION_COLORS, 2),
        taskBkgColor: getRingColor(SELECTION_COLORS, 0),
        taskBorderColor: getRingColor(BORDER_COLORS, 0),
        activeTaskBkgColor: getRingColor(SELECTION_COLORS, 0),
        activeTaskBorderColor: getRingColor(BORDER_COLORS, 0),
        doneTaskBkgColor: getRingColor(SELECTION_COLORS, 0),
        doneTaskBorderColor: getRingColor(BORDER_COLORS, 0),
        critBkgColor: getRingColor(SELECTION_COLORS, 0),
        critBorderColor: getRingColor(BORDER_COLORS, 0)
    },
    gantt: {
        numberSectionStyles: 8,
        barHeight: 44,
        // useWidth 由离屏测量后经 computeGanttLayoutWidth 算好、渲染时注入（见 index.ts）；
        // width:100% + viewBox，让按真实刻度布局的整图等比缩放到容器大小
        useMaxWidth: true
    },
    themeCSS: `
    /* 甘特图任务条文字（浅色任务块上，保持深色；暗黑不翻转） */
    .taskText,
    .taskTextOutsideLeft,
    .taskTextOutsideRight,
    text {
      fill: ${commonThemeVariables.primaryTextColor} !important;
      color: ${commonThemeVariables.primaryTextColor} !important;
    }

    /* 甘特图坐标轴/标题/区段标题文字：默认深色，暗黑由宿主改 --cosd-gantt-axis-text-color 反白。
       cosmic themeCSS 带 #mermaid-<id> 前缀 + !important，宿主用普通选择器压不过，
       故预留 CSS 变量钩子交由宿主翻转（与 markmap 文字做法一致）。 */
    .titleText,
    .sectionTitle,
    .grid .tick text {
      fill: var(--cosd-gantt-axis-text-color, ${commonThemeVariables.primaryTextColor}) !important;
    }

    /* 甘特图日期竖线：默认浅灰，暗黑由宿主改 --cosd-gantt-grid-line-color 反白降透明 */
    .grid .tick,
    .grid line,
    .vert {
      stroke: var(--cosd-gantt-grid-line-color, ${ganttThemeVariables.gridLineColor}) !important;
    }

    /* 甘特图红色今日竖线 */
    .today {
      stroke: ${ganttThemeVariables.todayLineColor} !important;
      stroke-width: 2px !important;
    }

    /* 甘特图周末时间段遮罩 */
    .exclude-range {
      fill: ${ganttThemeVariables.weekendMaskColor} !important;
    }

    /* 甘特图阶段横向背景，按浅色色板顺序取色并保持 20% 透明度 */
    .section {
      stroke: none !important;
      opacity: var(--cos-opacity-100) !important;
    }

    .section0 {
      fill: ${getSectionBackground(0)} !important;
    }

    .section1 {
      fill: ${getSectionBackground(1)} !important;
    }

    .section2 {
      fill: ${getSectionBackground(2)} !important;
    }

    .section3 {
      fill: ${getSectionBackground(3)} !important;
    }

    .section4 {
      fill: ${getSectionBackground(4)} !important;
    }

    .section5 {
      fill: ${getSectionBackground(5)} !important;
    }

    .section6 {
      fill: ${getSectionBackground(6)} !important;
    }

    .section7 {
      fill: ${getSectionBackground(7)} !important;
    }

    /* 甘特图任务通用圆角 */
    .task {
      rx: ${customThemeVariables.borderRadius} !important;
      ry: ${customThemeVariables.borderRadius} !important;
    }

    /* 甘特图普通任务，背景和边框按色环顺序取色 */
    .task0,
    .active0,
    .done0,
    .crit0,
    .activeCrit0,
    .doneCrit0 {
      fill: ${getRingColor(SELECTION_COLORS, 0)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 0)} !important;
    }

    .task1,
    .active1,
    .done1,
    .crit1,
    .activeCrit1,
    .doneCrit1 {
      fill: ${getRingColor(SELECTION_COLORS, 1)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 1)} !important;
    }

    .task2,
    .active2,
    .done2,
    .crit2,
    .activeCrit2,
    .doneCrit2 {
      fill: ${getRingColor(SELECTION_COLORS, 2)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 2)} !important;
    }

    .task3,
    .active3,
    .done3,
    .crit3,
    .activeCrit3,
    .doneCrit3 {
      fill: ${getRingColor(SELECTION_COLORS, 3)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 3)} !important;
    }

    .task4,
    .active4,
    .done4,
    .crit4,
    .activeCrit4,
    .doneCrit4 {
      fill: ${getRingColor(SELECTION_COLORS, 4)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 4)} !important;
    }

    .task5,
    .active5,
    .done5,
    .crit5,
    .activeCrit5,
    .doneCrit5 {
      fill: ${getRingColor(SELECTION_COLORS, 5)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 5)} !important;
    }

    .task6,
    .active6,
    .done6,
    .crit6,
    .activeCrit6,
    .doneCrit6 {
      fill: ${getRingColor(SELECTION_COLORS, 6)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 6)} !important;
    }

    .task7,
    .active7,
    .done7,
    .crit7,
    .activeCrit7,
    .doneCrit7 {
      fill: ${getRingColor(SELECTION_COLORS, 7)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 7)} !important;
    }

    /* 甘特图任务进程，颜色与当前阶段横向背景统一 */
    .task.progress0,
    .progress0 {
      fill: ${getSectionBackground(0)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 0)} !important;
    }

    .task.progress1,
    .progress1 {
      fill: ${getSectionBackground(1)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 1)} !important;
    }

    .task.progress2,
    .progress2 {
      fill: ${getSectionBackground(2)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 2)} !important;
    }

    .task.progress3,
    .progress3 {
      fill: ${getSectionBackground(3)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 3)} !important;
    }

    .task.progress4,
    .progress4 {
      fill: ${getSectionBackground(4)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 4)} !important;
    }

    .task.progress5,
    .progress5 {
      fill: ${getSectionBackground(5)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 5)} !important;
    }

    .task.progress6,
    .progress6 {
      fill: ${getSectionBackground(6)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 6)} !important;
    }

    .task.progress7,
    .progress7 {
      fill: ${getSectionBackground(7)} !important;
      stroke: ${getRingColor(BORDER_COLORS, 7)} !important;
    }
  `
};
