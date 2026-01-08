## API

### Props
|名称|类型|初始值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
| type  | 'line' \| 'pie' \| 'bar' | 'bar' | 是 | 图表类型，可选值：<br>• 'line'：折线图<br>• 'pie'：饼图<br>• 'bar'：柱状图 | PC/Mobile |
| option  | EChartsOption | {} | 是 | 图表的初始配置，配置参数同 [ECharts配置项](https://echarts.apache.org/zh/option.html#title) <br />**注意事项：** <br /> (1)不支持（除 tooltip.formatter，非 ssr 场景使用）函数类型的配置项，比如各种 formatter <br />(2)不支持跳转 <br />(3)不支持 使用 concat($prevData.key, key) 的追加式方式更新 option 数据 <br/> (4)不支持 series 里有不同类型的 type（比如 line bar 混合）| PC/Mobile |

### Events
|事件|参数|说明|覆盖平台|
|---|---|---|---|
|render-finished|/|图表渲染完成事件|PC/Mobile|

### Methods
|方法名|类型|说明|
|---|---|---|
|getEchartsInstance|() => [ECharts](https://echarts.apache.org/zh/api.html#echartsInstance)|获取 echarts 实例，可调用 echarts 方法自定义事件|
