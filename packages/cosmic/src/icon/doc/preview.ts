import {Component} from 'san';
import Default from './default.md';
export default class Doc extends Component {

    static template = `
        <template>
            <cos-icon-default/>
        </template>
    `;

    static components = {
        'cos-icon-default': Default
    };
}
