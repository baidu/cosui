# COSUI

一套面向 AI 时代的前端 UI 解决方案，包含 UI 协议、解析渲染 SDK 与 UI 组件库等，可应用于生成式 UI、智能体、AI 对话等多种大模型场景。

特点：

- 数据驱动渲染的 UI 协议
    - Markdown 扩展协议：Markdown 纯文本基础之上可结构化展现、动态交互
    - JSON 动态协议：JSON 协议 可灵活重组，动态定制

- UI 解析渲染 SDK：包含 Markdown 扩展协议解析渲染、JSON 协议解析及渲染的完整 SDK 解决方案

- 基于 San 的 UI 组件
    - 基于设计系统： Cosmic Design Token
    - 多端适配：支持移动 H5 和 PC 双端
    - 主题定制：支持自定义主题
    - 组件分层：支持基础、行业场景划分
    - 组件库独立：支持按需加载

- 平台化管理：设计到代码工具化输出，资产平台化管理，产品设计研发高效协同

# 安装

- 安装组件库

```
npm i @cosui/cosmic
npm i @cosui/icon
```

- 按需配置别名

```
// webpack.config.js
{
   // ...
    resolve: {
        alias: {
            '@cosui/cosmic': path.join(
                path.dirname(require.resolve('@cosui/cosmic').replace('/dist/mobile', '')),
                `dist/${platform === 'pc' ? 'pc' : 'mobile'}`
            )
        }
    }
}
```

# 使用

```
// index.ts
import '@cosui/icon/dist/cos-icon.css';
import '@cosui/cosmic/tokens.css';
import '@cosui/cosmic/index.css';

// demo.ts
import {Component} from 'san';

// 按需引入组件
import Avatar from '@cosui/cosmic/avatar';

export default class Demo extends Component {
    // ...

    static components = {
        // ...
        'cos-avatar': Avatar
    };

    initData() {
        return {
            src: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        }
    }
}
```

# 贡献
欢迎一起共建，[贡献指南](./CONTRIBUTING.md)

# License
Apache License 2.0