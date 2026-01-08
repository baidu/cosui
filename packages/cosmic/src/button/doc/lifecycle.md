``` san export=preview caption=生命周期
import {Component} from 'san';
import Button from '@cosui/cosmic/button';

export default class Lifecycle extends Component {

    static template = `
        <div data-testid="button-lifecycle">
            <h3>控制按钮的生命周期</h3>
            <div class="cos-row cos-gutter cos-space-mt-xs">
                <div class="cos-col-4">
                    <cos-button
                        s-if="showButton"
                        appearance="secondary"
                        on-click="removeBtn"
                    >
                        移除自己
                    </cos-button>
                </div>
                <div class="cos-col-4" />
                <div class="cos-col-4" />
            </div>
        </div>
    `;

    static components = {
        'cos-button': Button
    };

    initData() {
        return {
            showButton: true
        };
    }

    removeBtn() {
        this.data.set('showButton', false)
    }
}

```