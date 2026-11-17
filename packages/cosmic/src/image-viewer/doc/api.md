## API

ImageViewer 采用全局单例模式，同一时间只存在一个图片查看器实例。不能通过模板挂载，通过暴露的静态方法进行调用。

### Props

本组件无实例 Props，全部配置通过 `ImageViewer.open(options)` 的 [`ImageViewerOptions`](#imagevieweroptions) 传入。

### Methods

| 名称 | 参数 | 描述 |
| --- | --- | --- |
| open | `(options: ImageViewerOptions) => void` | 打开图片查看器；已打开时直接替换当前数据 |
| close | `() => void` | 关闭当前图片查看器 |
| goTo | `(index: number) => void` | 切换到指定下标的图片 |

#### ImageViewerOptions

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 覆盖平台 |
| --- | --- | --- | --- | --- | --- |
| items | `ImageViewerItem[]` | - | 是 | 图片列表，至少包含一项 | PC |
| activeIndex | `number` | `0` | 否 | 打开时默认展示的图片下标 | PC |
| outsideClosable | `boolean` | `true` | 否 | 点击蒙层是否关闭查看器 | PC |
| closeOnEsc | `boolean` | `true` | 否 | 按下 Esc 是否关闭查看器 | PC |
| zoom | `ImageViewerZoomOptions` | - | 否 | 缩放参数配置 | PC |
| onChange | `(detail: ImageViewerChangeEventDetail) => void` | - | 否 | 当前图片切换后的回调 | PC |
| onZoom | `(detail: ImageViewerZoomEventDetail) => void` | - | 否 | 缩放变化后的回调，仅用于打点，不影响缩放行为 | PC |
| onSourceClick | `(detail: ImageViewerEventDetail) => void` | - | 否 | 点击来源跳转按钮的回调，仅用于打点，不影响跳转行为 | PC |
| onDownload | `(detail: ImageViewerEventDetail) => void` | - | 否 | 点击下载按钮的回调，仅用于打点，不影响下载行为 | PC |
| onClose | `(detail: ImageViewerEventDetail) => void` | - | 否 | 查看器关闭后的回调 | PC |

#### ImageViewerItem

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 覆盖平台 |
| --- | --- | --- | --- | --- | --- |
| src | `string` | - | 是 | 原图地址 | PC |
| thumbnail | `string` | `src` | 否 | 底部缩略图地址, 默认使用图片地址 | PC |
| alt | `string` | `''` | 否 | 图片替代文本 | PC |
| width | `number` | - | 否 | 图片原始宽度，单位 px | PC |
| height | `number` | - | 否 | 图片原始高度，单位 px | PC |
| source | `ImageViewerSource` | - | 否 | 图片来源及页面跳转信息；未传时不展示左上角来源区域 | PC |

#### ImageViewerSource

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 覆盖平台 |
| --- | --- | --- | --- | --- | --- |
| linkInfo | [LinkInfo](/components/cosmic/link) | - | 是 | 挂载在 a 标签上的跳转链接属性集，字段结构同 link 组件；未提供时整个来源区域不展示 | PC |
| title | `string` | - | 否 | 左上角展示的网站或页面标题；未提供时不展示标题部分 | PC |
| actionText | `string` | `'查看原网页'` | 否 | 跳转按钮文字 | PC |

#### ImageViewerZoomOptions

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 覆盖平台 |
| --- | --- | --- | --- | --- | --- |
| min | `number` | `10` | 否 | 缩放最小百分比 | PC |
| max | `number` | `400` | 否 | 缩放最大百分比 | PC |
| step | `number` | `10` | 否 | 放缩按钮单次缩放步长 | PC |
| initial | `number` | `100` | 否 | 图片默认展示的缩放百分比 | PC |

#### ImageViewerEventDetail

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 覆盖平台 |
| --- | --- | --- | --- | --- | --- |
| index | `number` | - | 是 | 事件触发时展示的图片下标 | PC |
| item | `ImageViewerItem` | - | 是 | 事件触发时展示的图片数据 | PC |

#### ImageViewerChangeEventDetail

在 `ImageViewerEventDetail` 基础上追加：

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 覆盖平台 |
| --- | --- | --- | --- | --- | --- |
| source | `'thumbnail' \| 'navigation' \| 'keyboard' \| 'method'` | - | 是 | 触发切换的来源：底部缩略图点击 / 左右切换按钮 / 键盘 ArrowLeft、ArrowRight / 外部调用 `ImageViewer.goTo` | PC |

#### ImageViewerZoomEventDetail

在 `ImageViewerEventDetail` 基础上追加：

| 名称 | 类型 | 默认值 | 是否必选 | 说明 | 覆盖平台 |
| --- | --- | --- | --- | --- | --- |
| zoom | `number` | - | 是 | 变化后的缩放百分比 | PC |
| source | `'button' \| 'wheel'` | - | 是 | 触发缩放的来源：工具栏 +/- 按钮 / Ctrl + 滚轮 | PC |

### Parts

```shell
|-- cos-image-viewer
|   |-- cos-image-viewer-source
|   |-- cos-image-viewer-header-actions
|   |   |-- cos-image-viewer-counter
|   |   |-- cos-image-viewer-close
|   |-- cos-image-viewer-stage
|   |   |-- cos-image-viewer-image
|   |-- cos-image-viewer-navigation
|   |   |-- cos-image-viewer-previous
|   |   |-- cos-image-viewer-next
|   |-- cos-image-viewer-toolbar
|   |   |-- cos-image-viewer-download
|   |   |-- cos-image-viewer-zoom
|   |-- cos-image-viewer-thumbnails
|       |-- cos-image-viewer-thumbnail-list
|           |-- cos-image-viewer-thumbnail
```

| 名称 | 说明 | 支持的平台 |
| --- | --- | --- |
| cos-image-viewer | 查看器根节点（含全屏蒙层） | PC |
| cos-image-viewer-source | 左上角来源信息胶囊 | PC |
| cos-image-viewer-header-actions | 右上角操作区容器 | PC |
| cos-image-viewer-counter | 图片计数器胶囊 | PC |
| cos-image-viewer-close | 关闭按钮 | PC |
| cos-image-viewer-stage | 中央图片展示区 | PC |
| cos-image-viewer-image | 当前展示的图片元素 | PC |
| cos-image-viewer-navigation | 左右翻页按钮基类 | PC |
| cos-image-viewer-previous | 上一张按钮 | PC |
| cos-image-viewer-next | 下一张按钮 | PC |
| cos-image-viewer-toolbar | 右下角工具栏容器 | PC |
| cos-image-viewer-download | 下载按钮 | PC |
| cos-image-viewer-zoom | 缩放控件胶囊 | PC |
| cos-image-viewer-thumbnails | 底部缩略图滚动容器 | PC |
| cos-image-viewer-thumbnail-list | 缩略图列表内容层 | PC |
| cos-image-viewer-thumbnail | 单张缩略图项，选中态复合类 `cos-image-viewer-thumbnail-active` | PC |
