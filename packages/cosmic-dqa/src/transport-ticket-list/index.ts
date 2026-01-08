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
 * @file transport-ticket-list 组件
 */

import {Component} from 'san';
import type {TransportTicketListData, TransportTicketListEvents} from './interface';
import FoldSwitch from '@cosui/cosmic/fold-switch';
import TransportTicket from '@cosui/cosmic-dqa/transport-ticket';

export default class TransportTicketList extends Component<TransportTicketListData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cosd-transport-ticket-list">
            <div class="cosd-transport-ticket-list-content">
                <fragment s-for="group, groupIndex in groups">
                    <div
                        s-if="groupIndex < _showGroupNum"
                        class="cosd-transport-ticket-list-group{{
                            group.animating ? ' cosd-transport-ticket-list-group-animating' : ''}}"
                    >
                        <div
                            s-for="item, idx in group.items"
                            on-click="handleClick(group.startIndex + idx)"
                        >
                            <div
                                s-if="{{groupIndex !== 0 || idx !== 0}}"
                                class="cos-divider"
                            >
                            </div>
                            <cosd-transport-ticket
                                s-bind="{{item}}"
                            />
                        </div>
                    </div>
                </fragment>
            </div>
            <div
                s-if="{{showMore}}"
                class="cosd-transport-ticket-list-fold"
            >
                <div class="cos-divider"></div>
                <cos-fold-switch
                    folded
                    on-toggle="clickFold"
                />
                <div class="cos-divider"></div>
            </div>
        </div>
    `;

    static components = {
        'cosd-transport-ticket': TransportTicket,
        'cos-fold-switch': FoldSwitch
    };
    static computed = {
        groups(this: TransportTicketList) {
            const items = this.data.get('items') || [];
            const groupSize = 3;
            const groups = [];
            for (let i = 0; i < items.length; i += groupSize) {
                groups.push({
                    items: items.slice(i, i + groupSize),
                    startIndex: i,
                    animating: i > 0
                });
            }
            return groups;
        },
        showMore(this: TransportTicketList) {
            const groups = this.data.get('groups') || [];
            return this.data.get('_showGroupNum') < groups.length;
        }
    };

    initData(): TransportTicketListData {
        return {
            items: [],
            // 当前显示的组数
            _showGroupNum: 1
        };
    }

    clickFold() {
        const showGroupNum = this.data.get('_showGroupNum');
        this.data.set('_showGroupNum', showGroupNum + 1);
        this.fire('more-click');
    }

    handleClick(index: number) {
        this.fire<TransportTicketListEvents['click']>('click', {index});
    }
}