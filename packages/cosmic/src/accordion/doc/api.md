## API

### Props

#### Accordion

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 覆盖平台 |
|---|---|---|---|---|---|
| multiple | boolean | true | 可选 | 是否允许同时存在多个展开的面板 | PC/Mobile |
| value | string \| string[] | '' | 可选 | 展开的列表项。取值为某一子列表项的标识符或标识符的集合。multiple=false 时为 string，multiple=true 时为 string[] | PC/Mobile |

#### AccordionPanel
| 名称      | 类型    | 默认值 | 是否必选 | 说明                  |	 覆盖平台   |
|----------|--------|-------|-------- |-----------------------|-----------|
| value    | string |   -   |  必选    | 每一个折叠项的唯一标识符  | PC/Mobile |
| title    | string |   -   |  可选   | 标题栏文本             | PC/Mobile |

### Slots
提供独立的 AccordionPanel ，用户自行通过插槽完成内容定制。

#### Accordion
| 名称 | 说明 | 覆盖平台 |
|---------|------------------------------| ------ |
| default | Accordion 内容插槽，填充内容区域 | PC/Mobile |

#### AccordionPanel
| 名称 | 说明 | 覆盖平台 |
|-----|------|--------|
| header  | AccordionPanel 标题插槽，填充单条折叠面板标题文字区域（不包含右侧 icon） | PC/Mobile |
| default | AccordionPanel 内容插槽，自定义单条折叠面板内容区域  | PC/Mobile |

### Events
| 事件 | 参数 | 说明 | 覆盖平台 |
|-----|-----|-----|----------|
| change | {value: string, expanded: boolean, event: Event } | 单条面板折叠/展开事件 | PC/Mobile |

### Parts

``` shell
|-- cos-accordion
|   |-- cos-accordion-panel
|   |   |-- cos-accordion-panel-header
|   |   |   |-- cos-accordion-panel-header-text
|   |   |   |-- cos-accordion-panel-header-icon
|   |   |-- cos-accordion-panel-content
```
