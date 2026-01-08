import {Component} from 'san';
import Readme from './md/online/readme.md';
import Preview from './md/online/preview';

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