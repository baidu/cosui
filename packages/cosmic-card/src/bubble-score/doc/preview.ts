/**
 * @file BubbleScore doc demo
 */

import {Component} from 'san';
import BasicStyle from './basic-style.md';

export default class Doc extends Component {
    static template = `
        <template>
            <basic-style-demo />
        </template>
    `;

    static components = {
        'basic-style-demo': BasicStyle
    };
}