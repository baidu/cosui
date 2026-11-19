import {Component} from 'san';
import Basic from './basic.md';
import Lifecycle from './lifecycle.md';

export default class Preview extends Component {
    static template = `
        <div>
            <doc-basic />
            <doc-lifecycle />
        </div>
    `;

    static components = {
        'doc-basic': Basic,
        'doc-lifecycle': Lifecycle
    };
}
