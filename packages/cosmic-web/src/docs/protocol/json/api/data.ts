import {Component} from 'san';
import Readme from './data/readme.md';
import Preview from './data/preview';

export default class Data extends Component {

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
