## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|--|---|--|
|title|string|''|必选|标题内容|PC/Mobile|
|description|string|''|可选|辅助描述信息|PC/Mobile|
|size|'sm' \| 'md'|'sm'|可选|组件尺寸，对应卡内空状态、空页面两种类型|PC/Mobile|
|icon|string|[默认头像](https://gips0.baidu.com/it/u=3906111889,1050216796&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f360_360)|可选|图标信息，判断是否为 url，否则作为 icon 名称|PC/Mobile|


### Parts

``` shell
|-- cos-empty
|   |-- cos-empty-icon
|   |-- cos-empty-title
|   |-- cos-empty-description
|   |-- cos-empty-action
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-empty|空状态根节点|PC/Mobile|
|cos-empty-icon|图标节点|PC/Mobile|
|cos-empty-title|标题节点|PC/Mobile|
|cos-empty-description|描述信息节点|PC/Mobile|
|cos-empty-action|默认操作区插槽|PC/Mobile|
