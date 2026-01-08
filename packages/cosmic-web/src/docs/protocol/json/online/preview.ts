import {Component} from 'san';
import Dynamic from './dynamic.md';

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
