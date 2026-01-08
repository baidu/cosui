## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|avatar|string|''|否|作者头像信息|PC/Mobile|
|name|string|''|是|作者名称|PC/Mobile|
|caption|string[]|[]|否|作者名称下短文本集|PC/Mobile|
|link-info|[LinkInfo](/components/cosmic/link)|-|否|跳转所需的参数|PC/Mobile|
|tag|string|''|否|标签信息|PC/Mobile|


### Parts
``` shell
|-- cosd-author-card
|   |-- cosd-author-card-avatar
|   |-- cosd-author-card-content
|   |   |-- cosd-author-card-content-name
|   |   |   |-- cosd-author-card-content-name-text
|   |   |   |-- cosd-author-card-content-tag
|   |   |-- cosd-author-card-content-abstract
```
