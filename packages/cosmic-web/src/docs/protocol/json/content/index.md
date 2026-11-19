# JSON 协议
本协议旨在输出一套面向生成式组件的结构化 UI 描述语言，定义的内容包括视图、事件、数据等。AI 输出结构化 JSON 而非可执行代码，由渲染端基于预定义组件与行为完成安全、可控的 UI 渲染。

Markdown 扩展协议 与 JSON 协议 选型参考：[协议选型](/protocol/overview)

## 1. 协议背景
AI 生成式场景下，直接输出 Markdown/HTML 难以满足结构化、可交互、可控的多端 UI 需求，主要痛点包括：
*   **格式分散且缺少交互语义**：LLM 常以分段 Markdown 文本输出，无法表达复杂组件、事件、条件/循环等逻辑，直接渲染会丢失结构与交互。
*   **多源接入缺少统一协议**：智能体、MCP、第三方服务各有格式，需要用统一 JSON 范式描述 UI，便于快速接入与复用。
*   **需要数据到 UI 的完整链路**：需支持 UI 与数据分离、流式增量、声明式数据/行为绑定，降低 Token 消耗并控制幻觉。
*   **平台无关的高性能渲染**：协议需屏蔽端差异，将渲染逻辑下沉到客户端，在 Web/H5/Native 等多端保持一致体验与安全隔离。

## 2. 协议版本

| 版本 | 说明 | 文档 | 推荐解析器 |
| :--- | :--- | :--- | :--- |
| **v2** | 以 Applet 为运行时单元，通过 `applet` / `updates` 显式消息管理 UI 的创建、更新与销毁，并由 Catalog Schema 约束组件、属性、事件与行为。 | [v2 JSON 协议](/protocol/json/v2/content) | [v2 协议解析](/protocol/json/v2/overview) |
| **v1** | 以 UI Content 为中心，由 UI Schema 与 Data Model 构成，支持插值绑定、`if` / `for` 逻辑与流式追加。 | [v1 JSON 协议](/protocol/json/v1/content) | [v1 协议解析](/protocol/json/overview/index) |

新接入场景推荐使用 v2；已基于 v1 接入的场景可继续使用 v1。

## 3. 版本差异

| 维度 | v1 | v2 |
| :--- | :--- | :--- |
| **协议模型** | 以 UI Content 为中心，描述生成的 UI 内容 | 引入 Runtime Message，以显式操作管理 UI 状态 |
| **生命周期** | 无独立的生命周期协议 | 新增 `applet`、`updates` 消息 |
| **多 UI 管理** | 围绕 UI 内容及共享数据环境 | 支持多 Applet，各自管理独立状态与生命周期 |
| **组件组织** | 以嵌套 UI Tree 为主，同时支持 ID 引用 | 强化 Component ID 与引用关系，支持独立更新组件 |
| **UI 增量更新** | 通过流式追加 UI Node | 通过 `updates` 显式新增或替换 Component |
| **Data 增量更新** | 浅层追加，后声明覆盖前声明 | 按 JSON Pointer `path` 更新数据，支持显式删除字段 |
| **数据绑定** | <code>&#123;&#123; expression &#125;&#125;</code> | 延续 <code>&#123;&#123; expression &#125;&#125;</code>，新增 JSON Pointer 绝对路径写法 |
| **事件行为** | `events` 中使用 `action` + `option` | `events` 中使用 `action` + `args`，参数受 Action Args Schema 约束 |
| **组件与行为约束** | 支持自定义 Component / Action | 新增独立 Catalog，通过 Schema 约束 Component、Props、Children、Event 和 Action |
| **扩展机制** | 自定义组件及行为 | 新增命名空间化 Extensions，承载非核心元数据 |

## 4. 共同设计原则
* **结构化语义**：JSON 对象树描述视图层级；严禁可执行代码。
* **动静分离**：视图与数据分离，通过 <code>&#123;&#123;&#125;&#125;</code> 插值绑定。
* **抽象组件**：仅定义 Type 与 Props，不绑定平台实现。
* **增量驱动**：支持流式生成，适应模型逐步输出。
