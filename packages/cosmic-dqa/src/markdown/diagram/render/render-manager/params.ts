import type {DiagramRendererOptions} from '../../types';

let params: DiagramRendererOptions | undefined = undefined;

export function getParams(): DiagramRendererOptions | undefined {
    return params;
}

export function updateParams(options?: DiagramRendererOptions): void {
    params = options;
}

function getCustomStyle(): Record<string, string> {
    return params?.style ?? {};
}

/**
 * 获取业务方通过 init({style}) 传入的自定义 class。
 * @param className - 默认样式中的 class key
 * @returns 自定义 class，不存在时返回空字符串
 */
export function getCustomClassName(className: string): string {
    return getCustomStyle()[className] || '';
}

/**
 * 合并默认 class 与业务自定义 class。
 * @param className - 默认样式中的 class key
 * @param defaultClassName - 默认 class（不再来自 CSS module）
 * @returns 合并后的 className 字符串
 */
export function getMergedClassName(className: string, defaultClassName?: string): string {
    return [defaultClassName, getCustomClassName(className)].filter(Boolean).join(' ');
}
