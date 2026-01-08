import {Component} from 'san';
import Readme from './node/readme.md';
import Preview from './node/preview';

export default class Node extends Component {

    static template = `
        <div>
            <doc-readme />
            <doc-preview />
        </div>
    `;

    static components = {
        'doc-readme': Readme,
        'doc-preview': Preview
    };
}
