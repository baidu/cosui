## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|size|'sm'\|'md'|'sm'|可选|表示标签尺寸大小; <br>'sm' (height:16px)、'md' (height:18px)|PC/Mobile|
|appearance|'filled'\| 'outline'|'filled'|可选|'filled'表示填充型，'outline'表示为线型。不同风格需在Class中添加对应token值。详细见[不同Appearanc下可添加的Tokens](#不同Appearanc下可添加的Tokens)|PC/Mobile|

#### 不同 Appearance 下可添加的 Tokens

|appearance|说明|token|覆盖平台|
|---|---|---|---|
|filled|添加背景颜色|详情参照[token网站](/design-token/cosmic)中的背景色 - bg;<br>当单个字标签的size为'sm'时,需要增加token值cos-space-p-none消除边距，使标签保持正方形|PC/Mobile|
|outline|添加边框颜色、文本颜色|详情参照[token网站](/design-token/cosmic)中的描边色 - border、文本与图标色 - text|PC/Mobile|

### Slots

|名称|说明|覆盖平台|
|---|---|---|
|default|标签文本图标扩展槽位|PC/Mobile|

### Parts

``` shell
|-- cos-tag
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-tag|标签根节点|PC/Mobile|
