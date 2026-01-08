import {Component} from 'san';
import Readme from './image/readme.md';
import API from './image/api.md';
import Preview from './image/preview';

export default class Image extends Component {

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
