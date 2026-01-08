```san export=preview caption=单维度追问

import {Component} from 'san';
import QuestionGuide from '@cosui/cosmic-dqa/question-guide';

export default class DefaultDemo extends Component {

    static template = `
        <div>
            <cosd-question-guide
                title="{{title}}"
                icon="{{icon}}"
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
            title: '引导语',
            icon: 'https://gips1.baidu.com/it/u=2653513978,2536966661&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f199_48',
            items: [
                {
                    type: 'question',
                    options: [
                        {value: '选项1'},
                        {value: '选项2，这是选项2'},
                        {value: '选项3，选项最多展示3行'},
                        {value: '选项4'},
                        {value: '选项5'},
                        {value: '选项6，这是一个非常长的选项，这是一个非常长的选项，这是一个非常长的选项'},
                        {value: '选项7'},
                    ],
                }
            ],
        };
    };
    handleChange(obj) {
        console.log('change event', obj);
    }
}

```
