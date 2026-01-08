## API

### Props
| 名称        | 类型      | 默认值                                                                                                 | 是否必选 | 说明                                 | 覆盖平台      |
|------|------|---------|----|---------|---------|
| src       | string  | -                                                                                                   | 是    | 播报地址                               | PC/Mobile |
| loop      | boolean | false                                                                                               | 否    | 是否循环播报，仅默认态支持使用                    | PC/Mobile |
| preload   | string  | 'none'                                                                                             | 否    | 资源的预加载选项，参考：preload，仅默认态支持使用       | PC/Mobile |
| apperance | 'enhance' \| ''  | ''                                                                                               | 否    | 设置 apperance 为 'enhance' 时使用增强样式   | PC/Mobile |
| title     | string  | ''                                                                                                  | 否    | 标题，仅 apperance 为  enhance 时支持使用    | PC/Mobile |
| poster    | string  |[默认头像](https://now.bdstatic.com/stash/v1/6f672d5/lingjing-fe/07ccbd4/lingjing-sdk/answer_audio_album.png)| 否    | 专辑封面图，仅 apperance 为 enhance 时支持使用 | PC/Mobile |

### Slots

|名称|说明| 覆盖平台|
|---|---|---|
|default|播报图标，仅默认态支持使用| PC/Mobile |

### Parts

``` shell
|-- cos-audio-player
|-- cos-audio-player-init
|-- cos-audio-player-play
|-- cos-audio-player-pause
|   |-- cos-audio-player-icon
|   |-- cos-audio-player-enhance
|   |   |-- cos-audio-player-poster
|   |   |-- cos-audio-player-content
|   |   |   |-- cos-audio-player-title
|   |   |   |-- cos-audio-player-time
|   |   |-- cos-audio-player-icon
```

| 名称                       | 说明               | 覆盖平台      |
|--------------------------|------------------|-----------|
| cos-audio-player         | 根节点              | PC/Mobile |
| cos-audio-player-icon    | 播报图标             | PC/Mobile |
| cos-audio-player-init    | 待播放状态            | PC/Mobile |
| cos-audio-player-play    | 播报中              | PC/Mobile |
| cos-audio-player-pause   | 暂停播报             | PC/Mobile |
| cos-audio-player-enhance | enhance 播放器容器    | PC/Mobile |
| cos-audio-player-poster  | enhance 播放器海报    | PC/Mobile |
| cos-audio-player-content | enhance 播放器展现内容  | PC/Mobile |
| cos-audio-player-title   | enhance 播放器标题    | PC/Mobile |
| cos-audio-player-time    | enhance 播放器器展现时间 | PC/Mobile |

### Events

|名称|参数|说明|覆盖平台|
|---|---|---|---|
|play|{event: Event}|播放开始事件|PC/Mobile|
|pause|{event: Event}|播放暂停事件|PC/Mobile|
|ended|{event: Event}|播放完成事件|PC/Mobile|
|timeupdate|{event: Event}|时间戳更新|PC/Mobile|
|canplay|{event: Event}|浏览器已经可以播放音频，但加载数据不足以播放到结尾|PC/Mobile|
|canplaythrough|{event: Event}|浏览器预测已经可以在不暂停的前提下将音频播放到结束|PC/Mobile|
|user-activation|{event: Event, action: 'play \| pause'}|用户点击播放按钮时触发|PC/Mobile|

### Methods

|名称|返回值类型|说明|覆盖平台|
|---|---|---|---|
|play()|-|开始播放|PC/Mobile|
|pause()|-|暂停播放|PC/Mobile|
|isPlaying()|boolean|获取是否播报状态|PC/Mobile|
