## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|type|'single' \| 'range'|'single'|否|选择类型，包括单选 & 范围选择两种|PC/Mobile|
|value|Date \| Date[]|-|否|选择值, 值类型为 JavaScript 原生 Date 对象或 Date 对象数组; **不建议**直接在 initdata 中设置 value 值 new Date(),在含 ssr 场景中，可能会存在 ssr 与 csr 数据不一致问题|PC/Mobile|
|disabled-date|(date: Date) => boolean|-|否|不可选择的日期|PC/Mobile|
|valid-range|Date[]|-|否|有效日期范围|Mobile|
|control-date|{year: number, month: number}|-|否|指定年月用于重新构建月份矩阵|PC/Mobile|

### Slots
|名称|说明|覆盖平台|
|---|---|---|
|date|筛选入口|PC/Mobile|
|header|自定义头部内容|PC/Mobile|

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
|-- cos-calendar
|   |-- cos-calendar-header
|   |-- cos-calendar-month
|   |   |-- cos-calendar-month-header
|   |   |-- cos-calendar-content
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-calendar|日历根节点|PC/Mobile|
|cos-calendar-header|日历顶部区域|PC/Mobile|
|cos-calendar-month|日历月份区域|PC/Mobile|
|cos-calendar-month-header|日历年月标识区域|PC/Mobile|
|cos-calendar-content|日历内容区域|PC/Mobile|

### Events

|事件|参数|说明|覆盖平台|
|---|---|---|---|
|change|{value: DayItem}|点击任意日期触发|PC/Mobile|
