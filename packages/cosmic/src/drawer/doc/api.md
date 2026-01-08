## API

### Props

| 名称           | 类型      | 默认值      |是否必选| 说明       | 覆盖平台|
|--------------|---------|----------|---------|----------|---------|
| open         | boolean | false    |必选 | 弹窗是否可见     | Mobile  |
| mask         | boolean | true     |可选	| 是否显示遮罩层   | Mobile  |
| title        | string  | -        |可选| 标题文字        | Mobile  |
| closeable    | boolean | true     |可选| 是否显示关闭按钮  | Mobile  |
| position     | 'bottom' \| 'left' \| 'top' \| 'right' | 'bottom' |可选| 抽屉的弹出方向 | Mobile  |
| close-on-swipe | boolean | false     |可选| 是否支持滑动关闭 | Mobile  |
| get-popup-container | () => HTMLElement | 当前位置节点 |可选| 指定父级 DOM，弹层将会渲染至该 DOM  | Mobile |
| destroyOnClose        | boolean | true     |可选	| 是否在关闭时销毁DOM   | Mobile  |


### Slots

|名称|说明|
|---|---|
|default|抽屉内容扩展槽位|
|title|抽屉标题扩展槽位|

### Parts

``` shell
|-- cos-drawer
|   |-- cos-drawer-mask
|   |-- cos-drawer-container
|   |   |-- cos-drawer-title
|   |   |-- title slot
|   |   |-- cos-drawer-close
|   |   |-- cos-drawer-content
```

| 名称                    | 说明     | 覆盖平台   |
|-----------------------|--------|--------|
| cos-drawer            | 抽屉根节点 | Mobile |
| cos-drawer-mask       | 遮罩层节点 | Mobile |
| cos-drawer-container  | 容器节点   | Mobile |
| cos-drawer-title      | 标题节点   | Mobile |
| cos-drawer-close      | 关闭按钮节点| Mobile |
| cos-drawer-content    | 内容节点   | Mobile |

### Events

|事件|参数|说明|覆盖平台|
|---|---|---|---|
|close|{event: Event}|关闭气泡时触发|Mobile|
