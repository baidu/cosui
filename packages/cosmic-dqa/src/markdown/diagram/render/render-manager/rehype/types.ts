import type {DiagramOptions, DiagramLangAliasType} from '../../../types';

interface HastElement {
    type: 'element';
    tagName: string;
    properties?: Record<string, unknown>;
    children?: Array<HastElement | {type: string, value?: string}>;
}

/** rehype 图表插件配置项 */
export interface RehypeOptions {
    /** 当前插件要匹配的代码块语言（代码块 info），如 'mermaid'、'markmap'、'流程图' */
    targetLang: NonNullable<DiagramOptions['lang']> | DiagramLangAliasType;
    /** 实际渲染器语言（canonical）；中文别名需指定，缺省时等于 targetLang */
    renderLang?: NonNullable<DiagramOptions['lang']>;
    /** 占位容器的 CSS 类名 */
    className: string;
    /** 占位容器的子节点（如 mermaid 无需子节点，markmap 需要 <svg> 占位） */
    children?: HastElement[];
    /** 检测当前环境是否支持渲染，返回 false 则不替换节点，直接降级为代码块 */
    canIUse?: () => boolean;
}
