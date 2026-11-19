import {Component} from 'san';
import Protocol from './protocol.md';

export default class V2Protocol extends Component {
    static template = '<doc-protocol />';

    static components = {
        'doc-protocol': Protocol
    };
}
