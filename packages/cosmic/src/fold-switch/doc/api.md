## API

### Props

|名称|类型|默认值|说明|覆盖平台|
|---|---|---|---|---|
|folded|boolean|true|是否处于折叠状态|PC/Mobile|
|mask|boolean|false|是否展示渐变背景遮罩|PC/Mobile|
|unfold-text|string|'展开'|展开文本|PC/Mobile|
|fold-text|string|'收起'|收起文本|PC/Mobile|

### Parts

```shell
|-- cos-fold-switch
|   |-- cos-fold-switch-mask
|   |-- cos-fold-switch-text
|   |-- cos-fold-switch-icon

```

|名称|说明|覆盖平台|
|---|---|---|
|cos-fold-switch|根层|PC/Mobile|
|cos-fold-switch-mask|折叠渐变遮罩|PC/Mobile|
|cos-fold-switch-text|展开收起切换文本|PC/Mobile|
|cos-fold-switch-icon|展开收起切换图标|PC/Mobile|

### Events

|名称|参数|说明|覆盖平台|
|---|---|---|---|
|toggle|{status: 'folded' \| 'unfolded', event: Event}|切换展示和收起事件|PC/Mobile|
