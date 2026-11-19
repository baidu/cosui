import {Component} from 'san';
import Readme from './process-message/readme.md';
import Preview from './process-message/preview';

export default class V2ProcessMessage extends Component {
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
