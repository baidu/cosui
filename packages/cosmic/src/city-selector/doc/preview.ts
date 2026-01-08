import {Component} from 'san';
import Default from './default.md';
export default class Doc extends Component {
    static template = `
        <template>
            <default/>    
        </template>
    `;

    static components = {
        'default': Default
    };
}