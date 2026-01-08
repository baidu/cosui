## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|current-index|string\|number|0|是|当前步骤|PC/Mobile|
|appearance|'full'\|'single'|'full'|否|searchingSteps 组件仅展示选中的步骤|PC/Mobile|
|steps|Array&lt;Step&gt;|[]|是|步骤列表|PC/Mobile|

#### Step
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|title|string|''|是|当前步骤|PC/Mobile|
|description|string|''|否|思考中的关键词未能展现完成一轮，切换到下一个步骤时|PC/Mobile|
|status|'wait'\|'process'\|'finish'|'wait'|否|状态|PC/Mobile|
|words|string[]|[]|是|思考中展示的搜索关键词|PC/Mobile|

### Parts

``` shell
|-- cosd-searching-steps
|   |-- cosd-searching-step cosd-searching-step(-wait | -process | -finish)
|   |   |-- cosd-searching-step-icon
|   |   |   |-- cosd-searching-step-icon-main
|   |   |   |   |-- cosd-searching-step-icon-check
|   |   |-- cosd-searching-step-content
|   |   |   |-- cosd-searching-step-description
```

|名称|说明|覆盖平台|
|---|---|---|
|cosd-searching-steps|根节点|PC/Mobile|
|cosd-searching-step|每个步骤节点|PC/Mobile|
|cosd-searching-step(-wait \| -process \| -finish)|节点状态（等待 \| 进行中 \| 完成）|PC/Mobile|
|cosd-searching-steps-icon|图标根节点|PC/Mobile|
|cosd-searching-steps-icon-main|完成状态图标的容器，用于动画展示完成图标|PC/Mobile|
|cosd-searching-steps-icon-check|完成状态的图标|PC/Mobile|
|cosd-searching-steps-content|步骤内容节点|PC/Mobile|
|cosd-searching-steps-description|步骤描述|PC/Mobile|

### Events
| 事件 | 参数 | 说明 |覆盖平台|
| --- | --- | --- |---|
| change | {index: number} | 组件步骤切换 |PC/Mobile|
