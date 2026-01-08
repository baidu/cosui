/**
 * @file select/OptGroup
 * @author
 */
import {Component} from 'san';

export default class OptGroup extends Component {

    static template = `
        <template>
            <slot/>
        </template>
    `;

    inited() {
        return {
            options: []
        };
    }

    attached() {
        this.dispatch('select:updateOptions', null);
    }

    updated() {
        this.dispatch('select:updateOptions', null);
    }

    detached() {
        this.dispatch('select:updateOptions', null);
    }
};

export type TOptGroup = typeof OptGroup;
