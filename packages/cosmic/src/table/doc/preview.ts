import {Component} from 'san';
import Basic from './basic.md';
import SpanCell from './span-cell.md';
import HeaderSlot from './header-slot.md';
import CellSlot from './cell-slot.md';
import FixedColumn from './fixed-column.md';

export default class Doc extends Component {
    static template = `
        <template>
            <basic />
            <fixed-column />
            <header-slot />
            <cell-slot />
            <span-cell />
        </template>
    `;

    static components = {
        'basic': Basic,
        'fixed-column': FixedColumn,
        'header-slot': HeaderSlot,
        'cell-slot': CellSlot,
        'span-cell': SpanCell
    };
}