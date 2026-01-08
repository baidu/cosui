## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|value|string|''|否|当前输入框值|PC/Mobile|
|placeholder|string|'搜索'|否|提示文案|PC/Mobile|
|maxlength|number|20|否|输入内容的最大长度|PC/Mobile|
|active|boolean|false|否|是否在搜索中|PC/Mobile|

### Parts

```
|-- cos-search-input
|   |-- cos-search-input-box
|   |-- cos-search-input-cancel
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-search-input|根节点|PC/Mobile|
|cos-search-input-box|input输入框|PC/Mobile|
|cos-search-input-cancel|取消文本内容|PC/Mobile|

### Events

|名称|参数|说明|覆盖平台|
|---|---|---|---|
|cancel|-|点击取消按钮时触发|PC/Mobile|
|input|{value: string}|输入、删除或修改输入框的值时触发|PC/Mobile|
|focus|-|获得焦点时触发|PC/Mobile|
|clear|-|点击清空按钮时触发|PC/Mobile|
