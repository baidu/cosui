import {Component} from 'san';
import Basic from './basic.md';
import Weak from './weak.md';
import Invoke from './invoke.md';

export default class Doc extends Component {
    static template = `
        <template>
            <basic />
            <weak />
            <invoke />
        </template>
    `;

    static components = {
        'basic': Basic,
        'weak': Weak,
        'invoke': Invoke
    };
}