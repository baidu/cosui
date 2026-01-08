import {Component} from 'san';
import Practices from './practices.md';
import './index.less';

export default class Doc extends Component {
    static template = `
        <div>
            <practices />
        </div>
    `;

    static components = {
        'practices': Practices
    };
    element: null | HTMLElement;
}