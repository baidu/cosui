```san export=preview caption=多选高亮

import {Component} from 'san';
import QuestionGuide from '@cosui/cosmic-dqa/question-guide';

export default class CheckboxHighlightDemo extends Component {
    static template = `
        <div class="cos-dqa">
            <cosd-question-guide
                title="请选择过敏史"
                icon="ai"
                items="{{items}}"
                on-change="handleChange"
            />
        </div>
    `;

    static components = {
        'cosd-question-guide': QuestionGuide
    };

    initData() {
        return {
            items: [
                {
                    type: 'checkbox',
                    label: '过敏史',
                    options: [
                        {value: '青霉素', selected: true},
                        {value: '磺胺类'},
                        {value: '阿司匹林', selected: true}
                    ]
                }
            ]
        };
    }

    handleChange(obj) {
        console.log('change event', obj);
    }
}

```
