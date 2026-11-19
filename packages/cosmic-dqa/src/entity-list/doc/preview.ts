/**
 * @file EntityList 双端示例入口
 */

import {Component} from 'san';
import Default from './default.md';

export default class Preview extends Component {
    static template = `
        <div>
            <default />
        </div>
    `;

    static components = {
        'default': Default
    };
}
