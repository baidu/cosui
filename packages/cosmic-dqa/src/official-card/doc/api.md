## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|appearance|enum|'centered' \|\| ''|否|卡片展现形态|PC/Mobile|
|poster|object|''|否|背景图|PC/Mobile|
|poster.src|string|''|否|背景图|PC/Mobile|
|poster.gradient|string|''|否|封面图渐变颜色|PC/Mobile|
|poster.bgColor|string|''|否|封面图背景颜色|PC/Mobile|
|logo|string|''|否|logo图地址|PC/Mobile|
|action-text|string|''|否|按钮文字|PC/Mobile|
|title|string|''|否|标题|PC/Mobile|
|website|string|''|否|展示的网站地址|PC/Mobile|
|link-info|[LinkInfo](/components/cosmic/link)|-|否|跳转所需的参数|PC/Mobile|
|tag|string \/ string[]|''|否|标签信息|PC/Mobile|
|score|string|''|否|评分|PC/Mobile|
|introduction|string|''|否|第二行展示的介绍文本|PC/Mobile|
|caption|string|''|否|第三行展示的介绍文本|PC/Mobile|
|settings|Setting[]|''|否|按钮下方展示的信息|PC/Mobile|

#### Setting
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|text|string|''|是|展示的文本|PC/Mobile|
|linkInfo|[LinkInfo](/components/cosmic/link)|-|否|跳转所需的参数|PC/Mobile|

### Events
| 事件     | 参数                  | 说明      | 覆盖平台      |
|----------|------------------------|-----------|-----------|
| button-click | {event: HTMLMouseEvent} | 按钮的点击事件 | PC/Mobile |

### Parts
``` shell
|-- cosd-official-card
|   |-- cosd-official-card-centered
|   |-- |-- cosd-official-card-centered-box
|   |-- |-- cosd-official-card-centered-box-content
|   |-- |-- |-- cosd-official-card-centered-box-content-title
|   |-- |-- |-- cosd-official-card-centered-box-content-introduction
|   |-- |-- |-- cosd-official-card-centered-box-content-content-tag
|   |-- |-- cosd-official-card-centered-box-logo
|   |-- |-- |-- cosd-official-card-centered-box-logo-mount
|   |-- |-- |-- |-- cosd-official-card-centered-box-logo-mount-img
|   |-- cos-image
|   |    |-- cosd-official-card-overlay
|   |        |-- cosd-official-card-content
|   |            |-- cosd-official-card-logo
|   |            |    |-- cos-image
|   |            |-- cosd-official-card-info
|   |            |    |-- cosd-official-card-info-title
|   |            |    |    |-- cosd-official-card-info-title-text
|   |            |    |    |-- cos-tag
|   |            |    |-- cosd-official-card-info-link
|   |        |-- cos-button
```
