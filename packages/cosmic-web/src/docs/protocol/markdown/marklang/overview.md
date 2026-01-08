
# 概述
**Marklang** 是上述 [Markdown 扩展协议](/protocol/markdown/content/index) 的**标准参考实现**。
作为一个 **Markdown 到 UI 界面的编译器**，它基于 Remark 构建，能够将非结构化的 Markdown 文本流实时编译为 **Virtual DOM** 或 **HTML**。SDK 内置了数据绑定与交互处理机制，为大模型生成内容的渲染提供底层支持。

## 核心特性
*   **Remark 生态兼容**：继承 Remark 强大的插件生态
*   **GFM 原生支持**：开箱即用，默认支持表格、自动链接、删除线等标准语法。
*   **Directive 标准解析**：内置内联/块级/容器协议的 AST 转换逻辑，开发者只需聚焦组件实现，无需处理语法解析。
*   **数据/视图分离**：自动提取 `:::ml-data` 中的 JSON 数据且不渲染 DOM，实现数据与视图分离。
*   **CSR & SSR 同构**：完整支持服务端直出 (SSR)、客户端挂载 (CSR) 及 hydration(水合)，保障首屏性能与交互一致性。
*   **框架无关**：解析核心不绑定特定组件库，仅生成标准 AST 或 HTML，可适配任意前端框架。
