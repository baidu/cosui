import {Component} from 'san';
import Basic from './basic.md';

export default class Preview extends Component {
    static template = '<doc-basic />';

    static components = {
        'doc-basic': Basic
    };
}
