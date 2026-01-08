## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|api-key|string|-|是|[百度地图 ak](https://lbsyun.baidu.com/faq/search?id=299&title=677)|PC/Mobile|
|lat|number|39.915|否|地图中心经度|PC/Mobile|
|lng|number|116.404|否|地图中心纬度|PC/Mobile|
|zoom|number|15|否|地图缩放级别|PC/Mobile|
|route|Route[]|-|否|地图路线|PC/Mobile|
|marker|Marker[]|-|否|地图标记|PC/Mobile|
|district|District[]|-|否|地图区域|PC/Mobile|

#### Route

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|points|Array<[number, number]>|-|是|起点，终点以及途经点经纬度，同 [百度地图 Point](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_webgl_1_0.html#a1b0)，百度地图 sdk 只有驾车模式可以支持途径点，其他出行方式均不支持途径点|PC/Mobile|
|travelType|string|'transit'|否|出行方式，可选值：<br>• 'transit'：公共交通<br>• 'driving'：驾车<br>• 'walking'：步行<br>• 'riding'：骑行 |PC/Mobile|
|drivingPolicy|number|0|否|驾车方案的策略配置（参考 [百度地图DrivingPolicy](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_webgl_1_0.html#a8b25)），可选值：<br>• 0：默认策略，同百度地图 BMAP_DRIVING_POLICY_DEFAULT<br>• 3：避免高速，同百度地图 BMAP_DRIVING_POLICY_AVOID_HIGHWAYS<br>• 4：首选高速，同百度地图 BMAP_DRIVING_POLICY_FIRST_HIGHWAYS <br>• 5：避免拥堵，同百度地图 BMAP_DRIVING_POLICY_AVOID_CONGESTION|PC/Mobile|
|transitPolicy|number|0|否|市内公交方案换乘策略（参考 [百度地图TransitPolicy](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_webgl_1_0.html#a8b9)），可选值：<br>• 0：推荐方案，同百度地图 BMAP_TRANSIT_POLICY_RECOMMEND<br>• 1：最少换乘，同百度地图 BMAP_TRANSIT_POLICY_LEAST_TRANSFER<br>• 2：最少步行，同百度地图 BMAP_TRANSIT_POLICY_LEAST_WALKING<br>• 3：不乘地铁，同百度地图 BMAP_TRANSIT_POLICY_AVOID_SUBWAYS<br>• 4：最少时间，同百度地图 BMAP_TRANSIT_POLICY_LEAST_TIME<br>• 5：首选地铁，同百度地图 BMAP_TRANSIT_POLICY_FIRST_SUBWAYS|PC/Mobile|

#### Marker

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|lat|number|-|是|标记纬度|PC/Mobile|
|lng|number|-|是|标记经度|PC/Mobile|
|icon|string|-|否|标记图标 url|PC/Mobile|
|label|Label|-|否|标记点自定义文本标注|PC/Mobile|

##### Label

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|text|string|-|否|文本标注内容|PC/Mobile|
|style|object|-|否|文本标注样式|PC/Mobile|

#### District

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|lat|number|-|是|行政区域纬度|PC/Mobile|
|lng|number|-|是|行政区域经度|PC/Mobile|
|level|number|-|是|行政区域邮编|PC/Mobile|
|name|string|-|是|行政区域名称|PC/Mobile|
|code|number|-|是|行政区域邮编|PC/Mobile|
|districts|District[]|-|否|行政区子区域|PC/Mobile|
|highLight|District[]|-|否|高亮区域|PC/Mobile|

### Slots
无

### Parts

```shell
|-- cos-map
|   |-- cos-map-fullscreen
|   |-- cos-map-zoom-control
|   |   |-- cos-map-zoom-in
|   |   |-- cos-map-zoom-out
|   |-- cos-map-container
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-map|根层|PC/Mobile|
|cos-map-fullscreen|全屏按钮|PC/Mobile|
|cos-map-zoom-control|缩放控件|PC/Mobile|
|cos-map-zoom-in|缩放级别增加|PC/Mobile|
|cos-map-zoom-out|缩放级别减少|PC/Mobile|
|cos-map-container|地图容器|PC/Mobile|

### Events

|事件|参数|说明|覆盖平台|
|---|---|---|---|
|map-ready|null|地图初始化完成|PC/Mobile|
|map-click|{event: Event}|点击地图|PC/Mobile|
|fullscreen|{event: Event}|点击全屏按钮|PC/Mobile|
|zoom-in|{event: Event}|点击放大按钮|PC/Mobile|
|zoom-out|{event: Event}|点击缩小按钮|PC/Mobile|
