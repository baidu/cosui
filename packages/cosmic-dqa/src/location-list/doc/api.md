## API

### Props
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|items|Array&lt;LocationCard&gt;|[]|是|地点信息列表|PC/Mobile|

#### LocationCard
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|linkInfo|[LinkInfo](/components/cosmic/link)|-|是|跳转信息|PC/Mobile|
|thumbnail|string|''|是|缩略图地址|PC/Mobile|
|title|string|''|是|标题|PC/Mobile|
|score|number|-|否|评分|PC/Mobile|
|address|string|-|否|地址|PC/Mobile|
|category|string|-|否|品类，如“美食”|PC/Mobile|
|averageCost|string|-|否|人均消费|PC/Mobile|
|openingHours|number|-|否|营业时间，如“08:00-12:00,13:00-17:00”|PC/Mobile|
|tags|Array&lt;TagItem\|string&gt;|[]|否|标签列表，支持对象类型和string类型。string为简写形式，展示为灰色、边框型标签|PC/Mobile|

#### TagItem
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|text|string|''|是|标签文本|PC/Mobile|
|color|string|-|否|标签颜色，目前仅支持灰色和蓝色。默认为灰色，'blue' 则为蓝色|PC/Mobile|


### Parts

``` shell
|-- cosd-location-list
|   |-- cosd-location-list-item
|   |   |-- cosd-location-card-thumbnail
|   |   |-- cosd-location-card-content
|   |   |   |-- cosd-location-card-title
|   |   |   |-- cosd-location-card-score
|   |   |   |-- cosd-location-card-category
|   |   |   |-- cosd-location-card-cost
|   |   |   |-- cosd-location-card-address
|   |   |   |-- cosd-location-card-opening-hours
|   |   |   |-- cosd-location-card-tags
|   |   |   |   |-- cosd-location-card-tag
```

|名称|说明|覆盖平台|
|---|---|---|
|cosd-location-list|地点列表根节点|PC/Mobile|
|cosd-location-card|单个地点|PC/Mobile|
|cosd-location-card-thumbnail|左侧缩略图节点|PC/Mobile|
|cosd-location-card-content|右侧内容区域|PC/Mobile|
|cosd-location-card-title|地点标题|PC/Mobile|
|cosd-location-card-score|地点评分|PC/Mobile|
|cosd-location-card-category|地点品类|PC/Mobile|
|cosd-location-card-cost|人均消费|PC/Mobile|
|cosd-location-card-address|地址|PC/Mobile|
|cosd-location-card-opening-hours|营业时间|PC/Mobile|
|cosd-location-card-tags|标签列表|PC/Mobile|
|cosd-location-card-tag|单个标签|PC/Mobile|

### Events
| 事件 | 参数 | 说明 |覆盖平台|
| --- | --- | --- |---|
| click | {event: HTMLMouseEvent, index: number, item: LocationCard} | 单条地点的点击 |PC/Mobile|
