``` san export=preview caption=Picker
import {Component} from 'san';
import './index.less';
import Picker from '@cosui/cosmic/picker';
import Button from '@cosui/cosmic/button';

export default class Default extends Component {

    static template = `
        <div class="picker">
            <cos-picker
                columns="{{columns}}"
                selected-index="{{selectedIndex}}"
                on-change="handleChange"
            >
                <div>{{item.text}}</div>
            </cos-picker>
            <div
                s-if="!isPc"
                class="selected-box"></div>
        </div>
    `;

    static components = {
        'cos-picker': Picker
    };

    initData() {
        return {
            columns: [[{text: '2024'}, {text: '2025'},{text: '2026'}],
                [{text: '春'}, {text: '夏'},{text: '秋'}],
                [{text: '北京'}, {text: '上海'},{text: '广州'}]],
            selectedIndex: [0, 1, 2],
            open: false
        };

    }
    handleChange(data) {
        console.log('change', data);
    }
}

```
