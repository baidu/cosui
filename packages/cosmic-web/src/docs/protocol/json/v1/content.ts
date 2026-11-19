import {Component} from 'san';
import overviewMd from './content.md';

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
