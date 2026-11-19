<!-- @file EntityList 属性和节点说明 -->

## API

### Props

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 覆盖平台 |
| --- | --- | --- | --- | --- | --- |
| items | EntityCardProps[]，属性同 [EntityCard 组件](/components/cosmic-dqa/entity-card) | [] | 是 | 实体列表数据 | PC/Mobile |

### Parts

```text
cosd-entity-list
└── cosd-entity-list-item(cosd-entity-card)
    ├── cosd-entity-card-thumbnail
    └── cosd-entity-card-body
        ├── cosd-entity-card-title
        └── cosd-entity-card-content
```

| 名称 | 说明 | 覆盖平台 |
| --- | --- | --- |
| cosd-entity-list | 列表根节点 | PC/Mobile |
| cosd-entity-list-item | 列表项，与 [EntityCard](/components/cosmic-dqa/entity-card) 一致 | PC/Mobile |
| cosd-entity-card | 实体卡片根节点 | PC/Mobile |
| cosd-entity-card-thumbnail | 图片区域 | PC/Mobile |
| cosd-entity-card-body | 右侧内容区域 | PC/Mobile |
| cosd-entity-card-title | 标题区域 | PC/Mobile |
| cosd-entity-card-content | 描述区域 | PC/Mobile |

### Events

| 名称 | 参数 | 说明 | 覆盖平台 |
| --- | --- | --- | --- |
| click | {event: Event, index: number, area: string, from?: string} | 点击图片或内容区蓝链触发，参数参考[EntityCard](/components/cosmic-dqa/entity-card) | PC/Mobile |
