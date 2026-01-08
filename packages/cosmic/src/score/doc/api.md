## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|value|number \| string|0|可选|当前评分值，不支持负分，传入负分将重置为 0|PC/Mobile|
|max|number|5|可选|最大评分值|PC/Mobile|
|score|boolean|false|可选|是否显示分数|PC/Mobile|
|unit|string|'分'|可选|设置分数的单位，仅在 type 为 `text` 时生效|PC/Mobile|
|type|string|'multiple'|可选|`multiple`：五星、`single`：单星、`text`：只展示单位 |PC/Mobile|
|size|string|'md'|可选|设置评分大小，可选值为：`sm`, `md`, `lg`|PC/Mobile|
|controlled|boolean|false|可选|是否可控，可控时可以点击选择评分|PC/Mobile|
|clearable|boolean|false|可选|是否可清除评分|PC/Mobile|

### Slots

|名称|说明|
|---|---|
|default|默认槽位，用于展示评分右侧的文案。|

### Parts

``` shell
|-- cos-score
|   |-- cos-score-icon-container
|   |   |-- cos-score-row
|   |   |   |-- cos-score-icon
|   |   |-- cos-score-row-empty
|   |   |   |-- cos-score-icon-empty
|   |-- cos-score-count
|   |-- cos-score-text
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-score|根节点|PC/Mobile|
|cos-score-icon-container|包裹所有图标的容器节点|PC/Mobile|
|cos-score-row|涂色图标所在行|PC/Mobile|
|cos-score-icon|涂色图标节点|PC/Mobile|
|cos-score-row-empty|空白图标所在行|PC/Mobile|
|cos-score-icon-empty|空白图标节点|PC/Mobile|
|cos-score-count|图标左侧显示分数节点|PC/Mobile|
|cos-score-unit|分数右侧显示单位节点|PC/Mobile|
|cos-score-text|图标右侧显示文案节点|PC/Mobile|

### Events

| 事件     | 参数                            | 说明       | 覆盖平台      |
|--------|-------------------------------|----------|-----------|
| change | {value: number, event: Event} | 评分值变化时触发 | PC/Mobile |
