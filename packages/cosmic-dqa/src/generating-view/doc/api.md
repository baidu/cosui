## API
### Props
|名称|类型|默认值|是否必选|说明|覆盖平台|
|-|-|-|-|-|-|
|icon|string |''|否|图标，传 icon name 或图片 url|PC/Mobile|
|title|string|''|否|'card' 样式的标题|PC/Mobile|
|caption|string|''|否|说明文本|PC/Mobile|
|gradient|string|''|否|'card' 样式底部背景渐变色（需要考虑暗黑适配），默认背景色linear-gradient(#fff0, #ffffffb3)|PC/Mobile|
|appearance|'filled' \| 'card'|'filled'|否|组件样式风格：<br/> - filled: 中心有图标和说明文本；<br/> - card: 底部展示 icon|PC/Mobile|

### Slots
|名称|说明|覆盖平台|
|-|-|-|
|icon|图标插槽|PC/Mobile|


### Tokens
|功能|Token|
|-|-|
|动画比例|cosd-generating-view-1-1, cosd-generating-view-3-4, cosd-generating-view-4-3, <br/>cosd-generating-view-16-9, cosd-generating-view-9-16|

### Parts
```
|-- cosd-generating-view
|   |-- cosd-generating-view-animation
|   |-- cosd-generating-view-content
|   |   |-- cosd-generating-view-content-icon
|   |   |-- cosd-generating-view-content-info
|   |   |   |-- cosd-generating-view-content-info-title
|   |   |   |-- cosd-generating-view-content-info-caption
```
