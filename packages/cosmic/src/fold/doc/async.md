```san export=preview caption=异步展开收起

import {Component} from 'san';
import Fold from '@cosui/cosmic/fold';

export default class AsyncDemo extends Component {

    static template = `
        <div data-testid="async">
            <cos-fold
                fold-height="{{60}}"
                async-loading="{{isLoading}}"
                on-toggle="toggle"
            >
                <div>
                    <p style="margin-top: 0;">1.旺季（4-10月）8:30-16:10，16:00停止售票，17:00清场；淡季（11月-次年3月）8:30-15:40，15:30停止售票，16:30清场；周一闭馆（法定节假日、暑期除外）。<span s-if="isLoading">正在加载更多</span><span s-if="isMore">更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容</span></p>
                    <p>2.旺季（4-10月）8:30-16:10，16:00停止售票，17:00清场；淡季（11月-次年3月）8:30-15:40，15:30停止售票，16:30清场；周一闭馆（法定节假日、暑期除外）。<span s-if="isLoading">正在加载更多</span><span s-if="isMore">更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容</span></p>
                    <p>3.旺季（4-10月）8:30-16:10，16:00停止售票，17:00清场；淡季（11月-次年3月）8:30-15:40，15:30停止售票，16:30清场；周一闭馆（法定节假日、暑期除外）。<span s-if="isLoading">正在加载更多</span><span s-if="isMore">更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容更多内容</span></p>
                </div>
            </cos-fold>
        </div>
    `;

    static components = {
        'cos-fold': Fold
    };

    initData() {
        return {
            isLoading: false,
            isMore: false
        };
    }

    toggle(data) {
        console.log('[fold] trigger toggle event', data);
        if (this.data.get('isMore')) {
            // 直接收起
            this.data.set('isMore', false);
        }
        else {
            // 模拟网络加载更多数据需要比较多的时间
            this.data.set('isLoading', true);
            setTimeout(() => {
                this.data.set('isMore', !this.data.get('isMore'));
                this.data.set('isLoading', false);
            }, 3000);
        }
    }
}
```
