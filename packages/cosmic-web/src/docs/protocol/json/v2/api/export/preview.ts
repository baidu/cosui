import {Component} from 'san';
import Business from './business.md';
import Unified from './unified.md';

export default class Preview extends Component {
    static template = `
        <div>
            <doc-business />
            <doc-unified />
        </div>
    `;

    static components = {
        'doc-business': Business,
        'doc-unified': Unified
    };
}
