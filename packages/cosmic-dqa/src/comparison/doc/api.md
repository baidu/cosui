## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|link-info|[LinkInfo](/components/cosmic/link)|{}|否|跳转信息|PC/Mobile|
|delimiter|Delimiter|{}|否|分割描述|PC/Mobile|
|targets|Array&lt;Target&gt;|[]|是|比对对象|PC/Mobile|
|bar|Array&lt;Bar&gt;|[]|否|进度条，胜-平-胜|PC/Mobile|
|items|Array&lt;Item&gt;|[]|否|对比项的详细列表|PC/Mobile|

#### Delimiter
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|icon|string|-|否|字体图标name|PC/Mobile|

#### Target
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|name|string|-|是|比对名称|PC/Mobile|
|image|string|-|是|比对图片|PC/Mobile|
|text|string|-|否|比对文本|PC/Mobile|

#### Bar
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|value|number|-|是|占比|PC/Mobile|
|color|string|-|否|背景颜色|PC/Mobile|
|text|string|-|是|比对描述|PC/Mobile|

#### Item
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|name|string|-|是|比对项的名称|PC/Mobile|
|values|array|-|是|比对项的详细描述，示例['2胜1平3负', '2胜1平3负']|PC/Mobile|


### Parts

``` shell
|-- cosd-comparison
|   |-- cosd-comparison-targets
|   |    |-- cosd-comparison-targets-left
|   |    |    |-- cosd-comparison-logo
|   |    |    |-- cos-color-text
|   |    |-- cosd-comparison-targets-vs
|   |    |-- cosd-comparison-targets-right
|   |    |    |-- cosd-comparison-logo
|   |    |    |-- cos-color-text
|   |-- cosd-comparison-bar
|   |    |-- cosd-comparison-bar-item
|   |-- cosd-comparison-table
|   |    |-- cosd-comparison-table-item
```

|名称|说明|覆盖平台|
|---|---|---|
|cosd-comparison|根节点|PC/Mobile|
|cosd-comparison-targets|比对对象|PC/Mobile|
|cosd-comparison-targets-left|左侧项图片及名称|PC/Mobile|
|cosd-comparison-targets-vs|vs图标|PC/Mobile|
|cosd-comparison-targets-right|右侧项图片及名称|PC/Mobile|
|cosd-comparison-logo|logo图片|PC/Mobile|
|cosd-comparison-bar|进度条节点|PC/Mobile|
|cosd-comparison-bar-item|各项进度条，胜-平-胜|PC/Mobile|
|cosd-comparison-table|比对项详情列表|PC/Mobile|
|cosd-comparison-table-item|单个比对项详情|PC/Mobile|

### Events
| 事件 | 参数 | 说明 |覆盖平台|
| --- | --- | --- |---|
| render-finished | - | 组件渲染完成 |PC/Mobile|
