## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|src|string|-|否|图片链接|PC/Mobile|
|alt|string|-|否|图片替代文本|PC/Mobile|
|hover|boolean|false|否|在图片上悬浮呈现放大效果|PC|
|lazy|boolean|false|否|是否开启懒加载，懒加载功能依赖 data-lazy-src|Mobile|

### Slots

|名称|说明|覆盖平台|
|---|---|---|
|default|默认内容插槽，用于自定义遮罩在图片上方的内容|PC/Mobile|
|placeholder|占位插槽，用于图片还没加载完成时的占位显示|PC/Mobile|

### Parts

``` shell
|-- cos-image
|   |-- cos-image-placeholder
|   |-- cos-image-body
|   |-- cos-image-content
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-image|图片根节点|PC/Mobile|
|cos-image-placeholder|占位展示|PC/Mobile|
|cos-image-body|图片|PC/Mobile|
|cos-image-content|默认内容插槽|PC/Mobile|

### Events

|名称|参数|说明|覆盖平台|
|---|---|---|---|
|load|{event: HTMLMouseEvent}|图片加载完成|PC/Mobile|
|error|{event: HTMLMouseEvent}|图片加载失败|PC/Mobile|

### Tokens

|功能|Token|
|---|---|
|图片比例|cos-image-1-1, cos-image-3-1, cos-image-3-2, cos-image-3-4,cos-image-5-1, cos-image-16-9|
|图片填充模式|cos-image-fit-fill, cos-image-fit-contain, cos-image-fit-cover|
|图片填充位置|cos-image-position-center, cos-image-position-top, cos-image-position-right, cos-image-position-bottom, cos-image-position-left|
