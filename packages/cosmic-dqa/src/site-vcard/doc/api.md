## API

### Props

|名称|类型|初始值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
| link-info  | [LinkInfo](/components/cosmic/link) | `{}` | 是 | 跳转信息 | PC/Mobile |
| logo  | string | '' | 否 | 头像logo链接（如果存在缩略图，则头像logo在上方展示） | PC/Mobile |
| title  | string | '' | 是 | 标题 | PC/Mobile |
| caption  | string | '' | 否 | 说明文本 | PC/Mobile |
| action-text  | string | '' | 否 | 按钮文本（默认无按钮） | PC/Mobile |
| action | Action | {} | 否 | 按钮信息 | PC/Mobile |
| tags  | `Array<TagItem \| string>` | `[]` | 否 | 标签列表。支持 string 类型的简写形式，格式为 `http://xxx` 展示图片；为文本内容则展示 filled 类型的 tag | PC/Mobile |
| visits  | string | '' | 否 | 访问次数（默认无） | PC/Mobile |
| appearance | 'filled' \| 'card' \| 'bar' | 'filled' | 否 | 组件外观，'card' 为整卡外观, 'bar' 为方图外观 | PC/Mobile |
| is-agent | boolean | false | 否 | agent下不展现对话icon | PC/Mobile |
| introduction | string \| Introduction | '' \| {} | 否 | 在上方或下方展示的卡片介绍，默认展示2行截断（当标题下方的说明文本和访问量都不展示时，卡片介绍将展示在标题下方）| PC/Mobile |
| thumbnail  | string | '' | 否 | 缩略图链接（优先级高于头像logo，如果不存在时，则在左侧渲染 logo 资源） | PC/Mobile |
| score | string \| number | '' | 否 | 评分 | PC/Mobile |
| shortcut | Shortcut | {} | 否 | 资源区 | PC/Mobile |
| badge-text | string | '' | 否 | 文字标签 | PC/Mobile |

#### Action
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
| text | string | '' | 否 | 按钮文案，优先级低于 action-text  | PC/Mobile |
| linkInfo | [LinkInfo](/components/cosmic/link) | {} | 否 | 按钮点击跳转信息，如果不传则取外层 linkInfo  | PC/Mobile |


#### TagItem
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
| text | string | '' | 否 | 标签文本，text image 必须二选一  | PC/Mobile |
| image | string | '' | 否 | 标签图片链接，text image 必须二选一  | PC/Mobile |
| color | string | '#4e6ef2' | 否 | 标签颜色，仅在text标签时生效  | PC/Mobile |
| appearance | string | 'filled' | 否 | 标签外观，filled 类型位于标题前方，subtle 类型位于标题后方。可取值 'filled', 'subtle' | PC/Mobile |

#### Shortcut
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
| logo | string | '' | 否 | 资源头像  | PC/Mobile |
| name | string | '' | 否 | 资源标题  | PC/Mobile |
| caption | string | '' | 否 | 资源说明文本  | PC/Mobile |
| linkInfo | [LinkInfo](/components/cosmic/link) | {} | 否 | 资源区点击跳转信息 | PC/Mobile |

#### Introduction
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
| value | string | '' | 否 | 引导语字符串  | PC/Mobile |
| position | 'top' \| 'bottom' | 'bottom' | 否 | 引导语位置  | PC/Mobile |

### Events

|名称|参数|说明|覆盖平台|
|---|---|---|---|
|button-click|{event: Event}|按钮点击事件|PC/Mobile|

### Slots
无


### Parts

```shell
|-- cosd-site-vcard
|   |-- cosd-site-vcard-<appearance>
|   |   |-- cosd-site-vcard-main
|   |   |   |-- cosd-site-vcard-logo
|   |   |   |-- cosd-site-vcard-content
|   |   |   |   |-- cosd-site-vcard-title
|   |   |   |   |   |-- cosd-site-vcard-title-text
|   |   |   |   |   |-- cosd-site-vcard-title-tags
|   |   |   |   |-- cosd-site-vcard-caption
|   |   |   |   |   |-- cosd-site-vcard-caption-score
|   |   |   |   |   |-- cosd-site-vcard-caption-visits
|   |   |   |   |   |   |-- cosd-site-vcard-caption-visits-divider
|   |   |   |   |   |   |-- cosd-site-vcard-caption-visits-icon
|   |   |   |   |   |   |-- cosd-site-vcard-caption-visits-text
|   |   |   |   |   |   |-- cosd-site-vcard-caption-visits-divider
|   |   |   |   |   |-- cosd-site-vcard-caption-text
|   |   |   |-- cosd-site-vcard-button
|   |   |-- cosd-site-vcard-shortcut
|   |   |   |-- cosd-site-vcard-shortcut-divider
|   |   |   |-- cosd-site-vcard-shortcut-area
|   |   |   |   |-- cosd-site-vcard-shortcut-logo
|   |   |   |   |-- cosd-site-vcard-shortcut-name
|   |   |   |   |-- cosd-site-vcard-shortcut-caption
|   |-- cosd-site-vcard-introduction
|   |   |-- cosd-site-vcard-introduction-arrow
```
