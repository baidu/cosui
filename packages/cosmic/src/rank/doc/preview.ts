import {Component} from 'san';
import Default from './default.md';

export default class Doc extends Component {
    static template = `
        <template>
            <cos-rank-default/>
        </template>
    `;

    static components = {
        'cos-rank-default': Default
    };
}
