## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|columns|Array<Array<string \| number \| Record<string,any>>>|[]|是|多列数据|PC/Mobile|
|selected-index|number[]|[]|否|选中索引|PC/Mobile|

### Slots

|名称|参数|说明|覆盖平台|
|---|---|---|---|
|default|item: string \| number \| Record<string,any>; index: number|滚动选项,scoped数据:item:选项数据，index:选项索引|PC/Mobile|

### Parts

``` shell
|-- cos-picker
|   |-- cos-picker-columns
|   |   |-- cos-picker-column
|   |   |   |-- cos-picker-column-scroll
|   |   |   |   |-- cos-picker-column-item
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-picker|根节点|PC/Mobile|
|cos-picker-columns|多列容器|PC/Mobile|
|cos-picker-column|单列容器|PC/Mobile|
|cos-picker-column-scroll|可滚动单列|PC/Mobile|
|cos-picker-column-item|单个选项|PC/Mobile|

### Events

|事件|参数|说明|覆盖平台|
|---|---|---|---|
|change|{coulumnIndex: number, index: number}|列表项选中发生改变时触发|PC/Mobile|
