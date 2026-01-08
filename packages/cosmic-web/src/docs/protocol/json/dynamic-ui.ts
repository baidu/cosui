import {Component} from 'san';
import quickStart from './quick-start.md';

export default class Doc extends Component {
    static template = `
        <div>
            <quick-start />
        </div>
    `;

    static components = {
        'quick-start': quickStart
    };
}