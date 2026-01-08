## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
:---:|:---:|:---:|:---:|:---:|:---:|
|appearance|'1v1' \| 'horizontal' \| 'vertical'|'1v1'|否|控制投票组件展示的样式，需要注意不同样式下选项数目要对应|PC/Mobile|
|options|Array<[Option](#Option)>|[]|是|所有选项及结果展示项数据|PC/Mobile|
|target-name|string|'name'|否|用于区分可选项的唯一标识的键名称|PC/Mobile|
|target|Option[target[targetName]]|null|否|用户的投票选择，null 表示用户尚未投票。非 null 将显示投票结果，并通过其值确定用户选项|PC/Mobile|

#### Option

|名称|类型|默认值|是否必选|说明|覆盖平台|
:---:|:---:|:---:|:---:|:---:|:---:|
|target|[Target](#Target)|-|是|选项的具体内容|PC/Mobile|
|value|0\~1|0|当 Props.target 不为 null 时必选|用于显示选项结果的占比，如 0.25|PC/Mobile|
|text|string|''|否|选项结果显示的文本内容，若为空则默认使用 value 计算并显示百分比|PC/Mobile|

#### Target

|名称|类型|默认值|是否必选|说明|覆盖平台|
:---:|:---:|:---:|:---:|:---:|:---:|
|name|string|-|是|选项显示的文本内容|PC/Mobile|
|image|string|-|否|选项显示的图片资源地址，若有则会渲染图片|PC/Mobile|

### Events

|事件|参数|说明|覆盖平台|
|---|---|---|---|
|option-click| `Option[target[targetName]]` |可投票时，当选项被点击时触发|PC/Mobile|

### Parts

``` shell
|-- cos-vote
|   |-- cos-vote-options
|   |   |-- cos-vote-option
|   |   |   |-- cos-vote-option-image
|   |   |   |-- cos-vote-option-name
|   |   |-- cos-vote-option-vs
|   |-- cos-vote-results
|   |   |-- cos-vote-result-bar
|   |   |   |-- cos-vote-result-bar-item
|   |   |-- cos-vote-result-targets
|   |   |   |-- cos-vote-result-target
|   |   |   |   |-- cos-vote-result-value
|   |-- cos-vote-results-list
|   |   |-- cos-vote-option-result-bar
|   |   |-- cos-vote-option-result-value

```

|名称|说明|覆盖平台|
|---|---|---|
|cos-vote|组件根节点|PC/Mobile|
|cos-vote-options|选项外部容器节点|PC/Mobile|
|cos-vote-option|每个选项节点|PC/Mobile|
|cos-vote-option-image|选项的图片节点|PC/Mobile|
|cos-vote-option-name|选项的文本节点|PC/Mobile|
|cos-vote-option-vs|仅 1v1 样式下存在，中央 VS 图标节点|PC/Mobile|
|cos-vote-results|仅 1v1 样式下存在，结果外部容器节点|PC/Mobile|
|cos-vote-result-bar|结果状态下显示的总占比条节点|PC/Mobile|
|cos-vote-result-bar-item|结果状态下显示的单个占比条节点|PC/Mobile|
|cos-vote-result-targets|结果状态下显示的选项容器节点|PC/Mobile|
|cos-vote-result-target|结果状态下显示的选项节点|PC/Mobile|
|cos-vote-result-value|结果占比显示的文本节点|PC/Mobile|
|cos-vote-results-list|非 1v1 模式下存在，结果外部容器节点，与选项容器节点相同|PC/Mobile|
|cos-vote-option-result-bar|结果状态下显示的占比条节点|PC/Mobile|
|cos-vote-option-result-value|结果占比显示的文本节点|PC/Mobile|
