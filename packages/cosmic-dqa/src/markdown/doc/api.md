## API

### Props

| 名称          | 类型     | 默认值 | 是否必选| 说明                   |	覆盖平台|
|-------------|--------|-----|--------|------------------------|-----------|
| content         | string |  '' |必选| Markdown 语法文本          |PC/Mobile |
| normalizeContent | (content: string) => string | null |可选| content 语法规范化处理函数 |PC/Mobile |
| config  | {[directiveName: string]: any} | null |可选| 自定义指令对应的配置项 |PC/Mobile|
| typing  | Typing  |   - |可选| 是否展示打字机效果        |PC/Mobile |
| autolink  | boolean  |   - |可选| 是否将文本中的链接文本渲染为可跳转的链接       |PC/Mobile |

#### Typing
| 名称          | 类型     | 默认值 | 是否必选| 说明                   |	覆盖平台|
|-------------|--------|-----|--------|------------------------|-----------|
| speed         | number |  30 |可选| 打字速度         |PC/Mobile |
| cursor         | boolean |  false |可选| 是否展示光标         |PC/Mobile |
| mode         | 'word' \| 'all' \| 'word' | 'sentence' | 逐字打印/逐包打印/逐句打印 |必选|PC/Mobile|
| hideMask     | boolean | false |必选| `mode === 'all'` 的时候生效 |PC/Mobile|

### Events
|事件|参数|说明|覆盖平台|
|---|---|---|---|
| poi-ready | {invokeParams: InvokeParams} | 参考 poi 和 shop-address |Mobile|
| click | {event: Event, directive: string, from: string, action: 'preview' \| 'copy', data: any} | 点击 |Mobile|
| toggle | {status: 'folded' \| 'unfoled', event: Event} | 展开收起切换点击 |Mobile|
| typing-start | {height: number} | 打字开始事件（ height 为打印新增部分文本需要的高度） |PC/Mobile|
| typing-finished |  | 打字结束事件 |PC/Mobile|
| show | {directive: string, target: HTMLElement} | 音频展示事件 |PC/Mobile|
| render-complete |  | 组件内容完全渲染完成事件。当 typing.mode !== 'sentence' 且上层业务调用 finish 方法或者 stop 方法时，在组件渲染完成时会派发；当 typing.mode === 'sentence' 且上层业务调用 finish 方法时，在组件渲染完成时会派发会触发。 |PC/Mobile|

##### click action 参数
| 参数 | 支持的指令       | 说明       |
|----|-------------------------|---------------|
| pause | ml-tts/ml-audio|用户手动暂停播放音频 |
| play | ml-tts/ml-audio |用户手动播放音频 |
| preview | - |点击图片，展示大图查看器|
| copy | - |复制文字 |

### Methods
|事件|参数|说明|覆盖平台|
|---|---|---|---|
| appendContent | content: string | 追加markdown content |PC/Mobile|
| stop |  | 停止打字动效，终止内容输出，同时隐藏光标 |PC/Mobile|
| finish |  | 完成内容渲染和打字动效，同时隐藏光标 |PC/Mobile|
| getComponentsByDirective | directive: string | 获取指令对应的的组件实例数组 |PC/Mobile|
| getDirectives | - | 获取指令对应的的组件实例数组，若无组件，也可获得指令的个数 |PC/Mobile|


### Parts

``` shell
|-- cosd-markdown
|   |-- cosd-markdown-content
```

|名称|说明|覆盖平台|
|---|---|---|
|cosd-markdown|组件根节点|PC/Mobile|
|cosd-markdown-content|内容节点|PC/Mobile|

## Directives
|指令名称|对应组件|描述|语法示例|覆盖平台|
|---|---|---|---|---|
| [ml-citation](/protocol/markdown/component/ml-citation) | @cosui/cosmic-dqa/citation | 溯源角标及浮窗 | 单个:ml-citation{ref="1" data="citationList"} 多个:ml-citation{ref="1,2" data="citationList"} |PC/Mobile|
| [ml-citation-text](/protocol/markdown/component/ml-citation-text) | - | 溯源文字角标 | :ml-citation-text[法规]{} |PC/Mobile|
| [ml-tts](/protocol/markdown/component/ml-tts) | @cosui/cosmic/audio-player | 语音播报 | :ml-tts{text="文本"} |PC/Mobile|
| [ml-poi](/protocol/markdown/component/ml-poi) | @cosui/cosmic-dqa/poi | 地图强弱样式 | :ml-poi{data="poi-{ref}"} |Mobile|
| [ml-shop-address](/protocol/markdown/component/ml-shop-address) | @cosui/cosmic-dqa/shop-address | 店铺强弱样式 | :ml-shop-address{data="shop-address-{ref}"} |Mobile|
| [ml-relationship](/protocol/markdown/component/ml-relationship) | @cosui/cosmic-dqa/relationship | 人物关系 | :ml-relationship{data="relationship-{ref}"} |PC/Mobile|
| [ml-audio](/protocol/markdown/component/ml-audio) | @cosui/cosmic/audio-player | 音频指令 | ::ml-audio（具体可看demo示例） |PC/Mobile|
| [ml-brief](/protocol/markdown/component/ml-brief) | - | 左图右文 | :::ml-brief（具体可看demo示例） |PC/Mobile|
| [ml-copy](/protocol/markdown/component/ml-copy) | - | 复制文本 | :ml-copy[复制文本] |PC/Mobile|
| [ml-search](/protocol/markdown/component/ml-search) | - | 回搜 | :ml-search[回搜文本] 或者 :ml-search[回搜文本]{text="真实回搜文本"} |PC/Mobile|
| [ml-text](/protocol/markdown/component/ml-text) | - | 特殊样式文本 | :ml-text[文本]{type="label"} :ml-text[文本]{type="highlight"} |PC/Mobile|
| [ml-site-vcard](/protocol/markdown/component/ml-site-vcard) | @cosui/cosmic-dqa/site-vcard | 资源展示 | ::ml-site-vcard（具体可看demo示例） |PC/Mobile|
| [ml-tag-link](/protocol/markdown/component/ml-tag-link) | @cosui/cosmic-dqa/tag-link | 文本标签链接展示 | :ml-tag-link{ref="1"} |PC/Mobile|
| [ml-search-more](/protocol/markdown/component/ml-search-more) | - | 划词 | :ml-search-more[划词文本] 或者 :ml-search-more[划词文本]{text="真实使用文本" url="https://m.baidu.com/s?sa=sa&word=文本"} |Mobile|
