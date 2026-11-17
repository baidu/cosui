## API

### Props

| 名称  | 类型  | 默认    | 是否必选 | 说明     | 覆盖平台 |
|------|------|---------|---------|---------|---------|
| text       | string  | 展示文案 | 可选    | 初始搜索词，可以和展示文案不同；未传时使用展示文案 | PC/Mobile |
| id         | string  | - | 可选    | 当前 ml-search 的唯一标识，可用于业务侧查询链接信息及定向刷新 | PC/Mobile |

### Events
|事件|参数|说明|覆盖平台|
|---|---|---|---|
| click | {directive: string,event:Event,word:string,href:string} | 点击 |PC/Mobile|

### config
config 是 Markdown 组件对外提供的指令配置属性，非 ml-search 语法中的属性。详情见 [Markdown 组件](/components/cosmic-dqa/markdown)。  
调用方需要将 ml-search 指令的配置放在 `config['ml-search']` 下，并通过 Markdown 组件的 config 属性传入，从而实现业务对于指令的自定义配置。

| 名称  | 类型  | 默认    | 是否必选 | 说明     | 覆盖平台 |
|------|------|---------|---------|---------|---------|
| getLinkInfo | (text: string, context?: MlSearchLinkContext) => MlSearchLinkInfo | - | 可选 | 由业务解析当前回搜的点击状态、链接和查询词；返回结果没有 href 时不可点击 | PC/Mobile |
| sa       | string  | 're_dqa_zy' | 可选    | 未配置 getLinkInfo 时，生成默认百度搜索链接使用的来源参数 | PC/Mobile |

**说明：**

ml-search 只负责解析指令和展示链接，getLinkInfo 允许调用方自行控制链接状态、查询词和跳转地址，从而保证组件与业务逻辑解耦。

未配置 getLinkInfo 时，组件默认生成百度搜索链接：

- PC：https://www.baidu.com/s?word={text}&sa={sa}, 默认 target 为 _blank。
- Mobile：https://m.baidu.com/s?word={text}&sa={sa}, 默认 target 为 _self。

#### MlSearchLinkContext
CSR 调用 getLinkInfo 时通过第二个参数 context 传入当前指令上下文：

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| id | string | - | Markdown 指令的 id 属性 |

#### MlSearchLinkInfo
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| clickable | boolean | true | 是否允许点击；显式传 false 时，即使存在 href 也保持不可点击 |
| href | string | - | 点击后的跳转地址 |
| target | string | PC 为 _blank，Mobile 为 _self | 链接打开方式 |
| query | string | text | 当前实际搜索词 |

CSR 最终进入可点击态需要 clickable 为 true 且 href 有效：

- 业务未返回 clickable，但返回了 href：视为可点击。
- 业务显式返回 clickable: false：保持不可点击。
- 业务返回 clickable: true，但未返回 href：仍不可点击。
- 不可点击时使用 cosd-markdown-research-disabled 样式，不触发点击事件和页面跳转。
