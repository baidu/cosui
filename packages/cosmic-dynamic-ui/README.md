# cosmic-dynamic-ui

Cosmic 动态 UI 解析渲染 SDK。模型按协议输出 UI 描述，本包负责将其解析渲染为可交互的真实界面，让 AI 生成的 UI 从"一段文本"变成"可用的组件"。

核心能力：

- **UI 编译**：UIJSON 描述一次性编译为 San 组件，适合静态 UI 场景
- **消息渲染**：基于 Catalog 校验协议消息，流式增量渲染、数据驱动更新，适合大模型对话场景
- **Schema 校验**：Catalog 由 Zod 声明并导出为 JSON Schema，渲染前即拦截非法协议；可选 autofix 自动修复常见问题
- **事件与行为**：组件事件可绑定宿主 Action，实现点击提交、表单收集等交互闭环

# 安装

```
npm i @cosui/cosmic-dynamic-ui
```

San 为 peer 依赖，需一并安装（`^3.14.1`）。

# 使用

```ts
import {AppletContext} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

// 注入组件协议、组件实现与宿主行为
const context = new AppletContext({catalog: CATALOG, components, actions});
context.listen({
    onAppletCreated: applet => applet.setRoot(document.getElementById('app')!)
});

// 处理模型下发的协议消息，自动渲染
const result = context.processMessage({
    version: '2.0',
    applet: {
        appletId: 'answer',
        data: {text: '你好'},
        components: [{id: 'root', type: 'Text', props: {value: '{{text}}'}}]
    }
});
if (!result.ok) console.error(result.errors);

// 流式更新数据，界面随之更新
context.processMessage({version: '2.0', appletId: 'answer', updates: [{path: '/text', value: '完成'}]});
```

# 官网
[官网](https://cosmic.now.baidu-int.com/)

# License
Apache License 2.0
