/*
 * Copyright (c) Baidu, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @file 面向 Agent / LLM 的 Catalog 使用说明
 */

/* eslint-disable max-len */
const createExample = {
    version: '2.0',
    applet: {
        data: {form: {city: '北京'}, items: [{id: 'a', title: '北京'}, {id: 'b', title: '上海'}]},
        components: [
            {id: 'root', type: 'Card', children: ['cityInput', 'preview', 'itemButton']},
            {id: 'cityInput', type: 'Input', props: {value: '{= form.city =}', placeholder: '输入城市'}},
            {
                id: 'preview', type: 'Markdown', if: 'form.city',
                props: {content: '将查询 **{{form.city}}** 的天气'}
            },
            {
                id: 'itemButton', type: 'Button', for: 'item, index in items trackBy item.id',
                children: ['itemText'],
                events: {click: [{action: 'sendPrompt', args: {prompt: '{{item.title}}天气'}}]}
            },
            {id: 'itemText', type: 'Markdown', props: {content: '{{index + 1}}. {{item.title}}'}}
        ]
    }
};

const dataUpdateExample = {
    version: '2.0',
    updates: [{path: '/form/city', value: '上海'}]
};

const mixedUpdateExample = {
    version: '2.0',
    updates: [
        {path: '/form/city', value: '广州'},
        {id: 'notice', type: 'Markdown', props: {content: '新增的提示组件'}},
        {id: 'root', type: 'Card', children: ['cityInput', 'preview', 'itemButton', 'notice']}
    ]
};

const json = (value: unknown): string => '```json\n' + JSON.stringify(value, null, 2) + '\n```';

/**
 * Markdown guidelines exported as Catalog.usage; every example must be a valid message.
 * Only runtime semantics belong here: components, props, defaults, events and Action args are already
 * described by the Catalog itself and are not repeated.
 */
export const usage = `# Cosui v2 动态 UI 协议

Agent 通过 JSON 消息描述可交互的 UI（Applet）。下文示例仅说明结构；实际使用的组件、事件和 Action 必须在本次提供的 Catalog 中。

## 消息

创建：\`{"version":"2.0","applet":{"appletId":"a1","data":{},"components":[]}}\`。
更新：\`{"version":"2.0","appletId":"a1","updates":[]}\`。创建和更新中的 appletId 均可省略，省略时表示默认 Applet（""）。更新只能作用于已创建的 Applet；创建时指定了 appletId，更新时也需填写相同值。以上为空内容的结构示例，data、components 的内容及 updates 的更新项见下方完整示例。
组件更新项：\`{"id":"preview","type":"Markdown","props":{"content":"新内容"}}\`。id 不存在则新增，存在则整体替换，不合并字段；需保留仍需使用的 props、children、events 等。
数据更新项：\`{"path":"/form/city","value":"上海"}\`。path 是相对于 Applet 数据根的 JSON Pointer；非根路径下，value 为 null 表示删除目标字段或数组元素。父路径必须已存在且为对象或数组。path 为空字符串时整体替换 data，此时 value 必须是对象。
同一 appletId 只创建一次：创建消息使用 applet，后续增量消息使用 updates，不再包含 applet。同一条消息的 updates 数组可以混合数据更新项和完整组件定义，同时更新数据与组件；更新项直接写入数组，不再用 data 或 components 包装。静态界面可在一条创建消息中完成，无需拆分更新。

## 组件

1. 组件必须包含 id、type；props、children、if、for、events 按需提供，并遵循对应组件的 Catalog 定义。children、if、for、events 与 props 平级，例如 \`{"id":"root","type":"Card","props":{},"children":["title"],"if":true}\`。
2. 根组件 id 必须为 \`root\`；组件 id 在 Applet 内唯一。
3. 创建时组件平铺在 components 数组中，后续可通过 updates 新增或替换组件。children 按顺序引用子组件 ID，允许先引用、后通过 updates 补充定义。渲染从 root 开始，沿 children 引用构建组件树；未定义的引用暂时跳过，未连接到 root 的组件仅保存定义。
4. Catalog 中 \`children: true\` 表示允许 Catalog 中任意类型的子组件；类型名数组表示仅允许指定类型；未声明 children 时，消息中不允许有 children 字段。
5. 父组件提供具名插槽时，Catalog 在该父组件的 props.slot Schema 中列出允许的插槽名；子组件进入默认插槽时省略自己的 props.slot；选择具名插槽时，在子组件的 props.slot 中填写非空的静态字符串，例如 \`"slot": "header"\`。子组件 props.slot 的合法值由直接父组件声明，无需在子组件自身 props 中声明。
6. props 只能使用该组件在 Catalog 中声明的属性，以及 $defs.PropsCommon 中的通用属性和上述特殊字段 props.slot。Catalog 约定对象 Schema 省略 additionalProperties 时，不允许未声明的字段。

## 数据绑定

1. \`{{expr}}\` 单向绑定。属性值恰好为一个绑定时，保留表达式求值结果的类型；绑定与文本混合时生成字符串，如 \`"共 {{count}} 条"\`。属性类型约束作用于绑定求值后的结果，而不是绑定表达式本身；例如 Markdown.content 的求值结果应为字符串。
2. 输入类组件可在 props 的输入值属性中使用 \`{= expr =}\` 双向绑定，绑定目标应为可写的数据字段，将输入值同步到该字段，如 \`"props": {"value": "{= form.city =}"}\`。
3. \`{{expr}}\`内表达式仅支持数据访问、字面量（含数组和对象）、一元否定与取负、算术、比较、逻辑、三元条件和括号；不支持函数定义或调用，包括 JavaScript 类型自带的方法（如数组、字符串的方法）。例如 data 为 {"user": {"name": "小明"}} 时，用 \`{{user.name}}\` 读取。绑定读取消息写入的 Applet 当前数据，不会自动读取消息外的数据。数据可以在创建消息的 applet.data 中提供，也可以在后续 updates 中写入或更新；允许先声明绑定、后补充数据，引用的数据尚未提供时，需通过后续 updates 补充。
4. 表达式中的对象属性支持点号访问和方括号访问，如 \`user.name\`、\`user['name']\`。中文、含短横线、空格或以数字开头的属性名必须使用方括号和字符串键，如 \`user['姓名']\`、\`obj['image-url']\`、\`obj['display name']\`、\`obj['2026']\`。中文字段在数组元素中也使用同样的写法，如 \`users[0]['姓名']\`；完整的 JSON 属性示例：\`"content": "姓名：{{user['姓名']}}，年龄：{{user['年龄']}}"\`。变量优先从当前循环作用域解析，否则从 Applet 的 data 中读取。
5. 每个 \`{{...}}\` 只计算一个值，不包含循环或条件区块，不支持以 \`#\` 开头的模板区块语法。列表用组件的 for 渲染，条件用组件的 if 控制。
6. for 写在组件上，与 props 平级，例如 \`"for": "item, index in items trackBy item.id"\`。支持 \`item in items\` 或 \`item, index in items\`，可追加 \`trackBy item.id\`；不加 {{}}。每个列表项重复渲染当前组件及其子树，循环变量可在当前组件及其子组件中使用，不作用于循环外的兄弟组件。
7. if 写在组件上，与 props 平级，值为布尔值或非空表达式字符串，例如 \`"if": "list.length > 0"\`。表达式不加 {{}}，按求值结果的真假决定是否渲染当前组件及其子树。直接读取布尔字段可写 \`"if": "visible"\`。

## 事件

1. 消息中 events 的键为组件事件名，值为 Action 数组，按顺序执行；单个 Action 也使用数组。例如 \`"events":{"click":[{"action":"sendPrompt","args":{"prompt":"{{form.city}}"}}]}\`，事件名须由该组件的 Catalog 定义声明，Action 名须由 Catalog.actions 声明。
2. Catalog 中事件的值是 $event 的 JSON Schema，\`{}\` 表示未提供事件参数的结构说明。args 可以绑定 data、循环变量和 \`{{$event.xxx}}\`；$event 表示本次组件事件的参数，args 是传给 Action 的入参，其求值结果必须是 JSON 并符合该 Action 的参数 Schema。

## 示例

以下三条消息按顺序作用于同一个默认 Applet，只有第一条创建；后两条按需更新。

第一条：创建表单和城市列表。输入框双向绑定 form.city；预览组件通过 if 在城市名称非空时显示，清空输入后隐藏。列表使用 for，点击按钮执行 Action。

${json(createExample)}

第二条：只更新数据。将 form.city 改为上海，已有预览绑定随之更新。

${json(dataUpdateExample)}

第三条：在同一条 updates 消息中，将 form.city 改为广州、新增 notice，并整体替换 root 的定义，将 notice 加入 children，同时保留已有子组件引用。

${json(mixedUpdateExample)}
`;
