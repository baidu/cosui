## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|value|string|-|否|当前输入框值|PC/Mobile|
|placeholder|string|-|否|提示文案|PC/Mobile|
|rows|number|-|否|元素的输入文本的行数|PC/Mobile|
|clear|boolean|false|否|是否支持清空|PC/Mobile|
|count|boolean|false|否|是否支持字数统计|PC/Mobile|
|appearance|string|'outline'|否|输入框风格，'outline' \| 'filled'|PC/Mobile|
|height|number|108px|否|高度|PC/Mobile|
|max-height|number|-|否|最大高度，未超出时根据输入内容自适应|PC/Mobile|
|disabled|boolean|false|否|禁用输入框|PC/Mobile|
|maxlength|number|-|否|输入内容的最大长度|PC/Mobile|
|minlength|number|-|否|输入内容的最小长度|PC/Mobile|

### Slots
|名称|说明|覆盖平台|
|---|---|---|
|title|输入框上方标题槽位|PC/Mobile|
|bottomSuffix|输入框下方槽位，若存在字数统计和清空功能，则在其后展示|PC/Mobile|


### Parts

``` shell
|-- cos-textarea
|   |-- cos-textarea-box
|   |-- cos-textarea-bottom
|   |   |-- cos-textarea-clear
|   |   |-- cos-textarea-count
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-textarea|根层|PC/Mobile|
|cos-textarea-box|输入框|PC/Mobile|
|cos-textarea-bottom|输入框底部|PC/Mobile|
|cos-textarea-clear|输入框清空按钮|PC/Mobile|
|cos-textarea-count|输入框字数统计|PC/Mobile|

### Events

|名称|参数|说明|覆盖平台|
|---|---|---|---|
|change|{event: Event, value: string}|输入框的值发生变化并且元素失去焦点时触发|PC/Mobile|
|input|{event: Event, value: string}|输入、删除或修改输入框的值时触发|PC/Mobile|
|blur|{event: Event}|失去焦点时触发|PC/Mobile|
|focus|{event: Event}|获得焦点时触发|PC/Mobile|
|clear|{event: Event}|点击清空按钮时触发|PC/Mobile|
|keydown|{event: KeyboardEvent}|键盘按下时触发|PC/Mobile|
