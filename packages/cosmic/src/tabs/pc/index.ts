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
 * @file Tabs 组件
 */

import TabsBase from '../base';

export default class Tabs extends TabsBase {
    static template = `
        <div class="cos-tabs cos-tabs-{{appearance}} cos-tabs-arrow-{{arrowType}}">
            <div class="cos-tabs-header-container">
                <div
                    s-if="arrow && _showLeftArrowAndMargin"
                    class="cos-tabs-left-arrow"
                    on-click="handleLeftArrowClick"
                >
                    <cos-icon name="left" class="cos-tabs-icon"></cos-icon>
                </div>
                <div
                    s-ref="tabsHeader"
                    class="cos-tabs-header"
                    on-scroll="handleScroll"
                >

                    <slot name="tab"></slot>
                    <div
                        s-if="appearance === 'line'"
                        s-ref="lineIndicator"
                        class="cos-tab-indicator"
                    />
                </div>
                <div
                    s-if="arrow && _showRightArrowAndMargin"
                    class="cos-tabs-right-arrow"
                    on-click="handleRightArrowClick"
                >
                    <cos-icon name="right" class="cos-tabs-icon"></cos-icon>
                </div>
            </div>
            <div class="cos-tabs-content">
                <slot></slot>
            </div>
        </div>
    `;

    static computed = {
        ...super.computed
    };
}