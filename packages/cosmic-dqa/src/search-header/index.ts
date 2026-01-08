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
import type {SearchHeaderData, SearchHeaderEvents} from './interface';
import Icon from '@cosui/cosmic/icon';

export default class SearchHeader extends Component<SearchHeaderData> {

    static template = `
        <div class="cosd-search-header cosd-search-header-{{appearance}}">
            <div class="cosd-search-header-brand-area">
                <div class="cosd-search-header-brand-ai">
                    <img
                        src="{{logo}}"
                        class="img-light cosd-search-header-brand-ai-image"
                    />
                    <img
                        src="{{logoDark}}"
                        class="img-dark cosd-search-header-brand-ai-image"
                    />
                </div>
                <div s-if="brandLogo || brandLogoDark" class="cosd-search-header-brand-logo">
                    <div class="cosd-search-header-brand-logo-divider"></div>
                    <img
                        src="{{brandLogo}}"
                        class="img-light cosd-search-header-brand-logo-image"
                    >
                    <img
                        src="{{brandLogoDark || brandLogo}}"
                        class="img-dark cosd-search-header-brand-logo-image"
                    >
                </div>
                <div
                    s-if="citationCount > 0 && !overview"
                    class="cosd-search-header-citation"
                    on-click="handleClick"
                >
                    总结全网{{citationCount}}篇{{subjective ? '真实经验' : '结果'}}
                    <span>
                        <cos-icon s-if="expanded===true" name="up"/>
                        <cos-icon s-else-if="expanded===false" name="down"/>
                    </span>
                </div>
                <div
                    s-if="overview"
                    class="cosd-search-header-overview"
                    on-click="handleOverviewClick"
                >
                    {{overview}}
                </div>
            </div>
            <div class="cosd-search-header-functional-area">
                <slot></slot>
            </div>
        </div>
    `;

    static components = {
        'cos-icon': Icon
    };

    initData(): SearchHeaderData {
        return {
            // 品牌logo
            logo: 'https://gips2.baidu.com/it/u=1009531835,1711006677&fm=3028&app=3028&f=PNG&fmt=auto&q=90&size=f187_48',
            logoDark: 'https://gips3.baidu.com/it/u=397455163,2412254865&fm=3028&app=3028&f=PNG&fmt=auto&q=90&size=f187_48',
            // 联名品牌logo链接
            brandLogo: '',
            brandLogoDark: '',
            // 总结文案
            overview: '',
            // 溯源数量
            citationCount: 0,
            subjective: false,
            appearance: 'primary',
            expanded: undefined
        };
    }
    handleClick(event: Event) {
        let expanded = this.data.get('expanded');
        if (expanded !== undefined) {
            expanded = !expanded;
            this.data.set('expanded', expanded);
        }
        this.fire<SearchHeaderEvents['citation-click']>('citation-click', {event, expanded});
    }

    handleOverviewClick(event: Event) {
        this.fire<SearchHeaderEvents['overview-click']>('overview-click', {event});
    }
}
