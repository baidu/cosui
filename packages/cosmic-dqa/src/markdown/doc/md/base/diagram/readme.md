# Diagram 图表渲染

- 功能：命中语言标记为 `mermaid` / `markmap` / `mindmap` 的代码块时，渲染为可交互图表（视图切换 / 缩放 / 复制 / 导出 PNG / 全屏），渲染失败或不支持时降级为普通代码块
    - 同时支持中文别名代码块：语言标记为 `流程图` / `时序图` / `甘特图`（mermaid 语法）与 `思维导图`（markmap 语法），内容仍需为对应引擎语法
- 覆盖平台：PC/Mobile
- 开关：`diagram` 默认关，需显式开启；纯渲染配置经 `diagram-config` 传入，业务强耦合能力（复制/下载提示、打点、全屏调端、横竖屏）通过统一 `click` 事件（`{from: 'diagram', action, data}`）抛出

## 代码演示
