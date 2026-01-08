import {Component} from 'san';
import DefaultDemo from './default.md';

export default class Preview extends Component {
    static template = `
        <template>
            <demo />
        </template>
    `;
    static components = {
        'demo': DefaultDemo
    };
}
