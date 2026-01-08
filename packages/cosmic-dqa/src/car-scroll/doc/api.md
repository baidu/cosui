# API

## CarScroll

汽车信息横滑组件。

### Props

| 属性名 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| items | 汽车信息列表 | `CarItem[]` | `[]` | 是 |
| line-clamp | 标题行数 | `number` | `1` | 否 |

### CarItem

| 属性名 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| image | 汽车图片 | `string` | - | 是 |
| objectFit | 平铺方式 | `cover \| contain` | `cover` | 否 |
| title | 汽车名称 | `string` | - | 是 |
| price | 价格 | `string` | - | 是 |
| tags | 标签列表 | `string[]` | - | 否 |
| linkInfo | 链接信息 | [LinkInfo](/components/cosmic/link) | - | 否 |

### Slots
无

### Parts

```shell
|-- cosd-car-scroll
|   |-- cosd-car-scroll-swiper
|   |   |-- cosd-car-scroll-item
|   |   |   |-- cosd-car-scroll-card
|   |   |   |   |-- cosd-car-scroll-image-wrapper
|   |   |   |   |   |-- cosd-car-scroll-image
|   |   |   |   |-- cosd-car-scroll-content
|   |   |   |   |   |-- cosd-car-scroll-title
|   |   |   |   |   |-- cosd-car-scroll-bottom
|   |   |   |   |   |   |-- cosd-car-scroll-price
|   |   |   |   |   |   |-- cosd-car-scroll-tags
|   |   |   |   |   |   |   |-- cosd-car-scroll-tag
```

|名称|说明|覆盖平台|
|---|---|---|
|cosd-car-scroll|根容器|PC/Mobile|
|cosd-car-scroll-swiper|Swiper 容器|PC/Mobile|
|cosd-car-scroll-item|单个滑动项|PC/Mobile|
|cosd-car-scroll-card|卡片容器|PC/Mobile|
|cosd-car-scroll-image-wrapper|图片包装器|PC/Mobile|
|cosd-car-scroll-image|图片|PC/Mobile|
|cosd-car-scroll-content|内容容器|PC/Mobile|
|cosd-car-scroll-title|标题|PC/Mobile|
|cosd-car-scroll-bottom|底部容器|PC/Mobile|
|cosd-car-scroll-price|价格|PC/Mobile|
|cosd-car-scroll-tags|标签容器|PC/Mobile|
|cosd-car-scroll-tag|单个标签|PC/Mobile|

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| item-click | 点击汽车卡片时触发 | `{item: CarItem, index: number, event: Event}` |
