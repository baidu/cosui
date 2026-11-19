import {Component} from 'san';
import Overview from './overview.md';

export default class V2Overview extends Component {
    static template = '<doc-overview />';

    static components = {
        'doc-overview': Overview
    };
}
