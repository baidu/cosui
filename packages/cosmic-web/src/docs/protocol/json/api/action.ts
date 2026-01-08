import {Component} from 'san';
import Readme from './action/readme.md';
import Preview from './action/preview';

export default class API extends Component {

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
