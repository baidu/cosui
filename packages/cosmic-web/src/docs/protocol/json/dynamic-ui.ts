import {Component} from 'san';
import dynamicUI from './dynamic-ui.md';

export default class Doc extends Component {
    static template = `
        <div>
            <dynamic-ui />
        </div>
    `;

    static components = {
        'dynamic-ui': dynamicUI
    };
}
