import {Component} from 'san';
import DefaultDemo from './default.md';
import UnfoldDemo from './unfold.md';

export default class Preview extends Component {
    static template = `
        <template>
            <default-demo />
            <unfold-demo />
        </template>
    `;
    static components = {
        'default-demo': DefaultDemo,
        'unfold-demo': UnfoldDemo
    };
}
