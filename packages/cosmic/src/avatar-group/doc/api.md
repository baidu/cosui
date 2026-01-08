## API

### Props

| 名称    | 类型    | 默认值  | 是否必选| 说明     | 覆盖平台    |
|--------|---------|-------|--------|----------|------------|
| size   | 'xs' \| 'sm' \| 'md'  | 'md'  |可选| 头像组的大小，建议头像组 size 和头像 size 一致 | PC/Mobile  |
| animate   | boolean  | false |可选| 是否开启头像组动效，最多同时可显示 3 个轮换 | PC/Mobile  |

##### size 规格

| 规格 | 参数（PC/Mobile）|
|----|----------------|
| xs | 头像遮挡 7 px   |
| sm | 头像遮挡 12 px  |
| md | 头像遮挡 22 px  |

### Slots
|名称|说明|覆盖平台|
|---|---|---|
|default|默认槽位，传入元素超过三个，截断显示|PC/Mobile|

### Parts

``` shell
|-- cos-avatar-group
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-avatar-group|头像组根节点|PC/Mobile|
