import {Component} from 'san';
import DefaultDemo from './default.md';
import SingleDemo from './single.md';

export default class Preview extends Component {
    static template = `
        <template>
            <default />
            <single />
        </template>
    `;
    static components = {
        'default': DefaultDemo,
        'single': SingleDemo
    };
}
