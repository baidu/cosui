# JSON 协议
本协议旨在输出一套面向生成式组件的结构化 UI 描述语言，定义的内容包括视图、事件、数据等。

Markdown 扩展协议 与 JSON 协议 选型参考：[协议选型](/protocol/overview)

## 1. 协议背景
AI 生成式场景下，直接输出 Markdown/HTML 难以满足结构化、可交互、可控的多端 UI 需求，主要痛点包括：
*   **格式分散且缺少交互语义**：LLM 常以分段 Markdown 文本输出，无法表达复杂组件、事件、条件/循环等逻辑，直接渲染会丢失结构与交互。
*   **多源接入缺少统一协议**：智能体、MCP、第三方服务各有格式，需在“不改数据结构”的前提下用统一 JSON 范式描述 UI，便于快速接入与复用。
*   **需要数据到 UI 的完整链路**：需支持 UI Schema（结构+插值）与 Data Model（数据）分离、流式增量（如 SSE 分段）、声明式数据/行为绑定，降低 Token 消耗并控制幻觉。
*   **平台无关的高性能渲染**：协议需屏蔽端差异，将渲染逻辑下沉到客户端，在 Web/H5/Native 等多端保持一致体验与安全隔离。

## 2. 设计原则
* **结构化语义**：JSON 对象树描述视图层级；严禁可执行代码。
* **动静分离**：视图与数据分离，通过 `{{}}` 插值绑定。
* **抽象组件**：仅定义 Type 与 Props，不绑定平台实现。
* **逻辑内建**：内置 `if` / `for` 元字段。
* **增量驱动**：支持流式追加，适应模型逐步生成。

## 3. 设计理念
*   **声明式**：描述界面状态，而非绘制过程。
*   **原子化与组合**：支持原子与业务复合组件的嵌套复用。
*   **数据驱动**：动态内容均需通过插值引用 Data Model。

## 4. 协议构成
一个完整的 JSON 协议由两部分构成：
*   **UI Schema**：描述界面的视图节点、组件层级、逻辑控制流及交互触发器。
*   **Data Model**：描述渲染所需的静态值及上下文变量。

### 4.1 UI Schema

节点是描述的基础单元，是一个对象。节点包括有视图节点和非视图节点。
* 对于视图节点，节点承载视图的基本信息和嵌套信息
* 对于非视图节点，节点承载相应的功能信息，如数据、事件等

#### 4.1.1 节点

UI 结构由嵌套的 **UI Node** 节点对象组成。每个节点对象必须符合以下 JSON 结构：

| 字段名 | 类型 | 必选 | 描述 | 约束 |
| :--- | :--- | :--- | :--- | :--- |
| **type** | `string` | **是** | 组件类型标识符 | 必须匹配内置组件表或自定义组件注册表中的 Key。 |
| **props** | `object` | 否 | 组件属性集合 | 包含样式、外观及组件专属参数。支持静态值与插值。 |
| **children** | `array` | 否 | 子节点列表 | 递归定义，包含一组 UI Node 对象。 |
| **if** | `string` | 否 | 条件渲染指令 | 值为布尔表达式字符串。当表达式为 falsy 时，该节点及其子节点不应被渲染。 |
| **for** | `string` | 否 | 循环渲染指令 | 格式须符合 `item, index in list` 语法。 |
| **events** | `object` | 否 | 交互事件定义 | Key 为事件名，Value 为动作配置数组。 |

#### 4.1.2 属性描述
`props` 对象用于描述组件的静态外观与动态参数。协议定义了以下保留字段，其余字段随 `type` 定义。

* `style`: 定义内联样式。建议优先使用 CSS 变量或 Token。
* `class`: 定义类名标记，用于匹配设计系统的预置样式。
* `appearance`: 定义组件的变体。
* `slot`: 具名插槽标识，用于将当前节点插入到父组件的指定位置。

#### 4.1.3 数据绑定（插值）
使用 **双大括号 `{{ }}`** 作为数据绑定的定界符。

**语法范式**：
```
&#123;&#123; expression &#125;&#125;
```
**解析范围**：解析器应支持读取 **Data Model** 中的字段。
**插值内可应用表达式**：
* 支持的表达式，包括：
    * 数据访问：`name`、 `person.name`
    * 一元否定：`!login`
    * 二元运算：`num1 + 200`
    * 二元关系：`num1 > num2` 、 `isLogin && isSuccess`
    * 三元条件：`num1 > num2 ? num1 : num2`
    * 括号：`a * (b + c)`
    * 字符串：`'hello'`
    * 数值：`1`
    * 布尔：`true` 、`false`
    * 数组字面量：[1, 2, 3]
    * 对象字面量：{name: 'foo'}

* 值引用本身为静态字符和插值的混合时，是一种表达式：
    * Text：`Hello {{name}}！`
* **禁止**：禁止函数定义、赋值操作或访问全局 Window 对象。

**取值**
* 当值引用的字符串，仅包含一个插值时，值为数据的直接引用。
* 当值引用的字符串，包含静态字符和插值的混合时，值为静态字符和插值数据 toString 后的叠加字符串。


#### 4.1.4 事件交互
协议通过 `events` 字段定义交互逻辑。采用 **事件(Event) -> 动作(Action)** 的映射机制。

**结构定义：**

```
"events": {
  "[EventName]": [
    { "action": "[ActionName]", "option": { ... } }
  ]
}
```

*   **EventName**：由组件定义的触发时机（如 `click`, `change`）。
*   **ActionName**：协议约定的行为指令（如 `link` 跳转, `toast` 提示, `sendPrompt` 回传指令）。
*   **Option**：传递给 Action 的参数，支持使用 &#123;&#123;$event&#125;&#125; 引用原生事件对象，或 &#123;&#123;$data&#125;&#125; 引用上下文数据。


### 4.2 Data Model

* 包含一个全局数据环境，且数据环境是一个可 JSON 序列化的对象
* 视图属性、行为运行时，可通过插值引用数据环境中的数据项
* 通过数据声明可以操作和更改所在环境的数据。数据或数据源节点可以以浅层追加的方式，操作数据环境中的数据项；可以包含多个数据声明。对于相同的数据项，后声明覆盖前声明。

## 5. 扩展机制
* **自定义组件**：扩展 `type` 引入新组件，需 props Schema；协议仅描述输入与位置，内部交互由渲染端实现。
* **自定义行为**：扩展 `action` 引入新行为，需定义清晰的 `option` 结构。

## 6. 示例
以下是一个符合本协议规范的标准 JSON 协议。它描述了一个包含条件判断、循环列表和点击交互的卡片组件。

```json
{
    "ui": {
        "type": "block",
        "props": {
            "class": "container",
            "style": {
                "padding": "16px"
            }
        },
        "children": [
            {
                "type": "text",
                "props": {
                    "value": "搜索结果：&#123;&#123;totalCount&#125;&#125; 条",
                    "class": "header-text"
                }
            },
            {
                "type": "block",
                "if": "items.length > 0",
                "props": {
                    "class": "cos-row cos-row-col-12 cos-gutter",
                    "style": {
                        "--cos-grid-gutter": "16px;"
                    }
                },
                "children": [
                    {
                        "type": "image",
                        "for": "item, index in items",
                        "props": {
                            "src": "&#123;&#123;item.src&#125;&#125;",
                            "alt": "&#123;&#123;item.alt&#125;&#125;",
                            "class": "cos-col-4"
                        },
                        "events": {
                            "click": [
                                {
                                    "action": "link",
                                    "option": {
                                        "url": "&#123;&#123;item.detailUrl&#125;&#125;",
                                        "source": "search_result"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    "dataExtends": {
        "totalCount": 2,
        "items": [
            {
                "src": "https://gips1.baidu.com/it/u=2479417158,2594490198&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f186_248",
                "alt": "Project A",
                "detailUrl": "https://www.baidu.com"
            },
            {
                "src": "https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9",
                "alt": "Project B",
                "detailUrl": "https://www.baidu.com"
            }
        ]
    }
}
```

## 7. 推荐实现

* 推荐解析器：[Dynamic UI](/protocol/json/overview/index)
