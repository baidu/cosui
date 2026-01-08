import {Component} from 'san';
import Default from './default.md';

export default class Doc extends Component {
    static template = `
        <template>
            <cos-switcher-default />
        </template>
    `;

    static components = {
        'cos-switcher-default': Default
    };
}