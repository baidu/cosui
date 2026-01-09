## API

### Props

| 名称        | 类型     | 默认值 | 是否必选 | 说明                                      | 覆盖平台     |
|-------------|----------|--------|----------|-------------------------------------------|--------------|
| type        | string   | 'train'      | 是       | train \| flight 车票类型，目前支持火车票和机票 | PC/Mobile    |
| from        | string   | ''     | 是       | 行程起点                                   | PC/Mobile    |
| to          | string   | ''      | 是       | 行程终点                                   | PC/Mobile    |
| departTime  | string   | ''      | 是       | 出发时间                                   | PC/Mobile    |
| arriveTime  | string   | ''      | 是       | 结束时间                                   | PC/Mobile    |
| duration    | string   | ''      | 否       | 行程总时间                                 | PC/Mobile    |
| price       | number   | 0      | 是       | 价格                                       | PC/Mobile    |
| operator    | string   | ''      | 否       | 运营商，如 "厦门航空"                      | PC/Mobile    |
| number      | string   | ''      | 否       | 班次号，如 "MF4714"、"G419"                | PC/Mobile    |
| level       | string   | ''      | 否       | 舱位等级                                   | PC/Mobile    |
| discount    | string   | ''      | 否       | 舱位折扣，比如 "4.9折"                     | PC/Mobile    |
| model       | string   | ''      | 否       | 机型，比如 "波音737(中)"                   | PC/Mobile    |
| seats       | Seat[]   | []      | 否       | 可选座位                                   | PC/Mobile    |
| linkInfo    | [LinkInfo](/components/cosmic/link) | -      | 否       | 跳转链接                                   | PC/Mobile    |
| service     | string   | -       | 否       | 服务平台                                   | PC/Mobile    |
| transfer    | Transfer | -       | 否       | 中转信息                                   | PC/Mobile    |
| crossDays   | number   | 0       | 否       | 行程跨越天数                               | PC/Mobile    |


#### Seat

| 名称      | 类型   | 默认值 | 是否必选 | 说明     | 支持的平台  |
|-----------|--------|--------|----------|----------|------------|
| type      | string | -      | 是       | 座位等次 | PC/Mobile  |
| remaining | string | -      | 是       | 剩余车票 | PC/Mobile  |

#### Transfer

| 名称      | 类型      | 默认值 | 是否必选 | 说明                           | 支持的平台  |
|-----------|-----------|--------|----------|--------------------------------|------------|
| station   | string    | -      | 是       | 中转站                         | PC/Mobile  |
| waitTime  | string    | -      | 是       | 换乘等待时间，如 "换乘3小时23分" | PC/Mobile  |
| segments  | Segment[] | -      | 是       | 中转车次/航次数组               | PC/Mobile  |

#### Segment

| 名称      | 类型   | 默认值 | 是否必选 | 说明                           | 支持的平台  |
|-----------|--------|--------|----------|--------------------------------|------------|
| number    | string | -      | 是       | 班次号，如 "MF4714"、"G419"    | PC/Mobile  |
| operator  | string | -      | 否       | 运营商，如 "厦门航空"           | PC/Mobile  |
| seats     | Seat[] | -      | 否       | 可选座位                       | PC/Mobile  |

### Parts
```shell
|-- cosd-transport-ticket
|   |-- cosd-transport-ticket-info
|   |   |-- cosd-transport-ticket-info-from
|   |   |-- cosd-transport-ticket-info-duration
|   |   |-- cosd-transport-ticket-info-to
|   |   |-- cosd-transport-ticket-info-price
|   |-- cosd-transport-ticket-seats
|   |-- cosd-transport-ticket-desc
|   |-- cosd-transport-ticket-transfer
```
