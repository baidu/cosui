import {commonThemeVariables} from './common';
import type {MermaidThemeConfig} from './types';

// 时序图自定义色值（无对应通用 Token，按设计稿写死并集中管理）
export const sequenceThemeVariables = {
    // 序号圆底：白底
    sequenceNumberBackground: '#FFFFFF',
    // 序号黑色内边框：暗黑模式下让白底序号的边界更清晰
    sequenceNumberBorderColor: '#000000'
};

export const sequenceDiagramTheme: MermaidThemeConfig = {
    theme: 'base',
    themeVariables: commonThemeVariables,
    themeCSS: `
    /* 时序图自动序号文字：深色文字（与通用主文本色一致） */
    .sequenceNumber {
      fill: ${commonThemeVariables.primaryTextColor} !important;
    }

    /* 时序图自动序号圆底：白底 + 黑色内边框（marker 内 circle，id 以 -sequencenumber 结尾） */
    [id$="-sequencenumber"],
    [id$="-sequencenumber"] circle {
      fill: ${sequenceThemeVariables.sequenceNumberBackground} !important;
      stroke: ${sequenceThemeVariables.sequenceNumberBorderColor} !important;
      stroke-width: 1px !important;
    }
  `
};
