## API

### Props
| 名称  | 类型  | 默认    | 是否必选 | 说明     | 覆盖平台 |
|------|------|---------|---------|---------|---------|
| src       | string  | -                                                                                                   | 必选    | 播报地址                               | PC/Mobile |
| title     | string  | ''                                                                                                  | 必选    | 标题   | PC/Mobile |
| poster    | string  | [默认封面](https://now.bdstatic.com/stash/v1/6f672d5/lingjing-fe/07ccbd4/lingjing-sdk/answer_audio_album.png) | 可选   | 专辑封面图 | PC/Mobile |

### Events
|事件|参数|说明|覆盖平台|
|---|---|---|---|
| click | {directive: string,action:'play'\|'ended',event: Event,target:HTMLElement} | 点击 |PC/Mobile|
| show | {directive: string,target:HTMLElement} | 展示 |PC/Mobile|
