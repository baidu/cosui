```san export=preview caption=自定义标题区域
import {Component} from 'san';
import Accordion from '@cosui/cosmic/accordion';
import AccordionPanel from '@cosui/cosmic/accordion-panel';
import Icon from '@cosui/cosmic/icon';
import './header-custom.less';

export default class Demo extends Component {
    static template = `
        <div class="accordion-demo">
            <div style="position: relative;">
                <h4>标题区域使用 slot 自定义</h4>
                <cos-accordion
                    value="{{value}}"
                    multiple="{{multiple}}"
                    on-change="handleChange"
                >
                    <template s-for="item, index in list">
                        <cos-accordion-panel
                            value="{{item.value}}"
                        >
                            <div slot="header">
                                <cos-icon name="loading"/>
                                <span>加载中...</span>
                            </div>
                            <div>{{item.content}}</div>
                        </cos-accordion-panel>
                    </template>
                </cos-accordion>
            </div>
        </div>`;

    static components = {
        'cos-accordion': Accordion,
        'cos-accordion-panel': AccordionPanel,
        'cos-icon': Icon,
    };

    initData() {
        return {
            multiple: true,
            value: ['key1'],
            list: [
                {
                    value: 'key1',
                    content: '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”。这种颜色组合是由基因决定的，通常只出现在母猫身上。'
                },
                {
                    value: 'key2',
                    content: '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”。这种颜色组合是由基因决定的，通常只出现在母猫身上。'
                },
                {
                    value: 'key3',
                    content: '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”。这种颜色组合是由基因决定的，通常只出现在母猫身上。'
                },
            ]
        };
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