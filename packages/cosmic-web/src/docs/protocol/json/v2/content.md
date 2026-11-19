# v2 JSON 协议
本协议旨在输出一套面向生成式组件的结构化 UI 描述语言，以 Applet 为独立 UI 单元，通过 JSON 消息描述 UI 的创建、更新与销毁，并通过 Catalog 约束可使用的组件与行为。

版本说明：[JSON 协议](/protocol/json/content/index)，历史版本：[v1 JSON 协议](/protocol/json/v1/content)

## 1. 协议背景
v1 JSON 协议以 UI 内容为中心，适合一次性生成并渲染 UI。随着生成式 UI 从静态展示走向持续交互，出现了新的需求：
*   **UI 需要持续更新**：生成后的 UI 需要按对话进展局部修改或销毁，而不只是追加内容。
*   **页面中存在多个 UI 区块**：多个 UI 需要各自维护数据和状态，互不影响。
*   **生成内容需要可校验**：模型输出的组件、属性和行为需要有明确边界，避免生成渲染端不支持的内容。

v2 在保留 v1 声明式 UI、数据绑定与事件交互的基础上，引入 Applet 生命周期消息与 Catalog 能力约束来满足这些需求。

## 2. 设计原则
* **结构化语义**：JSON 描述组件、数据与交互；严禁可执行代码。
* **动静分离**：视图与数据分离，通过 <code>&#123;&#123;&#125;&#125;</code> 插值绑定。
* **独立单元**：每个 Applet 独立创建、更新、销毁，支持多个 Applet 同时存在。
* **增量驱动**：支持流式生成，可局部更新已有组件与数据。
* **能力约束**：组件、属性、事件与行为须在 Catalog 中声明。

## 3. 设计理念
*   **声明式内容，显式操作**：UI 内容以声明式描述，创建、更新、删除通过显式消息完成。
*   **数据驱动**：动态内容通过插值引用数据，更新数据即可更新 UI。
*   **能力与内容分离**：Catalog 定义“能用什么”，消息描述“实际渲染什么”。

## 4. 协议构成
一个完整的 v2 JSON 协议由两部分构成：
*   **Runtime 消息**：通过 `applet`、`updates` 消息描述 Applet 中的组件与数据。
*   **Catalog**：声明 Applet 可使用的组件、属性、事件和行为。

### 4.1 消息结构
协议由连续的 JSON 消息组成，按接收顺序处理。每条消息必须包含 `version: "2.0"`，且只能包含 `applet`、`updates` 其中一种。

| 字段名 | 类型 | 必选 | 描述 |
| :--- | :--- | :--- | :--- |
| **version** | `string` | **是** | 协议版本，固定为 `"2.0"`。 |
| **applet** | `object` | 否 | 创建或删除 Applet。 |
| **appletId** | `string` | 否 | `updates` 的目标 Applet，默认为 `""`。 |
| **updates** | `array` | 否 | 组件或数据的更新项。 |

生命周期：创建（`applet`）→ 更新（`updates`，可多次）→ 删除（`applet.delete: true`）

#### 4.1.1 applet
创建或删除 Applet。

| 字段名 | 类型 | 必选 | 描述 |
| :--- | :--- | :--- | :--- |
| **appletId** | `string` | 否 | Applet 唯一标识，默认为 `""`。 |
| **catalog** | `string` | 否 | 使用的 Catalog ID，未声明时使用默认 Catalog。 |
| **components** | `array` | 否 | 初始组件列表，根组件 `id` 固定为 `"root"`。 |
| **data** | `object` | 否 | 初始数据。 |
| **delete** | `boolean` | 否 | 为 `true` 时删除该 Applet 及其全部内容。 |

#### 4.1.2 updates
新增或替换组件、更新数据，可多次发送。

* **组件**：`id` 不存在则新增，已存在则整体替换（不做合并）。
* **数据**：通过 `path` 和 `value` 更新，见下文 Data Model。

### 4.2 组件

| 字段名 | 类型 | 必选 | 描述 |
| :--- | :--- | :--- | :--- |
| **id** | `string` | **是** | 组件唯一标识，Applet 内唯一。 |
| **type** | `string` | **是** | 组件类型，须在 Catalog 中声明。 |
| **props** | `object` | 否 | 组件属性，支持静态值与插值。 |
| **children** | `array` | 否 | 子组件列表，元素可为组件 ID 或组件对象，可混用。 |
| **if** | `string` | 否 | 条件渲染，值为 falsy 时不渲染。 |
| **for** | `string` | 否 | 循环渲染，格式为 `item, index in list`。 |
| **events** | `object` | 否 | 交互事件，Key 为事件名，Value 为行为数组。 |

#### 4.2.1 children

Catalog 的 `components` 中，每个 Component 定义可通过 `children` 声明该组件是否允许子组件：

* 不传或传 `false`：不允许子组件，消息中不能包含 children。
* 传 `true`：允许 Catalog 中任意类型的子组件。
* 传组件类型数组：只允许数组中指定类型的子组件。

消息中的 children 用于提供具体的子组件，元素可以是组件 ID，也可以是完整组件对象，两种形式可以混用，并按数组顺序渲染。

父组件支持具名插槽时，在子组件的 `props.slot` 中填写插槽名；进入默认插槽时不传 `slot`。可用的插槽名由 `Catalog.components` 中父 Component 定义的 `props.slot` 约束。

#### 4.2.2 事件交互
采用 **事件(Event) -> 行为(Action)** 的映射机制。

```
"events": {
  "[EventName]": [
    { "action": "[ActionName]", "args": { ... } }
  ]
}
```

*   **EventName**：组件支持的事件，如 `click`、`change`。
*   **ActionName**：Catalog 中声明的行为，内置 `openUrl` 打开链接、`sendPrompt` 发送 prompt。
*   **args**：行为参数，支持插值，可用 <code>&#123;&#123;$event.xxx&#125;&#125;</code> 引用事件参数。

#### 4.2.3 数据绑定（插值）
使用双大括号 <code>&#123;&#123; &#125;&#125;</code> 引用数据，语法同 [San 插值](https://baidu.github.io/san/tutorial/template/#%E8%A1%A8%E8%BE%BE%E5%BC%8F)。

* 数据访问：`user.name`、`list[0]`，也可用 `/user/name` 表示根数据路径
* 运算：`!loading`、`count + 1`、`age >= 18`、`a && b`、`score >= 60 ? 'pass' : 'fail'`
* 混合文本：<code>搜索 &#123;&#123;total&#125;&#125; 条</code>
* **禁止**：函数定义与调用、赋值、访问全局对象。

### 4.3 Data Model
每个 Applet 拥有独立的数据，可在 `applet.data` 中初始化，并在 `updates` 中通过 `path` 和 `value` 更新。

* `path`：数据位置，使用 [JSON Pointer](https://datatracker.ietf.org/doc/html/rfc6901) 写法，如 `/user/name`；`""` 表示整个数据。
* `value`：新的值，直接替换原值（不做合并）；为 `null` 时删除该字段。

```json
{
    "version": "2.0",
    "appletId": "main",
    "updates": [
        {"path": "/user/name", "value": "Alice"},
        {"path": "/user/age", "value": null}
    ]
}
```

### 4.4 Catalog
Catalog 声明 Applet 可使用的组件、属性、事件和行为。不在 Catalog 中声明的内容不会被渲染或执行。定义方式参见 [Catalog](/protocol/json/v2/concept/catalog)。

## 5. 示例
以下消息依次创建一个包含按钮的 Applet、更新数据、删除 Applet。

```json
// 创建
{
    "version": "2.0",
    "applet": {
        "appletId": "main",
        "components": [
            {
                "id": "root",
                "type": "Button",
                "props": {
                    "size": "&#123;&#123;size&#125;&#125;"
                },
                "events": {
                    "click": [
                        {
                            "action": "sendPrompt",
                            "args": {
                                "prompt": "查看 &#123;&#123;city&#125;&#125; 的天气"
                            }
                        }
                    ]
                }
            }
        ],
        "data": {
            "size": "md",
            "city": "北京"
        }
    }
}

// 更新
{
    "version": "2.0",
    "appletId": "main",
    "updates": [
        {"path": "/city", "value": "上海"}
    ]
}

// 删除
{
    "version": "2.0",
    "applet": {
        "appletId": "main",
        "delete": true
    }
}
```

## 6. 推荐实现

* 推荐解析器：[v2 协议解析](/protocol/json/v2/overview)
