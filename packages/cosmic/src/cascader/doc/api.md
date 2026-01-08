## API

### Props

| 名称 | 类型 | 默认值 | 说明 | 覆盖平台 |
| --- | --- | --- | --- | --- |
| value | string | - | 已选值 | PC/Mobile |
| label | string | - | 筛选标签 | PC/Mobile |
| placeholder | string | - | 未选取前默认文案 | PC/Mobile |
| options | Option[] | - | 选项列表 | PC/Mobile |
| title | string | - | 选择面板标题 | Mobile |
| direction | 'vertical' \| 'horizontal' | 'vertical' | 级联展开时，上一级导航展示位置 | Mobile |
| multiple | boolean | false | 是否允许多选 | PC/Mobile |
| max-options | number | - | 多选时允许选择的项目上限 | PC/Mobile |
| searchable | boolean | false | 是否开启搜索功能 | Mobile |


#### Option

| 名称 | 类型 | 默认值 | 说明 | 覆盖平台 |
| --- | --- | --- | --- | --- |
| value | string | - | 选项值 | PC/Mobile |
| label | string | - | 选项文本 | PC/Mobile |
| disabled | boolean | false | 选项是否被禁用 | PC/Mobile |
| options | Option[] | - | 选项的子选项数组，若无则认为是叶子节点 | PC/Mobile |


### Slots

|名称|说明|覆盖平台|
|---|---|---|
| entry | 筛选入口 | PC/Mobile |


### Parts

```shell
|-- cos-cascader
|   |-- cos-cascader-entry
|   |   |-- cos-cascader-entry-label
|   |   |-- cos-cascader-entry-text
|   |   |-- cos-cascader-entry-placeholder
|   |-- cos-cascader-panel
|   |   |-- cos-cascader-tabs
|   |   |   |-- cos-cascader-tabs-item
|   |   |-- cos-cascader-list
|   |   |   |-- cos-cascader-options
|   |   |   |   |-- cos-cascader-option
|   |   |-- cos-cascader-footer
|   |   |   |-- cos-cascader-footer-buttons

```

### Events

| 事件 | 参数 | 说明 | 覆盖平台 |
| --- | --- | --- | --- |
| change | {value: string \| string[], label: string \| string[]} | 筛选项变化时触发 | PC/Mobile |
| open | - | 打开筛选面板时触发 | PC/Mobile |
| close | - | 关闭筛选面板时触发 | PC/Mobile |
