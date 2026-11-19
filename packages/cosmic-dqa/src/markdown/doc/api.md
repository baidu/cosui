## API

### Props

| 名称          | 类型     | 默认值 | 是否必选| 说明                   |	覆盖平台|
|-------------|--------|-----|--------|------------------------|-----------|
| content         | string |  '' |必选| Markdown 语法文本          |PC/Mobile |
| normalizeContent | (content: string) => string | null |可选| content 语法规范化处理函数 |PC/Mobile |
| config  | {[directiveName: string]: any} | null |可选| 自定义指令对应的配置项 |PC/Mobile|
| table  | {copy?: boolean, fullscreen?: boolean, download?: boolean} | null |可选| 表格表头的配置项       |PC/Mobile|
| code  | {fullscreen?: boolean, lineNumbers?: boolean, foldable?: boolean, wrap?: boolean, scrollable?: boolean} | null |可选| 代码块全局配置项。`lineNumbers`：是否显示行号，默认 true；`foldable`：超过展示高度显示展开/收起，默认 false；`wrap`：无行号纯文本是否自动换行，默认为 true，`lineNumbers` 为 true 时不生效；`scrollable`：固定容器滚动展示，默认 false。单个代码块可用语法配置覆盖，见 code 示例 |PC/Mobile|
| typing  | Typing  |   - |可选| 是否展示打字机效果        |PC/Mobile |
| autolink  | boolean  |   - |可选| 是否将文本中的链接文本渲染为可跳转的链接       |PC/Mobile |
| diagram  | {mode?: boolean, copy?: boolean, download?: boolean, fullscreen?: boolean, landscape?: boolean, zoom-in?: boolean, zoom-out?: boolean, reset?: boolean} \| boolean | - |可选| 图表渲染配置。传入配置对象即开启（命中 mermaid / markmap / mindmap 代码块，或中文别名 流程图 / 时序图 / 甘特图 / 思维导图 代码块时渲染为可交互图表）；不传 / `null` / `false` 则关闭，初始视图固定为图表。各字段控制内置基础控件的展示：`mode` 图 / 源码 切换按钮；`copy` 复制按钮；`download` 下载按钮；`fullscreen` 全屏按钮；`landscape` 横竖屏切换按钮（移动端）；`zoom-in` 放大按钮；`zoom-out` 缩小按钮；`reset` 复位 / 自适应按钮 |PC/Mobile|

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
| click | {event: Event, directive: string, from: 'link' \| 'table' \| 'code' \| 'img' \| 'diagram', action: Action, data: any} | 点击 |PC/Mobile|
| toggle | {status: 'folded' \| 'unfoled', event: Event} | 展开收起切换点击 |Mobile|
| typing-start | {height: number} | 打字开始事件（ height 为打印新增部分文本需要的高度） |PC/Mobile|
| typing-finished |  | 打字结束事件 |PC/Mobile|
| show | {directive: string, target: HTMLElement} | 音频展示事件 |PC/Mobile|
| render-complete |  | 组件内容完全渲染完成事件。当 typing.mode !== 'sentence' 且上层业务调用 finish 方法或者 stop 方法时，在组件渲染完成时会派发；当 typing.mode === 'sentence' 且上层业务调用 finish 方法时，在组件渲染完成时会派发会触发。 |PC/Mobile|

##### click action 参数
| 参数 | 支持的指令/标签 | 说明       |
|----|-------------------------|---------------|
| pause | ml-tts/ml-audio/ml-video|用户手动暂停播放音视频 |
| play | ml-tts/ml-audio/ml-video |用户手动播放音视频 |
| muted | ml-video |视频点击静音 |
| volume | ml-video |视频开启音量 |
| seeked | ml-video |拖动视频进度条 |
| preview | img |点击图片，展示大图查看器|
| copy | table/code/diagram | 复制文字 |
| fullscreen | table/code/diagram | 表格/代码块/图表放大 |
| download | table/diagram | 下载表格/图表 |
| fold | code | 代码块收起（`foldable=true` 时触发） |
| unfold | code | 代码块完全展开（`foldable=true` 时触发） |
| mode-change | diagram | 图 / 源码 视图切换 |
| landscape | diagram | 横竖屏切换（移动端） |
| zoom | diagram | 图表放大 / 缩小 |
| reset | diagram | 图表复位 / 自适应 |

### Methods
|事件|参数|说明|覆盖平台|
|---|---|---|---|
| appendContent | content: string | 追加markdown content |PC/Mobile|
| stop |  | 停止打字动效，终止内容输出，同时隐藏光标 |PC/Mobile|
| finish |  | 完成内容渲染和打字动效，同时隐藏光标 |PC/Mobile|
| getComponentsByDirective | directive: string | 获取指令对应的的组件实例数组 |PC/Mobile|
| getDirectives | - | 获取指令对应的的组件实例数组，若无组件，也可获得指令的个数 |PC/Mobile|
| resetDiagram | - | 复位 / 自适应本组件内所有图表 |PC/Mobile|


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
| [ml-text](/protocol/markdown/component/ml-text) | - | 特殊样式文本 | :ml-text[文本]{type="label"} :ml-text[文本]{type="highlight"} :ml-text[文本]{type="emphasis"} |PC/Mobile|
| [ml-site-vcard](/protocol/markdown/component/ml-site-vcard) | @cosui/cosmic-dqa/site-vcard | 资源展示 | ::ml-site-vcard（具体可看demo示例） |PC/Mobile|
| [ml-tag-link](/protocol/markdown/component/ml-tag-link) | @cosui/cosmic-dqa/tag-link | 文本标签链接展示 | :ml-tag-link{ref="1"} |PC/Mobile|
| [ml-search-more](/protocol/markdown/component/ml-search-more) | - | 划词 | :ml-search-more[划词文本] 或者 :ml-search-more[划词文本]{text="真实使用文本" url="https://m.baidu.com/s?sa=sa&word=文本"} |Mobile|
| [ml-intent](/protocol/markdown/component/ml-intent) | - | 意图 | :ml-intent[意图文本] 或者 :ml-intent[意图文本]{text="真实意图文本"} |PC/Mobile|
