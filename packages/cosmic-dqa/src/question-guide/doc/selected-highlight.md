```san export=preview caption=单选高亮

import {Component} from 'san';
import QuestionGuide from '@cosui/cosmic-dqa/question-guide';

export default class RadioHighlightDemo extends Component {
    static template = `
        <div class="cos-dqa">
            <cosd-question-guide
                title="请选择您的主要症状"
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
                    type: 'radio',
                    label: '症状',
                    options: [
                        {value: '头疼'},
                        {value: '发热', selected: true},
                        {value: '咳嗽'}
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
