import {Component} from 'san';
import Demo from './default.md';

export default class Preview extends Component {
    static template = `
        <div>
            <demo />
        </div>
    `;
    static components = {
        'demo': Demo
    };
}

