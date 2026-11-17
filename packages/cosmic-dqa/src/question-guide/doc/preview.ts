import {Component} from 'san';
import DefaultDemo from './default.md';
import ScrollDemo from './scroll.md';
import MultiRowsDemo from './multi-rows.md';
import RadioHighlightDemo from './selected-highlight.md';
import CheckboxHighlightDemo from './checkbox-highlight.md';

export default class Preview extends Component {
    static template = `
        <template>
            <default />
            <question-scroll />
            <multi-rows />
            <radio-highlight />
            <checkbox-highlight />
        </template>
    `;
    static components = {
        'default': DefaultDemo,
        'question-scroll': ScrollDemo,
        'multi-rows': MultiRowsDemo,
        'radio-highlight': RadioHighlightDemo,
        'checkbox-highlight': CheckboxHighlightDemo
    };
}
