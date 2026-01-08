import {Component} from 'san';
import Basic from './basic.md';
import Range from './range.md';
import Rolling from './rolling.md';
import RollingRange from './rolling-range.md';

export default class Preview extends Component {
    static template = `
        <template>
            <basic />
            <range />
            <rolling />
            <rolling-range />
        </template>
    `;

    static components = {
        'basic': Basic,
        'range': Range,
        'rolling': Rolling,
        'rolling-range': RollingRange
    };
}