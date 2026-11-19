import {Component} from 'san';
import Basic from './basic.md';
import ComponentUpdate from './component-update.md';

export default class Preview extends Component {
    static template = `
        <div>
            <doc-basic />
            <doc-component-update />
        </div>
    `;

    static components = {
        'doc-basic': Basic,
        'doc-component-update': ComponentUpdate
    };
}
