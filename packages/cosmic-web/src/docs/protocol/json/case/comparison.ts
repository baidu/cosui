import {Component} from 'san';
import Readme from './comparison/readme.md';
import API from './comparison/api.md';
import Preview from './comparison/preview';

export default class Comparision extends Component {

    static template = `
        <div>
            <doc-readme />
            <doc-preview />
            <doc-api />
        </div>
    `;

    static components = {
        'doc-readme': Readme,
        'doc-preview': Preview,
        'doc-api': API
    };
}
