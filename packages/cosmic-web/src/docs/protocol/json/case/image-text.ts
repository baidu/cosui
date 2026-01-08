import {Component} from 'san';
import Readme from './image-text/readme.md';
import API from './image-text/api.md';
import Preview from './image-text/preview';

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
