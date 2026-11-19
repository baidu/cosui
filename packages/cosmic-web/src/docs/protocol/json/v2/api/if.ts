import {Component} from 'san';
import Readme from './if/readme.md';
import Preview from './if/preview';

export default class V2If extends Component {
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
