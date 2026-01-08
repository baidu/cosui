```san export=preview caption=横滑样式

import {Component} from 'san';
import QuestionGuide from '@cosui/cosmic-dqa/question-guide';

export default class DefaultDemo extends Component {

    static template = `
        <div class="cos-dqa">
            <cosd-question-guide
                title="{{title}}"
                icon="{{icon}}"
                items="{{items}}"
                appearance="{{appearance}}"
                scrollable="{{scrollable}}"
                on-change="handleChange"
                on-scroll="handleScroll"
            />
        </div>
    `;

    static components = {
        'cosd-question-guide': QuestionGuide
    };

    initData() {
        return {
            title: '引导语',
            icon: 'ai',
            appearance: 'ghost',
            scrollable: true,
            items: [
                {
                    type: 'question',
                    options: [
                        {
                            value: '选项1',
                            image: 'https://gips3.baidu.com/it/u=2334325247,129821877&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f54_54'
                        },
                        {value: '选项2，这是选项2', icon: 'search'},
                        {value: '选项3，选项最多展示3行'},
                        {value: '选项4'},
                        {value: '选项5'},
                        {value: '选项6，这是一个非常长的选项，这是一个非常长的选项，这是一个非常长的选项'},
                        {value: '选项7'},
                    ],
                }
            ]
        };
    };
    handleChange(item) {
        console.log('change event', item);
    }
    handleScroll(item) {
        console.log('scroll event', item);
    }
}

```
