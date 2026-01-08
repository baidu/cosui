/**
 * @file select/Selector
 * @author
 */

import {Component} from 'san';

import Input from './input';
import SingleSelector from './single-selector';

import {prefixCls, preventDefaultEvent, isValueArray, isValueString} from './util';
import {
    SelectorState as State,
    SelectorComputed as Computed,
    TDeSelectEventItem,
    RawValueType
} from './interface';

export default class Selector extends Component {
    static template = `
        <div class="${prefixCls}-selection__rendered">
            <div
                s-if="context.placeholder"
                class="${prefixCls}-selection__placeholder ${prefixCls}-unselectable"
                style="display: {{hidePlaceholder ? 'none' : 'block'}};"
                unselectable="on"
                on-click="handlePlaceholderClick"
                on-mousedown="preventDefaultEvent"
            >
                {{context.placeholder}}
            </div>
            <template s-if="context.modeConfig.single">
                <s-single-selector
                    s-if="context.value.length"
                    context="{{context}}"
                    inputValue="{{inputValue}}"
                />
                <div
                    s-if="context.showSearch"
                    class="${prefixCls}-search ${prefixCls}-search--inline"
                    style="display: {{context.open ? 'block' : 'none'}}"
                >
                    <s-input context="{{context}}" inputValue="{=inputValue=}" />
                </div>
            </template>
        </div>
    `;

    static components = {
        's-input': Input,
        's-single-selector': SingleSelector
    };

    static computed: Computed = {
        hidePlaceholder(this: Selector) {

            let hidden = false;
            const inputValue = this.data.get('inputValue');
            const {value = '', modeConfig} = this.data.get('context');

            if (isValueArray(value) || isValueString(value)) {
                if (inputValue || value.length) {
                    hidden = true;
                }
                if (modeConfig?.combobox && value.length === 1 && (value && !value[0])) {
                    hidden = false;
                }
            }

            return hidden;
        }
    };

    initData(): State {
        return {
            context: {},
            inputValue: ''
        };
    }

    handleChange(value: RawValueType[]) {
        (this.owner).fireChange(value);
    }

    handleDeselect(value: TDeSelectEventItem) {
        this.owner.fire('deselect', value);
    }

    handlePlaceholderClick() {
        (this.owner).handlePlaceholderClick();
    }

    preventDefaultEvent = preventDefaultEvent;
}