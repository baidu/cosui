## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|logo|string|''|否|图片地址（优先级高于 icon）|PC/Mobile|
|icon|string|''|否|图标名称|PC/Mobile|
|label|string|''|否|行为词|PC/Mobile|
|text|string|''|是|引导词|PC/Mobile|
|link-info|[LinkInfo](/components/cosmic/link)|{}|否|跳转信息|PC/Mobile|

### Events

|名称|参数|说明|覆盖平台|
|---|---|---|---|
|click|{event: Event}|点击事件|PC/Mobile|

### Parts

``` shell
|-- cosd-tag-link
```

|名称|说明|覆盖平台|
|---|---|---|
|cosd-tag-link|根节点|PC/Mobile|
