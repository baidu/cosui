/**
 * 图表「加载中」占位的静态 hast 结构。
 */

interface LoadingHastNode {
    type: string;
    tagName?: string;
    properties?: Record<string, unknown>;
    children?: LoadingHastNode[];
    value?: string;
}

const LOADING_TEXT = '图表加载中，请稍后';

export function createDiagramLoadingHast(text: string = LOADING_TEXT): LoadingHastNode {
    return {
        type: 'element',
        tagName: 'div',
        properties: {className: ['cosd-diagram-rendering']},
        children: [{
            type: 'element',
            tagName: 'div',
            properties: {className: ['cos-loading', 'cos-flex', 'cos-loading-bottom']},
            children: [{
                type: 'element',
                tagName: 'i',
                properties: {className: ['cos-icon', 'cos-icon-loading', 'cos-loading-icon']},
                children: []
            }, {
                type: 'element',
                tagName: 'div',
                properties: {className: ['cos-loading-text']},
                children: [{type: 'text', value: text}]
            }]
        }]
    };
}
