import {Component} from 'san';
import Basic from './basic.md';
import Trigger from './trigger.md';
import Delay from './delay.md';
import Link from './link.md';
import Position from './position.md';
import Close from './close.md';
export default class Doc extends Component {
    static template = `
        <template>
            <basic/>
            <trigger/>
            <close/>
            <delay/>
            <position/>
            <link/>
        </template>
    `;

    static components = {
        'basic': Basic,
        'trigger': Trigger,
        'close': Close,
        'delay': Delay,
        'position': Position,
        'link': Link
    };
}