import {Component} from 'san';
import Readme from './children/readme.md';
import Preview from './children/preview';

export default class V2Children extends Component {
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
