# Event 事件

组件通过 events 将事件绑定到 Action。

### events

|字段|类型|必选|说明|
|---|---|---|---|
|events[eventName]|ActionBinding[]|是|事件对应的 Action 列表|

### ActionBinding

|字段|类型|必选|说明|
|---|---|---|---|
|action|string|是|Action 名称|
|args|JsonObject|否|传给 Action 的参数|

事件触发后，Action 处理函数可通过 $event 读取组件原始的 San `$event`。可用的事件名称和 Action 由 Catalog 定义；事件的 params 说明 $event 中可读取的字段，args 中通过 `{{$event.xxx}}` 引用。params 只作说明，运行时不校验 $event，原生 DOM Event 不做描述。

## 示例效果
