import {Component} from 'san';
import overview from './index.md';

export default class Doc extends Component {
    static template = `
        <div>
            <overview />
        </div>
    `;

    static components = {
        'overview': overview
    };
}