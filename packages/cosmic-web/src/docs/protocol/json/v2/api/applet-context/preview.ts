import {Component} from 'san';
import Config from './config.md';
import Manage from './manage.md';
import Listen from './listen.md';

export default class Preview extends Component {
    static template = `
        <div>
            <doc-config />
            <doc-manage />
            <doc-listen />
        </div>
    `;

    static components = {
        'doc-config': Config,
        'doc-manage': Manage,
        'doc-listen': Listen
    };
}
