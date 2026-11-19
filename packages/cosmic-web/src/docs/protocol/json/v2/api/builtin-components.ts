import {Component} from 'san';
import Readme from './builtin-components/readme.md';
import Preview from './builtin-components/preview';

export default class V2BuiltinComponents extends Component {
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
