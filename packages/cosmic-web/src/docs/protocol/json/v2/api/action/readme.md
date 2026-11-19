# Action 行为

Action 处理 Component 事件。使用前需在 Catalog 中声明，并在 AppletContext 中注册同名函数。

|配置|类型|说明|
|---|---|---|
|actions|Record<string, ActionHandler>|Action 名称与处理函数的映射|

### 处理函数参数

|字段|类型|说明|
|---|---|---|
|appletId|string|Applet ID|
|componentId|string|触发事件的 Component ID|
|eventName|string|事件名称|
|args|JsonObject|Action 参数|
|$event|unknown|Component 原始 San `$event`，与 v1 一致；可读取的字段见 Catalog 中该事件的 params|
|$data|JsonObject|事件触发时的 Applet Data，不在 Catalog 中声明|

同一事件的多个 Action 按声明顺序执行。

## 示例效果
