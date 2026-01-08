## API

### Props

#### Swiper
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|arrow|string|'sides'|可选|箭头位置, 可选值 'sides' \| 'bottom' |PC|
|autoplay|boolean \| 'visible'|false|可选|是否自动切换，为 'visible' 时，元素出现在视口内自动播放|PC/Mobile|
|interval|number|3000|可选|自动切换的时间间隔，单位为毫秒|PC/Mobile|
|loop|boolean|false|可选|是否循环展示|PC/Mobile|
|indicator|string|--|可选|指示器位置&类型，默认为空代表没有指示器,'number'仅可以用于PC。可选值：'left' \| 'center' \| 'right' \| 'outer\| 'number' |PC/Mobile|
|active-index|number|0|可选|当前活动的位置|PC/Mobile|
|space-between|number|9|可选|内容之间间距|PC/Mobile|
|scrollbar|boolean|false|可选|是否带有横向滚动条|Mobile|
|overscroll-url|string|--|可选|查看更多跳转链接|Mobile|
|overscroll-link-info|[LinkInfo](/components/cosmic/link)|--|可选|查看更多跳转链接属性集|Mobile|
|overscroll-text|string|'左滑更多'|可选|查看更多文案|Mobile|
|overscroll-move-text|string|'松手查看'|可选|查看更多文案|Mobile|
|snap-align|'none' \| 'start' \| 'center' \| 'end'|'none'|可选|吸附功能。吸附规范设计参考：[mdn: scroll-snap](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align)<br> - snapAlign ==='none'; 表示滚动容器的子元素没有对齐行为，可以自由滚动。<br> - snapAlign ==='start'; 表示滚动容器的子元素在滚动结束时将对齐到开始位置。<br> - snapAlign === 'end'; 表示滚动容器的子元素在滚动结束时将对齐到结束位置。<br> - snapAlign === 'center'; 表示滚动容器的子元素在滚动结束时将对齐到中心位置。|PC/Mobile|
|snap-stop|'normal' \| 'always'|'normal'|可选| - snapStop ==='normal'; 表示在滚动过程中不会强制停止元素，滚动会自由流动。<br> -snapStop === 'always'; 表示在滚动过程中会强制停止元素，滚动会在指定的位置停下。|PC/Mobile|
|scroll-behavior|'auto' \| 'smooth'|'smooth'|可选| 指定滚动行为。<br /> - smooth: 平滑滚动。<br /> - auto: 立即滚动。|PC/Mobile|
|align-type|'left'\|'center'|'left'|可选|手动点击锚定到某一项时对齐方式|PC/Mobile|
|auto-height|boolean|false|可选|是否高度自适应。建议在翻页场景使用|PC/Mobile|
|scrollable|boolean|false|可选|是否开启横向滚动|PC|

#### SwiperItem
|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|width|string|auto|可选|内容宽度|PC/Mobile|

### Slots

#### Swiper
|名称|说明|覆盖平台|
|---|---|---|
|default|默认插槽，用于横滑内容。需要配合子组件SwiperlItem使用。|PC/Mobile|

#### SwiperItem
|名称|说明|覆盖平台|
|---|---|---|
|default|默认插槽|PC/Mobile|


### Events

| 事件          | 参数                                               | 说明                      | 覆盖平台      |
|-------------|--------------------------------------------------|-------------------------|-----------|
| change      | {index: number, prevIndex: number, autoplay: boolean, event: Event} | 切换内容时触发                 | PC/Mobile |
| over-scroll | {el: HTMLElement}                                | 横滑出现触发查看更多时候触发(仅mobile) | Mobile    |
| scrollend   | {index: number, prevIndex: number}              | 滑动结束时触发        | PC/Mobile    |
| scroll   | {event: Event}             | 滑动过程触发      | PC/Mobile    |

### Methods
| 方法名  | 类型                      | 说明     | 覆盖平台      |
|------|-------------------------|--------|-----------|
| scrollToIndex   | (index: number) => void | 滑动至某一页，可搭配 scroll-behavior 属性控制滚动行为 | PC/Mobile |
| prev | () => void              | 滑动到上一页 | PC |
| next | () => void              | 滑动到下一页 | PC |
| updatedWidth | () => void | 重新计算 swiper 宽度，异步更新 swiper-item 数据场景使用| PC |


### Parts

#### Mobile
``` shell
|-- cos-swiper
|   |-- cos-swiper-content
|   |   |-- cos-swiper-list
|   |   |   |-- cos-swiper-overscroll
|   |-- cos-swiper-scrollbar
|   |-- cos-swiper-indicator
```

#### PC
``` shell
|-- cos-swiper
|   |-- cos-swiper-content
|   |   |-- cos-swiper-list
|   |-- cos-swiper-control
|   |   |-- cos-swiper-control-left
|   |   |-- cos-swiper-control-right
|   |-- cos-swiper-indicator
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-swiper|横滑根节点|PC/Mobile|
|cos-swiper-content|内容区节点|PC/Mobile|
|cos-swiper-list|横滑容器节点|PC/Mobile|
|slot|横滑内容插槽节点|PC/Mobile|
|cos-swiper-overscroll|查看更多节点|Mobile|
|cos-swiper-scrollbar|横滑滚动条节点|Mobile|
|cos-swiper-control|控制器节点|PC|
|cos-swiper-control-left|左控制器节点|PC|
|cos-swiper-control-right|右控制器节点|PC|
|cos-swiper-indicator|指示器节点|PC/Mobile|
