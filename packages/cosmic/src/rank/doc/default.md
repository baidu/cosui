```san export=preview  caption=Rank-示例
import {Component} from 'san';
import Rank from '@cosui/cosmic/rank';
import Select from '@cosui/cosmic/select';
import "./default.less";

export default class Demo extends Component {

    static template = `
        <div data-testid="rank-default">
            <div class="demo-controller">
                <div id="size-selector">
                    <label>size:</label>
                    <cos-select
                        style="width: 100px;"
                        value="{=size=}"
                        options="{{options}}"
                    />
                </div>
            </div>

            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">一级排序</h4>
            <div class="cos-row">
                <div class="cos-col" s-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 1000]">
                    <cos-rank
                        appearance="filled-leaf"
                        size="{{size}}"
                        index="{{i}}"
                    >
                    </cos-rank>
                </div>
            </div>

            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">二级排序</h4>
            <div class="cos-row">
                <div class="cos-col" s-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 1000]">
                    <cos-rank
                        appearance="filled"
                        size="{{size}}"
                        index="{{i}}"
                    >
                    </cos-rank>
                </div>
            </div>

            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">三级排序</h4>
            <div class="cos-row">
                <div class="cos-col" s-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 1000]">
                    <cos-rank
                        appearance="subtle"
                        size="{{size}}"
                        index="{{i}}"
                    >
                    </cos-rank>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-rank': Rank,
        'cos-select': Select
    };

    initData() {
        return {
            size: 'lg',
            options: [{
                value: 'sm',
                label: 'sm'
            }, {
                value: 'md',
                label: 'md'
            }, {
                value: 'lg',
                label: 'lg'
            }]
        }
    };
}

```
