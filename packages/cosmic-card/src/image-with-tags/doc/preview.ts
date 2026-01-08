import {Component} from 'san';
import base from './base.md';
import position from './position.md';

export default class Doc extends Component {
    static template = `
        <template>
            <base/>
            <position/>
        </template>
    `;

    static components = {
        'base': base,
        'position': position
    };
}