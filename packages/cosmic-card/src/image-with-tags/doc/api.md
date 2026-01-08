## API

### Props

| 名称         | 类型    | 默认值 |是否必选| 说明               | 覆盖平台    |
|-------------|---------|-----|-------|--------------------|-------------|
| image       | [imageAttributes](/components/cosmic/image)| - |可选| image 组件参数| PC/Mobile  |
| overlays    | OverlayItem[] |  - |可选|覆盖在图片上方的内容| PC/Mobile  |

#### OverlayItem

| 名称   | 类型    | 默认值 |是否必选| 说明               | 覆盖平台    |
|-------------|---------|-----|-------|--------------------|-------------|
| position | 'left-top' \| 'left-bottom' \| 'right-bottom' \| 'right-top' | 'right-top' |可选| 展现方位 | PC/Mobile  |
| tag|[TagAttributes](/components/cosmic/tag)  |  - |可选|tag 组件参数，使用时把配置的icon、text 都传入 tag 内部显示| PC/Mobile  |
| text | string  |  - |可选|文字| PC/Mobile  |
| icon | string  |  - |可选|图标名称| PC/Mobile  |

### Slots

|名称|说明|覆盖平台|
|---|---|---|
|default|默认槽位，用于自定义遮罩在图片上方的内容|PC/Mobile|

### Parts

``` shell
|-- cosc-image-with-tags
|   |-- cosc-image-with-tags-overlay
|   |-- cosc-image-with-tags-mask-top
|   |-- cosc-image-with-tags-mask-bottom
```

|名称|说明|覆盖平台|
|---|---|---|
|cosc-image-with-tags|图片根节点|PC/Mobile|
|cosc-image-with-tags-overlay|覆盖在图片上方的内容节点，可能有多个|PC/Mobile|
|cosc-image-with-tags-mask-top|上蒙层节点|PC/Mobile|
|cosc-image-with-tags-mask-bottom|下蒙层节点|PC/Mobile|

### Events

|名称|参数|说明|覆盖平台|
|---|---|---|---|
|load|{event: HTMLMouseEvent}|图片加载完成|PC/Mobile|
|error|{event: HTMLMouseEvent}|图片加载失败|PC/Mobile|
