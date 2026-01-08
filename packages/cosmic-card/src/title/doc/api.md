## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|size|string|'md'|否|字体大小，可选值有 'xs' \| 'sm' \| 'md' \| 'lg'，与 token 对应关系见[表格](#cosc-title-size-token)|PC/Mobile|
|icon|string|''|可选|icon 组件的 name 或前置图标的 url|PC/Mobile|
|tag|string|''|可选|表示 tag 的文本，样式是蓝底填充|PC/Mobile|
|url|string|''|可选|跳转链接|PC/Mobile|
|link-info|[LinkInfo](/components/cosmic/link)|{}|可选|跳转信息|PC/Mobile|

### Slots

|名称|说明|覆盖平台|
|---|---|---|
|default|默认插槽|PC/Mobile|

### Parts

``` shell
|-- cosc-title
|   |-- cosc-title-a
|   |   |-- cosc-title-icon
|   |   |-- cosc-title-tag
|   |   |-- cosc-title-slot
```

|名称|说明|覆盖平台|
|---|---|---|
|cosc-title|组件根节点|PC/Mobile|
|cosc-title-a|链接节点|PC/Mobile|
|cosc-title-icon|icon 节点|PC/Mobile|
|cosc-title-tag|tag 节点|PC/Mobile|
|cosc-title-slot|默认插槽节点|PC/Mobile|

### 不同 size 对应的 token <a name="cosc-title-size-token"></a>

|size 取值|token 名称|说明|参数(PC)|参数(Mobile)|
|---|---|---|---|---|
|'md'|cos-text-headline-sm|默认规格，用于单卡标题|font-size: 18px<br>line-height: 24px|font-size: 18px<br>line-height: 24px|
|'lg'|cos-text-headline|用于组卡标题|font-size: 20px<br>line-height: 26px|font-size: 21px<br>line-height: 27px|
|'sm'|cos-text-subtitle|用于子卡标题、推荐卡标题和内容标题|font-size: 16px<br>line-height: 22px|font-size: 16px<br>line-height: 22px|
|'xs'|cos-text-subtitle-sm|用于内容标题|font-size: 14px<br>line-height: 20px|font-size: 14px<br>line-height: 20px|
