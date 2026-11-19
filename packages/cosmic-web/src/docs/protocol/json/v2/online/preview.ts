import {Component} from 'san';
import Dynamic from './dynamic.md';

export default class Preview extends Component {
    static template = '<doc-dynamic />';

    static components = {
        'doc-dynamic': Dynamic
    };
}

