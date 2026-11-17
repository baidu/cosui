## API

### Props
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|link-info|[LinkInfo](/components/cosmic/link)|-|是|跳转信息|PC/Mobile|
|thumbnail|string|''|是|缩略图地址|PC/Mobile|
|title|string|''|是|标题|PC/Mobile|
|score|number \| [Score](/components/cosmic/core)|-|否|评分信息|PC/Mobile|
|address|string|-|否|地址|PC/Mobile|
|category|string|-|否|品类，如“美食”|PC/Mobile|
|average-cost|string|-|否|人均消费|PC/Mobile|
|recommendedDuration|string|-|否|推荐游玩时长|PC/Mobile|
|opening-hours|string|-|否|营业时间，如“08:00-12:00,13:00-17:00”|PC/Mobile|
|caption|string|-|否|地点说明|PC/Mobile|
|tags|Array&lt;TagItem\|string&gt;|[]|否|标签列表，支持对象类型和string类型。string为简写形式，展示为灰色、边框型标签|PC/Mobile|
|appearance|'filled'\|'card'|'card'|否|组件外观，传入 filled 时为包卡带背景色样式|PC/Mobile|

#### TagItem
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|text|string|''|是|标签文本|PC/Mobile|
|icon|string|''| 否|图标名称,详见[Icon](/components/cosmic/icon)|PC/Mobile|
|color|string|-|否|标签文本颜色,默认 var(--cos-color-text-tiny-active)|PC/Mobile|
|bgColor|string|-|否|标签背景颜色，默认 var(--cos-tag-color-bg)|PC/Mobile|
|iconBgColor|string|-|否|标签内的 icon 背景颜色|PC/Mobile|


### Parts

``` shell
|-- cosd-location-card
|   |-- cosd-location-card-thumbnail
|   |-- cosd-location-card-content
|   |   |-- cosd-location-card-title
|   |   |-- cosd-location-card-tags
|   |   |-- cosd-location-card-score
|   |   |-- cosd-location-card-category
|   |   |-- cosd-location-card-cost
|   |   |-- cosd-location-card-address
|   |   |-- cosd-location-card-details
|   |   |   |-- cosd-location-details-item
```

|名称|说明|覆盖平台|
|---|---|---|
|cosd-location-card|单个地点|PC/Mobile|
|cosd-location-card-thumbnail|左侧缩略图节点|PC/Mobile|
|cosd-location-card-content|右侧内容区域|PC/Mobile|
|cosd-location-card-title|地点标题|PC/Mobile|
|cosd-location-card-tags|标签列表|PC/Mobile|
|cosd-location-card-score|地点评分|PC/Mobile|
|cosd-location-card-category|地点品类|PC/Mobile|
|cosd-location-card-cost|人均消费|PC/Mobile|
|cosd-location-card-address|地址|PC/Mobile|
|cosd-location-card-details|地点详细信息|PC/Mobile|
