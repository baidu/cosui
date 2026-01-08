
import {Component} from 'san';
import PagesDemo from './pages.md';
import PropsDemo from './props.md';

export default class Doc extends Component {
    static template = `
        <template>
            <pages-demo />
            <props-demo />
        </template>
    `;

    static components = {
        'pages-demo': PagesDemo,
        'props-demo': PropsDemo
    };
}
