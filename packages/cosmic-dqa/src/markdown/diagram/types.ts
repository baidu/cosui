
import {DiagramViewMode, DiagramRenderStatus, DiagramLang, DiagramLangAlias} from './utils/const';
import type {DiagramControlsCtor} from './components/diagram-controls/base';

type DiagramRenderStatusType = typeof DiagramRenderStatus[keyof typeof DiagramRenderStatus];

export type DiagramViewType = typeof DiagramViewMode[keyof typeof DiagramViewMode];

/**
 * diagram 模块统一类型定义。
 */

/** 支持的图表语言类型 */
type DiagramLangType = typeof DiagramLang[keyof typeof DiagramLang];

/** 中文图表语言别名类型（代码块 info 字符串，如 流程图 / 思维导图） */
export type DiagramLangAliasType = keyof typeof DiagramLangAlias;

/**
 * 截断流式输出中不完整最后一行的函数签名。
 */
export type StripIncompleteLine = (definition: string) => string;

interface ControlOption {
    /** 控件名称 */
    name: string;
}

/**
 * 复制 / 下载事件载荷。
 */
export interface DiagramActionPayload {
    viewMode?: DiagramViewType;
    type?: string;
    data?: boolean;
    url?: string;
    raw?: string;
    filename?: string;
    error?: unknown;
}

export interface DiagramOptions {
    lang?: DiagramLangType;
    type?: string;
    host?: HTMLElement;
    raw?: string;
    definition?: string;
    cachedHost?: HTMLElement;
    viewMode?: DiagramViewType;
    renderStatus?: DiagramRenderStatusType;
    style?: Record<string, string>;
    actionControls?: ControlOption[][];
    viewportControls?: ControlOption[][];
    onViewModeChanged?: (data: {viewMode: DiagramViewType, type?: string}) => void;
    onCopy?: (data: DiagramActionPayload) => void;
    onDownload?: (data: DiagramActionPayload) => void;
    onZoom?: (direction: 'in' | 'out') => void;
    onReset?: (data: {resettable: boolean}) => void;
    renderDiagram?: (options: DiagramOptions) => Promise<boolean>;
    onReachMaxZoomRatio?: () => void;
    onReachMinZoomRatio?: () => void;
    onToggleLandscape?: (data: {landscape: boolean, viewMode: DiagramViewType, type?: string}) => void;
    onFullscreen?: (context: {raw?: string, type?: string, lang?: DiagramLangType}) => void;
}

export interface DiagramRendererOptions extends DiagramOptions {
    marklang: any;
    style?: Record<string, string>;
    controls?: DiagramControlsCtor;
}

export interface DiagramRenderingOptions extends DiagramOptions {
    index?: number;
    rootCache?: Array<HTMLElement | undefined>;
    cachedHost?: HTMLElement;
    frozenCache?: Map<string, HTMLElement>;
    renderKey?: string;
}
