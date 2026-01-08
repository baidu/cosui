## API

### Props

| 名称             | 类型             | 默认值                          | 是否必选 | 说明                                           | 覆盖平台    |
|----------------|----------------|------------------------------|------|----------------------------------------------|---------|
| open           | boolean        | false                        | 必选   | 弹窗是否可见                                       | PC/Mobile |
| title          | string         | ‘城市选择’                     | 可选   | 弹窗标题                                         | PC/Mobile |
| placeholder    | string         | ‘搜索国内外城市/区域名称’        | 可选   | 输入框 placeholder                              | PC/Mobile |
| active-tab      | number         | 0                            | 可选   | 当前选中的 tab；仅有多个 tab 时生效                       | PC/Mobile |
| tabs           | string[]       | ['国内', '国际/中国港澳台']     | 可选   | tab 头部名字                       | PC/Mobile |
| hot-title       | string         | '热门城市'                     | 可选   | 热门城市对应的标题                                    | PC/Mobile |
| native-cities   | City[]         | []                           | 可选   | 国内城市列表，为空时不展示，数据结构可参考[例子](https://psstatic.cdn.bcebos.com/basics/cosmic/citylist_1734861547000.json) ，仅供参考，不保证具体数据可靠性                              | PC/Mobile |
| foreign-cities  | City[]         | []                           | 可选   | 国际城市列表，为空时不展示，数据结构可参考[例子](https://psstatic.cdn.bcebos.com/basics/cosmic/foreignlist_1734878215000.json)，仅供参考，不保证具体数据可靠性                                   | PC/Mobile |
| selected-cities | City[]         | []                           | 可选   | 已选中的城市                                | PC/Mobile |
| anchor | boolean          | false                          | 可选   | 是否自动滚动到已选中城市                                | PC/Mobile |
| get-popup-container | () => HTMLElement | 当前位置节点 |可选| 指定父级 DOM，弹层将会渲染至该 DOM  | Mobile |

##### city

| 名称        | 类型      | 默认值 | 是否必选 | 说明                | 覆盖平台    |
|-----------|---------|-----|------|-------------------|---------|
| city      | string  | -   | 是    | 城市名               | PC/Mobile |
| code      | string  | -   | 否    | 城市 Id（国内城市必传）    | PC/Mobile |
| country   | string  | -   | 否    | 国家（国际城市必传）       | PC/Mobile |
| continent | string  | -   | 否    | 大洲（国际城市必传）       | PC/Mobile |
| province  | string  | -   | 否    | 省/州               | PC/Mobile |
| county    | string  |     | 否    | 区/县               | PC/Mobile |
| pinyin    | string  | -   | 否    | 拼音                | PC/Mobile |
| english   | string  | -   | 否    | 英文（仅国际城市需要）       | PC/Mobile |
| level     | '1' ｜ '2' | '1 '  | 是 | 城市展现层级;1展现到 city，如"北京市";2展现到 county，如 "海淀区"| PC/Mobile |
| hot       | boolean | -   | 否    | 是否是热门城市 | PC/Mobile |
| same      | boolean | -   | 否    | 是否存在同名城市 | PC/Mobile |

### Parts
##### wise
``` shell
|-- cos-city-selector
|   |-- cos-city-selector-header
|   |   |-- cos-city-selector-header-search
|   |   |   |-- cos-city-selector-header-cancel
|   |   |-- cos-city-selector-header-list
|   |   |   |-- cos-city-selector-header-option
|   |   |   |   |-- cos-city-selector-header-option-highlight
|   |   |   |   |-- cos-city-selector-header-option-english
|   |   |   |   |-- cos-city-selector-header-option-desc
|   |-- cos-city-selector-tabs
|   |   |-- cos-city-selector-initial
|   |   |   |-- cos-city-selector-initial-list
|   |   |   |   |-- cos-city-selector-initial-list-bubble
|   |   |   |   |-- cos-city-selector-initial-list-active
|   |   |   |-- cos-city-selector-initial-cities
|   |   |   |   |-- cos-city-selector-initial-hot-title
|   |   |   |   |-- cos-city-selector-initial-hot-city
|   |   |   |   |-- cos-city-selector-initial-menu-city
|   |   |   |   |-- cos-city-selector-initial-city
|   |   |   |   |   |-- cos-city-selector-initial-city-initial
|   |   |   |   |   |-- cos-city-selector-initial-city-wrap
|   |   |   |   |   |   |-- cos-city-selector-initial-menu-city-label
|   |   |   |   |   |   |-- cos-city-selector-initial-city-label
|   |   |-- cos-city-selector-content
|   |   |   |-- cos-city-selector-content-menu
|   |   |   |   |-- cos-city-selector-content-menu-item
|   |   |   |   |-- cos-city-selector-content-menu-active
|   |   |   |-- cos-city-selector-content-countries
|   |   |   |   |-- cos-city-selector-content-country
|   |   |   |   |   |-- cos-city-selector-content-initial
|   |   |   |   |   |-- cos-city-selector-content-cities
|   |   |   |   |   |   |-- cos-city-selector-content-city
```
##### pc

``` shell
|-- cos-city-selector
|   |-- cos-city-selector-header
|   |   |-- cos-city-selector-header-search
|   |   |   |-- cos-city-selector-header-input
|   |   |   |-- cos-city-selector-header-relocate
|   |   |-- cos-city-selector-header-list
|   |   |   |-- cos-city-selector-header-option
|   |   |   |   |-- cos-city-selector-header-option-highlight
|   |   |   |   |-- cos-city-selector-header-option-desc
|   |   |-- cos-city-selector-header-none
|   |-- cos-city-selector-tabs
|   |   |-- cos-city-selector-content
|   |   |   |-- cos-city-selector-content-menu
|   |   |   |   |-- cos-city-selector-content-menu-item
|   |   |   |-- cos-city-selector-content-countries
|   |   |   |   |-- cos-city-selector-content-country
|   |   |   |   |   |-- cos-city-selector-content-label
|   |   |   |   |   |-- cos-city-selector-content-cities
|   |   |   |   |   |   |-- cos-city-selector-content-city
|   |   |   |   |   |   |   |-- cos-city-selector-content-city-label
|   |   |-- cos-city-selector-initial
|   |   |   |-- cos-city-selector-initial-list
|   |   |   |   |-- cos-city-selector-initial-list-active
|   |   |   |   |-- cos-city-selector-initial-cities
|   |   |   |   |   |-- cos-city-selector-initial-label
|   |   |   |   |   |-- cos-city-selector-initial-options
|   |   |   |   |   |   |-- cos-city-selector-initial-option
|   |   |   |   |   |   |   |-- cos-city-selector-initial-option-label
```
|名称|说明|覆盖平台|
|---|---|---|
|cos-city-selector|根节点|PC/Mobile|

### Events

|事件|参数|说明|覆盖平台|
|---|---|---|---|
|close|-|弹窗关闭时触发|PC/Mobile|
|change|{city: City, from: From} |选中城市事件|PC/Mobile|

##### From
| 枚举值        | 说明       |
|-----------|---------|
| hot        | 选择热门城市 |
| letter    | 字母查询列表城市 |
| search     | 选择搜索框城市 |
| menu       | 选择菜单城市 |
