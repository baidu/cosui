``` san export=preview caption=常用样式
import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import Icon from '@cosui/cosmic/icon';
import "./default.less";

export default class Default extends Component {

    static template = `
        <div data-testid="button-default">
            <div class="button-demo">
                <div>
                    <h4>强按钮</h4>
                    <div class="cos-row cos-row-col-12">
                        <div class="cos-col-12">
                            <cos-button>强按钮</cos-button>
                        </div>
                    </div>
                </div>

                <div>
                    <h4>弱按钮</h4>
                    <div class="cos-row cos-row-col-12">
                        <div class="cos-col-12">
                            <cos-button appearance="secondary">
                                弱按钮
                            </cos-button>
                        </div>
                    </div>
                </div>

                <div>
                    <h4>图标按钮</h4>
                    <div class="cos-row cos-gutter cos-space-mt-xs">
                        <div class="cos-col-4">
                            <cos-button class="button-demo-icon" appearance="icon">
                                <cos-icon name='navigation-fill'/>
                            </cos-button>
                        </div>
                    </div>
                </div>

                <div class="button-demo-plain cos-space-pt-sm cos-space-pb-sm cos-rounded-xs">
                    <h4>反白按钮</h4>
                    <div class="cos-row cos-row-col-12 cos-space-mt-xs">
                        <div class="cos-col-2">
                            <cos-button size="sm" appearance="plain">
                                按钮
                            </cos-button>
                        </div>
                    </div>
                    <div class="cos-row cos-gutter cos-space-mt-xs">
                        <div class="cos-col-4">
                            <cos-button appearance="plain">按钮</cos-button>
                        </div>
                    </div>
                </div>

                <div>
                    <h4>组合按钮</h4>
                    <div class="cos-row cos-gutter cos-space-mt-xs">
                        <div class="cos-col-6">
                            <cos-button appearance='secondary' size=“lg”>辅按钮</cos-button>
                        </div>
                        <div class="cos-col-6">
                            <cos-button size="lg">主按钮</cos-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-button': Button,
        'cos-icon': Icon,
    };
}
```