## API

### Props

|名称|是否必选|类型|默认值|说明|覆盖平台|
|:---:|:---:|:---:|:---:|:---:|:---:|
|format|否|boolean|true|是否需要组件对数值进行格式化，见[规范对照表](#规范对照表) |PC/Mobile|
|sign|否|string|''|货币符号|PC/Mobile|
|range|否|boolean|false|是否区间价格,当range为true时，则需必传max属性|PC/Mobile|
|value|否|number \| string|0|单价格|PC/Mobile|
|min|否|number \| string|0|区间价格-左边界|PC/Mobile|
|max|否|number \| string|0|区间价格-右边界|PC/Mobile|
|origin-value|否|number \| string|0|原始价格，删除线样式|PC/Mobile|
|origin-text|否|number \| string|0|三价格样式中原始价格，可以设置为文字说明|PC/Mobile|
|size|否|'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'|'xs'|价格各部分字号设置，支持使用对象对不同区域单独设置尺寸<br>默认通用对应尺寸: 12 \| 14 \| 16 \| 18 \| 21 \| 30px|PC/Mobile|
|ellipsis|否|boolean|false|小数点后数值省略符号 '+'号|PC/Mobile|

#### Size

|名称|是否必选|类型|默认值|说明|覆盖平台|
|:---:|:---:|:---:|:---:|:---:|:---:|
|sign|否|'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'|''|货币符号字号<br>货币符号特殊对应尺寸: 12 \| 14 \| 16px|PC/Mobile|
|num|否|'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'|''|价格字号|PC/Mobile|
|num.integer|否|'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'|''|整数字号|PC/Mobile|
|num.decimal|否|'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'|''|小数字号|PC/Mobile|
|num.quantityUnit|否|'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'|''|数量单位字号|PC/Mobile|
|unit|否|'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'|''|价格单位字号|PC/Mobile|
|originValue|否|'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'|''|原始价格字号|PC/Mobile|
|originText|否|'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'|''|三价格样式中原始价格字号|PC/Mobile|

### Parts

``` shell
|-- cos-price
|   |-- cos-price-sign
|   |-- cos-price-value
|   |   |-- cos-price-value-integer
|   |   |-- cos-price-value-decimal
|   |   |-- cos-price-value-quantity-unit
|   |-- cos-price-unit
|   |-- cos-price-origin-value
|   |-- cos-price-origin-text
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-price|价格根节点|PC/Mobile|
|cos-price-sign|货币符号节点|PC/Mobile|
|cos-price-value|价格节点|PC/Mobile|
|cos-price-value-integer|价格整数节点|PC/Mobile|
|cos-price-value-decimal|价格小数节点|PC/Mobile|
|cos-price-value-quantity-unit|价格数量单位节点|PC/Mobile|
|cos-price-unit|价格单位节点|PC/Mobile|
|cos-price-origin-value|原始价格节点|PC/Mobile|
|cos-price-origin-text|第三价格或自定义文本节点|PC/Mobile|

#### 规范对照表

当展示场景无限制时，精确展示全部金额；当展示场景有限制时，使用下方展示规则：
| **数值(n)** | **显示规则** | **示例** |
| :---- | :----| :---- |
| **0≦n<10** | 1. 默认保留2位小数，格式为“X.XX” <br>2. 当小数点后为0时显示整数<br>3. 最后位为0时省略 | 1. 9.99=9.99 <br>2. 2.09=2<br>3. 2.10=2.1 |
| **10≦n<1万** | 1. 保留2位小数，格式为“XX.XX” <br>2. 当小数点后为0时显示整数 <br>3. 如需要，可进一步省略，显示“XX+” | 1. 99.90 <br>2. 99.09=99 <br>3. 99+ |
| **1万≦n<1亿** | 1. 以万单位保留2位小数，格式为“XX.XX万” <br>2. 当以万单位的小数点后为0时显示整数 <br>3. 如需要，可进一步省略，显示“XX+” <br>4. 如需要，可进一步精确，显示小数位后完整位数，全部使用数字表达 | 1. 21999.90=2.19万 <br>2. 20999.90=2万 <br>3. 1万+ / 10万+ / 100万+ / 1000万+ <br>4. 20999.00 |
| **n≥1亿** | 1. 以亿单位保留2位小数，格式为“XX.XX亿” <br>2. 当以亿单位的小数点后为0时显示整数 <br>3. 如需要，可进一步省略，显示“XX+  <br>4. 如需要，可进一步精确，显示小数位后完整位数，全部使用数字表达 | 1. 219999999.90=2.19亿 <br>2. 209999999.90=2亿 <br>3. 1亿+ / 10亿+ / 100亿+ / 1000亿+ <br>4. 209999999.00 |
