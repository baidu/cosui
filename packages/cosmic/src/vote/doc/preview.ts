import {Component} from 'san';
import Default from './default.md';
import Appearance from './appearance.md';


export default class Doc extends Component {
    static template = `
        <template>
            <default/>
            <appearance/>
        </template>
    `;

    static components = {
        'default': Default,
        'appearance': Appearance
    };
}
