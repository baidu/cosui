import {Component} from 'san';
import Basic from './basic.md';
import Range from './range.md';

export default class Preview extends Component {
    static template = `
        <template>
            <basic />
            <range />
        </template>
    `;

    static components = {
        'basic': Basic,
        'range': Range
    };
}