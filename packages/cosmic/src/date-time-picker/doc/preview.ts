import {Component} from 'san';
import Basic from './basic.md';
import EntrySlot from './entry-slot.md';

export default class Preview extends Component {
    static template = `
        <template>
            <basic />
            <entry-slot />
        </template>
    `;

    static components = {
        'basic': Basic,
        'entry-slot': EntrySlot
    };
}