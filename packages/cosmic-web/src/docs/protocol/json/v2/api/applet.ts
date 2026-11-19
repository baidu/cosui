import {Component} from 'san';
import Readme from './applet/readme.md';
import Preview from './applet/preview';

export default class V2Applet extends Component {
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
