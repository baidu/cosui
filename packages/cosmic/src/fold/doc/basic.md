```san export=preview caption=基本使用

import {Component} from 'san';
import Fold from '@cosui/cosmic/fold';

export default class BasicDemo extends Component {

    static template = `
        <div data-testid="default">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">设置折叠高度为80</h4>
            <cos-fold fold-height="80">
                <div>
                    <p style="margin-top: 0;">1.旺季（4-10月）8:30-16:10，16:00停止售票，17:00清场；淡季（11月-次年3月）8:30-15:40，15:30停止售票，16:30清场；周一闭馆（法定节假日、暑期除外）。</p>
                    <p>2.旺季（4-10月）8:30-16:10，16:00停止售票，17:00清场；淡季（11月-次年3月）8:30-15:40，15:30停止售票，16:30清场；周一闭馆（法定节假日、暑期除外）。</p>
                    <p>3.旺季（4-10月）8:30-16:10，16:00停止售票，17:00清场；淡季（11月-次年3月）8:30-15:40，15:30停止售票，16:30清场；周一闭馆（法定节假日、暑期除外）。</p>
                </div>
            </cos-fold>
        </div>

        <div data-testid="custom-text">
            <h3>修改展开收起文本</h3>
            <cos-fold unfold-text="展开详情" fold-text="收起详情">
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