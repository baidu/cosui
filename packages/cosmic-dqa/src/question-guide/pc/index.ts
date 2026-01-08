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

import QuestionGuideBase from '../base';
import type {QuestionGuideEvents} from '../interface';

export default class QuestionGuide extends QuestionGuideBase {
    static template = /* html */ `
    <div class="cosd-question-guide {{scrollable ? 'cosd-question-guide-scrollable' : ''}}">
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
        <div class="cosd-question-guide-items-container">
            <!-- TODO: cosd-question-guide-item-swiper 为临时兼容A页场景增加 后续会删除 -->
            <div class="cosd-question-guide-items cosd-question-guide-item-swiper">
                <div
                    s-ref="swiperList"
                    class="cosd-question-guide-items-content"
                    style="transform: translate({{_transOffset}}px);"
                >
                    <div
                        s-for="item, itemIndex in items"
                        class="cosd-question-guide-item"
                    >
                        <div
                            s-if="item.label"
                            class="cosd-question-guide-item-label"
                        >{{item.label}}：</div>
                        <!-- TODO: cos-swiper-item 为临时兼容A页场景增加 后续会删除 -->
                        <div
                            s-for="option, optionIndex in item.options"
                            class="cosd-question-guide-option cos-swiper-item"
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
                            </a>
                        </div>
                    </div>
                </div>
                <!-- pc横滑控件 -->
                <div s-if="scrollable" class="cos-swiper-control">
                    <div
                        s-if="_showPrev"
                        class="cos-swiper-control-prev"
                        on-click="onPrev()"
                    >
                        <cos-icon class="cos-swiper-control-icon" name="left" />
                    </div>
                    <div
                        s-if="_showNext"
                        class="cos-swiper-control-next"
                        on-click="onNext()"
                    >
                        <cos-icon class="cos-swiper-control-icon" name="right" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    static trimWhitespace = QuestionGuideBase.trimWhitespace;
    static components = QuestionGuideBase.components;

    swiperList: HTMLElement;

    initData() {
        return {
            ...super.initData(),
            _transOffset: 0,
            _showPrev: false,
            _showNext: true
        };
    }

    attached() {
        const swiperList = this.ref('swiperList') as unknown as HTMLElement;
        this.swiperList = swiperList;
        this.nextTick(() => {
            const windowWidth = swiperList.offsetWidth;
            const totalWidth = swiperList.scrollWidth;
            if (totalWidth <= windowWidth) {
                this.data.set('_showNext', false);
            }
        });
    }

    onPrev() {
        this.fire<QuestionGuideEvents['scroll']>('scroll', {
            action: 'slideslip'
        });
        let oldTransOffset = this.data.get('_transOffset');
        // swiper窗口
        const swiperList = this.swiperList;
        // 视口宽度
        const windowWidth = swiperList.offsetWidth;
        if (oldTransOffset + windowWidth >= 0) {
            this.data.set('_showPrev', false);
            this.data.set('_transOffset', 0);
        }
        else {
            this.data.set('_transOffset', oldTransOffset + windowWidth);
        }
        this.data.set('_showNext', true);
    }

    onNext() {
        this.fire<QuestionGuideEvents['scroll']>('scroll', {
            action: 'slideslip'
        });
        let oldTransOffset = this.data.get('_transOffset');
        // swiper窗口
        const swiperList = this.swiperList;
        // 视口宽度
        const windowWidth = swiperList.offsetWidth;
        const totalWidth = swiperList.scrollWidth;
        if (oldTransOffset - windowWidth <= windowWidth - totalWidth) {
            this.data.set('_showNext', false);
            this.data.set('_transOffset', windowWidth - totalWidth);
        }
        else {
            this.data.set('_transOffset', oldTransOffset - windowWidth);
        }
        this.data.set('_showPrev', true);
    }

}
