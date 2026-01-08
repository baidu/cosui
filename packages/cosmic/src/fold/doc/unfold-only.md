```san export=preview caption=展开不收起

import {Component} from 'san';
import Fold from '@cosui/cosmic/fold';

export default class UnfoldOnlyDemo extends Component {

    static template = `
        <div data-testid="unfold-only">
            <cos-fold action="unfold-only">
                <div>
                    <p style="margin-top: 0;">1.旺季（4-10月）8:30-16:10，16:00停止售票，17:00清场；淡季（11月-次年3月）8:30-15:40，15:30停止售票，16:30清场；周一闭馆（法定节假日、暑期除外）。</p>
                    <p>2.旺季（4-10月）8:30-16:10，16:00停止售票，17:00清场；淡季（11月-次年3月）8:30-15:40，15:30停止售票，16:30清场；周一闭馆（法定节假日、暑期除外）。</p>
                    <p>3.旺季（4-10月）8:30-16:10，16:00停止售票，17:00清场；淡季（11月-次年3月）8:30-15:40，15:30停止售票，16:30清场；周一闭馆（法定节假日、暑期除外）。</p>
                </div>
            </cos-fold>

        </div>
    `;

    static components = {
        'cos-fold': Fold
    };
}
```