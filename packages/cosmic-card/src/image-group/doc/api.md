## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|list|[Image](/components/cosmic/image)[]|-|是|图片参数列表，单个图片参数参考 Image 组件|PC/Mobile|
|list[index].span|number|12|否|横滑样式下当前图片所占栅格数，可结合span参数使用，优先级list[index].span>span>12|PC/Mobile|
|link-info|[LinkInfo](/components/cosmic/link)|-|否|组件整体跳转参数，不支持区分图片跳转|PC/Mobile|
|ratio|string|-|否| 子项图片比例 |PC/Mobile|
|span|number|-|否| 子项跨度，所占栅格列数 |PC/Mobile|
|max-row|number|1|否|最大行数，不超过3行|PC/Mobile|
|scrollable|boolean|false|否|是否以横滑样式展示图片|PC/Mobile|

### Parts

``` shell
|-- cosc-image-group
|   |-- cosc-image-group-item
```

|名称|说明|覆盖平台|
|---|---|---|
|cosc-image-group|图集根节点|PC/Mobile|
|cosc-image-group-item|单个图片|PC/Mobile|

### Events

|名称|参数|说明|覆盖平台|
|---|---|---|---|
|click|{event: HTMLMouseEvent, image: Image, index: number}|点击图片时触发。`index` 表示图片在列表中的位置|PC/Mobile|
|scroll|{event: Event}|滚动图集时触发，此事件仅当 `scrollable = true` 时支持|Mobile|
