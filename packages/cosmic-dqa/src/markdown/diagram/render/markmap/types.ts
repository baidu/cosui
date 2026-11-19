
interface MarkmapNode {
    state: {
        path: string;
    };
}

export interface MarkmapOptions {
    color: (node: MarkmapNode) => string;
    colorFreezeLevel: number;
    duration: number;
    pan: boolean;
    scrollForPan: boolean;
    zoom: boolean;
    fitRatio?: number;
}

/** d3-zoom 变换：k 为缩放比，x / y 为平移量 */
export interface MarkmapZoomTransform {
    k: number;
    x: number;
    y: number;
}

export interface MarkmapViewModule {
    Markmap: {
        create: (svg: SVGSVGElement, options?: Partial<MarkmapOptions>) => MarkmapInstance;
    };
}

export interface MarkmapInstance {
    fit: () => Promise<void>;
    rescale: (scale?: number) => void;
    setData: (data: unknown) => Promise<void>;
    setOptions: (options?: Partial<MarkmapOptions>) => void;
    /**
     * 销毁实例：markmap-view 构造时会把实例注册进模块级 Hook.listeners 并持有
     * ResizeObserver，只有 destroy() 才会解除，否则旧实例与其 SVG / 数据无法回收。
     */
    destroy?: () => void;
    state?: {
        rect?: {
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        };
    };
    svg?: {
        on: (typename: string, listener: null | ((event: Event, ...args: unknown[]) => void)) => unknown;
        node: () => SVGElement | null;
    };
    g?: {
        attr: (name: string, value?: string) => string | unknown;
    };
    /** d3-zoom behavior，用于直接设置 scaleExtent 与追加变换监听 */
    zoom?: {
        scaleExtent: (extent: [number, number]) => unknown;
        /**
         * 追加 / 移除 d3 zoom 监听。传带命名空间的事件名（如 'zoom.xxx'）不会覆盖
         * markmap-view 自身注册的裸 'zoom' 处理器；listener 传 null 即移除。
         */
        on?: (
            typenames: string,
            listener: ((event: {transform?: MarkmapZoomTransform}) => void) | null
        ) => unknown;
    };
}
