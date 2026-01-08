## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|appearance|'' \| 'link' \|'tag' |''|否|溯源展现类型|PC/Mobile|
|citation-id|string||是|溯源角标ID|PC/Mobile|
|disabled|boolean|false|否|是否禁止弹窗|PC/Mobile|
|title|string||是|核心文本/标题|PC/Mobile|
|abstract|string||否|摘要|PC|
|thumbnail|string||否|图片|PC|
|is-video|boolean|false|否|是否是视频类型|PC/Mobile|
|source|object||否|来源|PC/Mobile|
|source.logo|string||否|来源图标|PC/Mobile|
|source.name|string||否|来源名称|PC/Mobile|
|source.icon|string||否|可信溯源兜底图标|PC/Mobile|
|source.type|string||否|可信溯源类型|PC/Mobile|
|source.tag|Tag||否|可信溯源标签|PC/Mobile|
|link-info|[LinkInfo](/components/cosmic/link)|{}|否|跳转信息|PC/Mobile|
|get-popup-container|() => HTMLElement|document.body|否|气泡挂载的 DOM 节点，气泡将被限定在这个节点范围内，该节点需要设置 position: relative|PC/Mobile|
|tooltip-panel-clickable|boolean|false|否|是否允许点击弹窗整体跳转|PC|

#### Tag
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|text|string||否|可信溯源标签展示文本|PC/Mobile|
|colorVars|string||否|可信溯源标签文字和背景色自定义颜色变量|PC/Mobile|

### Methods
|事件|参数|说明|覆盖平台|
|---|---|---|---|
| hideTooltip |  | 隐藏溯源弹窗 |PC/Mobile|

### Parts

``` shell
|-- cosd-citation
|   |-- (cos-tooltip)
|   |   |-- cosd-citation-citationId
|   |   |-- cosd-citation-tooltip (cos-tooltip slot=content)
|   |   |   |-- cosd-citation-headline
|   |   |   |-- cosd-citation-thumbnail
|   |   |   |-- cosd-citation-title
|   |   |   |-- cosd-citation-abstract
|   |   |   |-- cosd-citation-source
```

|名称|说明|覆盖平台|
|---|---|---|
|cosd-citation|根节点|PC/Mobile|
|cosd-citation-citationId|溯源ID|PC/Mobile|
|cosd-citation-tooltip|溯源弹窗容器|PC/Mobile|
|cosd-citation-headline|参考文献|PC/Mobile|
|cosd-citation-thumbnail|图片|Mobile|
|cosd-citation-title|标题|PC/Mobile|
|cosd-citation-abstract|标题|PC|
|cosd-citation-source|来源|PC/Mobile|

### Events
| 事件 | 参数 | 说明 | 覆盖平台 |
| --- | --- | --- | --- |
| toggle | {event: Event,open:boolean} | 弹出层展示/隐藏时触发的回调 | PC/Mobile |
| click | {event: Event} | 弹窗内容点击的回调 | PC/Mobile |
