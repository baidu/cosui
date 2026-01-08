/**
 * @file select/Option
 * @author
 */
import {Component} from 'san';
import {
    OptionState as State
} from './interface';

export default class Option extends Component<State> {
    isSelectOption: boolean = true;

    static template = `
        <template>
            <slot/>
        </template>
    `;

    initData() {
        return {
            disabled: false
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

export type TOption = typeof Option;
