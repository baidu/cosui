```san export=preview caption=自定义icon
import {Component} from 'san';
import Empty from '@cosui/cosmic/empty';
import './action.less';

export default class Demo extends Component {
    static template = `
        <div class="empty-demo">
            <h4>使用url(卡内）</h4>
            <cos-empty
                title="{{title}}"
                icon="{{iconUrlCard}}"
            />
            <h4>使用url(页面）</h4>
            <cos-empty
                title="{{title}}"
                size="md"
                icon="{{iconUrlPage}}"
            />
            <h4>使用图标名称</h4>
            <cos-empty
                title="{{title}}"
                icon="{{iconName}}"
            />
        </div>
    `;

    static components = {
        'cos-empty': Empty
    };

    initData() {
        return {
            title: '标题内容',
            iconUrlCard: 'https://gips3.baidu.com/it/u=3536834047,4167844174&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f181_180',
            iconUrlPage: 'https://gips3.baidu.com/it/u=2860519354,1415237495&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f361_270',
            iconName: 'baidu'
        };
    }
}
```