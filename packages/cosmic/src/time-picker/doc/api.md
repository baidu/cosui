## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|value|Date \| Date[]|-|否|选择值, 值类型为 JavaScript 原生 Date 对象或 Date 对象数组|PC/Mobile|
|title|string|'选择日期'|否|日历选择器标题，mobile drawer 弹层使用|Mobile|
|format|'HH-mm-ss' \| 'HH-mm' \| 'HH'|'HH-mm-ss'|否|选择日期组合格式|PC/Mobile|


### Slots

|名称|说明|覆盖平台|
|---|---|---|
|entry|选择器入口|PC/Mobile|
|header|顶部区域|Mobile|
|footer|底部区域|PC/Mobile|


### Events

|事件|参数|说明|覆盖平台|
|---|---|---|---|
| close | | 面板关闭出发 | PC/Mobile |
| change| {value: Date} | 切换内容时触发 PC/Mobile |
| confirm | {value: Date}| 点击确认按钮时触发 | PC/Mobile |


### Parts

#### Mobile
``` shell
|-- cos-time-picker
|   |-- cos-time-picker-header
|   |-- cos-time-picker-content
|   |   |-- cos-wheel
|   |   |   |-- cos-wheel-list
|   |   |-- cos-time-picker-selected-box
|   |-- cos-time-picker-footer
```

#### PC
``` shell
|-- cos-time-picker
|   |-- cos-time-picker-header
|   |   |-- cos-time-picker-header-item
|   |-- cos-time-picker-content
|   |   |-- cos-wheel
|   |   |   |-- cos-wheel-list
|   |-- cos-time-picker-footer
|   |   |-- cos-time-picker-footer-now
|   |   |-- cos-time-picker-footer-confirm
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-time-picker|时间选择器根节点|PC/Mobile|
|cos-time-picker-content|内容区节点|PC/Mobile|
|cos-timer-picker-footer|底部区域节点|PC/Mobile|
