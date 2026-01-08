import {Component} from 'san';
import MobileBasic from './mobile-basic.md';
import MobilePosition from './mobile-position.md';
import MobileSize from './mobile-size.md';
import MobileAction from './mobile-action.md';
import PCBasic from './pc-basic.md';
import PCType from './pc-type.md';
import PCAction from './pc-action.md';
import PCConfig from './pc-config.md';

export default class Doc extends Component {

    static template = `
        <template>
            <h2>Mobile 端示例</h2>
            <p>
                Mobile 端 Toast 显示交互方式为：新 Toast 覆盖旧 Toast，旧 Toast 立刻消失。
            </p>
            <mobile-basic />
            <mobile-position />
            <mobile-size />
            <mobile-action />

            <h2>PC 端示例</h2>
            <p>
                PC 端的 Toast 效果跟 Mobile 端不同，固定从顶部显示。
            </p>
            <p>
                当同时触发了多个 Toast 时，Toast 依次在顶部，依次从上到下，保持15px间距，陆续展示出。
            </p>
            <p>
                最多可同时展示 3 个，超出 3 个 Toast 被同时触发时，走排队等待逻辑，依次展示。
            </p>
            <pc-basic />
            <pc-type />
            <pc-action />
            <pc-config />
        </template>
    `;

    static components = {
        'mobile-basic': MobileBasic,
        'mobile-position': MobilePosition,
        'mobile-size': MobileSize,
        'mobile-action': MobileAction,
        'pc-basic': PCBasic,
        'pc-type': PCType,
        'pc-action': PCAction,
        'pc-config': PCConfig
    };
}
