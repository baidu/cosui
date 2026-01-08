import {Component} from 'san';
import Default from './default.md';
import Ratio from './ratio.md';
import Dynamic from './dynamic.md';
import Grid from './grid.md';

export default class Doc extends Component {
    static template = `
        <template>
            <default />
            <ratio />
            <dynamic />
            <grid />
        </template>
    `;

    static components = {
        'default': Default,
        'ratio': Ratio,
        'dynamic': Dynamic,
        'grid': Grid
    };
}
