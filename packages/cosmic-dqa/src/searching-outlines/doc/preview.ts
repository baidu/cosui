import {Component} from 'san';
import DefaultDemo from './default.md';
import RegularAppearance from './regular-appearance.md';

export default class Preview extends Component {
    static template = `
        <template>
            <demo />
            <regular-appearance />
        </template>
    `;
    static components = {
        'demo': DefaultDemo,
        'regular-appearance': RegularAppearance
    };
}
