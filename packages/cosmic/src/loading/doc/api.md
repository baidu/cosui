## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|text|string|'加载中...'|否|加载提示文案|PC/Mobile|
|position|'right' \| 'bottom' |'bottom'|否|加载文案展示方向|PC/Mobile|
|appearance|'reverse' \| ''|''|否|加载icon风格'inverse'|PC/Mobile|

### Slots

|名称|说明|覆盖平台|
|---|---|---|
|icon|加载图标槽位|PC/Mobile|

### Parts

``` shell
|-- cos-loading
|   |-- cos-loading-icon
|   |-- cos-loading-text
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-loading|根节点|PC/Mobile|
|cos-loading-icon|加载图标|PC/Mobile|
|cos-loading-text|加载文案|PC/Mobile|
