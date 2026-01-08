```san export=preview caption=基本示例
import {Component} from 'san';
import AgentCard from '@cosui/cosmic-dqa/agent-card';

export default class DefaultDemo extends Component {
    static template = `
        <div style="width: 154px">
            <cosd-agent-card s-bind="{{data}}"/>
        </div>
    `;

    static components = {
        'cosd-agent-card': AgentCard
    };

    initData() {
        return {
            data: {
                thumbnail: 'https://gips3.baidu.com/it/u=3222184251,2983510222&fm=3028&app=3028&f=JPEG&fmt=auto&q=75&size=f1138_640',
                title: '婚姻咨询专家阿春',
                caption: '1840人咨询过',
                linkInfo: {
                    href: 'https://www.baidu.com',
                    target: '_blank'
                },
                actionText: '去咨询'
            }
        };
    }
}
```