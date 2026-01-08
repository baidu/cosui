import {Component} from 'san';
import Basic from '../../overview/basic.md';

export default class Preview extends Component {

    static template = `
        <div>
            <doc-basic />
        </div>
    `;

    static components = {
        'doc-basic': Basic
    };
}
