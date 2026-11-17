import {Component} from 'san';
import Readme from './reference/readme.md';
import Preview from './reference/preview';

export default class Reference extends Component {

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
