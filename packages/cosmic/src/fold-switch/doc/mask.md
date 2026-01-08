```san export=preview caption=带渐变遮罩

import {Component} from 'san';
import FoldSwitch from '@cosui/cosmic/fold-switch';

export default class Demo extends Component {

    static template = `
        <div>
            <div
                s-for="item, index in foldList"
                style="{{index >= showLength ? 'display:none;' : ''}}">
                <p>{{item}}</p>
            </div>
            <cos-fold-switch
                s-if="showFold"
                folded
                mask
                on-toggle="closeFold" />
        </div>
    `;

    static components = {
        'cos-fold-switch': FoldSwitch
    };

    initData() {
        return {
            showFold: true,
            showLength: 2,
            folded: true,
            foldList: new Array(6).fill('旺季（4-10月）8:30-16:10，16:00停止售票，17:00清场；淡季（11月-次年3月）8:30-15:40，15:30停止售票，16:30清场；周一闭馆（法定节假日、暑期除外）。'),
        };
    }

    closeFold(data) {
        const foldList = this.data.get('foldList');
        this.data.set('showFold', false);
        this.data.set('showLength', foldList.length);
    }
}
```
