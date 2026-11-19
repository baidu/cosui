/**
 * mermaid / markmap 渲染器共享逻辑。
 */

import {DiagramViewMode} from '../utils/const';
import {exportSvgAsPngUrl} from '../utils/export';
import type {DiagramOptions} from '../types';

type ResizeThrottle = (onResize: () => void) => () => void;

export interface HostResizeRegistry {
    observeHostResize: (host: HTMLElement, onResize: () => void) => void;
    unobserve: (host: HTMLElement) => void;
    observe: (host: HTMLElement) => void;
    disconnect: (host: HTMLElement) => void;
}

export const rafThrottle: ResizeThrottle = (onResize: () => void) => {
    let scheduled = false;
    return () => {
        if (scheduled) {
            return;
        }
        scheduled = true;
        window.requestAnimationFrame(() => {
            scheduled = false;
            onResize();
        });
    };
};

export function timeoutDebounce(delay: number): ResizeThrottle {
    return (onResize: () => void) => {
        let timerId = 0;
        return () => {
            clearTimeout(timerId);
            timerId = window.setTimeout(onResize, delay);
        };
    };
}

/**
 * 创建按 host 维度管理 ResizeObserver 的注册表。
 */
export function createHostResizeRegistry(throttle: ResizeThrottle): HostResizeRegistry {
    const resizeObserverMap = new WeakMap<HTMLElement, ResizeObserver>();

    return {
        observeHostResize(host: HTMLElement, onResize: () => void) {
            resizeObserverMap.get(host)?.disconnect();
            if (typeof ResizeObserver === 'undefined') {
                return;
            }
            const resizeObserver = new ResizeObserver(throttle(onResize));
            resizeObserver.observe(host);
            resizeObserverMap.set(host, resizeObserver);
        },
        unobserve(host: HTMLElement) {
            resizeObserverMap.get(host)?.unobserve(host);
        },
        observe(host: HTMLElement) {
            resizeObserverMap.get(host)?.observe(host);
        },
        disconnect(host: HTMLElement) {
            resizeObserverMap.get(host)?.disconnect();
            resizeObserverMap.delete(host);
        }
    };
}

/** 按视图模式分发：图表视图走渲染，源码视图无需渲染 */
export async function renderByViewMode(
    options: DiagramOptions,
    renderDiagram: (options: DiagramOptions) => Promise<boolean>,
): Promise<boolean> {
    const {viewMode = DiagramViewMode.diagram} = options || {};
    if (viewMode === DiagramViewMode.diagram) {
        return renderDiagram(options);
    }
    return true;
}

/**
 * 复位态（是否偏离初始适配态）通知，供宿主控制自绘复位按钮显隐。
 */
const resetStateListenerMap = new WeakMap<HTMLElement, (resettable: boolean) => void>();

export function setResetStateListener(host: HTMLElement, listener: (resettable: boolean) => void): void {
    resetStateListenerMap.set(host, listener);
}

export function clearResetStateListener(host: HTMLElement): void {
    resetStateListenerMap.delete(host);
}

export function emitResetState(host: HTMLElement, resettable: boolean): void {
    resetStateListenerMap.get(host)?.(resettable);
}

/** 渲染器提供的导出信息；svgElement 可能为空（图表尚未落 DOM），由 export 内部抛错兜底 */
export interface DiagramExportInfo {
    svgElement: SVGSVGElement | null;
    viewBox?: {x: number, y: number, width: number, height: number};
}

interface DiagramActionOptions {
    host: HTMLElement;
    raw: string;
    type?: string;
    /** 导出 PNG 的文件名（mermaid.png / markmap.png） */
    filename: string;
    getExportInfo: (host: HTMLElement) => DiagramExportInfo;
    onCopy?: DiagramOptions['onCopy'];
    onDownload?: DiagramOptions['onDownload'];
}

/**
 * 复制
 */
export function createCopyHandler(options: DiagramActionOptions) {
    const {host, raw, type, getExportInfo, onCopy} = options;

    return (payload: {viewMode: DiagramOptions['viewMode']}) => {
        const {viewMode} = payload;
        if (viewMode === DiagramViewMode.diagram) {
            exportSvgAsPngUrl(getExportInfo(host))
                .then(url => onCopy?.({viewMode, data: true, url, type}))
                .catch((error: unknown) => onCopy?.({viewMode, error, type}));
            return;
        }
        onCopy?.({viewMode, data: true, raw, type});
    };
}

/**
 * 下载
 */
export function createDownloadHandler(options: DiagramActionOptions) {
    const {host, raw, type, filename, getExportInfo, onDownload} = options;

    return (payload: {viewMode: DiagramOptions['viewMode']}) => {
        const {viewMode} = payload;
        if (viewMode === DiagramViewMode.diagram) {
            // 预览态 SVG 已按内容自适应宽度渲染（日期全、不重叠），导出直接复用，无需离屏重渲
            exportSvgAsPngUrl(getExportInfo(host))
                .then(url => onDownload?.({viewMode, data: true, url, filename, type}))
                .catch((error: unknown) => onDownload?.({viewMode, error, type}));
            return;
        }
        onDownload?.({viewMode, data: true, raw, filename: 'note.md', type});
    };
}
