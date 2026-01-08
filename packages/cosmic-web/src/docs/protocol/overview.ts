import {Component} from 'san';
import Overview from './overview.md';

export default class Doc extends Component {
    static template = `
        <div>
            <overview />
        </div>
    `;

    static components = {
        'overview': Overview
    };
}