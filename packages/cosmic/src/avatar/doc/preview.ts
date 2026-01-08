import {Component} from 'san';
import Default from './default.md';
export default class Doc extends Component {
    static template = `
        <template>
            <cos-avatar-default/>
        </template>
    `;

    static components = {
        'cos-avatar-default': Default
    };
}