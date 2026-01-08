import {Component} from 'san';
import Default from './default.md';
import Placeholder from './placeholder.md';
import Ratio from './ratio.md';
import FitAndPosition from './fit-and-position.md';
import Label from './label.md';
import Special from './special.md';

export default class Doc extends Component {
    static template = `
        <template>
            <default/>
            <fit-and-position/>
            <label/>
            <ratio/>
            <placeholder/>
            <special/>
        </template>
    `;

    static components = {
        'default': Default,
        'placeholder': Placeholder,
        'ratio': Ratio,
        'fit-and-position': FitAndPosition,
        'label': Label,
        'special': Special
    };
}
