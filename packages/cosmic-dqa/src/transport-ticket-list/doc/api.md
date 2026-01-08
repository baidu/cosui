## API

### Props

| 名称        | 类型     | 默认值 | 是否必选 | 说明                                      | 覆盖平台     |
|-------------|----------|--------|----------|-------------------------------------------|--------------|
| items        | [TransportTicket](/components/cosmic-dqa/transport-ticket)[]   | -      | 是       | 三票组件列表 | PC/Mobile    |

### Events
|名称|参数|说明|覆盖平台|
|---|---|---|---|
|click|{index: number}|三票组件点击事件|PC/Mobile|
|more-click|-|展开按钮点击事件|PC/Mobile|

### Parts
```shell
|-- cosd-transport-ticket-list
|   |-- cosd-transport-ticket-list-content
|   |   |-- cosd-transport-ticket-list-group
|   |   |   |-- cosd-transport-ticket
|   |-- cosd-transport-ticket-list-fold

```
