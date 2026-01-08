## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|outlines|Array&lt;SearchingOutlinesItemData&gt;|[]|是|回搜大纲内容|PC/Mobile|

#### SearchingOutlinesItemData

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|title|string|''|是|大纲子列表标题|PC/Mobile|
|query|string|''|否|大纲子列表点击后的回搜 query|PC/Mobile|
|linkInfo|[LinkInfo](/components/cosmic/link)|{}|否|跳转信息|PC/Mobile|
|outlines|Array&lt;SearchingOutlinesItemData&gt;|[]|否|大纲子列表|PC/Mobile|
|appearance|string|'dashed'|否|大纲外观|PC/Mobile|

### Title
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|icon|string|''|否|大纲标题图标(image/icon)|PC/Mobile|
|emoji|string|''|是|大纲标题图标(emoji)|PC/Mobile|
|text|string|''|是|大纲标题文本内容|PC/Mobile|

### Appearance
|名称|说明|覆盖平台|
|---|---|---|
|dashed|dashed 虚线风格外观（默认）|PC/Mobile|
|regular|regular 普通链接风格外观|PC/Mobile|

### Events
|事件|参数|说明|覆盖平台|
|---|---|---|---|
|click|{event: Event, title: string, index: number, query?: string, subIndex?: number}|单条大纲的点击|PC/Mobile|

### Parts

``` shell
|-- cosd-searching-outlines
|   |-- cosd-searching-outlines-title
|   |-- cosd-searching-outlines-item
|   |   |-- cosd-searching-outlines-item-title
|   |   |-- cosd-searching-outlines-item-sublist
|   |   |   |-- cosd-searching-outlines-item-sublist-item
```

|名称|说明|覆盖平台|
|---|---|---|
|cosd-searching-outlines|大纲根节点|PC/Mobile|
|cosd-searching-outlines-title|大纲标题|PC/Mobile|
|cosd-searching-outlines-item|大纲列表项|PC/Mobile|
|cosd-searching-outlines-item-title|大纲列表项的标题|PC/Mobile|
|cosd-searching-outlines-item-sublist|大纲列表项的内容|PC/Mobile|
|cosd-searching-outlines-item-sublist-item|大纲列表项的内容的标题|PC/Mobile|
