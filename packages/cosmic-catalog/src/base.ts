/** @file 业务入口共享的基础组件与协议定义 */
import {z} from 'zod';
import {components as cosmicComponents, $defs as cosmicDefs} from './cosmic';
import {components as cardComponents, $defs as cardDefs} from './cosmic-card';
import {components as markdownComponents} from './cosmic-dqa/markdown';
import {JsonValue, RecordValue, Binding, Extensions, Component, PropsCommon, LinkInfo, Price} from './shared';
import {usage} from './usage';

export const baseDefinition = {
    version: '2.0' as const,
    description: 'Cosui v2 动态 UI 协议：Agent 通过 JSON 消息声明组件树、数据绑定与事件动作，由宿主渲染为可交互的 UI',
    usage,
    $defs: {
        JsonValue,
        Record: RecordValue,
        Binding,
        Extensions,
        Component,
        PropsCommon,
        ...cosmicDefs,
        LinkInfo,
        ...cardDefs,
        Price
    },
    actions: {
        openUrl: {description: '由宿主执行 URL 打开策略', args: z.strictObject({url: z.url()})},
        sendPrompt: {description: '由宿主处理提示词', args: z.strictObject({prompt: z.string()})}
    },
    components: {...cosmicComponents, ...cardComponents, ...markdownComponents}
};
