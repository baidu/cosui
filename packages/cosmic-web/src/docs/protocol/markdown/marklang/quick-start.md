# 快速接入
这份快速接入指南将帮助开发者迅速理解 **Marklang** 的输入配置与 API 使用，

## 安装

在你的项目中安装 Marklang SDK：

```bash
npm install marklang --save
```

## 初始化配置

`marklang(options)` 工厂函数支持以下核心配置：

```typescript
interface Options {
    // 是否将文本中的链接文本渲染为可跳转的链接
    autolink?: boolean;

    /**
     * 扩展协议注册表
     * key: 协议名称 (如 'ml-citation')
     * value: 处理函数，返回 HTML 字符串或 DOM 节点
     */
    directives?: Record<string, (info: DirectiveInfo, dom?: Node) => HTMLElement | string>;


    /**
     * AST 转换器配置
     * 用于在解析流程的不同阶段拦截并修改节点
     */
    transformers?: {
        /**
         * Markdown 语法层拦截（如修改链接 href）
         * 作用时机：Markdown 文本解析后，转换为 HTML 之前
         * 用途：处理 Markdown 语义层面的逻辑，如修改链接、提取文本、处理段落结构
         */
        mdast?: Record<string, (params: MdastTransformerParam) => void>;

         /**
         * HTML 结构层拦截 (如添加 class)
         * 作用时机：转换为 HTML 结构后，生成字符串/DOM 之前
         * 用途：处理 DOM 属性层面的逻辑，如添加 class、修改样式、增加 data-属性
         */
        hast?: Record<string, (params: HastTransformerParam) => void>;
    };
}
```

其中 Node 参考 hast 中的 [Nodes](https://github.com/syntax-tree/hast)，Element 参考 hast 中的 [Element](https://github.com/syntax-tree/hast#element)，其他参数定义:
```javascript
interface DirectiveInfo {
    name: string;
    properties?: Record<string, string>;
    content?: string;
}
export interface MdastTransformerParam {
    node: Node;
    index?: number;
    parent?: Parent;
    dataMap?: DataMap;
}

export interface HastTransformerParam {
    node: Element;
    index?: number;
    parent?: Element | Root;
    dataMap?: DataMap;
}
```

## 核心 API

| 方法 | 描述 | 适用场景 |
| :--- | :--- | :--- |
| `render(source)` | 输出 HTML 字符串 | **SSR** (Node.js 环境) |
| `renderToElement(source, el)` | 挂载/更新 DOM 节点 | **CSR** (浏览器环境) |
| `hydrate(el)` | 激活静态 HTML 事件 | **同构应用** (SSR + Hydrate) |

> API 详细介绍可见 [API 说明章节](/protocol/markdown/marklang/api)。

## 输出产物

Marklang 的解析结果并非简单的字符串替换，而是经过 **AST** 转换后的结构化产物：
*   在 **CSR 模式** 下，直接生成 **DOM 节点** 并挂载。
*   在 **SSR 模式** 下，生成包含 Hydration 标记的 **HTML 字符串**。

> 👉 [点击前往在线体验](/protocol/markdown/marklang/example)：直观感受 Markdown 文本如何转换为 AST 树及 UI 组件。

## 进阶特性说明

*   **协议扩展**：支持 `:ml-name` (内联)、`::ml-name` (块级)、`:::ml-name` (容器) 三种形态。
*   **数据注入**：SDK 会自动提取 `:::ml-data` 中的 JSON 数据，不进行 UI 渲染，可通过 API 获取用于业务逻辑。
    > 详见 [新增协议章节](/protocol/markdown/marklang/add-directive)

## 接入示例

以下示例展示了如何初始化 Marklang SDK，注册一个自定义的“警告框”协议，并将一段包含标准语法和扩展语法的 Markdown 渲染到页面上。


````javascript
import marklang from 'marklang';

const container = document.getElementById('app');

// 1. 初始化 SDK
const parser = marklang({
    autolink: true,
    // 自定义协议
    directives: {
        'ml-alert': node => {
            const type = node.properties.type || 'info';
            // CSR 必须返回 DOM 对象
            const el = document.createElement('div');
            el.className = `alert alert-\${type}`;
            el.innerHTML = `<strong>[\${type.toUpperCase()}]</strong> \${node.content}`;
            return el;
        }
    },
    // AST 转换器
    transformers: {
        mdast: {
            // 拦截链接：添加追踪参数
            link: ({node}) => {
                if (node.url.includes('?')) {
                    node.url += '&source=marklang-csr';
                }
                else {
                    node.url += '?source=marklang-csr';
                }
            }
        },
        hast: {
            // 拦截图片：添加懒加载属性
            img: ({node}) => {
                node.properties.loading = 'lazy';
            }
        }
    }
});

// 2. 准备 Markdown 文本
const source = `
# CSR 渲染示例

测试链接拦截：
[跳转测试](https://example.com)

测试图片拦截：
![](https://example.com/image.png)

自定义组件：
::ml-alert[客户端动态渲染]{type="warning"}
`;

// 3. 执行渲染

// SSR 模式,使用 render() 生成静态 HTML
if (ssr) {
    const html = parser.render(source);
    // 将 html 挂载到 container
    container.innerHTML = html;
}

// CSR 模式, 直接挂载到页面 DOM
else {
    parser.renderToElement(source, container);
}
````
