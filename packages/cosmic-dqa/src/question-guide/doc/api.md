## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
| title  | string | '' | 否 | 引导语 | PC/Mobile |
| scrollable | boolean | false | 否 | 是否支持横滑 | PC/Mobile |
| items  | Item[] | [] | 是 | 问题组列表 | PC/Mobile |
| icon | string | '' | 否 | 引导语前icon图标 / image图片  | PC/Mobile |

#### Item

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
| label | string | '' | 是 | 问题组标签  | PC/Mobile |
| type | 'question' \| 'radio' \| 'checkbox' | '' | 是 | 提问类型  | PC/Mobile |
| options | Option[] | [] | 是 | 提问选项  | PC/Mobile |

#### Option

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
| value | string | '' | 是 | 选项文本  | PC/Mobile |
| icon | string | '' | 否 | 选项前图标  | PC/Mobile |
| linkInfo | [LinkInfo](/components/cosmic/link) | {} | 否 | 自定义挂载属性集(支持JS未ready前跳转点击) | PC/Mobile |
| caption | string | '' | 否 | 选项文本后的字幕 | PC/Mobile |

### Slots
无

### Events
|名称|参数|说明|覆盖平台|
|---|---|---|---|
|change|{event: Event, label: string, type: 'question' \| 'radio' \| 'checkbox', checked: boolean, option: Option, optionIndex: number, index: number}|选项状态变更|PC/Mobile|
|scroll|{action: string; event: Event}|横划动作，PC 通过点击指示器触发，Mobile 通过 on-scroll 触发|PC/Mobile|

### Parts

```shell
|-- cosd-question-guide
|   |-- cosd-question-guide-title
|   |-- |-- cosd-question-guide-icon
|   |-- |-- cosd-question-guide-img
|   |-- cosd-question-guide-items
|   |   |-- cosd-question-guide-item
|   |   |   |-- cosd-question-guide-item-label
|   |   |   |-- cosd-question-guide-item-option
```
