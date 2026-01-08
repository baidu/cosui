import {Component} from 'san';
import Default from './default.md';
import Icon from './icon.md';
import Action from './action.md';

export default class Doc extends Component {
    static template = `
        <template>
            <default-demo/>
            <icon-demo/>
            <action-demo/>
        </template>
    `;

    static components = {
        'default-demo': Default,
        'icon-demo': Icon,
        'action-demo': Action
    };
}