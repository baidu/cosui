## API

### Props

| 名称              | 类型      | 默认值   | 说明                                   | 覆盖平台    |
|--------------------|---------|-------|--------------------------------------|---------|
| open            | boolean | false | 弹窗是否打开                               | PC/Wise |
| title              | string  | '标题'  | 标题文字                                 | PC/Wise |
| headless           | boolean | false | 是否不显示标题；当为 true 时，视为开启异形模式，内容区不再预留间距 | PC/Wise |
| footless           | boolean | false | 是否不显示底部操作区                           | PC/Wise |
| ok-text             | string  | '确定'  | 确定按钮文字，无内容时不显示                       | PC/Wise |
| cancel-text         | string  | '取消'  | 取消按钮文字，无内容时不显示                       | PC/Wise |
| custom-behavior-text | string  | -     | customBehavior 按钮文字，无内容时不显示          | PC/Wise |
| closable           | boolean | false  | 是否显示关闭按钮                             | PC/Wise |
| outside-closable    | boolean | false | 蒙层是否点击可关闭                            | PC      |
| appearance    | 'info' \|'success' \| 'warning' \| 'error' | - | 弹窗类型                            | PC      |

### Slots

| 名称      | 描述    | 说明    | 覆盖平台    |
|---------|-------|---------|---------|
| default | 弹窗内容区 || PC/Wise |
| title   | 标题    |title 为空，且 headless 为 false 时使用| PC/Wise |

### Parts

``` shell
|-- cos-dialog
|   |-- cos-dialog-mask
|   |-- cos-dialog-container
|   |   |-- cos-dialog-header
|   |   |-- cos-dialog-body(default slot)
|   |   |-- cos-dialog-footer
|   |   |-- cos-dialog-close
```

| 名称        | 说明         | 覆盖平台    |
|-----------|------------|---------|
| cos-dialog | 弹层根节点      | PC/Wise |
| cos-dialog-mask   | 弹层蒙层节点     | PC/Wise |
| cos-dialog-container| 弹层容器节点    | PC/Wise |
| cos-dialog-body   | 弹层主体内容节点   | PC/Wise |
| cos-dialog-header | 弹层主体头部节点   | PC/Wise |
| cos-dialog-footer | 弹层主体操作按钮节点 | PC/Wise |
| cos-dialog-close  | 弹层关闭图标节点   | PC/Wise |

## Events
| 事件             | 类型            | 说明                    | 覆盖平台    |
|----------------|---------------|-----------------------|----------- |
| close          | {event: Event} | 关闭事件                  | PC/Wise |
| cancel         | {event: Event} | 取消按钮点击事件              | PC/Wise |
| ok             | {event: Event} | 确认按钮点击事件              | PC/Wise |
| customBehavior | {event: Event} | customBehavior 按钮点击事件 | PC/Wise |
