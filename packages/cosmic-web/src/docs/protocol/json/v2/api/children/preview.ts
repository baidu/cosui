import {Component} from 'san';
import Reference from './reference.md';
import Inline from './inline.md';
import Mixed from './mixed.md';

export default class Preview extends Component {
    static template = `
        <div>
            <doc-reference />
            <doc-inline />
            <doc-mixed />
        </div>
    `;

    static components = {
        'doc-reference': Reference,
        'doc-inline': Inline,
        'doc-mixed': Mixed
    };
}
