## API

### Props

| 名称                | 类型                | 默认值                  | 是否必选 | 说明                               | 覆盖平台      |
|-------------------|-------------------|----------------------|------|----------------------------------|-----------|
| content           | string            | -                    | 可选   | 气泡内容                             | PC/Mobile |
| disabled          | boolean           | false                | 可选   | 是否禁用弹出提示                         | PC/Mobile |
| open-delay         | number            | 0                    | 可选   | 延迟出现的时间                          | PC/Mobile |
| close-delay        | number            | 0                    | 可选   | 延迟消失的时间                          | PC/Mobile |
| position          | 'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end' | 'top' | 可选   | 气泡展示位置                           | PC/Mobile |
| trigger           | 'hover' \| 'click' \| 'custom' | PC：hover; wise：click | 可选   | 触发展示的时机                          | PC/Mobile |
| open              | boolean           | false                | 可选   | 是否展示气泡，仅在 trigger 为 'custom' 时生效 | PC/Mobile |
| get-popup-container | () => HTMLElement | document.body | 可选 | 指定父级 DOM，弹层将会渲染至该 DOM,该节点需要设置 position: relative  | PC/Mobile |
| bubble-class | string | ''       | 可选   | 气泡类名;使用场景：业务想要自定义挂载在 body 上气泡的气泡样式 | PC/Mobile |

### Slots

|名称|说明|覆盖平台|
|---|---|---|
|default|气泡瞄点指向内容|PC/Mobile|
|content|自定义气泡内容|PC/Mobile|

### Parts

``` shell
|-- cos-tooltip
|   |-- cos-tooltip-trigger
|   |   |-- cos-tooltip-content
|   |   |-- cos-tooltip-arrow
```

| 名称                    | 说明      | 覆盖平台     |
|-----------------------|---------|-----------|
| cos-tooltip           | 组件根节点   | PC/Mobile |
| cos-tooltip-trigger | 气泡容器节点  | PC/Mobile |
| cos-tooltip-content   | 气泡内容节点  | PC/Mobile |
| cos-tooltip-arrow     | 气泡小三角节点 | PC/Mobile |

### Events

| 事件          | 参数                                               | 说明                      | 覆盖平台      |
|-------------|--------------------------------------------------|-------------------------|-----------|
| toggle     | {event: Event,open:boolean} | 弹出层展示/隐藏时触发的回调                 | PC/Mobile |

### Methods

|名称|返回值类型|说明|覆盖平台|
|---|---|---|---|
|updatePosition()|-|更新气泡位置；适用于气泡保持展现，气泡指向元素位置发生变化，需要重新计算气泡位置的场景|PC/Mobile|
