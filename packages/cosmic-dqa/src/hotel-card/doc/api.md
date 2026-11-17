## API

### Props
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|link-info|[LinkInfo](/components/cosmic/link)|-|是|跳转信息|PC/Mobile|
|thumbnail|string|''|是|缩略图地址|PC/Mobile|
|title|string|''|是|标题|PC/Mobile|
|tags|Array&lt;TagItem\|string&gt;|-|否|标签列表，如果都是默认色，也可以简写，如 ['tag1', 'tag2']|PC/Mobile|
|score|[Score](/components/cosmic/core)|-|否|评分信息|PC/Mobile|
|distance|string|''|否|距离参照物的半径范围信息，如“距离市中心 1.7km”|PC/Mobile|
|district|string|''|否|片区信息，如“xxx 商圈”|PC/Mobile|
|price|[Price](/components/cosmic/price)|-|否|价格信息|PC/Mobile|
|source|string|''|否|来源|PC/Mobile|

#### TagItem
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|text|string|''|是|标签文本|PC/Mobile|
|color|string|-|否|标签文本颜色,默认 var(--cos-color-text-tiny-active)|PC/Mobile|
|bgColor|string|-|否|标签背景颜色，默认 var(--cos-tag-color-bg)|PC/Mobile|
|iconBgColor|string|-|否|标签内的 icon 背景颜色|PC/Mobile|

### Slots
无

### Events
无

### Parts

```shell
|-- cosd-hotel-card
|   |-- cosd-hotel-card-thumbnail
|   |-- cosd-hotel-card-content
|   |   |-- cosd-hotel-card-title
|   |   |-- cosd-hotel-card-tags
|   |   |-- cosd-hotel-card-score
|   |   |-- cosd-hotel-card-range
|   |   |-- cosd-hotel-card-district
|   |   |-- cosd-hotel-card-price
|   |   |-- cosd-hotel-card-source
```

|名称|说明|覆盖平台|
|---|---|---|
|cosd-hotel-card|单个产品卡片|PC/Mobile|
|cosd-hotel-card-thumbnail|左侧缩略图节点|PC/Mobile|
|cosd-hotel-card-content|右侧内容区域|PC/Mobile|
|cosd-hotel-card-title|产品标题|PC/Mobile|
|cosd-hotel-card-tags|标签列表|PC/Mobile|
|cosd-hotel-card-score|产品评分|PC/Mobile|
|cosd-hotel-card-range|距离信息|PC/Mobile|
|cosd-hotel-card-district|片区信息|PC/Mobile|
|cosd-hotel-card-price|价格信息|PC/Mobile|
|cosd-hotel-card-source|来源信息|PC/Mobile|
