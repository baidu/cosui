import {Component} from 'san';
import AddDirective from './add-directive.md';

export default class Doc extends Component {
    static template = `
        <div>
            <add-directive />
        </div>
    `;

    static components = {
        'add-directive': AddDirective
    };
}