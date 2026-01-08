```san export=preview  caption=常用样式
import {Component} from 'san';
import Vote from '@cosui/cosmic/vote';

const imageUrl = 'https://gips2.baidu.com/it/u=504690712,4202149249&fm=3028&app=3028&f=JPEG&fmt=auto&q=100&size=f632_632';

export default class VoteDemo extends Component {

    static template = `
        <div data-testid="vote-appearance" style="max-width: 400px">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">1v1 样式</h4>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">（必须传递两个 option）</h4>
            <div>
                <cos-vote
                    appearance="1v1"
                    options="{{optionsOf1v1}}"
                    target="{{targetOf1v1}}"
                    targetName="{{targetName}}"
                    on-option-click="handleOptionClickOf1v1"
                ></cos-vote>
            </div>
            <br/>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">horizontal 样式</h4>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">（最多可以传递 4 个 option）</h4>
            <div>
                <cos-vote
                    appearance="horizontal"
                    options="{{optionsOfHorizontal}}"
                    target="{{targetOfHorizontal}}"
                    targetName="{{targetName}}"
                    on-option-click="handleOptionClickOfHorizontal"
                ></cos-vote>
            </div>
            <br/>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">vertical 样式</h4>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">（option 数量不限，但超出 4 个时会折叠）</h4>
            <div>
                <cos-vote
                    appearance="vertical"
                    options="{{optionsOfVertical}}"
                    target="{{targetOfVertical}}"
                    targetName="{{targetName}}"
                    on-option-click="handleOptionClickOfVertical"
                ></cos-vote>
            </div>
        </div>
    `;

    static components = {
        'cos-vote': Vote
    };

    initData() {
        return {
            targetName: 'name',
            optionsOf1v1: [
                { target: { name: 'Option 1(超长选项文本超长选项文本-----)', image: imageUrl }, value: 0.3 },
                { target: { name: 'Option 2(超长选项文本超长选项文本-----)', image: imageUrl }, value: 0.7 }
            ],
            targetOf1v1: null,
            optionsOfHorizontal: [
                { target: { name: 'Option 1(超长选项文本超长选项文本-----)', image: imageUrl }, value: 0.3 },
                { target: { name: 'Option 2(超长选项文本超长选项文本-----)', image: imageUrl }, value: 0.5 },
                { target: { name: 'Option 3(超长选项文本超长选项文本-----)', image: imageUrl }, value: 0.2 },
            ],
            targetOfHorizontal: null,
            optionsOfVertical: [
                { target: { name: 'Option 1(超长选项文本超长选项文本-----)', image: imageUrl }, value: 0.19 },
                { target: { name: 'Option 2(超长选项文本超长选项文本-----)', image: imageUrl }, value: 0.21 },
                { target: { name: 'Option 3(超长选项文本超长选项文本-----)', image: imageUrl }, value: 0.299 },
                { target: { name: 'Option 4(超长选项文本超长选项文本-----)', image: imageUrl }, value: 0.301 },
                { target: { name: 'Option 5(超长选项文本超长选项文本-----)', image: imageUrl }, value: 0.1 }
            ],
            targetOfVertical: null,
        };
    }

    handleOptionClickOf1v1(target) {
        this.data.set('targetOf1v1', target);
    }

    handleOptionClickOfHorizontal(target) {
        this.data.set('targetOfHorizontal', target);
    }

    handleOptionClickOfVertical(target) {
        this.data.set('targetOfVertical', target);
    }
}

```
