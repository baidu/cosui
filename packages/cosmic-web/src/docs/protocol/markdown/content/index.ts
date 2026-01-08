import {Component} from 'san';
import contentMd from './index.md';

export default class Content extends Component {

    static template = `
        <div>
            <doc-content />
        </div>
    `;

    static components = {
        'doc-content': contentMd
    };
}
