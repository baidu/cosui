## API

### Props
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|link-info|[LinkInfo](/components/cosmic/link)|-|是|跳转信息|PC/Mobile|
|thumbnail|string|''|是|缩略图地址|PC/Mobile|
|title|string|''|是|标题|PC/Mobile|
|tags|Array&lt;TagItem\|string&gt;|-|否|标签列表，如果都是默认色，也可以简写，如 ['tag1', 'tag2']|PC/Mobile|
|price|[Price](/components/cosmic/price)|-|否|价格信息|PC/Mobile|
|sales|string|''|否|销售信息，如“月销 1.2 万”|PC/Mobile|
|caption|string \| string[]|''|否|产品描述，以数组形式传入时使用分割线切分展示|PC/Mobile|
|source|string|''|否|来源|PC/Mobile|

#### TagItem
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|text|string|''|是|标签文本|PC/Mobile|
|icon|string|-|否|标签内的 icon 名称|PC/Mobile|
|color|string|-|否|标签文本颜色，默认 var(--cos-color-text-tiny-active)|PC/Mobile|
|bgColor|string|-|否|标签背景颜色，默认 var(--cos-tag-color-bg)|PC/Mobile|
|iconBgColor|string|-|否|标签内的 icon 背景颜色|PC/Mobile|

### Slots
无

### Events
无

### Parts

```shell
|-- cosd-product-card
|   |-- cosd-product-card-thumbnail
|   |-- cosd-product-card-content
|   |   |-- cosd-product-card-title
|   |   |-- cosd-product-card-tags
|   |   |-- cosd-product-card-caption
|   |   |   |-- cosd-product-card-caption-item
|   |   |   |-- cosd-product-card-caption-divider
|   |   |-- cosd-product-card-price
|   |   |-- cosd-product-card-sales
|   |   |-- cosd-product-card-source
```

|名称|说明|覆盖平台|
|---|---|---|
|cosd-product-card|单个产品卡片|PC/Mobile|
|cosd-product-card-thumbnail|左侧缩略图节点|PC/Mobile|
|cosd-product-card-content|右侧内容区域|PC/Mobile|
|cosd-product-card-title|产品标题|PC/Mobile|
|cosd-product-card-tags|标签列表|PC/Mobile|
|cosd-product-card-caption|产品描述|PC/Mobile|
|cosd-product-card-caption-item|单条产品描述|PC/Mobile|
|cosd-product-card-caption-divider|产品描述分割线|PC/Mobile|
|cosd-product-card-price|价格信息|PC/Mobile|
|cosd-product-card-sales|销售信息|PC/Mobile|
|cosd-product-card-source|来源信息|PC/Mobile|

