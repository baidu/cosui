import {Component} from 'san';
import Overview from './md/overview.md';

export default class Online extends Component {

    static template = `
        <div>
            <doc-overview />
        </div>
    `;

    static components = {
        'doc-overview': Overview
    };
}