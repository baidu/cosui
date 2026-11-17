## API

### Props

| 名称          | 类型     | 默认值 | 说明    | 是否必选| 覆盖平台|
|--------------|----------|-----|----------|--------|---------|
| text         | string  | '' | 意图文本  |可选|PC/Mobile |
| index        | string  | '' | 索引下标  |可选|PC/Mobile |

### Events
|事件|参数|说明|覆盖平台|
|---|---|---|---|
| click | `{directive: string, data: {text: string, intentText: string, index?: number}}` | 点击 |PC/Mobile|
