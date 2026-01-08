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
 * @file vote
 */

import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import Fold from '@cosui/cosmic/fold';
import Avatar from '@cosui/cosmic/avatar';
import type{VoteData, VoteEvents, Option} from './interface';
import {PKIcon} from './svg';

export default class Vote extends Component<VoteData> {
    static trimWhitespace = 'all';
    static template = `
        <div class="cos-vote cos-vote-{{appearance}}">
            <template s-if="appearance === '1v1' && options.length === 2">
                <div
                    s-if="!target"
                    class="cos-vote-options"
                    s-transition="opacityTransLeave(40, 'ease-in')"
                >
                    <div
                        s-for="option, index in options"
                        class="cos-vote-option {{ index === 0 ? 'cos-vote-target-left' : 'cos-vote-target-right' }}"
                        on-click="handleOptionClick(option)"
                    >
                        <cos-avatar
                            s-if="option.target.image"
                            size="sm"
                            class="cos-vote-option-image"
                            src="{{ option.target.image }}"
                        />
                        <span class="cos-vote-option-name">{{ option.target.name }}</span>
                    </div>
                    <div class="cos-vote-vs" s-html="pkIcon"></div>
                </div>
                <div
                    s-else
                    class="cos-vote-results"
                >
                    <div class="cos-vote-result-bar">
                        <div
                            s-for="option, index in options"
                            class="cos-vote-result-bar-item {{ index === 0 ?
                            'cos-vote-result-bar-left' : 'cos-vote-result-bar-right' }}"
                            style="width: calc({{option.value * 100}}% + 8px)"
                        >
                        </div>
                    </div>
                    <div class="cos-vote-result-targets">
                        <div
                            s-for="option, index in options"
                            class="cos-vote-result-target {{ index === 0 ?
                            'cos-vote-target-left' : 'cos-vote-target-right' }}"
                        >
                            <cos-icon
                                s-if="isTarget(option,target)"
                                class="cos-space-m-3xs cos-space-mt-none cos-space-mb-none"
                                name="check-circle-fill"
                            />
                            <span class="cos-vote-result-value cos-space-m-3xs">{{ getValue(option) }}</span>
                            <div class="cos-space-m-3xs cos-space-mt-none cos-space-mb-none">
                                <cos-avatar
                                    s-if="option.target.image"
                                    size="xs"
                                    src="{{ option.target.image }}"
                                />
                            </div>
                            <span class="cos-vote-result-name">{{ option.target.name }}</span>
                        </div>
                    </div>
                </div>
            </template>
            <template s-if="appearance === 'horizontal' || appearance === 'vertical'">
                <component
                    s-is="{{ options.length <= 4 ? 'div' : 'cos-fold' }}"
                    fold-height="126"
                    unfold-text="全部{{ options.length }}个选项"
                >
                    <div class="cos-vote-options {{!target? '':'cos-vote-results-list'}}">
                        <div
                            s-for="option, index in options"
                            class="cos-vote-option {{isTarget(option,target)? 'cos-vote-target':''}}"
                            on-click="handleOptionClick(option)"
                        >
                                <cos-avatar
                                    s-if="option.target.image"
                                    size="sm"
                                    class="cos-vote-option-image"
                                    src="{{ option.target.image }}"
                                />
                                <span class="cos-vote-option-name">{{ option.target.name }}</span>
                                <div s-if="isTarget(option,target)" class="cos-vote-option-placeholder">
                                    <div class="cos-vote-option-target-icon">
                                        <cos-icon name="check" />
                                    </div>
                                </div>
                                <div
                                    s-if="target"
                                    class="cos-vote-option-result-bar"
                                    style="width: {{ option.value * 100 }}%"
                                ></div>
                                <span s-if="target" class="cos-vote-option-result-value">{{ getValue(option) }}</span>
                        </div>
                    </div>
                </component>
            </template>
        </div>
    `;

    static components = {
        'cos-icon': Icon,
        'cos-fold': Fold,
        'cos-avatar': Avatar
    };

    initData(): VoteData & {pkIcon: string} {
        return {
            appearance: '1v1',
            options: [],
            targetName: 'name',
            target: null,
            pkIcon: PKIcon
        };
    }

    // 处理用户点击可选项的逻辑
    handleOptionClick(option: Option) {
        // 如果当前没有选中的选项，则触发 option-click 事件
        if (this.data.get('target') === null) {
            const targetName = this.data.get('targetName');
            if (targetName) {
                this.fire<VoteEvents['option-click']>('option-click', option.target[targetName]);
            }
        }
    }

    // 获取选项最终显示的值
    getValue(option: Option): string {
        if (option.text) {
            return option.text;
        }
        if (option.value) {
            const decimalPlaces = (option.value.toString().split('.')[1] || '').length - 2;
            // 乘以100，保留相应的精度
            return `${(option.value * 100).toFixed(Math.max(0, decimalPlaces))}%`;
        }
        return '0%';
    }

    // 判断当前选项是否是目标选项
    isTarget(option: Option, target: any): boolean {
        if (!target || !this.data.get('targetName')) {
            return false;
        }
        return target === option.target[this.data.get('targetName')];
    }

    // 过渡动画生成器，详见 https://baidu.github.io/san/tutorial/transition/
    opacityTransLeave(duration: number, easing: string) {
        return {
            leave: function (el: any, done: any) {
                el.style.transition = `opacity ${duration}ms ${easing}`;
                el.style.opacity = 1;
                let timeout: ReturnType<typeof setTimeout> | null = setTimeout(done, duration + 10); // 超时保障，防止 transitionend 未触发

                function onTransitionEnd() {
                    done();
                    timeout && clearTimeout(timeout);
                    timeout = null;
                    el.removeEventListener('transitionend', onTransitionEnd);
                }

                requestAnimationFrame(() => {
                    el.style.opacity = 0;
                    el.addEventListener('transitionend', onTransitionEnd, {once: true});
                });
            }
        };
    }
}
