import {Component} from 'san';
import Basic from './basic.md';
import Scroll from './scroll.md';
import Appearance from './appearance.md';
import Operation from './operation.md';
import EqualSplits from './equal-splits.md';

export default class Preview extends Component {
    static template = `
        <template>
            <h2>示例</h2>
            <basic />
            <appearance />
            <operation />
            <scroll />
            <!-- 依赖 swiper 组件展示，暂不示例 -->
            <!-- <combination /> -->
            <equal-splits />
        </template>
    `;

    static components = {
        'basic': Basic,
        'appearance': Appearance,
        'scroll': Scroll,
        'operation': Operation,
        'equal-splits': EqualSplits
    };
}
