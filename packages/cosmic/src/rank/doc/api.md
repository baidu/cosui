## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|size|'sm' \| 'md' \| 'lg'|'lg'|可选|排序标签的尺寸大小|PC/Mobile|
|index|number|1|可选|序号，四位数及以上的序号将显示为 999+|PC/Mobile|
|appearance|'filled-leaf' \| 'filled' \| 'subtle'|'filled-leaf'|可选|排序标签的风格，'filled-leaf'为一级标签，'filled'为二级标签，'subtle'为三级标签|PC/Mobile|

### Parts

``` shell
|-- cos-rank
|   |-- cos-rank-index
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-rank|排序根节点|PC/Mobile|
|cos-rank-index|排序序号节点|PC/Mobile|
