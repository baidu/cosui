/**
 * @file MoreLink 组件文档预览 Demo
 */

import {Component} from 'san';
import BasicDemo from './basic.md';
import OutlineDemo from './outline.md';
import FilledDemo from './filled.md';
import ScrollMoreDemo from './scroll-more.md';
import Line from './line.md';

export default class Preview extends Component {
    static template = `
        <template>
            <basic-demo />
            <outline-demo />
            <line />
            <filled-demo />
            <scroll-more-demo />
        </template>
    `;

    static components = {
        'basic-demo': BasicDemo,
        'outline-demo': OutlineDemo,
        'filled-demo': FilledDemo,
        'scroll-more-demo': ScrollMoreDemo,
        'line': Line
    };
}
