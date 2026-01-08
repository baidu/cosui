## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|value|string|-|否|默认选项|PC/Mobile|
|label|string|-|否|筛选标签|PC/Mobile|
|title|string|-|否|标题|PC/Mobile|
|placeholder|string|-|否|未选取前默认文案|PC/Mobile|
|appearance|'mark'\|'tag'|'mark'|否|选项样式|PC/Mobile|
|options|Option[]|-|否|选项列表|PC/Mobile|
|multiple|boolean|false|否|是否允许多选|PC/Mobile|
|max-options|number|-|否|多选时允许选择的项目上限|PC/Mobile|
|show-selected|boolean|false|否|多选时是否在筛选面板中展示已选项|PC/Mobile|
| searchable | boolean | false | 否 | 是否开启搜索功能 | Mobile |


#### Option

| 名称 | 类型 | 默认值 | 说明 | 覆盖平台 |
| --- | --- | --- | --- | --- |
| value | string | - | 选项值 | PC/Mobile |
| label | string | - | 选项文本 | PC/Mobile |
| disabled | boolean | false | 选项是否被禁用 | PC/Mobile |
| icon | string | - | 选项头部图标 | PC/Mobile |
| options | Option[] | - | 分组选项 | PC/Mobile |


### Slots

|名称|说明|覆盖平台|
|---|---|---|
|entry|筛选入口|PC/Mobile|


### Parts

```
|-- cos-select
|   |-- cos-select-entry
|   |   |-- cos-select-entry-label
|   |   |-- cos-select-entry-text
|   |   |-- cos-select-entry-placeholder
|   |-- cos-select-panel
|   |   |-- cos-select-panel-list
|   |   |   |-- cos-select-option-group
|   |   |   |-- cos-select-option
|   |   |-- cos-select-footer
|   |   |   |-- cos-select-footer-text
|   |   |   |-- cos-select-footer-buttons
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-select|组件根节点|PC/Mobile|
|cos-select-entry|筛选入口|PC/Mobile|
|cos-select-entry-label|筛选入口的标签|PC/Mobile|
|cos-select-entry-text|筛选入口的文本|PC/Mobile|
|cos-select-entry-placeholder|筛选入口的默认文本|PC/Mobile|
|cos-select-panel|筛选面板|PC/Mobile|
|cos-select-panel-list|筛选面板列表|PC/Mobile|
|cos-select-option-group|筛选面板列表中的分组|PC/Mobile|
|cos-select-option|筛选面板列表中的选项|PC/Mobile|
|cos-select-footer|筛选面板的底部|PC/Mobile|
|cos-select-footer-text|筛选面板底部文本|PC/Mobile|
|cos-select-footer-buttons|筛选面板底部按钮|PC/Mobile|

### Events

|事件|参数|说明|覆盖平台|
|---|---|---|---|
|change|value: string \| string[]|选项改变时触发|PC/Mobile|
|toggle-panel|{open: boolean}|点击切换筛选面板时触发|PC/Mobile|

### Methods

|名称|返回值类型|说明|覆盖平台|
|---|---|---|---|
|togglePanel()|-|展开或关闭筛选面板|PC/Mobile|
