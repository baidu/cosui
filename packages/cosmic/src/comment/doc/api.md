## API

### Props

| 名称       | 类型     | 默认值 | 是否必选 | 说明                                 | 覆盖平台      |
| ---------- | -------- | ------ | -------- | ------------------------------ | ------------- |
| avatar     | string   | -      | 是       | 评论人头像                       | PC / Mobile   |
| author     | Author   | -      | 是       | 评论人信息                        | PC / Mobile  |
| label      | string   | -      | 否       | 图片标签 URL                      | PC / Mobile   |
| reply      | boolean  | false  | 否       | 是否可回复，为 true 时展示回复按钮   | PC / Mobile   |
| like       | Like     | -      | 否       | 点赞信息                          | PC / Mobile   |
| source     | string   | -      | 否       | 内容来源                         | PC / Mobile   |
| link-info  | [LinkInfo](/components/cosmic/link) | -      | 否       | 来源链接                         | PC / Mobile   |
| time       | string   | -      | 否       | 评论时间                         | PC / Mobile   |
| location   | string   | -      | 否       | 评论地区                         | PC / Mobile   |

#### Author

| 名称      | 类型       | 默认值 | 是否必选 | 说明                                                            | 覆盖平台      |
| --------- | ---------- | ------ | -------- | --------------------------------------------------------- | ------------- |
| name      | string     | -      | 是       | 评论者名称                                                  | PC / Mobile   |
| captions  | string[]   | []     | 否       | 评论者描述（最多三个，和评论者标签叠加计算，超出时优先显示描述）     | PC / Mobile   |
| tags      | TagItem[]  | []     | 否       | 评论者标签                                                  | PC / Mobile   |

#### TagItem

| 名称        | 类型    | 默认值                                | 是否必选 | 说明                                      | 覆盖平台      |
| ----------- | ------- | ------------------------------------- | -------- | ----------------------------------------- | ------------- |
| text        | string  | -                                     | 是       | 标签文本                                  | PC / Mobile   |
| appearance  | 'filled' \| 'outline'  | 'filled'                              | 否       | 'filled' 表示填充型，'outline' 表示为线型 | PC / Mobile   |
| class       | string  | 'cos-color-text-tiny cos-tag-color-bg' | 否       | tag 样式，默认灰底黑字                    | PC / Mobile   |

#### Like

| 名称     | 类型     | 默认值  | 说明          | 覆盖平台      |
| ------- | -------- | ------ | ------------ | ------------ |
| active  | boolean  | -      | 是否激活态     | PC / Mobile  |
| text    | string   | -      | 点赞文本      | PC / Mobile  |

### Slots

| 名称     | 说明           | 覆盖平台      |
| -------- | -------------- | ------------- |
| default  | 评论内容插槽   | PC / Mobile   |

### Events

| 名称   | 参数                | 说明                   | 支持的平台    |
| ------ | ------------------ |--------------------- | ------------- |
| reply  | {event: Event} | 点击回复按钮触发        | PC / Mobile   |
| like   | {event: Event} | 点击点赞按钮触发        | PC / Mobile   |

### Parts

```shell
|-- cos-comment
|   |-- cos-comment-header
|   |   |-- cos-comment-header-avatar
|   |   |-- cos-comment-header-author
|   |   |   |-- cos-comment-header-author-name
|   |   |   |-- cos-comment-header-author-caption
|   |   |   |-- cos-comment-header-author-tag
|   |   |-- cos-comment-header-label
|   |-- cos-comment-content
|   |-- cos-comment-footer
|   |   |-- cos-comment-footer-source
|   |   |-- cos-comment-footer-time
|   |   |-- cos-comment-footer-location
|   |   |-- cos-comment-footer-reply
|   |   |-- cos-comment-footer-like
```

| 名称                              | 说明                   | 支持的平台    |
| --------------------------------- | --------------------- | ------------ |
| cos-comment                       | 评论根节点             | PC / Mobile   |
| cos-comment-header                | 评论头部区域节点        | PC / Mobile   |
| cos-comment-header-avatar         | 评论用户头像节点        | PC / Mobile   |
| cos-comment-header-author-name    | 评论用户名称节点        | PC / Mobile   |
| cos-comment-header-author-caption | 评论用户短文本节点      | PC / Mobile   |
| cos-comment-header-author-tags    | 评论用户标签节点        | PC / Mobile   |
| cos-comment-header-label          | 评论标签节点           | PC / Mobile   |
| cos-comment-content               | 评论内容节点           | PC / Mobile   |
| cos-comment-footer                | 评论底部节点           | PC / Mobile   |
| cos-comment-footer-source         | 评论内容来源节点        | PC / Mobile   |
| cos-comment-footer-time           | 评论时间节点           | PC / Mobile   |
| cos-comment-footer-location       | 评论地区节点           | PC / Mobile   |
| cos-comment-footer-reply          | 评论回复按钮节点        | PC / Mobile   |
| cos-comment-footer-like           | 评论点赞区域节点        | PC / Mobile   |
