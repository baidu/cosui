import {Component} from 'san';
import Lifecycle from './lifecycle.md';

export default class Preview extends Component {
    static template = '<doc-lifecycle />';

    static components = {
        'doc-lifecycle': Lifecycle
    };
}
