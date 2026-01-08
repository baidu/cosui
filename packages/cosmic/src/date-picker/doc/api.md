## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|type|'single' \| 'range'|'single'|否|选择类型，包括单选 & 范围选择两种|PC/Mobile|
|value|Date \| Date[]|-|否|选择值, 值类型为 JavaScript 原生 Date 对象或 Date 对象数组|PC/Mobile|
|disabled|boolean|false|否|是否禁用入口|PC/Mobile|
|disabled-date|(date: Date) => boolean|-|否|不可选择的日期,适用非rolling变体|PC/Mobile|
|title|string|'选择日期'|否|日历选择器标题，mobile drawer 弹层使用|Mobile|
|placeholder|string|-|否|未选择的占位内容，范围选择支持传入{start: 'xxx', end: 'xxx'}对象|PC/Mobile|
|range|Date[]|-|否|有效日期范围（rolling 变体仅约束年份）|PC/Mobile|
|format|'YYYY-MM-DD' \| 'YYYY-MM-DD-WW' \| 'YYYY' \| 'YYYY-MM' \| 'YYYY-QQ'|'YYYY-MM-DD'|否|选择日期组合格式|PC/Mobile|
|appearance|'panel' \| 'rolling'|'panel'|否|样式变体|Mobile|
| get-popup-container | () => HTMLElement | 当前位置节点 |可选| 指定父级 DOM，弹层将会渲染至该 DOM  | Mobile |

### Slots
|名称|说明|覆盖平台|
|---|---|---|
|date|自定义单元格|PC/Mobile|
|entry|选择器入口|PC/Mobile|
|header|顶部区域|Mobile|
|month-header|顶部年月标识区域|Mobile|
|footer|底部区域|PC/Mobile|


#### Slots scoped
|名称|类型|说明|覆盖平台|
|---|---|---|---|
|dayItem|DayItem|日期对象|PC/Mobile|

#### DayItem
|名称|类型|说明|覆盖平台|
|---|---|---|---|
|date|Date|当前日期|PC/Mobile|
|selected|boolean|单选选中项|PC/Mobile|
|start|boolean|范围选择开头项|PC/Mobile|
|middle|boolean|范围选择中间项|PC/Mobile|
|end|boolean|范围选择结尾项|PC/Mobile|
|disabled|boolean|是否禁用|PC/Mobile|

### Parts

``` shell
|-- cos-date-picker
|   |-- cos-date-picker-entry
|   |-- cos-date-picker-panel
|   |   |-- cos-date-picker-header
|   |   |-- cos-date-picker-content
|   |   |-- cos-date-picker-footer
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-date-picker|日期选择器根节点|PC/Mobile|
|cos-date-picker-entry|选择器入口|PC/Mobile|
|cos-date-picker-panel|选择器面板|PC/Mobile|
|cos-date-picker-header|面板顶部区域|PC/Mobile|
|cos-date-picker-content|面板内容区域|PC/Mobile|
|cos-date-picker-footer|面板底部区域|PC/Mobile|


### Events

|事件|参数|说明|覆盖平台|
|---|---|---|---|
|change|{value: Date \| Date[] \| DayItem \| DayItem[] \| { date: Date \| Date[] }, lunarValue?: {year: number, month: number, day: number}}|点击任意日期触发，单选时 value 为 Date 或 DayItem，范围选择时为 Date[] 或 DayItem[]，支持农历时返回 lunarValue|PC/Mobile|
|confirm|{value?: Date \| Date[], lunarValue?: {year: number, month: number, day: number}}|点击确认日期时触发，单选时 value 为 Date，范围选择时为 Date[]，支持农历时返回 lunarValue|PC/Mobile|
|open|-|打开弹层时触发|PC/Mobile|
|close|-|关闭弹层时触发|PC/Mobile|
