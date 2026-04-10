## API

### Props

| 名称   | 类型                  | 默认值 | 是否必选 | 说明                                                                           | 覆盖平台  |
| ------ | --------------------- | ------ | -------- | ------------------------------------------------------------------------------ | --------- |
| items  | [SiteVcard](/components/cosmic-dqa/site-vcard)[]    | []     | 否       | 服务挂载卡片列表  | PC/Mobile |
| folded | FoldedOptions \| false | false  | 否       | 列表展开收起配置，默认为 false 不支持展开收起；传入 FoldedOptions 支持展开收起 | PC/Mobile |

#### FoldedOptions

| 字段         | 类型   | 默认值 | 是否必选 |  说明                 |
| ------------ | ------ | --- | ------- | -------------------- |
| initialCount | number | 2   | 是       |默认展示条数         |
| nextCount    | number | 4   | 是       |每次点击新增展示条数 |

### Events

| 名称       | 参数           | 说明                 | 覆盖平台  |
| ---------- | -------------- | -------------------- | --------- |
| more-click | -              | 展开按钮点击事件     | PC/Mobile |
| click | {index:number} | 挂载组件卡片点击事件 | PC/Mobile |

### Parts

```shell
|-- cosd-site-vcard-list
|   |-- cosd-site-vcard-list-content
|   |   |-- cosd-site-vcard-list-group
|   |   |   |-- cosd-site-vcard-list-item-container
|   |   |   |   |-- cosd-site-vcard-list-item
|   |   |   |   |   |-- cosd-site-vcard
|   |-- cosd-site-vcard-list-fold
