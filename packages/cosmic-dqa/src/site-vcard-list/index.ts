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
 * @file site-vcard-list 组件
 */

import {Component} from 'san';
import type {SiteVcardListData, SiteVcardListEvents} from './interface';
import SiteVcard from '../site-vcard/index';
import FoldSwitch from '@cosui/cosmic/fold-switch';

export default class SiteVcardList extends Component<SiteVcardListData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cosd-site-vcard-list">
            <div class="cosd-site-vcard-list-content">
                <fragment s-for="group, groupIndex in groups">
                    <div
                        s-if="groupIndex < _showGroupNum"
                        class="cosd-site-vcard-list-group{{
                            group.animating ? ' cosd-site-vcard-list-group-animating' : ''}}"
                    >
                        <div s-for="item, idx in group.items"
                            class="cosd-site-vcard-list-item-container"
                            on-click="handleItemClick(group.startIndex + idx)"
                        >
                            <component
                                s-is="{{item.linkInfo && item.linkInfo.href ? 'a' : 'div'}}"
                                s-bind="{{item.linkInfo}}"
                                class="cosd-site-vcard-list-item"
                            >
                                <cosd-site-vcard
                                    s-bind="{{item.filteredProps}}"
                                />
                            </component>
                        </div>
                    </div>
                </fragment>
            </div>
            <div
                s-if="{{showMore}}"
                class="cosd-site-vcard-list-fold"
            >
                <cos-fold-switch
                    folded
                    on-toggle="clickFold"
                />
            </div>
        </div>
    `;

    static components = {
        'cosd-site-vcard': SiteVcard,
        'cos-fold-switch': FoldSwitch
    };

    static computed = {
        groups(this: SiteVcardList) {
            const items = this.data.get('items') || [];
            const folded = this.data.get('folded');
            const defaultText = '点击查看详情';

            const processItems = (list: SiteVcardListData['items']) =>
                list.map(item => {
                    const {linkInfo, caption, appearance, ...rest} = item;
                    return {
                        linkInfo,
                        filteredProps: {
                            ...rest,
                            caption: caption || defaultText,
                            appearance: appearance || 'filled'
                        }
                    };
                });

            const groups = [];

            if (!folded) {
                groups.push({
                    items: processItems(items),
                    startIndex: 0,
                    animating: false
                });
                return groups;
            }

            const initialCount = folded.initialCount > 0 ? folded.initialCount : 2;
            const nextCount = folded.nextCount > 0 ? folded.nextCount : 4;

            groups.push({
                items: processItems(items.slice(0, initialCount)),
                startIndex: 0,
                animating: false
            });

            for (let i = initialCount; i < items.length; i += nextCount) {
                groups.push({
                    items: processItems(items.slice(i, i + nextCount)),
                    startIndex: i,
                    animating: true
                });
            }
            return groups;
        },
        showMore(this: SiteVcardList) {
            const groups = this.data.get('groups') || [];
            return this.data.get('_showGroupNum') < groups.length;
        }
    };

    initData(): SiteVcardListData {
        return {
            items: [],
            folded: false,
            _showGroupNum: 1
        };
    }

    clickFold() {
        const showGroupNum = this.data.get('_showGroupNum');
        this.data.set('_showGroupNum', showGroupNum + 1);
        this.fire('more-click');
    }

    handleItemClick(index: number) {
        this.fire<SiteVcardListEvents['click']>('click', {index});
    }
}
