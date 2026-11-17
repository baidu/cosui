# API 说明

## 初始化
描述：`function marklang(options?: Options)`;

options参数：
```javascript
import {Node, Parent} from 'mdast';
import {Root, Element} from 'hast';

interface Options {
    // 自定义指令处理器
    directives?: Record<string, (info: DirectiveInfo, dom?: ChildNode | null) => HTMLElement | string | void>;
    // mdast 和 hast 节点转换器
    transformers?: {
        mdast?: Record<string, (params: MdastTransformerParam) => void>;
        hast?: Record<string, (params: HastTransformerParam) => void>;
    };
    // 是否启用单波浪线删除线语法，默认为 false
    // 开启后 ~text~ 会被解析为删除线
    singleTilde?: boolean;
    // 是否启用自动链接，默认为 false
    // 开启后 URL 会被自动转换为链接
    autolink?: boolean;
}
```
参数：其中 Node 参考 mdast 中的 [Nodes](https://github.com/syntax-tree/mdast)，Element 参考 hast 中的 [Element](https://github.com/syntax-tree/hast#element)，其他参数定义:
```javascript
interface DirectiveInfo {
    // 指令名称
    name: string;
    // 属性
    properties?: Record<string, unknown>;
    // 文本内容
    content?: string;
    // 子节点
    children?: Node[];
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

export interface DataMap {
    [key: string]: unknown;
}
```
用法：
```javascript
import marklang from 'marklang';
marklang({
    directives: {
        'ml-citation': (info, dom) => {
            // 如果配合 renderToElement 使用，则返回dom
            return document.createElement('div');
            // 配合 render 使用，返回字符串。注意：扩展协议返回的 html 只能有一个根节点
            return `<div>{info.content}</div>`
        }
    },
    transformers: {
        mdast: {
            link: ({node}) => {
                node.url = process(node.url);
            }
        },
        hast: {
            pre: ({node}) => {
                node.properties.className = ['name-1']
            }
        }
    },
    // 启用单波浪线删除线
    singleTilde: true,
    // 启用自动链接
    autolink: true
});
```

## 实例 API

### render（服务端）

描述：`render(source: string): string`

解释：markdown 解析为 HTML 字符串，source 代表 markdown 语法。**仅在服务端构建中可用**。

用法：
```javascript
import marklang from 'marklang';

const html = marklang(options).render(source);
```

### renderToElement（客户端）

描述：`renderToElement(source: string, el: HTMLElement): void`

解释：markdown 解析后渲染到 el 中，source 代表 markdown 语法。**仅在客户端构建中可用**。

用法：
```javascript
import marklang from 'marklang';

marklang(options).renderToElement(source, document.getElementById('app'));
```

### renderToElementAsync（客户端）

描述：`renderToElementAsync(source: string, el: HTMLElement): Promise<void>`

解释：异步版本的 `renderToElement`，会等待按需加载的插件（如 KaTeX、highlight.js）加载完成后再渲染。**仅在客户端构建中可用**。

用法：
```javascript
import marklang from 'marklang';

await marklang(options).renderToElementAsync(source, document.getElementById('app'));
```

### hydrate（客户端）

描述：`hydrate(el: HTMLElement): void`

解释：服务端渲染后的字符串，与客户端的 dom 水合。只有在服务端写过 directive handler 的协议，才会与客户端的directive handler 水合。服务端和客户端的 directive 必须一一对应，具体使用可参考下面的示例部分。**仅在客户端构建中可用**。

用法：
```javascript
import marklang from 'marklang';

marklang(options).hydrate(el);
```

## 静态 API

### dataToSource

描述：`dataToSource(key: string, data: unknown): string`

说明：生成 `ml-data` 协议字符串。

用法：
```javascript
import marklang from 'marklang';

const citationList = {test: 1};
const citationDataSource = marklang.dataToSource('data1', citationList);

// 得到的数据是 \n:::ml-data{name=data1}\n```json\n{"test":1}\n```\n:::\n\n

marklang({
    directives: {
        'ml-citation': (info) => {

            // 可通过 node.properties.data 获取 ml-data 协议中存储的数据
            console.log(info.properties.data); // 结果应该是 citationList 的值
            return '<span>' + info.content + '</span>';
        }
    }
}).render(markdown + citationDataSource);
```

html 输出结果
```html
<span>1</span>
```

若没有添加 `ml-citation` 的处理函数，直接调用 `marklang().render(markdown)`，则 html 输出结果为
```html
<ml-citation data="citation">1</ml-citation>
```

### dataToAst

描述：`dataToAst(markdown: string): Node`

说明：将 Markdown 字符串解析为 mdast 抽象语法树，返回 AST 根节点。可用于自定义处理或分析 Markdown 结构。

用法：
```javascript
import marklang from 'marklang';

const ast = marklang.dataToAst('# Hello World\n\nThis is a paragraph.');
console.log(ast.type); // 'root'
console.log(ast.children[0].type); // 'heading'
```

返回值示例：
```javascript
{
    type: 'root',
    children: [
        {
            type: 'heading',
            depth: 1,
            children: [{ type: 'text', value: 'Hello World' }]
        },
        {
            type: 'paragraph',
            children: [{ type: 'text', value: 'This is a paragraph.' }]
        }
    ]
}
```

## 插件 API（客户端）

> 注意：插件相关 API 仅在客户端构建中可用，用于实现按需加载功能。

### registerPlugin

描述：`registerPlugin(plugin: Plugin): void`

说明：注册一个按需加载的插件。当渲染的 Markdown 内容匹配插件特征时，插件会被自动加载。

参数：
```javascript
interface Plugin {
    // 插件名称，用于标识和缓存
    name: string;
    // 正则表达式，用于匹配 Markdown 内容，判断是否需要加载此插件
    feature: RegExp;
    // 加载函数，返回动态 import 的 Promise 数组
    load: () => Promise<any>[];
}
```

用法：
```javascript
import marklang from 'marklang';

// 注册数学公式插件
marklang.registerPlugin({
    name: 'math',
    // 匹配数学公式语法
    feature: /\$[^$]+\$|\$\$[^$]+\$\$/,
    // 动态加载相关依赖
    load: () => [
        import('marklang/plugins/remark-math'),
        import('marklang/plugins/rehype-katex')
    ]
});

// 注册代码高亮插件
marklang.registerPlugin({
    name: 'highlight',
    // 匹配代码块语法
    feature: /^```/m,
    load: () => [
        import('marklang/plugins/rehype-highlight')
    ]
});
```

### preloadPlugin

描述：`preloadPlugin(source: string): Promise<void>`

说明：根据 Markdown 内容预加载所需的插件。在渲染前调用可避免渲染时的延迟。

用法：
```javascript
import marklang from 'marklang';

// 提前预加载插件
await marklang.preloadPlugin(markdownContent);

// 后续渲染将直接使用已缓存的插件
const instance = marklang(options);
instance.renderToElement(markdownContent, el);
```

## 构建版本说明

marklang 提供两种构建版本：

| 版本 | 入口文件 | 特点 |
|------|----------|------|
| 服务端版本 | `lib/node.js` | 内置所有插件（数学公式、代码高亮等），提供 `render` 方法 |
| 客户端版本 | `lib/browser.js` | 支持按需加载插件，提供 `renderToElement`、`renderToElementAsync`、`hydrate` 方法 |

服务端使用示例：
```javascript
// Node.js 环境
import marklang from 'marklang';

const html = marklang().render('# Hello');
```

客户端使用示例：
```javascript
// 浏览器环境
import marklang from 'marklang/lib/browser.js';

// 注册按需加载插件
marklang.registerPlugin({...});

// 渲染
marklang().renderToElement('# Hello', document.body);
```
