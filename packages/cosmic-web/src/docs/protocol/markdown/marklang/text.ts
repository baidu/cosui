import {Component} from 'san';
import Text from './text.md';

export default class Doc extends Component {
    static template = `
        <div>
            <text />
        </div>
    `;

    static components = {
        'text': Text
    };
}