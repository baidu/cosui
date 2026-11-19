<!-- @file EntityCard 属性和节点说明 -->

## API

### Props

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 覆盖平台 |
| --- | --- | --- | --- | --- | --- |
| thumbnail | Image | - | 是 | 图片配置， 属性同 [Image 组件](/components/cosmic/image) | PC/Mobile |
| title | string | - | 是 | 标题，支持普通文本和蓝链，单行截断 | PC/Mobile |
| content | string | - | 是 | 描述，支持普通文本和蓝链，三行截断 | PC/Mobile |

### Parts

```text
cosd-entity-card
├── cosd-entity-card-thumbnail
└── cosd-entity-card-body
    ├── cosd-entity-card-title
    └── cosd-entity-card-content
```

| 名称 | 说明 | 覆盖平台 |
| --- | --- | --- |
| cosd-entity-card | 实体卡片根节点 | PC/Mobile |
| cosd-entity-card-thumbnail | 左侧图片区域 | PC/Mobile |
| cosd-entity-card-body | 右侧内容区域 | PC/Mobile |
| cosd-entity-card-title | 标题区域 | PC/Mobile |
| cosd-entity-card-content | 描述区域 | PC/Mobile |

### Events

| 名称 | 参数 | 说明 | 覆盖平台 |
| --- | --- | --- | --- |
| click | {event: Event, area: string, from?: string} | 点击图片或内容中的蓝链触发<br>area：点击区域，取值 thumbnail \| title \| content<br>from：蓝链类型，取值 search \| link，仅蓝链点击时提供 | PC/Mobile |

