import {Component} from 'san';
import Update from './update.md';
import Extend from './extend.md';
import Scope from './scope.md';

export default class Preview extends Component {

    static template = `
        <div>
            <doc-update />
            <doc-extend />
            <doc-scope />
        </div>
    `;

    static components = {
        'doc-update': Update,
        'doc-extend': Extend,
        'doc-scope': Scope
    };
}
