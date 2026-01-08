## API

### Props

#### Timeline

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|size|string|'md'| 是|文本区域的文字大小，枚举值: 'md' \| 'lg'|PC/Mobile|

#### TimelineItem

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|title|string|-|否|标题|PC/Mobile|
|appearance|string|''|是|标题的样式, 枚举值'' \| 'strong'|PC/Mobile|

### Slots

#### Timeline

|名称|说明|覆盖平台|
|---|---|---|
|default|时间轴插槽|PC/Mobile|

#### TimelineItem

|名称|说明|覆盖平台|
|---|---|---|
|content|时间轴子项内容区域插槽|PC/Mobile|


### Parts

``` shell
|-- cos-timeline
|   |-- cos-timeline-item
|   |   |-- cos-timeline-item-axis
|   |   |   |-- cos-timeline-item-dot
|   |   |   |-- cos-timeline-item-line
|   |   |-- cos-textarea-item-wrapper
|   |   |   |-- cos-timeline-item-header
|   |   |   |-- cos-timeline-item-content
|   |   |   |   |-- slot
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-timeline|根层|PC/Mobile|
|cos-timeline-item|时间轴内的子元素|PC/Mobile|
|cos-timeline-item-axis|子元素的轴所在区域|PC/Mobile|
|cos-timeline-item-dot|轴的端点|PC/Mobile|
|cos-timeline-item-line|轴的线段|PC/Mobile|
|cos-textarea-item-wrapper|子项信息展示区|PC/Mobile|
|cos-timeline-item-header|信息区域的头部，第一行|PC/Mobile|
|cos-timeline-item-content|信息区域的内容区|PC/Mobile|


### Events
无
