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
 */

import {Component} from 'san';
import type {QuestionGuideData, QuestionGuideEvents, Item, Option} from './interface';
import Icon from '@cosui/cosmic/icon';
import {isURL} from '@cosui/cosmic/util';

export default class QuestionGuideBase extends Component<QuestionGuideData> {
    static template = /* html */ `
    <div
        class="cosd-question-guide{{scrollable
                ? ' cosd-question-guide-scrollable'
                : ' cosd-question-guide-no-scrollable'
            }}"
    >
        <div class="cosd-question-guide-title" s-if="title || icon">
            <img
                s-if="{{icon && isUrl(icon)}}"
                src="{{icon}}"
                class="cosd-question-guide-title-img"
            />
            <cos-icon
                s-if="{{icon && !isUrl(icon)}}"
                name="{{icon}}"
                class="cosd-question-guide-title-icon"
            />
            <span>{{title}}</span>
        </div>
        <!-- TODO: cosd-question-guide-item-swiper 为临时兼容A页场景增加 后续会删除 -->
        <div class="cosd-question-guide-items cosd-question-guide-item-swiper"  on-scroll="debounceScroll">
            <div
                s-for="item, itemIndex in items"
                class="cosd-question-guide-item"
            >
                <div
                    s-if="item.label"
                    class="cosd-question-guide-item-label"
                >{{item.label}}：</div>
                <div
                    s-for="option, optionIndex in item.options"
                    class="cosd-question-guide-option"
                >
                    <a
                        class="cosd-question-guide-option-content"
                        on-click="handleChange($event, item, itemIndex, option, optionIndex)"
                        s-bind="{{option.linkInfo}}"
                    >
                        <!-- TODO: @助手 option.image 修改后删除 -->
                        <i
                            s-if="{{option.image || isUrl(option.icon)}}"
                            class="cosd-question-guide-option-img"
                            style="background-image: url({{option.image || option.icon}})"
                        ></i>
                        <cos-icon
                            s-if="{{option.icon && !isUrl(option.icon)}}"
                            name="{{option.icon}}"
                            class="cosd-question-guide-option-icon"
                        />
                        <div class="cosd-question-guide-option-text">
                            {{option.value}}
                        </div>

                        <div s-if="{{option.caption}}" class="cosd-question-guide-option-caption">
                            {{option.caption}}
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    `;

    static trimWhitespace = 'all';

    static components = {
        'cos-icon': Icon
    };

    // 用于防止在同一个动画帧中重复触发回调
    ticking: boolean;
    // 动画 id 标识
    animationFrame: number | null;

    initData(): QuestionGuideData {
        return {
            title: '',
            icon: '',
            items: [],
            appearance: '',
            scrollable: false
        };
    }

    inited() {
        this.ticking = false;
    }

    debounceScroll(event: Event) {
        if (!this.ticking) {
            this.animationFrame = requestAnimationFrame(() => {
                this.handleScroll(event);
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    handleScroll(event: Event) {
        this.fire<QuestionGuideEvents['scroll']>('scroll', {event});
    }

    handleChange(event: Event, item: Item, index: number, option: Option, optionIndex: number) {
        event.preventDefault();

        this.fire<QuestionGuideEvents['change']>('change', {
            event,
            label: item.label,
            type: item.type,
            option: {...option},
            checked: true,
            optionIndex,
            index
        });
    }

    detached() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.animationFrame = null;
    }

    isUrl = isURL;
}
