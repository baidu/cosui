/**
 * @file FoldSwitch 组件文档预览 Demo
 */

import {Component} from 'san';
import BasicDemo from './basic.md';
import MaskDemo from './mask.md';

export default class Preview extends Component {
    static template = `
        <template>
            <basic-demo />
            <mask-demo />
        </template>
    `;

    static components = {
        'basic-demo': BasicDemo,
        'mask-demo': MaskDemo
    };
}
