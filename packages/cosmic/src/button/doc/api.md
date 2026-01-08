## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|size|'md'\|'sm'|'md'|可选|按钮大小|PC/Mobile|
|disabled|boolean|false|可选|禁用按钮, 禁用按钮同样可以透传点击事件|PC/Mobile|
|appearance|'primary'\|'secondary'\|'text'\|'text-primary'\|'icon'\|'plain'|'primary'|可选|按钮风格|PC/Mobile|

### Slots

|名称|说明|
|---|---|
|default|按钮主体内容扩展槽位|

### Parts

``` shell
|-- cos-button
|   |-- cos-button-content
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-button|按钮根节点|PC/Mobile|
|cos-button-content|内容容器节点|PC/Mobile|

### Events

|事件|参数|说明|覆盖平台|
|---|---|---|---|
|click|{event: Event, disabled}|点击事件|PC/Mobile|
