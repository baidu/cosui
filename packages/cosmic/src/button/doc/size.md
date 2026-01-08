``` san export=preview caption=按钮尺寸
import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import "./size.less";

export default class Default extends Component {

    static template = `
        <div data-testid="button-size">
            <div class="button-demo">

                <div>
                    <h4>md：宽度 12N</h4>
                    <div class="cos-row cos-row-col-12">
                        <div class="cos-col-12">
                            <cos-button appearance="secondary" size="lg">按钮</cos-button>
                        </div>
                    </div>
                </div>

                <div>
                    <h4>md：pc 3N、wise 4N</h4>
                    <div class="cos-row cos-row-col-12">
                        <div class="custom-pc-button cos-col-3">
                            <cos-button appearance="secondary" size="md">按钮</cos-button>
                        </div>
                        <div class="custom-wise-button cos-col-4">
                            <cos-button appearance="secondary" size="md">按钮</cos-button>
                        </div>
                    </div>
                </div>

                <div>
                    <h4>sm：宽度 2N</h4>
                    <div class="cos-row cos-row-col-12">
                        <div class="cos-col-2">
                            <cos-button appearance="secondary" size="sm">按钮</cos-button>
                        </div>
                    </div>
                </div>

                <div>
                    <h4>sm：加长版 4N</h4>
                    <div class="cos-row cos-row-col-12">
                        <div class="cos-col-4">
                            <cos-button appearance="secondary" size="sm">四字按钮</cos-button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;

    static components = {
        'cos-button': Button
    };
}
```