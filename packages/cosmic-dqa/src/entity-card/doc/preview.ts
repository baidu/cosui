/**
 * @file EntityCard 双端示例入口
 */

import {Component} from 'san';
import DefaultDemo from './default.md';
import LinkDemo from './links.md';
import TruncationDemo from './truncation.md';

export default class Preview extends Component {
    static template = `
        <div>
            <default-demo />
            <link-demo />
            <truncation-demo />
        </div>
    `;

    static components = {
        'default-demo': DefaultDemo,
        'link-demo': LinkDemo,
        'truncation-demo': TruncationDemo
    };
}
