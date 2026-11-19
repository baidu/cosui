import type {DiagramOptions} from '../../types';
import type {RenderAbleDefinitionOptions} from '../types';

/** 图表渲染器，每种图表语言需实现此函数签名 */
export interface DiagramRendererModule {
    shouldRender: (options: DiagramOptions) => boolean;
    render: (options: DiagramOptions) => Promise<boolean>;
    handleDiagramRenderComplete: (options: DiagramOptions) => void | Promise<void>;
    updateDiagramControls: (host: HTMLElement, options: {renderStatus: DiagramOptions['renderStatus']}) => void;
    getRenderAbleDefinition: (options: RenderAbleDefinitionOptions) => string;
    canIUse: (options: {lang: DiagramOptions['lang']}) => boolean;
    /** 释放该 host 上的渲染资源（observer / 第三方实例 / 事件监听），供组件卸载调用 */
    destroyDiagram?: (host: HTMLElement) => void;
}
