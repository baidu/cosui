import {Component} from 'san';
import Readme from './applet-context/readme.md';
import Preview from './applet-context/preview';

export default class V2AppletContext extends Component {
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
