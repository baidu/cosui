# 概述

Cosmic Dynamic UI v2 用 JSON 描述界面，并将协议中的 Component、数据和交互渲染为可操作的 UI。

## 核心概念

|概念|说明|
|---|---|
|Catalog|声明可用的 Component、Action 及其数据约束|
|Applet|独立的 UI 实例，包含 Component 和 Data|
|AppletContext|配置 Catalog、Component 和 Action，并管理 Applet|

## 核心能力

- 通过 JSON 创建和更新 UI。
- 使用 Catalog 校验 Component、属性、事件和 Action。
- 支持 Component 嵌套、条件渲染、循环渲染和数据绑定。
- 支持通过 JSON Pointer 更新 Data。
- 支持 Component 事件与 Action 处理。
- 支持一个 AppletContext 管理多个 Applet。
