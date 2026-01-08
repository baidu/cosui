## API

### Props

|名称|类型|初始值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
| members  | Member[] | [] | 是 | 人物信息 | PC/Mobile |
| overscroll-link-info  | [LinkInfo](/components/cosmic/link) | - | 否 | 查看更多的跳转信息 | PC/Mobile |

#### Member
|名称|类型|初始值|是否必选|说明|覆盖平台|
|---|---|---|---|---|---|
| avatar  | string | - | 是 | 人物头像 | PC/Mobile |
| avatarShape  | '' \| 'circle' | - | 否 | 人物头像形状，'circle'时为圆角头像，不传时为方形头像 | PC/Mobile |
| relation  | string | - | 是 | 词条关系名，如：”队友“，"妻子" | PC/Mobile |
| name  | string | - | 是 | 人物名字 | PC/Mobile |
| linkInfo  | [LinkInfo](/components/cosmic/link) | - | 否 | 人物跳转信息 | PC/Mobile |

### Slots
无

### Parts

``` shell
|-- cosd-relationship
|   |-- cos-swiper
|   |-- |-- cos-swiper-item
|   |-- |-- |-- cosd-relationship-member
|   |-- |-- |-- |-- cosd-relationship-member-separator
|   |-- |-- |-- |-- cosd-relationship-member-box
|   |-- |-- |-- |-- |-- cos-avatar
|   |-- |-- |-- |-- |-- cosd-relationship-member-relation
|   |-- |-- |-- |-- |-- cosd-relationship-member-name
|   |-- |-- cos-swiper-item
|   |-- |-- |-- cosd-relationship-overscroll-text
|   |-- |-- |-- cosd-relationship-overscroll-icon
```
|名称|说明|覆盖平台|
|---|---|---|
|cosd-relationship|根节点|PC/Mobile|
|cosd-relationship-member| 全部成员区域 |PC/Mobile|
|cosd-relationship-member-separator|成员之间的线条|PC/Mobile|
|cosd-relationship-member-box|每个成员项|PC/Mobile|
|cosd-relationship-member-relation|成员关系|PC/Mobile|
|cosd-relationship-member-name|成员名称|PC/Mobile|
|cosd-relationship-overscroll-text|查看更多文本|PC/Mobile|
|cosd-relationship-overscroll-icon|查看更多 icon|PC/Mobile|


### Events

|事件|参数|说明|覆盖平台|
|---|---|---|---|
| click | {event: Event, from: 'more/member'} | 点击事件，通过 from 区分点击区域 |PC/Mobile|
|scrollend|[SwiperEvents](/components/cosmic/swiper)|滑动结束时触发|Mobile|
