import {Component} from 'san';
import overviewMd from './index.md';

export default class Overview extends Component {

    static template = `
        <div>
            <doc-overview />
        </div>
    `;

    static components = {
        'doc-overview': overviewMd
    };
}
