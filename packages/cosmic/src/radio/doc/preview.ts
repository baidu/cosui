import {Component} from 'san';
import Basic from './basic.md';

export default class Doc extends Component {
    static template = `
        <template>
            <basic-demo />
        </template>
    `;

    static components = {
        'basic-demo': Basic
    };
}
