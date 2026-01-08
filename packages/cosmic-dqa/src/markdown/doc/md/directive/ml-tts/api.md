## API

### Props
| 名称  | 类型  | 默认    | 是否必选 | 说明     | 覆盖平台 |
|------|------|---------|---------|---------|---------|
| text       | string  | ''    | 可选    | 播报文本  | PC/Mobile |
| lan     | string  | ''  | 可选    | 播报语言   | PC/Mobile |
| src    | string  | '' | 可选   | 音频地址，不传默认链接：https://sensearch.baidu.com/gettts?lan={lan}&text={text} | PC/Mobile |

### Events
|事件|参数|说明|覆盖平台|
|---|---|---|---|
| click | {directive: string,action:'play' \| pause',event: Event} | 点击播放按钮时触发 |PC/Mobile|
