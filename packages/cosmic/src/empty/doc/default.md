```san export=preview caption=常用样式
import {Component} from 'san';
import Empty from '@cosui/cosmic/empty';
import './action.less';

export default class Demo extends Component {
    static template = `
        <div class="empty-demo">
            <h4>卡内空状态（size为sm）</h4>
            <cos-empty
                title="{{title}}"
            />
            <br/>
            <cos-empty
                title="{{title}}"
                description="{{description}}"
            />
            <h4>空页面（size为md）</h4>
            <cos-empty
                size="md"
                title="{{title}}"
            />
            <br/>
            <cos-empty
                size="md"
                title="{{title}}"
                description="{{description}}"
            />
        </div>
    `;

    static components = {
        'cos-empty': Empty
    };

    initData() {
        return {
            title: '标题内容',
            description: '辅助信息的文本',
        };
    }
}
```