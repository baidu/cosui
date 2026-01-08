## API

### Props

|名称|类型|默认值|说明|覆盖平台|
|---|---|---|---|---|
|action|'foldable' \| 'unfold-only' \| 'more'|'foldable'|展开行为后的交互行为 * foldable：可以反复操作展开收起 * unfold-only：展开后不可以收起 * more：展开后展示查看更多|PC/Mobile|
|fold-height|number|24|折叠时展示的高度，单位 px|PC/Mobile|
|mask|boolean|false|是否展示渐变背景遮罩|PC/Mobile|
|unfold-text|string|'展开'|展开文本，折叠状态下显示的操作文案|PC/Mobile|
|fold-text|string|'收起'|收起文本，展开状态下显示的操作文案|PC/Mobile|
|more-text|string|'查看更多'|查看更多文本|PC/Mobile|
|more-url|string|-|查看更多跳转 url|PC/Mobile|
|more-target|'_blank' \| '_self'|''|查看更多跳转打开方式|PC/Mobile|
|more-link-info|[LinkInfo](/components/cosmic/link)|{}|挂载在a标签上的属性集，可根据业务使用场景自行定义(搜索结果页场景使用linkAttributes)|PC/Mobile|
|async-loading|boolean|false|是否正在异步加载数据中，通常情况下，展开时有异步更新数据情况，应在 on-toggle 中将其设为 true，待数据更新后设为 false。|PC/Mobile|

### Slots

|名称|说明|覆盖平台|
|---|---|---|
|default|默认槽位，折叠内容|PC/Mobile|

### Parts

```shell
|-- cos-fold
|   |-- cos-fold-content
|   |-- cos-fold-switch
|   |   |-- cos-fold-switch-mask
|   |   |-- cos-fold-switch-text
|   |   |-- cos-fold-switch-icon
|   |-- cos-fold-more
|   |   |-- cos-fold-more-text
|   |   |-- cos-fold-more-icon

```

|名称|说明|覆盖平台|
|---|---|---|
|cos-fold|根层|PC/Mobile|
|cos-fold-content|折叠内容|PC/Mobile|
|cos-fold-switch|展开收起切换区域|PC/Mobile|
|cos-fold-switch-mask|折叠渐变遮罩|PC/Mobile|
|cos-fold-switch-text|展开收起切换文本|PC/Mobile|
|cos-fold-switch-icon|展开收起切换图标|PC/Mobile|
|cos-fold-more|查看更多区域|PC/Mobile|
|cos-fold-more-text|查看更多文本|PC/Mobile|
|cos-fold-more-icon|查看更多图标|PC/Mobile|

### Events

|名称|参数|说明|覆盖平台|
|---|---|---|---|
|toggle|{status: 'folded' \| 'unfolded', event: Event}|切换展示和收起事件|PC/Mobile|
