import {Component} from 'san';
import Data from './data.md';

export default class Doc extends Component {
    static template = `
        <div>
            <data />
        </div>
    `;

    static components = {
        'data': Data
    };
}