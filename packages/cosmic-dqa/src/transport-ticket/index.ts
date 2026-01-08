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
 * @file transport-ticket 组件
 */

import {Component} from 'san';
import type {TransportTicketData} from './interface';
import Image from '@cosui/cosmic/image';

export default class TransportTicket extends Component<TransportTicketData> {

    static trimWhitespace = 'all';

    static template = `
        <component
            s-is="linkInfo && linkInfo.href ? 'a' : 'div'"
            s-bind="{{linkInfo}}"
            class="cosd-transport-ticket {{_isActive ? 'cosd-transport-ticket-active' : ''}}"
            on-touchstart="handleTouch($event, true)"
            on-mousedown="handleTouch($event, true)"
            on-touchend="handleTouch($event, false)"
            on-mouseup="handleTouch($event, false)"
        >
            <div class="cosd-transport-ticket-item cosd-transport-ticket-from">
                <div class="cosd-transport-ticket-from-time">
                    {{departTime}}
                </div>
                <div class="cosd-transport-ticket-from-location">
                    {{from}}
                </div>
            </div>
            <div
                s-ref="duration"
                class="cosd-transport-ticket-item cosd-transport-ticket-duration">
                <div class="cosd-transport-ticket-duration-time">
                    {{duration}}
                </div>
                <div class="cosd-transport-ticket-duration-right"></div>
                <div
                    s-if="type === 'train'"
                    class="cosd-transport-ticket-duration-number"
                >
                    {{number}}
                </div>
            </div>
            <div
                s-ref="arrive"
                class="cosd-transport-ticket-item cosd-transport-ticket-to"
            >
                <div class="cosd-transport-ticket-to-time">
                    {{arriveTime}}
                </div>
                <div class="cosd-transport-ticket-to-location">
                    {{to}}
                </div>
            </div>
            <div
                class="cosd-transport-ticket-item cosd-transport-ticket-price">
                <div class="cosd-transport-ticket-price-number">
                    ¥{{price}}
                </div>
                <div
                    s-if="discount"
                    class="cosd-transport-ticket-price-discount"
                >
                    {{level}}{{discount}}
                </div>
            </div>
            <div
                s-if="type === 'train' && seats && seats.length > 0"
                class="cosd-transport-ticket-seat
                    {{_seatsLeftMask || _seatsRightMask ? 'cosd-transport-ticket-seat-scrollable' : ''}}"
            >
                <div s-if="_seatsLeftMask" class="cosd-transport-ticket-seat-left-mask"></div>
                <div s-if="_seatsRightMask" class="cosd-transport-ticket-seat-right-mask"></div>
                <div
                    s-ref="seats"
                    class="cosd-transport-ticket-seat-scroll"
                    on-scroll="updateSeatsMaskVisibility"
                >
                    <div
                        s-for="seat, index in _seats"
                        s-ref="seat-{{index}}"
                        class="cosd-transport-ticket-seat-item
                            {{seat.show ? '' : 'cosd-transport-ticket-seat-item-hidden'}}"
                    >
                        <span
                            class="cosd-transport-ticket-seat-item-level"
                        >
                            {{seat.type}}
                        </span>
                        <span
                            class="cosd-transport-ticket-seat-item-remaining
                                {{seat.disabled ? 'cosd-transport-ticket-seat-item-remaining-disabled' : ''}}"
                        >
                            {{seat.remaining}}
                        </span>
                    </div>
                </div>
            </div>
            <div
                s-if="type === 'flight' && _descArray.length > 0"
                class="cosd-transport-ticket-descs"
            >
                <span
                    s-for="item, index in _descArray"
                    class="cosd-transport-ticket-descs-item"
                >
                    {{item}}
                </span>
            </div>
            <div class="cosd-transport-ticket-service">
                {{service}}
            </div>
        </component>
    `;

    static components = {
        'cos-image': Image
    };

    static computed = {
        _descArray(this: TransportTicket) {
            const operator = this.data.get('operator') || '';
            const number = this.data.get('number') || '';
            const model = this.data.get('model') || '';
            return [
                operator,
                number,
                model
            ];
        },
        _seats(this: TransportTicket) {
            const seats = this.data.get('seats');
            if (!seats || !seats.length) {
                return;
            }
            const paddedSeats = seats.map(seat => {
                let remaining = seat?.remaining || '';
                const remainingNum = remaining.match(/\d+/)?.[0];
                if (remainingNum) {
                    remaining = `余${remainingNum}`;
                }
                return {
                    ...seat,
                    remaining,
                    disabled: seat.remaining === '无票',
                    show: true
                };
            });
            return paddedSeats;
        }
    };
    boundUpdateSeatsMaskVisibility: () => void;
    initData(): TransportTicketData {
        return {
            type: 'train',
            from: '',
            to: '',
            departTime: '',
            arriveTime: '',
            price: 0,
            duration: '',
            operator: '',
            number: '',
            level: '',
            discount: '',
            seats: [],
            linkInfo: {},
            model: ''
        };
    }

    attached() {
        this.nextTick(() => {
            this.updateSeatsMaskVisibility();
        });
        this.boundUpdateSeatsMaskVisibility = this.updateSeatsMaskVisibility.bind(this);
        // 监听窗口大小变化（内容宽度可能改变）
        window.addEventListener('resize', this.boundUpdateSeatsMaskVisibility);
    }
    detached() {
        window.removeEventListener('resize', this.boundUpdateSeatsMaskVisibility);
    }

    updateSeatsMaskVisibility() {
        const scrollContainer = this.ref('seats');
        if (!scrollContainer) {
            return;
        }
        // 检测是否能向左滚动（不在最左端)
        const canScrollLeft = scrollContainer.scrollLeft > 0;

        // 检测是否能向右滚动（不在最右端）
        const canScrollRight
            = scrollContainer.scrollWidth > scrollContainer.clientWidth + scrollContainer.scrollLeft + 1;
        this.data.set('_seatsLeftMask', canScrollLeft);
        this.data.set('_seatsRightMask', canScrollRight);
    }

    handleTouch(e: Event, isStart: boolean) {
        if (!isStart) {
            this.data.set('_isActive', false);
            return;
        }
        const touchTarget = e?.target;
        if (!touchTarget?.closest('.cosd-transport-ticket-seat-scrollable')) {
            this.data.set('_isActive', true);
        }
    }
}