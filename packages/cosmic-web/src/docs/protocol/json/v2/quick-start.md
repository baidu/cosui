# 快速接入

## 安装

```bash
npm install @cosui/cosmic-dynamic-ui @cosui/cosmic-catalog @cosui/cosmic san zod
```

## 配置 appletContext

```ts
import san from 'san';
import {z} from 'zod';
import Button from '@cosui/cosmic/button';
import {appletContext, defineCatalog} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

const Text = san.defineComponent({
    template: '<span>{{value}}</span>'
});

const catalog = defineCatalog({
    ...CATALOG.definition,
    $id: 'cosui.quick-start.v2',
    components: {
        ...CATALOG.definition.components,
        Text: {
            props: z.strictObject({value: z.string()})
        }
    }
});

appletContext.config({
    catalog,
    components: {Button, Text},
    actions: {
        sendPrompt: ({args}) => {
            console.log(args.prompt);
        }
    }
});

appletContext.listen({
    onError: error => {
        console.error(error);
    }
});
```

## 创建并更新 Applet

```ts
const applet = appletContext.createApplet({
    root: document.querySelector<HTMLElement>('#app')!
});

const result = applet.processMessage({
    updates: [
        {
            id: 'root',
            type: 'Button',
            props: {appearance: 'primary'},
            children: ['label'],
            events: {
                click: [{
                    action: 'sendPrompt',
                    args: {prompt: '已点击按钮'}
                }]
            }
        },
        {
            id: 'label',
            type: 'Text',
            props: {value: '开始使用'}
        }
    ]
});

if (!result.ok) {
    console.error(result.errors);
}
```

## 销毁

```ts
applet.dispose();
appletContext.dispose();
```


## 模型生成实践建议

Catalog 全集体积较大，不建议整份交给模型。推荐分两步生成

### 准备 Catalog

以下为推荐结构，可根据自有需求调整。

- 无自有 Catalog 时，可使用官方全集：`exportCatalog(CATALOG)` 的结果与 [catalog.json](/catalog.json) 一致，内含 usage。
- 推荐拆成三部分：
    - usage：协议说明，生成协议时使用。
    - 组件描述列表：可选组件的名称和组件自身的 `description`，不含 props、events 等完整定义。
    - 按组件名取完整定义的函数：返回选中组件的定义、actions，以及它们引用的 `$defs`。
- 建议保留内置组件（Div、Divider、Column、Row、Flex、Text），除非扩展组件已覆盖这些能力或明确不需要。
- 可选组件范围建议与宿主注册的组件实现一致，避免模型选到无法渲染的组件。

### 第一步：选组件

- 只把组件描述列表交给模型，让模型结合用户意图(及已有数据等信息)选出需要的组件名，例如 `["Markdown","CitationList"]`。
- 过滤掉不在可选范围内的组件名。

### 第二步：生成协议

- 用选中的组件名取完整定义，与 usage 一起交给模型输出协议。
- 要求模型按 NDJSON 输出，每行一条完整消息，便于流式逐行解析和渲染。
- 每行先用 json string fix（如在线体验中的 `repairJson`）修复 JSON 字符串，再交给开启 `autofix: true` 的 AppletContext 处理。
- 调试时可打印第二步的 Prompt、流式结果和修复后的完整 JSON，便于定位协议问题。