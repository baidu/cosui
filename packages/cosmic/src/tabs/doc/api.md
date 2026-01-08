## API

### Props

#### Tabs
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|active-index|number|0|是|当前选中的 Tab 下标索引|PC/Mobile|
|appearance|'bar'\|'pill'\|'pill-filled'\|'line'\|'card'\|'outline'|'bar'|是|Tabs 风格|PC/Mobile|
|arrow|boolean\|'right'|false|否|是否显示翻页箭头，line 主题下 arrow="right" 使翻页箭头位置置右|PC/Mobile|

#### Tab
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|disabled|boolean|false|否|是否禁用当前 Tab|PC/Mobile|

### Slots

提供独立的 Tabs, Tab 和 TabPane，用户自行通过插槽和样式完成内容定制。

#### Tabs
|名称|说明|覆盖平台|
|---|---|---|
|tab|Tab 内容插槽，填充头部区域|PC/Mobile|
|default|Tabs 内容插槽，填充内容区域|PC/Mobile|

#### Tab
|名称|说明|覆盖平台|
|---|---|---|
|default|Tab 自定义头部插槽|PC/Mobile|

#### TabPane
|名称|说明|覆盖平台|
|---|---|---|
|default|自定义内容区域|PC/Mobile|


### Appearance

|名称|说明|覆盖平台|
|---|---|---|
|bar|默认风格外观，可单独使用，也可以跟其他外观风格组合|PC/Mobile|
|pill|胶囊外观风格，可以单独使用，也可以跟其他风格组合|PC/Mobile|
|pill-filled|实心胶囊外观风格，用于二级标签场景|PC/Mobile|
|line|带有下划线的外观风格，用于卡片外场景|PC/Mobile|
|card|表达对内容整体筛选的导航风格，用于卡头场景|PC/Mobile|
|outline|实心胶囊外观风格，并且选中态带有边框，结合自定义内容，可用于图文标签场景|PC/Mobile|


### Events

|事件|参数|说明|覆盖平台|
|---|---|---|---|
|change|{ index: number（tab 位置索引）}|切换 Tab 事件|PC/Mobile|


### Methods
|方法名|类型|说明|覆盖平台|
|---|---|---|---|
|updatedWidth|() => void|更新 tabs 宽度，将更新左右箭头展现状态|PC/Mobile|


### Parts
```shell
|-- cos-tabs
|   |-- cos-tabs-header-container
|   |   |-- cos-tabs-header
|   |   |   |-- cos-tab
|   |   |   |-- cos-tab-active  # 当前选中 Tab 附加的类名
|   |   |   |-- cos-tab-indicator  # 只在 line 风格下有效
|   |   |-- cos-tab-header-left-margin  # 可用于横滑时设置左负边距的值
|   |   |-- cos-tab-header-right-margin  # 可用于横滑时设置右负边距的值
|   |-- cos-tabs-content
|   |   |-- cos-tab-pane

```
