## API

### Props

|名称|类型|初始值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
| linkInfo | [LinkInfo](/components/cosmic/link) | {} | 否 | 跳转信息 | PC/Mobile |
| size | 'sm' \| 'md' | 'md' | 否 | 图谱子节点尺寸 | PC/Mobile |
| name | string | - | 是 | 图谱中心节点名称 | PC/Mobile |
| inbound | graphNode[] | [] | 否 | 图谱上方关系节点 | PC/Mobile |
| outbound | graphNode[] | [] | 否 | 图谱下方关系节点 | PC/Mobile |

#### graphNode
|名称|类型|初始值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
| name | string | - | 是 | 图谱关系节点名称 | PC/Mobile |
| caption | string | - | 否 | 图谱关系节点说明 | PC/Mobile |
| relation | string | - | 否 | 图谱关系节点与中心节点关系 | PC/Mobile |

### Slots
无

### Parts
``` shell
|-- cosd-company-graph
|   |-- cosd-company-graph-child
|   |   |-- cosd-company-graph-child-node-group
|   |   |   |-- cosd-company-graph-child-node
|   |   |   |   |-- cosd-company-graph-child-node-box
|   |   |   |   |   |-- cosd-company-graph-child-node-name
|   |   |   |   |   |-- cosd-company-graph-child-node-caption
|   |   |   |   |-- cosd-company-graph-child-node-vertical-line
|   |   |   |   |   |-- cosd-company-graph-child-node-arrow
|   |   |   |   |   |-- cosd-company-graph-child-node-relation
|   |   |-- cosd-company-graph-child-horizontal-line
|   |-- cosd-company-graph-main-node
|   |   |-- cosd-company-graph-main-node-box
|   |   |   |-- cosd-company-graph-main-node-name
```
|名称|说明|覆盖平台|
|---|---|---|
|cosd-company-graph|根节点|PC/Mobile|
|cosd-company-graph-child|图谱向内/向外子模块|PC/Mobile|
|cosd-company-graph-child-node|图谱子节点|PC/Mobile|
|cosd-company-graph-child-node-box|图谱子节点盒子|PC/Mobile|
|cosd-company-graph-child-node-name|图谱子节点名称|PC/Mobile|
|cosd-company-graph-child-node-caption|图谱子节点描述|PC/Mobile|
|cosd-company-graph-child-node-vertical-line|图谱子节点竖连接线|PC/Mobile|
|cosd-company-graph-child-node-arrow|图谱子节点连接线箭头|PC/Mobile|
|cosd-company-graph-child-node-relation|图谱子节点与主节点关系|PC/Mobile|
|cosd-company-graph-child-horizontal-line|图谱子节点横连接线|PC/Mobile|
|cosd-company-graph-main-node|图谱中心节点|PC/Mobile|
|cosd-company-graph-main-node-box|图谱中心节点盒子|PC/Mobile|
|cosd-company-graph-main-node-name|图谱中心节点名称|PC/Mobile|

### Events
无
