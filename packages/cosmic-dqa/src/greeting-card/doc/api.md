# API

## Props

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 支持的平台 |
|------|------|--------|----------|------|-----------|
| avatar | string | '' | 是 | 头像图片url | Mobile/PC |
| title | string | '' | 否 | 打招呼标题 | Mobile/PC |
| content | string | '' | 否 | 打招呼内容 | Mobile/PC |
| appearance | 'card' \| 'filled' | 'card' | 否 | 卡片样式 | Mobile/PC |
| voice | ButtonItem | null | 否 | 语音按钮数据 | Mobile/PC |
| video | ButtonItem | null | 否 | 视频按钮数据 | Mobile/PC |

### ButtonItem

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 支持的平台 |
|------|------|--------|----------|------|-----------|
| icon | string | '' | 是 | 按钮icon，传 icon name 或图片 url | Mobile/PC |
| text | string | '' | 否 | 按钮文本 | Mobile/PC |
| linkInfo | [LinkInfo](/components/cosmic/link) | null | 否 |自定义挂载属性集(支持JS未ready前跳转点击) | Mobile/PC |

## Slots

|名称|说明|
|---|---|
|default|头像扩展槽位|

## Events

| 名称 | 参数 | 说明 | 覆盖平台 |
|------|------|------|------|
| voice-click | {event: MouseEvent} | 语音按钮点击 | Mobile/PC |
| video-click | {event: MouseEvent} | 视频按钮点击 | Mobile/PC |

## Parts

```
|-- cosd-greeting-card
    |-- cosd-greeting-card-container-card
        |-- cosd-greeting-card-container-card-wrapper
            |-- cosd-greeting-card-avatar-wrapper
            |-- cosd-greeting-card-body
                |-- cosd-greeting-card-body-text
                    |-- cosd-greeting-card-body-text-title
                    |-- cosd-greeting-card-body-text-content
                |-- cosd-greeting-card-body-action-btns
                    |-- cosd-greeting-card-body-action-btn
```