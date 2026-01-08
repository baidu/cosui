## API

### Props

|名称|类型|初始值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
| map-image  | string | '' | 是 | 地图原始链接 | PC/Mobile |
| marker  | boolean | false | 否 | 地图中间是否标记 | PC/Mobile |
| link-info  | [LinkInfo](/components/cosmic/link) | - | 是 | 地图跳转信息 | PC/Mobile |
| folded  | boolean | false | 否 | 初始是否展开 | PC/Mobile |
| address  | string | '' | 否 | 地址 | PC/Mobile |
| area  | string | '' | 否 | 市区 | PC/Mobile |
| invoke-info  | InvokeInfo | {} | 否 | 接入 mcpsdk 时的调起参数 | PC/Mobile |

#### InvokeInfo
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|params|Params|-|是|调起的 schema 所需参数|PC/Mobile|
|defaultUrl|string|-|是|调起兜底 url 链接|PC/Mobile|


#### Params
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|show_type|string|'detail_tab'|是|固定值 表示打开地图 app 的初始化页面类型|PC/Mobile|
|uid|string|-|是|poi 地点唯一 id|PC/Mobile|
|src|string|-|是|调起地图打点参数(与地图pm shanshan约定)|PC/Mobile|

[更多参数详见，地图 Open API协议, "poi 搜索" 协议参数](https://lbsyun.baidu.com/faq/api?title=webapi/uri/web)

### Slots
无

### Parts

``` shell
|-- cosd-poi
|   |-- cosd-poi-overview
|   |-- |-- cosd-poi-overview-icon
|   |-- |-- cosd-poi-overview-area
|   |-- |-- cosd-poi-overview-address
|   |-- cosd-poi-content
|   |-- |-- cosd-poi-map
|   |-- |-- |-- cosd-poi-map-marker
```
|名称|说明|覆盖平台|
|---|---|---|
|cosd-poi|根节点|PC/Mobile|
|cosd-poi-overview|poi 弱样式|PC/Mobile|
|cosd-poi-overview-icon|icon|PC/Mobile|
|cosd-poi-overview-area|市区|PC/Mobile|
|cosd-poi-overview-address|地址|PC/Mobile|
|cosd-poi-content|内容区|PC/Mobile|
|cosd-poi-map-marker|地图图片中间标记 icon|PC/Mobile|


### Events

|事件|参数|说明|覆盖平台|
|---|---|---|---|
| poi-ready | {invokeParams: InvokeParams} | 组件挂载完成 |PC/Mobile|
| click | {event: Event} | 地图图区点击 |PC/Mobile|

#### InvokeParams
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|params|Params|-|是|调起的 schema 所需参数|PC/Mobile|
|posName|string|-|是|固定为 pos_invoke_bdmap_direction |PC/Mobile|
|defaultUrl|string|-|是|调起兜底 url 链接|PC/Mobile|
|inited|(invokeCallback: (event: Event) => void) => void|-|是|调起初始化完成之后的 hooks 必须调用并且传入调起方法|PC/Mobile|
