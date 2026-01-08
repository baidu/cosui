## API

### Props

| 名称             | 类型                               | 默认值   | 是否必选 | 说明                                                                              | 支持的平台     |
|----------------|----------------------------------|-------|------|---------------------------------------------------------------------------------|-----------|
| value          | number \| [number, number]        | 0     | 否    | 当前进度百分比                                                                         | PC/Mobile |
| disabled       | boolean                          | false | 否    | 是否禁用                                                                            | PC/Mobile |
| max            | number                           | 100   | 否    | 滑块范围最大值                                                                         | PC/Mobile |
| min            | number                           | 0     | 否    | 滑块范围最小值                                                                         | PC/Mobile |
| step           | number                           | 1     | 否    | 步长                                                                              | PC/Mobile |
| marks          | Record<number, string> \| boolean | false | 否    | 刻度标记, key 的类型必须为 number 且取值在闭区间 [min, max] 内, value 值为刻度说明；为 true 时根据step平均展现刻度 | PC/Mobile |
| range          | boolean                          | false | 否    | 是否开启双滑块模式                                                                       | PC/Mobile |
| tooltip        | boolean                          | true  | 否    | 是否显示 tooltip                                                                    | PC/Mobile |
| value-formatter | (value) => { return value}       | -     | 否    | 设置Tooltip的展示格式，默认显示当前 value 值，不支持动态变更                                           | PC/Mobile |



### Events
|事件|参数|说明|覆盖平台|
|---|---|---|---|
|onChange|{value: number | [number, number]}|值改变时触发|PC/Mobile|
|onChangeComplete|{value: number | [number, number]}|值改变完成后触发；拖拽场景，在松手后触发|PC/Mobile|

### Parts

``` shell
|-- cos-slider
|   |-- cos-slider-rail
|   |-- cos-slider-track
|   |-- cos-slider-handle-left
|   |-- cos-slider-handle-right
|   |-- cos-slider-marks
|   |-- cos-slider-marks-label
```
| 名称                      | 说明            | 支持的平台     |
|-------------------------|---------------|-----------|
| cos-slider              | 组件根节点         | PC/Mobile |
| cos-slider-rail         | 轨道，表示滑块的总可选范围 | PC/Mobile |
| cos-slider-track        | 轨迹，表示滑块已填充的范围 | PC/Mobile |
| cos-slider-handle-left  | 左边手柄          | PC/Mobile |
| cos-slider-handle-right | 右边手柄          | PC/Mobile |
| cos-slider-marks        | 刻度            | PC/Mobile |
| cos-slider-marks-label  | 刻度文字说明        | PC/Mobile |
