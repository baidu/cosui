import {Component} from 'san';
import Basic from './basic.md';
import Custom from './custom.md';

export default class Doc extends Component {
    static template = `
        <template>
            <basic/>
            <custom/>
        </template>
    `;

    static components = {
        'basic': Basic,
        'custom': Custom
    };
}