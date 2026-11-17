## API

### Props

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 覆盖平台 |
| --- | --- | --- | --- | --- | --- |
| total | number | 0 | 是 | 数据总数 | PC / wise |
| current | number | 1 | 否 | 当前页码 | PC / wise |
| page-size | number | 10 | 否 | 每页条数 | PC / wise |
| page-count | number | - | 否 | 页数，优先级大于 total / page-size 计算 | PC / wise |
| appearance | 'compact' | - | 否 | 外观类型。不传为数字页码翻页器；'compact' 为左右箭头 + n / total 紧凑翻页器 | PC / wise |

### Parts

```
|-- cos-pagination
|   |-- 不传 appearance（数字页码翻页器）
|   |   |-- cos-pagination-prev
|   |   |-- cos-pagination-pager
|   |   |   |-- cos-pagination-pager-item
|   |   |   |-- cos-pagination-pager-item-current
|   |   |-- cos-pagination-next
|   |-- cos-pagination-compact
|   |   |-- cos-pagination-compact-btn
|   |   |-- cos-pagination-compact-icon
|   |   |-- cos-pagination-compact-text
```

| 名称 | 说明 | 覆盖平台 |
| --- | --- | --- |
| cos-pagination | 分页器根节点 | PC / wise |
| cos-pagination-prev | 数字页码翻页器上一页按钮节点 | PC |
| cos-pagination-pager | 数字页码翻页器页码内容节点 | PC |
| cos-pagination-pager-item | 数字页码翻页器单页码节点 | PC |
| cos-pagination-pager-item-current | 数字页码翻页器选中页码节点 | PC |
| cos-pagination-next | 数字页码翻页器下一页按钮节点 | PC |
| cos-pagination-compact | compact 变体根节点修饰类 | PC / wise |
| cos-pagination-compact-btn | compact 变体的左右翻页按钮 | PC / wise |
| cos-pagination-compact-icon | compact 变体的箭头图标 | PC / wise |
| cos-pagination-compact-text | compact 变体的页码文本节点 | PC / wise |

### Events

| 事件 | 参数 | 说明 | 覆盖平台 |
| --- | --- | --- | --- |
| change | {current: number, prev: number} | 页码改变的回调，返回改变后的页码 | PC / wise |
