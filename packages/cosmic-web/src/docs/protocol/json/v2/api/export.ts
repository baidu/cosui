import {Component} from 'san';
import Readme from './export/readme.md';
import Preview from './export/preview';

export default class V2Export extends Component {
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
