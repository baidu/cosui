``` san export=preview caption=禁用按钮
import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import Icon from '@cosui/cosmic/icon';
import './disabled.less';

export default class Default extends Component {

    static template = `
        <div data-testid="button-disabled">
            <div class="button-demo">
                <div>
                    <h4>强按钮-禁用态</h4>
                    <div class="cos-row cos-row-col-12">
                        <div class="cos-col-12">
                            <cos-button disabled>按钮</cos-button>
                        </div>
                    </div>
                </div>

                <div>
                    <h4>强按钮-禁用态</h4>
                    <div class="cos-row cos-row-col-12">
                        <div class="cos-col-12">
                            <cos-button appearance="secondary" disabled>按钮</cos-button>
                        </div>
                    </div>
                </div>

                <div>
                    <h4>图标按钮-禁用态</h4>
                    <div class="cos-row cos-gutter cos-space-mt-xs">
                        <div class="cos-col-4">
                            <cos-button class="button-demo-icon" appearance="icon" size="sm" disabled>
                                <cos-icon name='navigation-fill'/>
                            </cos-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-button': Button,
        'cos-icon': Icon
    };
}
```