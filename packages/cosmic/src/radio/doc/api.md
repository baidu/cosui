## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|appearance|'tag' \| 'mark'|'tag'|否|视觉风格|PC/Mobile|
|value|string \| number|''|是|值|PC/Mobile|
|checked|boolean|false|否|是否选中|PC/Mobile|
|disabled|boolean|false|否|是否禁用|PC/Mobile|

### Slots

|名称|说明|覆盖平台|
|---|---|---|
|default|默认槽位，单选框内容|PC/Mobile|

### Parts

```
|-- cos-radio
|   |-- cos-radio-icon
|   |   |-- cos-radio-icon-inner
|   |-- cos-radio-label
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-radio|根节点|PC/Mobile|
|cos-radio-icon|mark 视觉风格图标|PC/Mobile|
|cos-radio-icon-inner|mark 视觉风格内层图标|PC/Mobile|
|cos-radio-label|单选框内容|PC/Mobile|

### Events

无
