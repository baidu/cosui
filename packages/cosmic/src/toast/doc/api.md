## API

### Parts

``` shell
|-- cos-toast
|       |-- cos-toast-lg-icon
|       |-- cos-toast-content
|           |-- cos-toast-md-icon
|           |-- cos-toast-message
|           |-- cos-toast-button
|           |-- cos-toast-link
|               |-- cos-toast-link-divider
|               |-- cos-toast-link-text
|           |-- cos-toast-close-icon
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-toast|根节点|PC/Mobile|
|cos-toast-lg-icon|垂直布局下，上方的主图标|Mobile|
|cos-toast-content|垂直布局下，下方的 Toast 容器|PC/Mobile|
|cos-toast-md-icon|左侧常规尺寸图标|PC/Mobile|
|cos-toast-message|提示文字|Mobile|
|cos-toast-button|文字右边的按钮，复用 Button 组件|Mobile|
|cos-toast-link|链接相关元素（分割线、链接文字、右边小箭头），复用 Link 组件|Mobile|
|cos-toast-link-divider|分割线|Mobile|
|cos-toast-link-text|链接文字|PC/Mobile|
|cos-toast-close-icon|右侧关闭图标|PC|

### Methods

Toast 提供静态方法调用

|名称|类型|说明|覆盖平台|
|---|---|---|---|
|show|callback: (config: Config) => void|显示 Toast，根据 config 对象参数配置具体交互和外观|PC/Mobile|
|info|callback: (config: Config) => void|info 外观显示 Toast，替换 config 的 type 参数|PC|
|success|callback: (config: Config) => void|success 外观显示 Toast，替换 config 的 type 参数|PC/Mobile|
|warn|callback: (config: Config) => void|warning 外观显示 Toast，替换 config 的 type 参数|PC|
|error|callback: (config: Config) => void|error 外观显示 Toast，替换 config 的 type 参数|PC|
|hide|callback: (config: Config) => void|根据程序执行完成的不可控时机调用关闭 Toast|Mobile|

config 是包含以下属性的 `object`：

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|message|string|''|可选|文本内容|PC/Mobile|
|type|string (enum) 'refresh' \|'info' \| 'success' \| 'warning' \| 'error' \| 'avatar'|''|可选|类型，根据传值展示不同的 icon 外观和布局结构。默认为空，不展示 icon。<br />Mobile type 字段仅支持 refresh 和 success |PC/Mobile|
|size|string (enum) 'md' \| 'lg'|'md'|可选|展示尺寸，影响 icon 的外观|Mobile|
|closable|boolean|false|可选|是否展示右侧关闭按钮|PC|
|duration|number|2000|可选|显示时长（毫秒）|PC/Mobile|
|position|'top' \| 'middle' \| 'bottom'|'middle'|可选|组件位置|Mobile|
|top|number\|undefined|undefined|可选|组件距离页面顶部的高度，单位 px；<br />优先级高于整体配置 baseTop|PC|
|animationDuration|number|0|可选|旋转1周的时长|Mobile|
|actionText|string|''|可选|链接文字。为空时，不显示右侧链接跳转区域|PC/Mobile|
|actionType|string (enum) 'link' \| 'button'|'link'|可选|默认展示 link，可以选择以 button 风格展示右侧的交互区域|PC/Mobile|
|onAction|callback: () => void|undefined|可选|点击右侧可交互区域后的回调函数|PC/Mobile|
|onClose|callback: () => void|undefined|可选|关闭时的回调函数|PC|
|parentSelector|string \| HTMLElement|'body'|可选|Toast 组件父容器的 [selector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)|Mobile|
