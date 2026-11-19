# 协议说明

Dynamic UI v2 通过 Message 创建、更新或删除 Applet。

## 核心对象

|对象|说明|
|---|---|
|Message|发送给 AppletContext 的协议消息|
|Applet|由 Component 和 Data 组成的 UI 实例|
|ComponentNode|Component 节点|
|Catalog|Component、事件和 Action 的定义|

## Message

所有消息都需要携带版本号：

```json
{
    "version": "2.0"
}
```

### 创建 Applet

```json
{
    "version": "2.0",
    "applet": {
        "appletId": "travel",
        "catalog": "cosui.catalog",
        "components": [],
        "data": {}
    }
}
```

|字段|类型|必选|说明|
|---|---|---|---|
|appletId|string|否|Applet ID，默认为空字符串|
|catalog|string|否|Catalog ID，默认使用 AppletContext 配置的 Catalog|
|components|ComponentNode[]|否|初始 Component|
|data|JsonObject|否|初始 Data|
|extensions|JsonObject|否|扩展数据|

创建消息中的 components 是一个平铺数组。静态界面可以在一条消息中完成，不需要拆成多条更新消息。appletId 可以省略；省略时使用默认 Applet，值为空字符串。同一个 appletId 只能创建一次。

### 更新 Applet

```json
{
    "version": "2.0",
    "appletId": "travel",
    "updates": []
}
```

|字段|类型|必选|说明|
|---|---|---|---|
|appletId|string|否|要更新的 Applet ID，默认为空字符串|
|updates|Update[]|是|Component 或 Data 更新列表|

更新消息只能作用于已经创建的 Applet。创建时指定了 appletId，后续更新也必须使用相同的 appletId；省略时更新默认 Applet。

updates 中可以混合 ComponentNode 和 Data update，按数组顺序处理。ComponentNode 的 id 不存在时新增，已存在时整体替换，不合并原有字段；需要保留的 props、children 和 events 等字段应在新的节点中再次提供。后续更新消息使用 updates，不再包含 applet。

### 删除 Applet

```json
{
    "version": "2.0",
    "applet": {
        "appletId": "travel",
        "delete": true
    }
}
```

## ComponentNode

|字段|类型|必选|说明|
|---|---|---|---|
|id|string|是|Component ID|
|type|string|是|Catalog 中声明的 Component 名称|
|props|JsonObject|否|Component 属性|
|children|Array<string \| ComponentNode>|否|子节点|
|events|Record<string, ActionBinding[]>|否|事件与 Action 绑定|
|if|string \| boolean|否|显示条件|
|for|string|否|循环表达式|
|extensions|JsonObject|否|扩展数据|

ComponentNode 的 id 在同一个 Applet 内必须唯一，根节点的 id 必须为 root。type 必须是当前 Catalog 中声明的 Component 名称。

components 中的节点通过 children 连接成树。children 中的字符串是 Component ID，内联对象是 ComponentNode，两种写法可以混用。children 按数组顺序渲染；未定义的引用暂时跳过，未连接到 root 的节点不会参与渲染。

props、children、if、for 和 events 都是 ComponentNode 的字段，与 props 平级。props 只能填写该 Component 在 Catalog 中声明的属性，以及 Catalog 的 PropsCommon 和 props.slot。是否允许 children、允许哪些子 Component，以及具名 slot 的合法值，由 `Catalog.components` 中直接父 Component 的定义约束。

## Data update

Data update 通过 JSON Pointer 更新 Applet Data。

|字段|类型|必选|说明|
|---|---|---|---|
|path|string|否|数据路径，省略或传空字符串时表示整个 Data|
|value|JsonValue|是|要写入的数据|

```json
{
    "path": "/trip/city",
    "value": "苏州"
}
```

非根路径下，value 为 null 表示删除目标字段或数组项。path 的父路径必须已经存在，并且是对象或数组。path 为空字符串时整体替换 Data，value 必须是对象。

## 数据绑定

Component 属性和 Action 参数支持使用双花括号绑定数据。

{{expr}} 是单向绑定。属性值完全由一个绑定组成时，保留表达式结果的类型；绑定和普通文本混合时，结果为字符串，例如 `"共 {{count}} 条"`。表达式不支持函数定义和调用，只支持数据访问、字面量、算术、比较、逻辑、三元条件和括号。

表达式支持点号和方括号访问。包含中文、短横线、空格或以数字开头的属性名，必须使用方括号和字符串键，例如 `user['姓名']`。变量优先从当前 for 循环作用域读取，找不到时再从 Applet Data 读取。数据可以在创建消息中提供，也可以通过后续 Data update 写入；绑定可以先出现，数据随后补充。

输入类 Component 的输入属性可以使用 `{= expr =}` 双向绑定。绑定目标必须是可写的数据字段，用户输入会写回该字段。

列表使用 for，条件使用 if。for 与 if 都是 ComponentNode 字段，不写在 `{{}}` 中。for 支持 `item in list`、`item, index in list`，也可以追加 `trackBy`；循环变量只在当前 Component 及其子树中有效。if 可以是 boolean 或表达式字符串，求值为 falsy 时，当前 Component 及其子树不渲染。

```json
{
    "id": "root",
    "type": "Select",
    "props": {
        "title": "{{trip.city}}"
    },
    "events": {
        "change": [{
            "action": "sendPrompt",
            "args": {
                "prompt": "当前值：{{$event.value}}"
            }
        }]
    }
}
```

events 的键必须是当前 Component Catalog 声明的事件名，值始终是 ActionBinding 数组，按数组顺序执行。Action 名必须由 Catalog.actions 声明。

Catalog 中的事件参数定义用于说明运行时 `$event` 的字段；消息中的 ActionBinding.args 是本次 Action 的入参，可以绑定 Applet Data、循环变量和 `{{$event.xxx}}`。args 求值后必须是 JSON，并符合该 Action 的参数定义。
