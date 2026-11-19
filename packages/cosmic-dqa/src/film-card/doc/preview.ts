import {Component} from 'san';
import Default from './default.md';

export default class Preview extends Component {
    static template = `
        <template>
            <cos-film-card-default/>
        </template>
    `;

    static components = {
        'cos-film-card-default': Default
    };
}
