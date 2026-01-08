# API 说明

## 初始化
描述：`function marklang(options: Options)`;

options参数：
```javascript
import {Node, Parent} from 'mdast';
import {Root, Element} from 'hast';
interface Options {
    directives?: Record<string, (info: DirectiveInfo, dom?: ChildNode | null) => HTMLElement | string | void>;
    transformers?: {
        mdast?: Record<string, (params: MdastTransformerParam) => void>;
        hast?: Record<string, (params: HastTransformerParam) => void>;
    };
}
```
参数：其中 Node 参考 hast 中的 [Nodes](https://github.com/syntax-tree/hast)，Element 参考 hast 中的 [Element](https://github.com/syntax-tree/hast#element)，其他参数定义:
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
    }
});
```

## 实例 API
### render
描述：`render(source: string): string`

解释：markdown 解析为 HTML 字符串，source 代表 markdown 语法

用法：
```javascript
const html = marklang(options).render(source);
```
### renderToElement
描述：`renderToElement(source: string, el: HTMLElement): void`

解释：markdown 解析后渲染到 el 中，source 代表 markdown 语法

用法：
```javascript
marklang(options).renderToElement(source, el);
```

### hydrate

描述：`hydrate(el: HTMLElement)`

解释：服务端渲染后的字符串，与客户端的 dom 水合。只有在服务端写过 directive handler 的协议，才会与客户端的directive handler 水合。服务端和客户端的 directive 必须一一对应，具体使用可参考下面的示例部分。

用法：
```javascript
marklang(options).hydrate(el);
```

## 静态 API

### dataToSource

描述：`dataToSource(key: string, data: unknow): string`

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
