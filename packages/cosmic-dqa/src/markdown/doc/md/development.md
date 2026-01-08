# 开发指南

> markdown 组件基于 [marklang SDK](/protocol/markdown/marklang/overview) 实现，支持 Markdown 基础规范&自定义扩展语法，支持 SSR&CSR。

若要新增协议，需要开发 markdown 组件，新增协议对应的处理逻辑。

## 扩展流程概述
开发一个新的 Markdown 扩展协议，通常包含以下三个步骤：

*  **定义语法**：确定 Markdown 中的协议写法（内联/块级/容器）。
*  **实现逻辑**：编写 CSR 和 SSR 的渲染处理函数。
*  **注册配置**：在 Markdown 组件的生命周期中注册该协议。

## 编写协议处理逻辑

我们以新增一个内联协议 `:ml-test[展示文本]{name="xxx"}` 为例。根据渲染内容的复杂度，分为 **“挂载 UI 组件”** 和 **“原生 DOM 渲染”** 两种方式。

### 挂载 UI 组件 (复杂交互场景)

如果协议需要渲染复杂的业务组件（如 San 组件），需注意 CSR 阶段的挂载与生命周期管理。

```typescript
// src/directives/ml-test.ts
import TestComponent from 'xxx/test'; // 引入你的业务组件
import { DirectiveInfo } from './interface';

const mlTest = {
    // 1. CSR 渲染逻辑 (返回 DOM 节点)
    // 注意：函数需通过 bind(this) 绑定 Markdown 组件实例
    csr: function (node: DirectiveInfo) {
        // 创建挂载容器
        const el = document.createElement('span');

        // 实例化业务组件
        const comp = new TestComponent({
            data: {
                name: node.properties?.name || 'default',
                content: node.content
            }
        });

        // 挂载组件
        comp.attach(el);

        // 【关键步骤】将组件实例注册到 Markdown 父组件中
        // 用于后续的资源释放与生命周期管理
        this.setDirectiveComponents('ml-test', comp);

        return el;
    },

    // 2. SSR 渲染逻辑 (返回 HTML 字符串)
    ssr: (node: DirectiveInfo) => {
        const data = node.properties?.data;
        // 调用组件的 SSR 方法生成 HTML 字符串
        return TestComponent.ssr({
            ...data,
            content: node.content
        });
    }
};

export default mlTest;
```


### 原生 DOM 渲染 (简单展示场景)

如果协议仅展示静态样式或简单链接，无需另外引入组件，可参考 `ml-search` 的实现。

```typescript
// src/directives/ml-search.ts
import { DirectiveInfo } from './interface';

const mlSearch = {
    // CSR: 返回 HTMLElement
    csr: (node: DirectiveInfo) => {
        const el = document.createElement('a');
        el.className = 'cos-color-text-link';
        el.href = node.properties?.href || '#';
        el.target = '_self';
        el.textContent = node.content || '';

        // 阻止语音播报穿透 (可选)
        el.setAttribute('rl-type', 'stop');

        return el;
    },

    // SSR: 返回 HTML String
    ssr: (node: DirectiveInfo) => {
        const href = node.properties?.href || '#';
        const content = node.content || '';
        return `<a class="cos-color-text-link" href="\${href}" target="_self" rl-type="stop">\${content}</a>`;
    }
};

export default mlSearch;
```

## 3. 注册协议配置

完成逻辑编写后，需要在 Markdown 组件的入口文件中进行注册。

> **配置文件路径**：
> *   PC端: `markdown/pc/index.ts`
> *   移动端: `markdown/mobile/index.ts`

### SSR 配置

在组件初始化阶段，检测到服务端环境时进行配置。

```javascript
import mlTest from './ml-test';

export default class Markdown extends Component {
    inited() {
        const content = this.data.get('content');
        const isServer = typeof window === 'undefined';

        if (isServer) {
            // 初始化 SDK 并注册 SSR 处理函数
            const html = marklang({
                directives: {
                    'ml-test': mlTest.ssr, // 注册 SSR 处理器
                    // ... 其他协议
                },
            }).render(this.getContent(content));

            // 将生成的 HTML 写入数据
            this.data.set('_html', html);
        }
    }
}
```

### CSR 配置

在组件挂载阶段，配置客户端解析逻辑。

```javascript
import mlTest from './ml-test';

export default class Markdown extends Component {
    attached() {
        const el = this.ref('markdownRef');
        const content = this.data.get('content');

        const marklangOptions = {
            directives: {
                // 【注意】必须绑定 this，以便在处理器内部调用 setDirectiveComponents
                'ml-test': mlTest.csr.bind(this)
            }
        };

        const marklangIns = marklang(marklangOptions);

        // 执行渲染并挂载到 DOM
        marklangIns.renderToElement(this.getContent(content), el);
    }
}
```


## 进阶技巧

### 外部数据注入
如果 Markdown 语法中需要依赖外部传入的复杂数据（如 JSON 对象），直接拼接字符串容易出错。建议使用 `dataToSource` 工具函数。

> 详见 [协议扩展 - ml-data 数据](/protocol/markdown/marklang/data)

### 语音播报控制
如果协议渲染的内容（如装饰性图标、代码块行号）不需要被 TTS（语音合成）播报，请在对应的 DOM 节点上添加 `disable-audio` 属性。

```javascript
el.setAttribute('disable-audio', 'true');
```