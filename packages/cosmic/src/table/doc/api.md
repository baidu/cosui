## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|data|array|[]|是|表格内容|PC/Mobile|
|columns|Columns|[]|是|表格列配置。<br />**function 类型参数不适用于 SSR 场景，如 content、colspan、rowspan 属性。**|PC/Mobile|
|layout|'fixed'\|'auto'|'fixed'|否|表格的布局形<br /> - 'fixed': 表格和列的宽度是由第一行单元格的宽度来设置的。<br /> - 'auto': 自动表格布局。表格及其单元格的宽度会根据内容自动调整大小。|PC/Mobile|
|border|'none'\|'row'\|'all'|'none'|否|边框展示形式<br />- 'none': 无边框<br />- 'row': 带有行边框<br /> - 'all': 带有行边框和列边框和表外边框|PC/Mobile|
|striped|boolean|true|否|是否展示斑马格样式|PC/Mobile|

#### Columns
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|title|string|-|否|列头(表头)标题|PC/Mobile|
|prop|string|-|否|对应列内容的字段名（key），用于确定此列的值|PC/Mobile|
|content|(value: any, row: RecordType, rowIndex: number) => string|-|否|对应列内容的过滤器函数，slot 的优先级高于 content 属性，即如果同时写 slot 和 content 属性，渲染 slot 内容|PC/Mobile|
|align|'left'\|'center'\|'right'|'left'|否|列内的文本排列方式|PC/Mobile|
|width|number \| string|-|否|列宽，如需固定列则必须需要设置此项，并且需要为 number 类型(px)。|PC/Mobile|
|fixed|boolean|false|否|选择当列是否固定，当设置为 true，则向左或向右滚动到左边缘或右边缘时会贴边。<br />如果设置的有多列的固定，那么会按序贴边。|PC/Mobile|
|colspan|(value: any, row: RecordType, rowIndex: number) => number|1|否|单元格跨越或扩展多少列。colspan 设值为 0 时，设置的单元格不会渲染|PC/Mobile|
|rowspan|(value: any, row: RecordType, rowIndex: number) => number|1|否|单元格跨越或扩展多少行。rowspan 设值为 0 时，设置的单元格不会渲染|PC/Mobile|

### Slots

|名称|说明|
|---|---|
|[columns[i].prop]|Column 内容插槽，填充列单元格。<br />通过 slot 可以获取到 row（data 当行）、rowIndex（当行是第 i + 1 行）、column（当列）的数据。|
|header|表头插槽，填充表格单元格。<br />通过 slot 可以获取到 column（当列）、columnIndex（当列是第 columnIndex 列）的数据。|
|cell|单元格插槽，填充表格单元格。<br />通过 slot 可以获取到 row（data 当行）、rowIndex（当行是第 i + 1 行）、column（当列）、columnIndex（当列是第 columnIndex 列）的数据。|

### Parts

``` shell
|-- cos-table
|   |-- cos-table-main
|   |   |-- cos-table-head
|   |   |   |-- cos-table-head-tr
|   |   |   |   |-- cos-table-th
|   |   |   |   |   |-- cos-table-th-content
|   |   |   |   |   |-- cos-table-border-row
|   |   |-- cos-table-body
|   |   |   |-- cos-table-body-tr
|   |   |   |   |-- cos-table-td
|   |   |   |   |   |-- cos-table-td-content
|   |   |   |   |   |-- cos-table-border-row
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-table|标签根节点|PC/Mobile|
|cos-table-main|表格区域|PC/Mobile|
|cos-table-head|表头区域|PC/Mobile|
|cos-table-body|表内容区域|PC/Mobile|
|cos-table-head-tr|表头行区域|PC/Mobile|
|cos-table-body-tr|表内容行区域|PC/Mobile|
|cos-table-border-row|表行边框|PC/Mobile|
|cos-table-th|表头单元格|PC/Mobile|
|cos-table-th-content|表头单元格内容|PC/Mobile|
|cos-table-td|表内容单元格|PC/Mobile|
|cos-table-td-content|表内容单元格内容|PC/Mobile|

### Events

|事件|参数|说明|覆盖平台|
|---|---|---|---|
|row-click|{row: Record, index: number, event: Event}|当表内容行被点击时会触发该事件|PC/Mobile|
|cell-click|{row: Record, rowIndex: number, column: Record, columnIndex: number, event: Event}|当表内容单元格被点击时会触发该事件|PC/Mobile|
