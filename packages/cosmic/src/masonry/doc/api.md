## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|items|MasonryItem[]|[]|是|资源列表数据|PC/Mobile|
|column-count|number|2|否|瀑布流列数|PC/Mobile|
|gutter|number \| [number, number]|2|否|间距，可以是固定值或水平垂直间距配置|PC/Mobile|
|container-width|number|0|是|图片容器宽度|PC/Mobile|

#### MasonryItem

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|columnIndex|number \| undefined|undefined|否|自定义所在列|PC/Mobile|
|width|number|0|是|元素宽度|PC/Mobile|
|height|number|0|是|元素高度|PC/Mobile|

### Slots

|名称|说明|覆盖平台|
|---|---|---|
|default|默认插槽，填充瀑布流元素。<br />通过slot可以获取到item（元素数据）、position（当前元素位置）、columnIndex（当前列数）、rowIndex（当前元素在所处列的第几项）|PC/Mobile|

### Parts

``` shell
|-- cos-masonry
|   |-- cos-masonry-container
|   |   |-- cos-masonry-container-item
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-masonry|根节点|PC/Mobile|
|cos-masonry-container|容器节点|PC/Mobile|
|cos-masonry-container-item|单个元素|PC/Mobile|

### Events
无
