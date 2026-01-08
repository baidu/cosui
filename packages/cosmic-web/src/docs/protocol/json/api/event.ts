import {Component} from 'san';
import Readme from './event/readme.md';
import Preview from './event/preview';

export default class Event extends Component {

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
