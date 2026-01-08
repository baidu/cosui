``` san export=preview caption=loading按钮
import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import Icon from '@cosui/cosmic/icon';
import Loading from '@cosui/cosmic/loading';
import './loading.less';

export default class Default extends Component {

    static template = `
        <div data-testid="button-loading">
            <h4 class="cos-space-mt-none">点击按钮进入 loading 态</h4>
            <div class="cos-row cos-row-col-12 cos-gutter cos-space-mt-xs cos-items-center">
                <div class="cos-col-3">
                    <cos-button class="loading-primary" on-click="onClick1">
                        <cos-loading s-if="loading1" position="right" text="" class="cos-space-mr-xxs" />
                        强按钮
                    </cos-button>
                </div>
                <div class="cos-col-3">
                    <cos-button appearance="secondary" class="loading-secondary" on-click="onClick2">
                        <cos-loading s-if="loading2" position="right" text="" class="cos-space-mr-xxs" />
                        弱按钮
                    </cos-button>
                </div>
                <div class="cos-col-3">
                    <cos-button appearance="text" class="loading-text" on-click="onClick3">
                        <cos-loading s-if="loading3" position="right" text="" class="cos-space-mr-xxs" />
                        文本按钮
                    </cos-button>
                </div>
                <div class="cos-col-3">
                    <cos-button appearance="icon" class="loading-icon" on-click="onClick4">
                        <cos-icon s-if="!loading4" name='navigation-fill'/>
                        <cos-loading s-else position="right" text=""/>
                    </cos-button>
                </div>
            </div>

            <h4 class="">按钮默认展现 loading 态</h4>
            <div class="cos-row cos-row-col-12 cos-gutter cos-space-mt-xs cos-space-mb-xs cos-items-center">
                <div class="cos-col-3">
                    <cos-button class="loading-primary">
                        <cos-loading position="right" text="" class="cos-space-mr-xxs" />
                        强按钮
                    </cos-button>
                </div>
                <div class="cos-col-3">
                    <cos-button appearance="secondary" class="loading-secondary">
                        <cos-loading position="right" text="" class="cos-space-mr-xxs" />弱按钮
                    </cos-button>
                </div>
                <div class="cos-col-3">
                    <cos-button appearance="text" class="loading-text">
                        <cos-loading position="right" text="" class="cos-space-mr-xxs" />文本按钮
                    </cos-button>
                </div>
                <div class="cos-col-3">
                    <cos-button appearance="icon" class="loading-icon">
                        <cos-loading position="right" text=""/>
                    </cos-button>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-button': Button,
        'cos-icon': Icon,
        'cos-loading': Loading
    };

    initData() {
        return {
            loading: false,
            loading1: false,
            loading2: false,
            loading3: false,
            loading4: false
        }
    }

    changeLoading(key) {
        this.data.set(key, true);
        setTimeout(() => {
            this.data.set(key, false);
        }, 2000)
    }

    onClick1(data) {
        this.changeLoading('loading1');
        console.log(data);
    }

    onClick2(data) {
        this.changeLoading('loading2');
        console.log(data);
    }

    onClick3(data) {
        this.changeLoading('loading3');
        console.log(data);
    }

    onClick4(data) {
        this.changeLoading('loading4');
        console.log(data);
    }
}

```
