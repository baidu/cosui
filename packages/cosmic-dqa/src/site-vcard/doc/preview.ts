import {Component} from 'san';
import DefaultDemo from './default.md';

export default class Preview extends Component {
    static template = `
        <template>
            <default />
        </template>
    `;
    static components = {
        'default': DefaultDemo
    };
}
