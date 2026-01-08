## API

### Props

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 覆盖平台 |
| --- | --- | --- | --- | --- | --- |
| total | number | 0 | 是 | 数据总数 | PC |
| current | number | 1 | 否 | 当前页码 | PC |
| page-size | number | 10 | 否 | 每页条数 | PC |
| page-count | number | 0 | 否 | 页数，优先级大于 total / page-size 计算 | PC |

### Parts

```
|-- cos-pagination
|   |-- cos-pagination-prev
|   |-- cos-pagination-pager
|   |   |-- cos-pagination-pager-item
|   |   |-- cos-pagination-pager-item-current
|   |-- cos-pagination-next
```

| 名称 | 说明 | 覆盖平台 |
| --- | --- | --- |
| cos-pagination | 分页器根节点 | PC |
| cos-pagination-prev | 分页器上一页按钮节点 | PC |
| cos-pagination-pager | 分页器页码内容节点 | PC |
| cos-pagination-pager-item | 分页器单页码节点 | PC |
| cos-pagination-pager-item-current | 分页器选中页码节点 | PC |
| cos-pagination-next | 分页器下一页按钮节点 | PC |

### Events

| 事件 | 参数 | 说明 | 覆盖平台 |
| --- | --- | --- | --- |
| change | {current: number, prev: number} | 页码改变的回调，返回改变后的页码 | PC |
