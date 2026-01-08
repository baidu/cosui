import {Component} from 'san';
import Readme from './async/readme.md';
import Preview from './async/preview';

export default class Async extends Component {

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
