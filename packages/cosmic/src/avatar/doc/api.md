## API

### Props

| 名称          | 类型     | 默认值 | 是否必选| 说明                   |	覆盖平台|
|-------------|--------|-----|--------|------------------------|-----------|
| src         | string |  '' |必选| 头像图像的地址               |PC/Mobile |
| alt         | string |  '' |可选| 图像无法显示时的替代文本       |PC/Mobile |
| size        | 'xs' \| 'sm' \| 'md'| 'md' |可选| 头像尺寸                    |PC/Mobile |
| placeholder | string | '' |可选| 用于图像还没加载完成时展示 |PC/Mobile |
| fallback | string |  [默认头像](https://gips2.baidu.com/it/u=182824533,4089501659&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f40_40) |可选| 用于图像加载失败时展示 |PC/Mobile |

##### size 规格

| 规格 | 参数（PC/Mobile）       |
|----|-------------------------|
| xs | `width: 16px; height: 16px;` |
| sm | `width: 24px; height: 24px;` |
| md | `width: 40px; height: 40px;` |

### Parts

``` shell
|-- cos-avatar
|   |-- cos-avatar-placeholder
|   |-- cos-avatar-img
```

|名称|说明|覆盖平台|
|---|---|---|
|cos-avatar|头像根节点|PC/Mobile|
|cos-avatar-placeholder|占位节点|PC/Mobile|
|cos-avatar-img|头像图片节点|PC/Mobile|
