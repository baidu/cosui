## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|open|boolean|false|否|面板显示或隐藏的受控属性|PC/Mobile|
|value|Date \| Date[]|-|否|选择值, 值类型为 JavaScript 原生 Date 对象或 Date 对象数组|PC/Mobile|
|disabled|boolean|false|否|是否禁用入口|PC/Mobile|
|title|string|'选择日期'|否|日历选择器标题，mobile drawer 弹层使用|Mobile|
|placeholder|string|-|否|未选择的占位内容|PC/Mobile|
|range|Date[]|-|否|有效日期范围（仅约束年份）|PC/Mobile|
|format|'YYYY-MM-DD-HH-mm-ss' \| 'YYYY-MM-DD-HH-mm' \| 'YYYY-MM-HH-mm' \| 'YYYY-MM-DD-HH'|'YYYY-MM-DD-HH-mm-ss'|否|选择日期组合格式|PC/Mobile|
|lunar|boolean|false|否|是否展示农历开关|Mobile|
| get-popup-container | () => HTMLElement | 当前位置节点 |可选| 指定父级 DOM，弹层将会渲染至该 DOM  | Mobile |
| drawer-class | '' | - |可选| 传入 drawer 的 class 类名，仅在使用了 get-popup-container 挂载 body 上，无法覆盖特定 drawer 样式时使用  | Mobile |

### Slots
|名称|说明|覆盖平台|
|---|---|---|
|entry|选择器入口|PC/Mobile|
|footer|底部区域|PC/Mobile|


### Parts

``` shell
|-- cos-date-time-picker
|   |-- cos-date-time-picker-entry
|   |-- cos-date-time-picker-panel
|   |   |-- cos-date-time-picker-header
|   |   |-- cos-date-time-picker-content
|   |   |-- cos-date-time-picker-footer
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-date-time-picker|日期选择器根节点|PC/Mobile|
|cos-date-time-picker-entry|选择器入口|PC/Mobile|
|cos-date-time-picker-panel|选择器面板|PC/Mobile|
|cos-date-time-picker-content|面板内容区域|PC/Mobile|
|cos-date-time-picker-footer|面板底部区域|PC/Mobile|


### Events

|事件|参数|说明|覆盖平台|
|---|---|---|---|
|change|{value: DayItem}|点击任意日期触发|PC/Mobile|
|confirm|{value: DayItem}|点击确认日期时触发|PC/Mobile|
|open|-|打开弹层时触发|PC/Mobile|
|close|-|关闭弹层时触发|PC/Mobile|
