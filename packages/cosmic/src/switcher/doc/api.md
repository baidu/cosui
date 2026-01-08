## API

### Props

|名称|类型|默认值|说明|覆盖平台|
|---|---|---|---|---|
|checked|boolean|false|是否选中|PC/Mobile|
|disabled|boolean|false|是否禁用|PC/Mobile|
|size|'md' \| 'sm'|'md'|switch 的大小，支持'md'和'sm'两种设置|PC/Mobile|

### Parts

```shell
|-- cos-switcher
|   |-- cos-switcher-slider
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-switcher|根节点|PC/Mobile|
|cos-switcher-slider|滑块节点|PC/Mobile|

### Events

|名称|参数|说明|覆盖平台|
|---|---|---|---|
|change|({event:Event, checked:boolean}) => void|checked 改变时触发 change 事件|PC/Mobile|
