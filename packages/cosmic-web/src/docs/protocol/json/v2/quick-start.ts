import {Component} from 'san';
import QuickStart from './quick-start.md';

export default class V2QuickStart extends Component {
    static template = '<doc-quick-start />';

    static components = {
        'doc-quick-start': QuickStart
    };
}
