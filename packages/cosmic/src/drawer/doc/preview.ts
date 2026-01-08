import {Component} from 'san';
import Basic from './basic.md';
import Position from './position.md';
import Size from './size.md';
import Title from './title.md';

export default class Doc extends Component {
    static template = `
        <template>
            <basic/>
            <position/>
            <size/>
            <title/>
        </template>
    `;

    static components = {
        'basic': Basic,
        'position': Position,
        'size': Size,
        'title': Title
    };
}