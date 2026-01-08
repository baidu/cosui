## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|-|-|-|-|-|-|
|items|Array\<MicroContent>|[]|是|微内容列表|PC/Mobile|
|title|string|''|否|引导语|PC/Mobile|
|appearance|'top' \| 'bottom' |'top'|否|作者位置，可选顶部或底部|PC/Mobile|
|span|number|12|否|栅格数|PC/Mobile|

### MicroContent 对象

|名称|类型|默认值|是否必选|说明|覆盖平台|
|-|-|-|-|-|-|
|avatar|string|-|是|作者头像|PC/Mobile|
|author|string|-|是|作者名称|PC/Mobile|
|content|string|''|是|文本内容|PC/Mobile|
|thumbnail|string|-|否|贴图内容|PC/Mobile|
|tag|string|-|否|标签|PC/Mobile|
|linkInfo|[LinkInfo](/components/cosmic/link)|{}|否|跳转信息|PC/Mobile|

### Events

|名称|参数|说明|覆盖平台|
|-|-|-|-|
|item-click|{event: HTMLMouseEvent, item: Comment}|点击微内容|PC/Mobile|
|scrollend|{index: number, prevIndex: number}|滑动结束时触发|Mobile|

### Parts

```shell
|-- cosd-micro-content-scroll
|   |-- cosd-micro-content-scroll-title
|   |-- cosd-micro-content-scroll-item
|   |   |   |-- cosd-micro-content-scroll-item-author
|   |   |   |   |-- cosd-micro-content-scroll-item-author-avatar
|   |   |   |   |-- cosd-micro-content-scroll-item-author-name
|   |   |   |-- cosd-micro-content-scroll-item-content
|   |   |   |   |-- cosd-micro-content-scroll-item-content-thumbnail
|   |   |   |   |-- cosd-micro-content-scroll-item-content-text
|   |   |   |   |   |-- cosd-micro-content-scroll-item-content-tag
```
