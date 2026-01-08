/**
 * @file MoreLink 组件文档预览 Demo
 */

import {Component} from 'san';
import BasicDemo from './basic.md';
import FilledDemo from './filled.md';
import PlainDemo from './plain.md';
import ScrollMoreDemo from './scroll-more.md';
import Line from './line.md';

export default class Preview extends Component {
    static template = `
        <template>
            <basic-demo />
            <line />
            <filled-demo />
            <plain-demo />
            <scroll-more-demo />
        </template>
    `;

    static components = {
        'basic-demo': BasicDemo,
        'filled-demo': FilledDemo,
        'plain-demo': PlainDemo,
        'scroll-more-demo': ScrollMoreDemo,
        'line': Line
    };
}
