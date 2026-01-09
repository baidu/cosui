```san export=preview caption=基本示例
import {Component} from 'san';
import TransportTicket from '@cosui/cosmic-dqa/transport-ticket';

export default class DefaultDemo extends Component {
    static template = `
        <div>
            <h3>火车票</h3>
            <cosd-transport-ticket s-bind="{{trainData}}"/>
            
            <h3>火车票 - 中转</h3>
            <cosd-transport-ticket s-bind="{{trainTransferData}}"/>
            
            <h3>飞机票</h3>
            <cosd-transport-ticket s-bind="{{flightData}}"/>
            
            <h3>飞机票 - 中转</h3>
            <cosd-transport-ticket s-bind="{{flightTransferData}}"/>
        </div>
    `;

    static components = {
        'cosd-transport-ticket': TransportTicket
    };

    initData() {
        return {
            trainData: {
                type: 'train',
                from: '出发站',
                to: '到达站',
                departTime: '19:55',
                arriveTime: '22:50',
                duration: '2时55分', // 总耗时
                price: 980,
                number: 'X123', // 班次号
                seats: [ // 火车票必须有
                    {
                        type: '一等座',
                        remaining: '剩余21张'
                    },
                    {
                        type: '二等座',
                        remaining: '有座'
                    },
                    {
                        type: '商务',
                        remaining: '剩余21张'
                    },
                    {
                        type: '无座',
                        remaining: '剩余21张'
                    }
                ],
                linkInfo: {
                    href: 'https://www.baidu.com', // 跳转链接
                },
                service: '携程旅行'
            },
            trainTransferData: {
                type: 'train',
                from: '北京',
                to: '深圳',
                departTime: '08:00',
                arriveTime: '20:30',
                duration: '12时30分',
                price: 1580,
                crossDays: 1, // 跨天标识
                transfer: {
                    station: '武汉',
                    waitTime: '换乘2小时15分',
                    segments: [
                        {
                            number: 'G618',
                            operator: '中国铁路',
                            seats: [
                                {
                                    type: '二等座',
                                    remaining: '有票'
                                }
                            ]
                        },
                        {
                            number: 'G2318',
                            operator: '中国铁路',
                            seats: [
                                {
                                    type: '二等座',
                                    remaining: '有票'
                                }
                            ]
                        }
                    ]
                },
                linkInfo: {
                    href: 'https://www.baidu.com',
                },
                service: '携程旅行'
            },
            flightData: {
                type: 'flight',
                from: '出发站',
                to: '到达站',
                departTime: '19:55',
                arriveTime: '22:50',
                duration: '2时55分', // 总耗时
                price: 980,
                operator: 'xx航空', // 运营商
                number: 'XX1234', // 班次号
                level: '经济舱', // 舱位等级
                discount: '4.9折', // 飞机票折扣描述
                model: '波音737（中）', // 机型
                linkInfo: {
                    href: 'https://www.baidu.com', // 跳转链接
                },
                service: '携程旅行'
            },
            flightTransferData: {
                type: 'flight',
                from: '首都机场T2',
                to: '佛罗伦萨',
                departTime: '06:10',
                arriveTime: '12:09',
                duration: '1天2时45分',
                price: 7896,
                crossDays: 2, // 跨天标识
                level: '经济舱',
                discount: '4.9折',
                transfer: {
                    station: '巴黎',
                    waitTime: '停12时10分',
                    segments: [
                        {
                            number: 'CA939',
                            operator: '马来西亚航空'
                        },
                        {
                            number: 'AF1066',
                            operator: '马来西亚航空'
                        }
                    ]
                },
                linkInfo: {
                    href: 'https://www.baidu.com',
                },
                service: '携程旅行'
            }
        };
    }
}
```