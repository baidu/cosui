import {Component} from 'san';
import DefaultDemo from './default.md';
import ScrollDemo from './scroll.md';
import MultiRowsDemo from './multi-rows.md';

export default class Preview extends Component {
    static template = `
        <template>
            <default />
            <question-scroll />
            <multi-rows />
        </template>
    `;
    static components = {
        'default': DefaultDemo,
        'question-scroll': ScrollDemo,
        'multi-rows': MultiRowsDemo
    };
}
