```san export=preview caption=foldHeight 动态变化

import {Component} from 'san';
import Fold from '@cosui/cosmic/fold';
import Button from '@cosui/cosmic/button';

export default class FoldHeightDemo extends Component {

    static template = `
        <div data-testid="fold-height">
            <cos-fold
                fold-height="{{ foldHeight }}"
            >
                <div>
                    <cos-button class="change-button" on-click="update">点我更新折叠高度</cos-button>
                    <p style="margin-top: 0;">有时，业务方可能需要改变 foldHeight 的值（例如，页面的字号发生了变化），这时，Fold 组件应该能监听到 foldHeight 的变化，并且使用新的值作为折叠高度。</p>
                    <p>如果 foldHeight 改变的时候，组件处于折叠状态，则采用新的值作为折叠高度；如果处于展开状态，则不做改变（下次折叠后会使用新的 foldHeight）。</p>
                </div>
            </cos-fold>
        </div>
    `;

    static components = {
        'cos-fold': Fold,
        'cos-button': Button,
    };

    initData() {
        return {
            foldHeight: 150
        };
    }

    update() {
        if (this.data.get('foldHeight') > 100) {
            this.data.set('foldHeight', 90);
        }
        else {
            this.data.set('foldHeight', 150);
        }
    }
}
```
