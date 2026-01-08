## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|logo|string|'https://gips2.baidu.com/it/u=1009531835,1711006677&fm=3028&app=3028&f=PNG&fmt=auto&q=90&size=f187_48'|否|品牌日间logo|PC/Mobile|
|logoDark|string|'https://gips3.baidu.com/it/u=397455163,2412254865&fm=3028&app=3028&f=PNG&fmt=auto&q=90&size=f187_48'|否|品牌夜间logo|PC/Mobile|
|brandLogo|string|''|否|联名品牌日间logo|PC/Mobile|
|brandLogoDark|string|''|否|联名品牌夜间logo|PC/Mobile|
|appearance|'primary'\|'enhance'\|'secondary'|'primary'|否|- primary: 多个logo之间的间隔符为圆点以及文案字重加粗 - enhance: 多个logo之间的间隔符为竖线 - secondary: 品牌logo后的文案不加粗 |PC/Mobile|
|overview|string|''|否|概述总结|PC/Mobile|
|subjective|boolean|false|否|q检索内容的主观性，- true: 总结全网xx篇真实经验 - false: 总结全网xx篇结果|PC/Mobile|
|citationCount|number|0|否|溯源数量|PC/Mobile|
|expanded|boolean\|undefined|undefined|否|溯源总结文案后的小箭头，用于指示是否展开列表, 不传则没有展开收起|PC/Mobile|



### Slots
|名称|说明|覆盖平台|
|---|---|---|
|default|默认槽位，提供独立的功能区支持tts等部分|PC/Mobile|

### Events
|事件|参数|说明|覆盖平台|
|---|---|---|---|
|citation-click|{event: Event}|暴露溯源文案的点击事件|PC/Mobile|
|overview-click|{event: Event}|暴露总结文案的点击事件|PC/Mobile|

### Parts
``` shell
|-- cosd-search-header
|   |-- cosd-search-header-brand-area
|   |   |-- cosd-search-header-brand-ai
|   |   |-- cosd-search-header-brand-logo
|   |   |-- cosd-search-header-overview
|   |   |-- cosd-search-header-citation
|   |-- cosd-search-header-functional-area
```

|名称|说明|覆盖平台|
|---|---|---|
|cosd-search-header|头部组件根节点|PC/Mobile|
|cosd-search-header-brand-area|品牌区域|PC/Mobile|
|cosd-search-header-brand-ai|百度ai logo|PC/Mobile|
|cosd-search-header-brand-logo|联名品牌logo|PC/Mobile|
|cosd-search-header-overview|总结文案|PC/Mobile|
|cosd-search-header-citation|溯源文案|PC/Mobile|
|cosd-search-header-functional-area|功能区域|PC/Mobile|
