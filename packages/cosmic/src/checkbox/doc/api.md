## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|appearance|'tag' \| 'mark'|'tag'|否|视觉风格|PC/Mobile|
|value|string \| number|''|是|值|PC/Mobile|
|checked|boolean|false|否|是否选中|PC/Mobile|
|disabled|boolean|false|否|是否禁用|PC/Mobile|
|indeterminate|boolean|false|否|是否半选|PC/Mobile|

### Slots

|名称|说明|覆盖平台|
|---|---|---|
|default|默认槽位，单选框内容|PC/Mobile|

### Parts

```
|-- cos-checkbox
|   |-- cos-checkbox-icon
|   |   |-- cos-checkbox-icon-inner
|   |-- cos-checkbox-label
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-checkbox|根节点|PC/Mobile|
|cos-checkbox-icon|mark 视觉风格图标|PC/Mobile|
|cos-checkbox-icon-inner|mark 视觉风格内层图标|PC/Mobile|
|cos-checkbox-label|单选框内容|PC/Mobile|

### Events

|事件|参数|说明|覆盖平台|
|---|---|---|---|
|change|{value: string \| number, event: Event}|选项变化时触发|PC/Mobile|
