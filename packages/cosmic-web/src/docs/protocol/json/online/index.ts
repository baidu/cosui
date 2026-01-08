import {Component} from 'san';
import Readme from './readme.md';
import Preview from './preview';

export default class Online extends Component {

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
