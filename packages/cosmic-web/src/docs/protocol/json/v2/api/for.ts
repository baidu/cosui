import {Component} from 'san';
import Readme from './for/readme.md';
import Preview from './for/preview';

export default class V2For extends Component {
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
