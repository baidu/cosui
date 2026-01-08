## API

### Props

|名称|类型|初始值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
| thumbnail  | string | '' | 是 | 店铺图片 | PC/Mobile |
| title  | string | '' | 是 | 店铺标题 | PC/Mobile |
| distance  | string | '' | 是 | 距离 | PC/Mobile |
| tags  | Tag[] | [] | 是 | 标签 | PC/Mobile |
| link-info  | [LinkInfo](/components/cosmic/link) | - | 是 | 店铺跳转信息 | PC/Mobile |
| navigation-info  | [LinkInfo](/components/cosmic/link) | - | 是 | 导航跳转信息 | PC/Mobile |
| poi  | Poi |  | 是 | 与 poi 相关的信息 | PC/Mobile |
| folded  | boolean | false | 否 | 是否收起态 | PC/Mobile |
| invoke-info  | InvokeInfo | {} | 否 | 接入 mcpsdk 时的调起参数 | PC/Mobile |

#### Tag
|名称|类型|初始值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|text|string|''|是|文本|PC/Mobile|

#### Poi
|名称|类型|初始值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|name|string|-|否|店铺名|PC/Mobile|
|area|string|-|否|店铺所属市区|PC/Mobile|
|address|string|-|是|店铺地址|PC/Mobile|


#### InvokeInfo
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|params|Params|-|是|调起的 schema 所需参数|PC/Mobile|
|defaultUrl|string|-|是|调起兜底 url 链接|PC/Mobile|

#### Params
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|origin|string|-|是|固定值 表示起点|PC/Mobile|
|destination|string|-|是|值为`name:destination\|latlng:latlng`destination 是目标地坐标名称, latlng 是用户位置坐标|PC/Mobile|
|coord_type|'bd09mc'|-|是|固定值,表示坐标系|PC/Mobile|
|src|string|-|是|调起地图打点参数|PC/Mobile|
|navInit|'yes'|-|是|固定值|PC/Mobile|

[更多参数详见，地图 Open API协议, "路线规划" 协议参数](https://lbsyun.baidu.com/faq/api?title=webapi/uri/web)

### Slots
无

### Parts

``` shell
|-- cosd-shop-address
|   |-- cosd-shop-address-overview
|   |-- |-- icon
|   |-- |-- cosd-shop-address-overview-area
|   |-- |-- cosd-shop-address-overview-address
|   |-- cosd-shop-address-content
|   |-- |--  cosd-shop-address-left
|   |-- |-- |-- image
|   |-- |-- |-- cosd-shop-address-text-info
|   |-- |-- |-- |-- cosd-shop-address-text-subtitle
|   |-- |-- |-- |-- cosd-shop-address-text-address
|   |-- |-- |-- |-- tags
|   |-- |--  cosd-shop-address-right
|   |-- |-- |-- cosd-shop-address-navigation
```
|名称|说明|覆盖平台|
|---|---|---|
|cosd-shop-address|根节点|PC/Mobile|
|cosd-shop-address-overview|弱样式|PC/Mobile|
|icon|icon|PC/Mobile|
|cosd-shop-address-overview-area|市区|PC/Mobile|
|cosd-shop-address-overview-address|地址|PC/Mobile|
|cosd-shop-address-content|内容区|PC/Mobile|
|cosd-shop-address-left|店铺左侧|PC/Mobile|
|image|店铺图片|PC/Mobile|
|cosd-shop-address-text-info|店铺右文信息|PC/Mobile|
|cosd-shop-address-text-subtitle|店铺标题|PC/Mobile|
|cosd-shop-address-text-address|店铺地址|PC/Mobile|
|tags|店铺标签|PC/Mobile|
|cosd-shop-address-navigation|店铺导航节点|PC/Mobile|


### Events

|事件|参数|说明|覆盖平台|
|---|---|---|---|
| poi-ready | {invokeParams: InvokeParams} | 组件挂载完成 |PC/Mobile|
| click | {event: Event, from?: 'navigation'} | 店铺点击, 店铺导航点击from=navigation |PC/Mobile|

#### InvokeParams
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|params|Params|-|是|调起的 schema 所需参数|PC/Mobile|
|posName|string|-|是|固定为 pos_invoke_bdmap_direction |PC/Mobile|
|defaultUrl|string|-|是|调起兜底 url 链接|PC/Mobile|
|inited|(invokeCallback: (event: Event) => void) => void|-|是|调起初始化完成之后的 hooks 必须调用并且传入调起方法|PC/Mobile|
