/**
 * @file Divider doc demo
 */

import {Component} from 'san';
import BasicStyle from './basic-style.md';
import VerticalStyle from './vertical-style.md';
import InverseStyle from './inverse-style.md';
import VerticalInverseStyle from './vertical-inverse-style.md';


export default class Doc extends Component {
    static template = `
        <template>
            <basic-style-demo />
            <vertical-style-demo />
            <inverse-style-demo />
            <vertical-inverse-style-demo />
        </template>
    `;

    static components = {
        'basic-style-demo': BasicStyle,
        'vertical-style-demo': VerticalStyle,
        'inverse-style-demo': InverseStyle,
        'vertical-inverse-style-demo': VerticalInverseStyle
    };
}