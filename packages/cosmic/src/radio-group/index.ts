/*
 * Copyright (c) Baidu, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 * @file RadioGroup 组件
 */

import {Component} from 'san';
import type Radio from '@cosui/cosmic/radio';
import type {RadioGroupData, RadioGroupEvents, RadioGroupProps} from './interface';

export default class RadioGroup extends Component<RadioGroupData> {
    static template = `
        <div class="cos-radio-group">
            <slot></slot>
        </div>
    `;

    static messages = {
        'cos:radio-attached'(this: RadioGroup, arg: {value: unknown, target: Radio}) {
            this.radios.push(arg.target);
            this.updateChildRadios();
        },
        /**
         * 响应来自 radio 子组件派发的选中状态被切换的消息
         *
         * @param {Object} arg 消息参数
         */
        'cos:radio-checked-changed'(this: RadioGroup, arg: {
            value: {value: unknown, event: Event};
            target: Radio;
        }) {
            // 更新 RadioGroup 的 value 属性值
            const {value, event} = arg.value;
            this.data.set('value', value as string | number);
            this.updateChildRadios();
            // 派发自定义 change 事件，供开发者使用
            this.fire<RadioGroupEvents['change']>('change', {
                value,
                event
            });
        }
    };

    radios: Radio[];

    initData(): RadioGroupProps {
        return {
            disabled: false,
            value: undefined
        };
    }

    created() {
        this.radios = [];

        this.watch('disabled', disabled => {
            this.radios.forEach((childRadio: Radio) => {
                childRadio.data.set('disabled', disabled);
            });
        });

        this.watch('value', () => {
            this.updateChildRadios();
        });
    }

    /**
     * 更新所有子单选按钮的状态
     *
     * 根据当前组件的value和disabled状态，同步更新所有子单选按钮的选中状态和禁用状态
     */
    updateChildRadios() {
        const value = this.data.get('value');
        const disabled = this.data.get('disabled');
        this.radios.forEach((childRadio: Radio) => {
            childRadio.data.set('checked', value === childRadio.data.get('value'));
            childRadio.data.set('disabled', childRadio.data.get('disabled') || disabled);
        });
    }

    detached() {
        this.radios = [];
    }
}
