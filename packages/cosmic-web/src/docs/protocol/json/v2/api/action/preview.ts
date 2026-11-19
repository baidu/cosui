import {Component} from 'san';
import Basic from './basic.md';
import Binding from './binding.md';
import Sequence from './sequence.md';
import ErrorDemo from './error.md';

export default class Preview extends Component {
    static template = `
        <div>
            <doc-binding />
        </div>
    `;

    static components = {
        'doc-basic': Basic,
        'doc-binding': Binding,
        'doc-sequence': Sequence,
        'doc-error': ErrorDemo
    };
}
