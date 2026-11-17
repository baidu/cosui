## API

### Props

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 覆盖平台 |
|------|------|--------|----------|------|----------|
| items | RowLanesItem[] | [] | 是 | 资源列表，每项需包含 width/height | PC/Mobile |
| container-width | number | 0 | 是 | 容器宽度，用于计算布局 | PC/Mobile |
| gutter | number \| [number, number] | 0 | 否 | 间距，数字类型表示水平垂直间距，数组类型表示 [水平间距, 垂直间距] | PC/Mobile |
| row-height | number | 180 | 否 | 横向布局的基准高度 | PC/Mobile |
| min-cols | number | 2 | 否 | 一行最少排列的元素数量，低于此列数不触发换行 | PC/Mobile |
| max-cols | number | 8 | 否 | 一行最多排列的元素数量，达到此列数强制换行 | PC/Mobile |
| last-row-align | 'start' \| 'justify' | 'start' | 否 | 最后一行的对齐方式。'start'：最后一行保持自然尺寸、靠左排列，仅在溢出时等比缩放收缩；'justify'：最后一行拉伸铺满容器宽度 | PC/Mobile |

#### RowLanesItem

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 覆盖平台 |
|------|------|--------|----------|------|----------|
| width | number | - | 是 | 元素宽度 | PC/Mobile |
| height | number | - | 是 | 元素高度 | PC/Mobile |
| allowAdaptive | boolean | true | 否 | 是否参与自适应宽度调整。设为 false 时，元素不参与行宽分配 | PC/Mobile |

### Slots

| 名称 | 说明 | 覆盖平台 |
|------|------|----------|
| default | 默认插槽，填充布局元素。通过 slot 可以获取到：<br />- item：元素数据<br />- columnIndex：当前列索引<br />- rowIndex：当前行索引<br />- position：元素相对于容器左上角的位置 {left, top}<br />- index：元素在原始数组中的索引 | PC/Mobile |

### Parts

```shell
|-- cos-row-lanes
|   |-- cos-row-lanes-container
|   |   |-- cos-row-lanes-row
|   |   |   |-- cos-row-lanes-item
```

| 名称 | 说明 | 覆盖平台 |
|------|------|----------|
| cos-row-lanes | 根节点 | PC/Mobile |
| cos-row-lanes-container | 容器节点 | PC/Mobile |
| cos-row-lanes-row | 行容器节点 | PC/Mobile |
| cos-row-lanes-item | 单个元素节点 | PC/Mobile |

### Events

无
