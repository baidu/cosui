# 概述

Markdown 组件是一个基于 **Marklang SDK** 的 UI 容器。它负责接收 LLM 的流式输出，实时解析并渲染为可交互的结构化界面。作为应用层的渲染入口，其主要职能包括：流式数据缓冲、子组件生命周期管理及交互事件分发。

## 功能特点

### 灵活的渲染方式
支持两种数据渲染模式：
- **流式渲染**：接收增量数据，支持三种展示效果：
  - 逐字展现
  - 逐句展现
  - 立即展现
- **全量渲染**：直接加载完整的 Markdown 内容

### 强大的[协议扩展](/protocol/markdown/marklang/add-directive)能力
集成 **Marklang SDK** 能力，原生支持 **GFM** 标准。通过协议扩展机制，自动将扩展语法（Directive/Attribute）映射为对应的 UI 组件实例。


### 数据与交互处理
*   **数据注入**：自动剥离 `:::ml-data` 中的 JSON 数据并注入组件 props，实现数据与视图解耦。
*   **事件代理**：统一捕获子组件（如视频播放、按钮点击）的交互事件，并向业务层透传，形成交互闭环。

### CSR & SSR Friendly
支持服务端直出 HTML（SSR）与客户端挂载（CSR）。提供完整的 **Hydrate（水合）** 机制，确保服务端渲染结果在端侧无缝激活交互能力。

## 协议说明
注意：html 标签只支持`<br>`

### 基础语法
[基础语法规范](https://github.github.com/gfm/) （包含段落，标题，列表，分割线，引用，代码块，表格等）
### 扩展语法
   1.[highlight](https://github.com/ipikuka/remark-flexible-markers)

   如：`==核心答案==`

   2.[数学公式](https://katex.org/docs/supported)

   需要用 `$` 或 `$$` 符号包裹

   如：`$c = \pm\sqrt{a^2 + b^2}$`

   3.[表格合并单元格扩展](https://github.com/wataru-chocola/remark-extended-table)

   4.标准语法基础上扩展属性：`语法{key="value" key2="value2" ..}`

   如：链接扩展 `[带笔记icon的链接](http://www.baidu.com){type="note"}`

   如：图片扩展 `![](https://gips1.baidu.com/it/u=1726338917,3904303031&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f54_54){width=16 height=16}`

   5.自定义协议遵循[规范](/protocol/markdown/marklang/add-directive)

已有协议，参考[markdown 组件](/protocol/markdown/component/index)文档

## 核心实现逻辑
组件通过 **“初始化 -> 流式控制 -> 渲染映射”** 的流程工作：

1.  **初始化映射**：启动时实例化 SDK，建立“Markdown 协议”到“组件类”的映射表。
2.  **流式控制**：通过 `appendContent` 接收数据。根据配置，决定是**即时上屏**，还是放入队列**按帧平滑追加**（打字机效果）。
3.  **解析与挂载**：调用 SDK 将文本编译为 AST。组件根据 AST 实例化对应的子组件并注入数据，同时由根节点统一接管 DOM 交互事件。
