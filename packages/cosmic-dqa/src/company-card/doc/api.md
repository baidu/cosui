## API

### Props

|名称|类型|默认值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
|level|'normal' \| 'standard' \| 'intermediate' \| 'premium'|''|否|企业认证等级|PC/Mobile|
|name|string|''|是|公司名称|PC/Mobile|
|logo|string|''|否|名片logo，链接或文字|PC/Mobile|
|legal-person|string|''|否|法定代表人|PC/Mobile|
|registered-capital|string|''|否|注册资本|PC/Mobile|
|tags|string[]|''|否|标签信息|PC/Mobile|
|link-info|[LinkInfo](/components/cosmic/link)|-|否|跳转所需的参数|PC/Mobile|



### Parts
``` shell
|-- cosd-company-card-container
|   |-- cosd-company-card
|   |   |-- cosd-company-card-box
|   |   |   |-- cosd-company-card-box-content
|   |   |   |   |-- cosd-company-card-box-content-label
|   |   |   |   |-- cosd-company-card-box-content-name
|   |   |   |   |-- cosd-company-card-box-content-legal-person
|   |   |   |   |-- cosd-company-card-box-content-registered-capital
|   |   |   |   |-- cosd-company-card-box-content-tags
|   |   |   |   |   |-- cosd-company-card-box-content-tags-item
|   |   |   |-- cosd-company-card-box-logo
|   |   |   |   |-- cosd-company-card-box-logo-mount
|   |   |   |   |   |-- cosd-company-card-box-logo-mount-img
|   |   |   |   |   |-- cosd-company-card-box-logo-mount-logoword
|   |   |   |   |   |   |-- cosd-company-card-box-logo-mount-logoword-text
```
