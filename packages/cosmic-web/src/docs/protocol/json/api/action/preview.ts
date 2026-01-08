import {Component} from 'san';
import Action from './action.md';

export default class Preview extends Component {

    static template = `
        <div>
            <doc-action />
        </div>
    `;

    static components = {
        'doc-action': Action
    };
}
