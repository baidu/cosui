# Catalog

按业务选择 Catalog，减少不需要的组件定义和模型输入 token：

|入口|组件范围|JSON Catalog|
|---|---|---|
|全量 `@cosui/cosmic-catalog`|cosmic + cosmic-card + cosmic-dqa|[catalog.json](/catalog.json)|
|基础 `@cosui/cosmic-catalog/base`|cosmic + cosmic-card + Markdown|[catalog.base.json](/catalog.base.json)|
|DQA `@cosui/cosmic-catalog/dqa`|基础 + cosmic-dqa|[catalog.dqa.json](/catalog.dqa.json)|

各入口都导出 `CATALOG`，协议版本均为 `2.0`。模型侧读取的 JSON Catalog 与宿主配置的运行时 Catalog。

Catalog 定义可用的Component、Action 及其数据约束，具体实现由宿主注册。

## 基本组成

|内容|说明|
|---|---|
|$id|Catalog 的唯一标识|
|version|对应的协议版本|
|title|Catalog 标题|
|description|Catalog 说明|
|usage|面向 Agent / LLM 的 Markdown 使用说明：协议用途、生成规则与示例|
|components|可用 Component 及其 Props、Children 和 Event 定义|
|actions|可用 Action 及其参数定义|
|$defs|可复用的数据约束|

### components

components 以 Component 类型名为 Key，每一项声明该 Component 可用的属性、子 Component 和事件。

```ts
components: {
    [ComponentName]: {
        // Component 的用途说明。
        description?: string;

        // Component 的 Props 约束，使用 Zod Object Schema 定义。
        props?: z.ZodObject;

        // 是否允许子 Component，以及允许的类型。
        // true：允许 Catalog 中任意类型；
        // false 或不传：不允许；
        // string[]：只允许数组中指定的 Component 类型。
        children?: boolean | readonly string[];

        // Event 名称及其 $event 数据结构，使用 Zod Schema 定义。
        events?: {
            [EventName]: z.ZodType;
        };
    };
}
```

具名插槽也在父 Component 的 props 中声明。父 Component 通过 `props.slot` 的枚举值列出可用插槽，子 Component 通过自己的 `props.slot` 选择插槽；进入默认插槽时不传 `slot`。

### actions

actions 以 Action 名称为 Key，每一项声明 Action 的用途和参数。Catalog 只声明能力，具体处理函数仍需由宿主注册。

```ts
actions: {
    [ActionName]: {
        // Action 的用途说明。
        description?: string;

        // Action 的参数约束，使用 Zod Object Schema 定义。
        args?: z.ZodObject;
    };
}
```

基础 Catalog 声明了两个 Action：

```ts
actions: {
    openUrl: {
        description: '由宿主执行 URL 打开策略',
        args: z.strictObject({
            url: z.url()
        })
    },
    sendPrompt: {
        description: '由宿主处理提示词',
        args: z.strictObject({
            prompt: z.string()
        })
    }
}
```

`openUrl` 接收 `url`，用于请求宿主打开链接；`sendPrompt` 接收 `prompt`，用于请求宿主发送提示词。两者都需要宿主注册同名 Action 处理函数。

## 基本使用

可以通过 defineCatalog 定义 Component 能力。

```ts
import {z} from 'zod';
import {defineCatalog} from '@cosui/cosmic-dynamic-ui';

const TravelInfo = z.strictObject({
    city: z.string(),
    days: z.number().int().positive()
});

const catalog = defineCatalog({
    $id: 'travel.v2',
    version: '2.0',
    components: {
        TravelCard: {
            props: TravelInfo
        }
    },
    actions: {},
    $defs: {TravelInfo}
});
```
