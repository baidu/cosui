import {Component} from 'san';
import Basic from './basic.md';
import More from './more.md';

export default class Doc extends Component {
    static template = `
        <template>
            <basic />
            <more />
        </template>
    `;

    static components = {
        'basic': Basic,
        'more': More
    };
}