import {Component} from 'san';
import Default from './default.md';

export default class Doc extends Component {

    static template = `
        <template>
            <cos-timer-picker/>
        </template>
    `;

    static components = {
        'cos-timer-picker': Default
    };
}
