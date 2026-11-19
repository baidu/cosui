
import type {DiagramRendererOptions} from '../../types';
import * as rehypeMermaidPlugin from './rehype/mermaid';
import * as rehypeMarkmapPlugin from './rehype/markmap';
import * as rehypeMindmapPlugin from './rehype/mindmap';
// 中文别名插件：流程图 / 时序图 / 甘特图（mermaid）、思维导图（markmap）。
import {rehypeFlowchart, rehypeSequence, rehypeGantt, rehypeMindMapZh} from './rehype/alias';

export function registerPlugin(marklang: DiagramRendererOptions['marklang']): void {
    if (!marklang?.registerPlugin) {
        return;
    }
    marklang.registerPlugin({
        name: 'mermaid',
        feature: /```mermaid\n[\s\S]*?/,
        load: () => [Promise.resolve(rehypeMermaidPlugin)]
    });
    marklang.registerPlugin({
        name: 'markmap',
        feature: /```markmap\n[\s\S]*?/,
        load: () => [Promise.resolve(rehypeMarkmapPlugin)]
    });
    marklang.registerPlugin({
        name: 'mindmap',
        feature: /```mindmap\n[\s\S]*?/,
        load: () => [Promise.resolve(rehypeMindmapPlugin)]
    });
    // 中文别名：代码块以中文标注语言时也渲染对应图表。
    marklang.registerPlugin({
        name: '流程图',
        feature: /```流程图\n[\s\S]*?/,
        load: () => [Promise.resolve({rehypeFlowchart})]
    });
    marklang.registerPlugin({
        name: '时序图',
        feature: /```时序图\n[\s\S]*?/,
        load: () => [Promise.resolve({rehypeSequence})]
    });
    marklang.registerPlugin({
        name: '甘特图',
        feature: /```甘特图\n[\s\S]*?/,
        load: () => [Promise.resolve({rehypeGantt})]
    });
    marklang.registerPlugin({
        name: '思维导图',
        feature: /```思维导图\n[\s\S]*?/,
        load: () => [Promise.resolve({rehypeMindMapZh})]
    });
}
