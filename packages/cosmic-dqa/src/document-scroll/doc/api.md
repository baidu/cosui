## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|items|Document[]||是|文档列表|PC/Mobile|
|span|number|12|否|栅格数|PC/Mobile|


#### Document
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|logo|string|''|是|文档logo图地址|PC/Mobile|
|actionText|string|''|否|按钮文字|PC/Mobile|
|type|string|''|是|文档类型|PC/Mobile|
|title|string|''|是|文档标题|PC/Mobile|
|size|string|''|是|文档大小|PC/Mobile|

### Events
| 事件     | 参数                  | 说明      | 覆盖平台      |
|----------|------------------------|-----------|-----------|
| item-click | {item: Document, event: HTMLMouseEvent} | 单个文档的点击事件 | PC/Mobile |
| scrollend | {index: number, prevIndex: number} | 滑动结束时触发( 当前 swiper 仅 mobile) | Mobile |

### Parts
``` shell
|-- cosd-document-scroll
|   |-- cos-swiper
|   |    |-- cos-swiper-item
|   |        |-- cosd-document-scroll-card
|   |            |-- cosd-document-scroll-card-content
|   |            |    |-- cosd-document-scroll-card-logo
|   |            |    |-- cosd-document-scroll-card-title
|   |            |    |-- cosd-document-scroll-card-size
|   |            |-- cosd-document-scroll-card-btn
```
