import {Component} from 'san';
import Extend from './extend.md';
import Context from './context.md';

export default class Preview extends Component {
    static template = `
        <div>
            <doc-extend />
            <doc-context />
        </div>
    `;

    static components = {
        'doc-extend': Extend,
        'doc-context': Context
    };
}
