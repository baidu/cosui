## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|type|'text' \| 'password'|'text'|否|输入框类型|PC/Mobile|
|value|string|-|否|当前输入框值|PC/Mobile|
|placeholder|string|-|否|提示文案|PC/Mobile|
|size|'sm' \| 'md' \| 'lg'|'lg'|否|sm:30px, md:36px, lg:40px|PC/Mobile|
|appearance|string|'outline'|否|输入框风格，'outline' \| 'filled'|PC/Mobile|
|disabled|boolean|false|否|禁用输入框|PC/Mobile|
|clear|boolean|false|否|是否显示清空图标|PC/Mobile|
|count|boolean|false|否|是否显示输入字数统计，需要配合maxlength使用|PC/Mobile|
|maxlength|number|-|否|输入内容的最大长度|PC/Mobile|
|minlength|number|-|否|输入内容的最小长度|PC/Mobile|
|enterkeyhint|string|-|否|移动设备虚拟键盘上回车键的显示方式，与原生 enterkeyhint 一致|PC/Mobile|

### Slots
|名称|说明|覆盖平台|
|---|---|---|
|title|输入框前标题槽位|PC/Mobile|
|button|输入框后按钮槽位|PC/Mobile|
|prefix|输入框前置槽位|PC/Mobile|

### Parts

``` shell
|-- cos-input
|   |-- cos-input-title-slot
|   |-- cos-input-box
|   |-- cos-input-clear
|   |-- cos-input-count
|   |-- cos-input-button-slot
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-input|根层|PC/Mobile|
|cos-input-title-slot|输入框标题插槽|PC/Mobile|
|cos-input-box|输入框|PC/Mobile|
|cos-input-clear|输入框清空按钮|PC/Mobile|
|cos-input-count|输入框字数统计|PC/Mobile|
|cos-input-button-slot|输入框按钮插槽|PC/Mobile|

### Events

|名称|参数|说明|覆盖平台|
|---|---|---|---|
|change|{event: Event, value: string}|输入框的值发生变化并且元素失去焦点时触发|PC/Mobile|
|input|{event: Event, value: string}|输入、删除或修改输入框的值时触发|PC/Mobile|
|blur|{event: Event}|失去焦点时触发|PC/Mobile|
|focus|{event: Event}|获得焦点时触发|PC/Mobile|
|clear|{event: Event}|点击清空按钮时触发|PC/Mobile|
|keyup|{event: Event}|键盘按键被松开时触发|PC/Mobile|
|keydown|{event: Event}|键盘按键被按下时触发|PC/Mobile|
