## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
| appearance  | 'paragraph' \| 'phrase' | 'paragraph' | 是 | 变体标识 | PC/Mobile |
| content  | Array | [] | 是 | 文本列表 | PC/Mobile |
| note  | string | '' | 否 | 左下角标签 | PC/Mobile |
| typing  | object | null | 是 | 文本 | PC/Mobile |


### Slots
无


### Parts

```shell
|-- cosd-copyable-text
|   |-- cosd-copyable-text-content
|   |   |-- cosd-copyable-text-footer
|   |   |   |-- cosd-copyable-text-note
|   |   |   |-- cosd-copyable-text-copy
|   |-- cosd-copyable-text-divider
```

### Events
|名称|参数|说明|覆盖平台|
|---|---|---|---|
|copy-click|{event: Event, content: string}|复制按钮点击|PC/Mobile|
|typing-finished||打字结束|PC/Mobile|
