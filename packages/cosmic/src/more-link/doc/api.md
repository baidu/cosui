## API

### Props

|名称|类型|默认值|说明|覆盖平台|
|---|---|---|---|---|
|appearance|'subtle' \| 'filled' \| 'plain' \| 'line'|'subtle'|样式风格|PC/Mobile|
|url|string|-|跳转链接地址|PC/Mobile|
|target|'_blank' \| '_self'|''|跳转打开方式|PC/Mobile|
|link-info|[LinkInfo](/components/cosmic/link)|{}|自定义挂载属性集(搜索结果页场景传linkAttries)|PC/Mobile|

### Slots

|名称|说明|覆盖平台|
|---|---|---|
|default|默认槽位，不填展示查看更多|PC/Mobile|

### Parts

```shell
|-- cos-more-link
|   |-- cos-more-link-text
|   |-- cos-more-link-icon

```

|名称|说明|覆盖平台|
|---|---|---|
|cos-more-link|根层|PC/Mobile|
|cos-more-link-text|文案默认槽位|PC/Mobile|
|cos-more-link-icon|文案后图标|PC/Mobile|
