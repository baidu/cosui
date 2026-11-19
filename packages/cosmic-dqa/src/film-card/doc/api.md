## API

### Props

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 覆盖平台 |
|------|------|--------|----------|------|----------|
| link-info | [LinkInfo](/components/cosmic/link) | {} | 是 | 整卡跳转信息（作品播放页），传入 `href` 时渲染铺满卡片的链接层，组件只做 `s-bind` 透传 | PC/Mobile |
| thumbnail | string | '' | 是 | 竖版封面地址（左图），按 `object-fit: cover` 裁切填满封面区 | PC/Mobile |
| title | string | '' | 是 | 作品名（Row1） | PC/Mobile |
| score | ScoreInfo | - | 否 | 评分（Row2），source 与 value 均由后端下发完整文案，前端直接渲染；无 value 则整行不展示 | PC/Mobile |
| credit | CreditItem[] | [] | 否 | 主创列表（Row3），label 与 value 均由后端下发，前端按序渲染；最后一项占用剩余宽度并单行省略 | PC/Mobile |
| year | string | '' | 否 | 年份（Row4），如「2013年」 | PC/Mobile |
| categories | string[] | [] | 否 | 类型（Row4），上限 2 个，由后端截断，两个值共占一格 | PC/Mobile |
| duration | string | '' | 否 | 片长或集数（Row4），完整展示文案，如「86分钟」「全24集」，具体取值由使用方传入 | PC/Mobile |
| source | string | '' | 否 | 来源（Row5），纯文本，如「爱奇艺」 | PC/Mobile |
| action | Action | - | 否 | 播放按钮（定位在卡片右下角，Row4、Row5 为其预留两个字的按钮宽度加 9px 的横向安全距离）；无 text 则不展示 | PC/Mobile |

Row4 的年份、类型、片长或集数依次排列，格间距 9px，每格不限宽度。Row4 与 Row5 共用同一个安全区（右侧为播放按钮预留两个字的按钮宽度加 9px），整行放不下时（卡片较窄、大字版）只在行末单行省略一次：前面的文案完整显示，放不下的部分从末尾截断，不会每格各自省略。

#### ScoreInfo

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 覆盖平台 |
|------|------|--------|----------|------|----------|
| source | string | '' | 否 | 评分来源，如「豆瓣」；无则只渲染 value | PC/Mobile |
| value | string | - | 是 | 评分值，后端下发完整展示文案（含单位），如「8.6分」 | PC/Mobile |

#### CreditItem

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 覆盖平台 |
|------|------|--------|----------|------|----------|
| label | string | - | 是 | 主创标签（如导演/主演/配音），由后端下发，前端不内置文案 | PC/Mobile |
| value | string | - | 是 | 内容，多个值由后端用「、」连接后下发，前端不拼接 | PC/Mobile |

#### Action

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 覆盖平台 |
|------|------|--------|----------|------|----------|
| text | string | '' | 是 | 按钮文案，由后端下发。免费与会员两态样式一致，靠文案区分（如「播放」「VIP」「会员播放」） | PC/Mobile |
| linkInfo | [LinkInfo](/components/cosmic/link) | {} | 否 | 按钮跳转信息，传入 `href` 时按钮渲染为 `a` | PC/Mobile |

### 两种跳转方式互斥

组件提供两套跳转入口，使用方只能选其一，同时使用会产生双跳转：

- **原生链接**：传入 `link-info.href`（整卡）与 `action.linkInfo.href`（按钮），由浏览器跳转，打点数据挂在 LinkInfo 的 `data-click-info` / `data-log` 上
- **事件调起**：不传 `href`，使用方通过 `native:click` 监听根元素、通过 `button-click` 监听按钮，自行调起跳转

### Slots

无

### Events

| 名称 | 参数 | 描述 |
|------|------|------|
| button-click | {event: Event} | 播放按钮点击事件 |

整卡点击不派发组件事件，使用方通过 `native:click` 监听根元素原生事件。

### Parts

```shell
|-- cosd-film-card
|   |-- cosd-film-card-thumbnail
|   |-- cosd-film-card-content
|   |   |-- cosd-film-card-title
|   |   |-- cosd-film-card-score
|   |   |-- cosd-film-card-credit
|   |   |-- cosd-film-card-meta
|   |   |   |-- cosd-film-card-meta-item
|   |   |   |   |-- cosd-film-card-meta-text
|   |   |-- cosd-film-card-source
|   |-- cosd-film-card-action
|   |-- cosd-film-card-link
```

| 名称 | 说明 | 支持的平台 |
|------|------|------------|
| cosd-film-card | 影视卡根节点，圆角 12px，上下内边距 6px、左右内边距 9px；PC 悬停背景变为 dent-hover 色；按下时背景不变、其余内容变为 20% 透明度 | PC / Mobile |
| cosd-film-card-thumbnail | 左图封面，宽度 89px（卡片较窄时不超过卡片宽度的 25%），圆角 9px，高度随右文区拉伸；大字版（宿主放大字号或设置 `--font-size-scale`）宽高等比放大 | PC / Mobile |
| cosd-film-card-content | 右文区，`cos-col-8`（12 栅格占 8 栏），与封面间隔 9px | PC / Mobile |
| cosd-film-card-title | Row1 作品名 | PC / Mobile |
| cosd-film-card-score | Row2 评分（含评分来源） | PC / Mobile |
| cosd-film-card-credit | Row3 主创列表 | PC / Mobile |
| cosd-film-card-meta | Row4 年份/类型/片长集数所在行，与 Row5 共用安全区（右侧为播放按钮预留两个字的按钮宽度加 9px），放不下时行末单行省略 | PC / Mobile |
| cosd-film-card-meta-item | 一格，年份、类型、片长或集数各一个，缺失项不渲染；不限宽度，格间距 9px | PC / Mobile |
| cosd-film-card-meta-text | 格内文本，类型有两个值时为两个节点 | PC / Mobile |
| cosd-film-card-source | Row5 来源，右侧为播放按钮预留两个字的按钮宽度加 9px，超出单行省略 | PC / Mobile |
| cosd-film-card-action | 播放按钮，定位在卡片右下角（距右、下边缘各 9px）；内边距固定为上下 8px、左右 14.5px（PC 与移动端一致），不设宽度下限，宽度按文案撑开；大字版文字变大时按钮上下左右间距不变；按下时仅按钮变为 20% 透明度 | PC / Mobile |
| cosd-film-card-link | 整卡链接层，`link-info.href` 存在时渲染，铺满卡片且位于播放按钮下方 | PC / Mobile |
