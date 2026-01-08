import {Component} from 'san';
import Default from './default.md';
import Text from './text.md';
export default class Doc extends Component {
    static template = `
        <template>
            <default/>
            <text/>
        </template>
    `;

    static components = {
        'default': Default,
        'text': Text
    };
}