```san export=preview caption=基本示例
import {Component} from 'san';
import Accordion from '@cosui/cosmic/accordion';
import AccordionPanel from '@cosui/cosmic/accordion-panel';
import './basic.less';

export default class Demo extends Component {
    static template = `
        <div class="accordion-demo">
            <div style="position: relative;">
                <h4>基本使用</h4>
                <cos-accordion
                    value="{{activeValue}}"
                    on-change="handleChange"
                >
                    <template s-for="item, index in list">
                        <cos-accordion-panel
                            value="{{item.value}}"
                            title="{{item.title}}"
                        >
                            <div>{{item.content}}</div>
                        </cos-accordion-panel>
                    </template>
                </cos-accordion>
            </div>
        </div>`;

    static components = {
        'cos-accordion': Accordion,
        'cos-accordion-panel': AccordionPanel
    };

    initData() {
        return {
            activeValue: [],
            list: [
                {
                    value: 'key1',
                    title: '标题一',
                    content: '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”。这种颜色组合是由基因决定的，通常只出现在母猫身上。'
                },
                {
                    value: 'key2',
                    title: '标题二',
                    content: '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”。这种颜色组合是由基因决定的，通常只出现在母猫身上。'
                },
                {
                    value: 'key3',
                    title: '标题三',
                    content: '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”。这种颜色组合是由基因决定的，通常只出现在母猫身上。'
                },
            ]
        };
    }

    handleChange(data) {
        const {expanded, value} = data;
        if (expanded) {
            this.data.push('activeValue', value);
        }
        else {
            this.data.remove('activeValue', value);
        }

    }
}
```