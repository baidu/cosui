import {Component} from 'san';
import Dynamic from './markdown.md';

export default class Preview extends Component {

    static template = `
        <div>
            <doc-dynamic />
        </div>
    `;

    static components = {
        'doc-dynamic': Dynamic
    };
}
