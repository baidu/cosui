import {Component} from 'san';
import Content from './quickstart.md';

export default class Doc extends Component {

    static template = '<content/>';

    static components = {
        'content': Content
    };
}
