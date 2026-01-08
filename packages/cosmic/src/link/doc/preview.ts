import {Component} from 'san';
import CommonDemo from './common.md';
import ComponentDemo from './component.md';
import EqualPartsDemo from './equal-parts.md';

export default class Doc extends Component {
    static template = `
        <template>
            <p>Wise效果预览，建议手机扫码或使用移动端模拟器。</p>
            <component-demo />
            <equal-parts-demo />
        </template>
    `;

    static components = {
        'common-demo': CommonDemo,
        'component-demo': ComponentDemo,
        'equal-parts-demo': EqualPartsDemo
    };
}