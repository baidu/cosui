## API

### Props
| 名称  | 类型  | 默认    | 是否必选 | 说明     | 覆盖平台 |
|------|------|---------|---------|---------|---------|
| text       | string  | - | 必选    | 回搜词，和实际显示的文字不同。  | PC/Mobile |

### config
| 名称  | 类型  | 默认    | 是否必选 | 说明     | 覆盖平台 |
|------|------|---------|---------|---------|---------|
| getLinkInfo       | (text) => {href:string,target:string}  | - | 可选    | markdown配置项，不传href默认拼接:https://www.baidu.com/s?word={text}  | PC/Mobile |
| sa       | string  | 're_dqa_zy' | 可选    | 来源  | PC/Mobile |

### Events
|事件|参数|说明|覆盖平台|
|---|---|---|---|
| click | {directive: string,event:Event,word:string,href:string} | 点击 |PC/Mobile|
