## API

### Props

| 名称         | 类型    | 默认值 | 是否必选| 说明               | 覆盖平台    |
|-------------|---------|------|------|--------------------|------------|
| dot         | boolean | false|可选| 小圆点              | PC/Mobile  |
| value       | string  |  ''  |可选| 显示文字，dot 属性的优先级高于 value 属性，即如果同时传递了 dot 和 value 属性，显示小圆点 | PC/Mobile  |

### Slots

|名称|说明|
|---|---|
|default|默认槽位，用于嵌入组件，如 Avatar|

### Parts

``` shell
|-- cos-badge
|   |-- cos-badge-dot
|   |-- cos-badge-value
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-badge|徽章根节点|PC/Mobile|
|cos-badge-dot|徽章小圆点节点|PC/Mobile|
|cos-badge-value|徽章文字节点|PC/Mobile|
