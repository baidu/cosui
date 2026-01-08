```san export=preview caption=基本示例
import {Component} from 'san';
import TransportTicket from '@cosui/cosmic-dqa/transport-ticket';

export default class DefaultDemo extends Component {
    static template = `
        <div>
            <h3>火车票</h3>
            <cosd-transport-ticket s-bind="{{trainData}}"/>
            <h3>飞机票</h3>
            <cosd-transport-ticket s-bind="{{flightData}}"/>
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
                crossDays: 1, // 行程跨越天数
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
            }
        };
    }
}
```