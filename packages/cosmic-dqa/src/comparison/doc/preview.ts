import {Component} from 'san';
import DefaultDemo from './default.md';
import SimpleDemo from './simple.md';

export default class Preview extends Component {
    static template = `
        <template>
            <demo />
            <simple />
        </template>
    `;
    static components = {
        'demo': DefaultDemo,
        'simple': SimpleDemo
    };
}
