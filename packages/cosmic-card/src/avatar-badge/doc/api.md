## API

### Props

| 名称         | 类型    | 默认值 |是否必选| 说明               | 覆盖平台    |
|-------------|---------|-----|-------|--------------------|-------------|
| size        | 'xs' \| 'sm' \|'md' | 'md' |可选| 徽章尺寸   | PC/Mobile  |
| type        | 'vip-1' \| 'vip-2' \| 'vip-3' \| 'live' | - |可选| 徽章类型 | PC/Mobile  |
| text        | string  |  -  |可选| 文字徽章，与 v 标互斥，且优先级比 v 标高，仅在 'md' 的 size 上生效|PC/Mobile  |

##### type 属性

| 属性   | 参数（PC/Mobile）                                      | 说明    |
|-------|-----------------------------------------------------|---------|
| vip-1 | 使用图片| v标等级1 |
| vip-2 | `border: #fff; background: #fff; color: #3897f0;`     | v标等级2 |
| vip-3 | `border: #fff; background: #fff; color: #ffbb20;`    | v标等级3 |
| vip-4 | `border: #fff; background: #fff; color: #ff0000;`    | v标等级4 |
| live  | -                                                   | 直播中   |

##### size 规格

| 规格 | 参数（PC/Mobile）       |
|----|-------------------------|
| xs | `width: 10px; height: 10px;` |
| sm | `width: 12px; height: 12px;` |
| md | `width: 14px; height: 14px;` |


### Slots

|名称|说明|覆盖平台|
|---|---|---|
|default|默认槽位，用于嵌入组件，如 Avatar|PC/Mobile|

### Parts

``` shell
|-- cosc-avatar-badge
|   |-- cosc-avatar-badge-text
|   |-- cosc-avatar-badge-live
|   |-- cosc-avatar-badge-vip
```

|名称|说明|覆盖平台|
|---|---|---|
|cosc-avatar-badge|徽章根节点|PC/Mobile|
|cosc-avatar-badge-text|文字徽章节点|PC/Mobile|
|cosc-avatar-badge-live|直播徽章节点|PC/Mobile|
|cosc-avatar-badge-vip|vip徽章节点|PC/Mobile|
