import {Component} from 'san';
import Async from './async.md';

export default class Preview extends Component {

    static template = `
        <div>
            <doc-async />
        </div>
    `;

    static components = {
        'doc-async': Async
    };
}
