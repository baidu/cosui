## API

### Props

| 名称          | 类型     | 默认值 | 说明    | 是否必选|	覆盖平台|
|--------------|----------|-----|----------|--------|---------|
| text         | string  | '' | 回搜的文本  |可选|PC/Mobile |
| icon         | string  | '' | 右上角icon,参考[icon](/components/cosmic/icon)  |可选|PC |
| url          | string  | '' | 回搜的链接  |可选|Mobile |

### Events
|事件|参数|说明|覆盖平台|
|---|---|---|---|
| click | {directive: string, data: props} | 点击 |PC/Mobile|
