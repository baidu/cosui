import {Component} from 'san';
import Basic from './basic.md';

export default class Preview extends Component {
    static template = `
        <template>
            <basic/>
        </template>
    `;
    static components = {
        'basic': Basic
    };
}