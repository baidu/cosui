import {Component} from 'san';
import Readme from './compile/readme.md';
import Preview from './compile/preview';

export default class Compile extends Component {

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
