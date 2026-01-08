import {Component} from 'san';
import demo from './default.md';
import multi from './multi.md';
import ratio from './ratio.md';
import fit from './fit.md';
import custom from './custom.md';
import label from './label.md';
import scrollable from './scrollable.md';
import customCombination from './custom-combination.md';

export default class Doc extends Component {
    static template = `
        <template>
            <default/>
            <multi/>
            <ratio/>
            <fit/>
            <custom/>
            <label/>
            <custom-com />
            <scrollable/>
        </template>
    `;

    static components = {
        'multi': multi,
        'ratio': ratio,
        'fit': fit,
        'custom': custom,
        'default': demo,
        'label': label,
        'custom-com': customCombination,
        'scrollable': scrollable
    };
}
