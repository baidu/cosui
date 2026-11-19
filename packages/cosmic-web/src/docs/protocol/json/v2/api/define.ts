import {Component} from 'san';
import Readme from './define/readme.md';
import Preview from './define/preview';

export default class V2Define extends Component {
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
