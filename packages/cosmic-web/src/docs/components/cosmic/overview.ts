import {Component} from 'san';
import Content from './overview/overview.md';
import Layout from './overview/layout';

const ComponentKey = [
    'components/cosmic',
    'components/cosmic-card',
    'components/cosmic-dqa',
    'components/cosmic-shop',
    'components/cosmic-chat'
];

export default class Doc extends Component {

    static template = `
        <div>
            <content />
            <fragement s-for="item in ComponentKey">
                <layout cosmicRouteKey="{{item}}"/>
            </fragement>
        </div>
    `;

    static components = {
        'content': Content,
        'layout': Layout
    };

    initData() {
        return {
            ComponentKey
        };
    }
}
