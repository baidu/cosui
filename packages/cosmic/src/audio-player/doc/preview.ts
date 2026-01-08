import {Component} from 'san';
import demo from './default.md';
import enhance from './enhance.md';
import loop from './loop.md';
import multi from './multi.md';
export default class Doc extends Component {
    static template = `
        <template>
            <demo/>
            <enhance/>
            <loop/>
            <multi/>
        </template>
    `;

    static components = {
        'demo': demo,
        'enhance': enhance,
        'loop': loop,
        'multi': multi
    };
}
