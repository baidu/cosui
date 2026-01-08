## API

### Props
| 名称        | 类型           | 默认值       | 是否必选 | 说明                             | 覆盖平台        |
|---|---|---|---|---|---|
| icon       | string        | ""         | 否      | 右上角图片，支持icon和image       | PC/Mobile     |
| name       | string        | ""         | 否      | 右上角文字                       | PC/Mobile     |
| tag        | string        | ""         | 否      | 水印区域图片                     | PC/Mobile     |
| title      | string        | ""         | 否      | 标题                             | PC/Mobile     |
| caption    | string        | ""         | 否      | 标题说明                         | PC/Mobile     |
| poster     | string        | ""         | 否      | 封面图 URL                        | PC/Mobile     |
| duration   | number        | 0          | 否      | 时长（ms）                        | PC/Mobile     |
| loop       | boolean       | false      | 否      | 是否循环播放                      | PC/Mobile     |
| autoplay   | boolean       | false      | 否      | 是否自动播放                      | PC/Mobile     |
| lyrics     | lyricItem[]  | []         | 否      | 数组，支持时间轴同步              | PC/Mobile     |
| src        | string        | ""         | 否      | 播放的url                         | PC/Mobile     |
| download   | string        | ""         | 否      | 下载的url                         | PC/Mobile        |
| status     | "progress" / "finished" | "finished"   | 否      | 数据生成完成/数据生成中 | PC/Mobile     |
| current-time| number        | 0          | 否      | 当前播放时间（ms）                | PC/Mobile     |

#### lyricItem

| 名称       | 类型    | 默认值 | 是否必选 | 说明       | 覆盖平台    |
|---|---|---|---|---|---|
| content   | string | ""     | 是      | 文本       | PC/Mobile  |
| startTime | number | 0      | 否      | 开始时间   | PC/Mobile  |
| endTime   | number | 0      | 否      | 结束时间   | PC/Mobile  |

### Events

| 名称         | 参数 | 说明                              | 覆盖平台 |
|---|---|---|---|
| play        |  {event: HTMLMouseEvent, currentTime: number} | 播放开始事件                        | PC/Mobile |
| pause       |  {event: HTMLMouseEvent, currentTime: number} | 播放暂停事件                        | PC/Mobile |
| download    |   | 下载文件| PC/Mobile |
| seeking        |  {event: HTMLMouseEvent} | 进度条开始拖拽时触发                    | PC |
| seeked       |  {event: HTMLMouseEvent, currentTime: number} | 进度条拖拽结束时触发                    | PC |
| lyricsClick        |  {event: HTMLMouseEvent} | 用户点击歌词跳转播放时触发                  | PC |


### Methods
| 名称       | 返回值类型 | 说明             | 覆盖平台    |
|---|---|---|---|
| play()    | -         | 开始播放         | PC/Mobile  |
| pause()   | -         | 暂停播放         | PC/Mobile  |
| isPlaying(playing: boolean) | -  | 获取是否播报状态 | PC/Mobile  |
| onTimeUpdate(time: { currentTime: number, duration: number })     | -         | 更新进度条和歌词位置         | PC/Mobile  |



### Parts
``` shell
|-- cosd-music-player
|   |-- cosd-music-player-panel
|       |-- cosd-music-player-type
|           |-- cosd-music-player-type-img
|           |-- cosd-music-player-type-icon
|           |-- cosd-music-player-type-title
|       |-- cosd-music-player-poster-wrapper
|           |-- cosd-music-player-poster
|           |-- cosd-music-player-vinyl
|           |-- cosd-music-player-vinyl-poster
|           |-- cosd-music-player-poster-icon
|       |-- cosd-music-player-content
|           |-- cosd-music-player-content-title
|           |-- cosd-music-player-content-lyrics
|               |-- cosd-music-player-content-lyric
|           |-- cosd-music-player-content-progress
|               |-- cosd-music-player-content-progress-bar
|                   |-- cosd-music-player-content-progress-inner
|    |-- cosd-music-player-tag
|
```
