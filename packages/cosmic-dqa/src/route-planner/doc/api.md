## API

### Props
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|location-list|Array&lt;LocationItem&gt;|-|是|地点信息列表|PC/Mobile|
|route-list|Array&lt;RouteItem&gt;|[]|否|地点关系列表|PC/Mobile|
|folded|boolean|true|否|地点列表是否处于折叠状态|PC/Mobile|

#### LocationItem
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|id|string|-|是|地点 id|PC/Mobile|
|linkInfo|[LinkInfo](/components/cosmic/link)|-|是|跳转信息|PC/Mobile|
|thumbnail|string|-|是|缩略图地址|PC/Mobile|
|title|string|-|是|标题|PC/Mobile|
|score|number|-|否|评分|PC/Mobile|
|address|string|-|否|地址|PC/Mobile|
|category|string|-|否|品类，如“美食”|PC/Mobile|
|averageCost|string|-|否|人均消费|PC/Mobile|
|openingHours|number|-|否|营业时间，如“08:00-12:00,13:00-17:00”|PC/Mobile|
|tags|Array&lt;TagItem\|string&gt;|[]|否|标签列表，支持对象类型和string类型。string为简写形式，展示为灰色、边框型标签|PC/Mobile|

#### RouteItem
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|startLocationId|string|-|是|起点地点id|PC/Mobile|
|endLocationId|string|-|是|终点地点id|PC/Mobile|
|distance|string|-|是|距离描述信息，例如：距离1.6km|PC/Mobile|
|linkInfo|[LinkInfo](/components/cosmic/link)|{}|否|地图跳转信息|PC/Mobile|
|transportOptions|Array&lt;TransportOption&gt;|[]|否|交通方式信息|PC/Mobile|

#### TransportOption
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|type|string|-|是|交通类型，目前支持 'car' / 'publicTransport' / 'walk'|PC/Mobile|
|duration|string|-|是|时长，例如：12分钟|PC/Mobile|

#### TagItem
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|text|string|-|是|标签文本|PC/Mobile|
|color|string|-|否|标签颜色，目前仅支持灰色和蓝色。默认为灰色，‘blue’ 则为蓝色|PC/Mobile|


### Parts

``` shell
|-- cosd-route-planner
|   |-- cosd-route-planner-overview
|   |   |-- cosd-route-planner-path
|   |   |-- cosd-route-planner-switch
|   |-- cosd-route-planner-image-list
|   |   |-- cosd-route-planner-image-item
|   |-- cosd-route-planner-location-list
|   |   |-- cosd-route-planner-location-item
|   |   |-- cosd-route-planner-location-route
|   |   |   |-- cosd-route-planner-location-route-distance
|   |   |   |-- cosd-route-planner-location-route-option-list
|   |   |   |   |-- cosd-route-planner-location-route-option-item
|   |   |   |   |   |-- cosd-route-planner-location-route-option-item-icon
|   |   |   |   |   |-- cosd-route-planner-location-route-option-item-duration
```

|覆盖平台|说明|覆盖平台|
|---|---|---|
|cosd-route-planner|根节点|PC/Mobile|
|cosd-route-planner-overview|路线概览|PC/Mobile|
|cosd-route-planner-path|路线|PC/Mobile|
|cosd-route-planner-switch|展开按钮|PC/Mobile|
|cosd-route-planner-image-list|地点图片列表|PC/Mobile|
|cosd-route-planner-image-item|地点图片|PC/Mobile|
|cosd-route-planner-location-list|地点详情列表|PC/Mobile|
|cosd-route-planner-location-item|地点详情|PC/Mobile|
|cosd-route-planner-location-route|到下一个地点的交通详情|PC/Mobile|
|cosd-route-planner-location-route-distance|距离描述文本|PC/Mobile|
|cosd-route-planner-location-route-option-list|交通方式列表|PC/Mobile|
|cosd-route-planner-location-route-option-item|交通方式|PC/Mobile|
|cosd-route-planner-location-route-option-item-icon|交通类型图标|PC/Mobile|
|cosd-route-planner-location-route-option-item-duration|交通耗时|PC/Mobile|

### Events
|事件|说明|覆盖平台|
|---|---|---|
|location-click|单条地点的点击|PC/Mobile|
|route-click|交通方式的点击|PC/Mobile|
