```san export=preview caption=动态增删
import {Component} from 'san';
import Accordion from '@cosui/cosmic/accordion';
import AccordionPanel from '@cosui/cosmic/accordion-panel';
import Button from '@cosui/cosmic/button';
import './operation.less';

export default class Demo extends Component {
    static template = `
        <div class="accordion-demo">
            <div class="accordion-operation-head">
                <div on-click="insert">增加面板</div>
                <div on-click="delete">删除面板</div>
            </div>
            <cos-accordion
                value="{{value}}"
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
        </div>`;

    static components = {
        'cos-accordion': Accordion,
        'cos-accordion-panel': AccordionPanel,
        'cos-button': Button,
    };

    initData() {
        return {
            value: [],
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
            ],
            index: 4
        };
    }

    insert() {
        this.data.push('list', {
            value: 'key' + this.data.get('index'),
            title: '插入项',
            content: '三花猫性格温顺、友善、活泼好动，好奇心重，喜欢探索。它们体质好，容易饲养，情商高，爱干净。'
        });
        this.data.set('index', this.data.get('index') + 1);
    }

    delete() {
        this.data.pop('list');
    }

    handleChange(data) {
        const {expanded, value} = data;
        if (expanded) {
            this.data.push('value', value);
        }
        else {
            this.data.remove('value', value);
        }
    }
}
```