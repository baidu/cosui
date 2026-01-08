import {Component} from 'san';
import Content from '../cosmic/overview/overview.md';
import Layout from '../cosmic/overview/layout';

export default class Doc extends Component {

    static template = `
        <div>
            <content />
            <layout cosmicRouteKey="components/cosmic-dqa"/>
        </div>
    `;

    static components = {
        'content': Content,
        'layout': Layout
    };
}
