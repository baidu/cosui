import {Component} from 'san';
import Demo from './demo.md';

export default class Preview extends Component {
    static template = `
        <template>
            <demo/>
        </template>
    `;
    static components = {
        'demo': Demo
    };
}
