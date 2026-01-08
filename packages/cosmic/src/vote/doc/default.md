```san export=preview  caption=基础用法
import {Component} from 'san';
import Vote from '@cosui/cosmic/vote';

export default class VoteDemo extends Component {

    static template = `
        <div data-testid="vote-default" style="max-width: 400px">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">选项不带图片</h4>
            <div>
                <cos-vote
                    appearance="{{appearance}}"
                    options="{{options}}"
                    target="{{target}}"
                    targetName="{{targetName}}"
                    on-option-click="handleOptionClick"
                ></cos-vote>
            </div>
            <br/>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">选项带图片</h4>
            <div>
                <cos-vote
                    appearance="{{appearance}}"
                    options="{{optionsWithImage}}"
                    target="{{targetWithImage}}"
                    targetName="{{targetName}}"
                    on-option-click="handleOptionClickWithImage"
                ></cos-vote>
            </div>
        </div>
    `;

    static components = {
        'cos-vote': Vote
    };

    initData() {
        return {
            appearance: '1v1',
            options: [
                { target: { name: 'Option 1(超长选项文本超长选项文本-----)' }, value: 0.6 },
                { target: { name: 'Option 2(超长选项文本超长选项文本-----)' }, value: 0.4 }
            ],
            optionsWithImage: [
                { target: { name: 'Option 1(超长选项文本超长选项文本-----)', image: 'https://gips2.baidu.com/it/u=504690712,4202149249&fm=3028&app=3028&f=JPEG&fmt=auto&q=100&size=f632_632' }},
                { target: { name: 'Option 2(超长选项文本超长选项文本-----)', image: 'https://gips2.baidu.com/it/u=504690712,4202149249&fm=3028&app=3028&f=JPEG&fmt=auto&q=100&size=f632_632' }}
            ],
            target: null,
            targetWithImage: null,
            targetName: 'name'
        };
    }

    handleOptionClick(target) {
        this.data.set('target', target);
    }

    handleOptionClickWithImage(target) {
        const options = this.data.get('optionsWithImage');
        options[0].value = 0.3;
        options[1].value = 0.7;
        this.data.set('optionsWithImage', options);
        this.data.set('targetWithImage', target);
    }
}

```
