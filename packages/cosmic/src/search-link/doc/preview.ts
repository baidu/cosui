import {Component} from 'san';
import Demo from './default.md';

export default class Doc extends Component {
    static template = `
        <template>
            <p>Wise效果预览，建议手机扫码或使用移动端模拟器。</p>
            <demo />
        </template>
    `;

    static components = {
        'demo': Demo
    };
}