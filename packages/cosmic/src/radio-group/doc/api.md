## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|value|string \| number|''|否|值|PC/Mobile|
|disabled|boolean|false|否|禁选所有子单选框|PC/Mobile|

### Slots

|名称|说明|覆盖平台|
|---|---|---|
|default|默认槽位，用于包裹 Radio 组件等插槽内容|PC/Mobile|

### Parts

```
|-- cos-radio-group
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-radio-group|根节点|PC/Mobile|

### Events

|事件|参数|说明|覆盖平台|
|---|---|---|---|
|change|{value: string \| number, event: Event}|选项变化时触发|PC/Mobile|
