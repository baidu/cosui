import {Component} from 'san';
import Basic from './basic.md';
import Operate from './operate.md';
import Appearance from './appearance.md';
import Mask from './mask.md';
export default class Doc extends Component {
    static template = `
        <template>
            <basic/>
            <operate/>
            <appearance/>
            <mask/>
        </template>
    `;

    static components = {
        'basic': Basic,
        'appearance': Appearance,
        'operate': Operate,
        'mask': Mask
    };
}