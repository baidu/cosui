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
                <div  s-if="!transfer" class="cosd-transport-ticket-duration-right"></div>
                <div
                    s-if="!transfer && type === 'train'"
                    class="cosd-transport-ticket-duration-number"
                >
                    {{number}}
                </div>
                <div
                    s-if="transfer"
                    class="cosd-transport-ticket-duration-transfer"
                >
                    <div class="cosd-transport-ticket-duration-transfer-station-wrapper">
                        <div class="cosd-transport-ticket-duration-transfer-station-line"></div>
                        <div class="cosd-transport-ticket-duration-transfer-station-badge">
                            {{transfer.station}}
                        </div>
                        <div class="cosd-transport-ticket-duration-transfer-station-line"></div>
                    </div>
                    <div s-if="transfer.waitTime" class="cosd-transport-ticket-duration-transfer-time">
                        {{transfer.waitTime}}
                    </div>
                </div>
            </div>
            <div
                s-ref="arrive"
                class="cosd-transport-ticket-item cosd-transport-ticket-to"
            >
                <div class="cosd-transport-ticket-to-time">
                    <div class="cosd-transport-ticket-to-time-text">
                        {{arriveTime}}
                    </div>
                    <span
                        s-if="crossDays && crossDays > 0"
                        class="cosd-transport-ticket-to-crossdays"
                    >
                        +{{crossDays}}
                    </span>
                </div>
                <div class="cosd-transport-ticket-to-location">
                    {{to}}
                </div>
            </div>
            <div
                class="cosd-transport-ticket-item cosd-transport-ticket-price">
                <span class="cosd-transport-ticket-price-wrapper">
                    <span class="cosd-transport-ticket-price-prefix">¥</span>
                    <span class="cosd-transport-ticket-price-number">
                        {{price}}
                    </span>
                    <span class="cosd-transport-ticket-price-suffix">起</span>
                </span>
                <div
                    s-if="discount"
                    class="cosd-transport-ticket-price-discount"
                >
                    {{level}}{{discount}}
                </div>
            </div>
            <div
                s-if="!transfer && type === 'train' && seats && seats.length > 0"
                class="cosd-transport-ticket-seat
                    {{_seatsLeftMask || _seatsRightMask ? 'cosd-transport-ticket-seat-scrollable' : ''}}"
            >
                <div s-if="_seatsLeftMask" class="cosd-transport-ticket-seat-left-mask"></div>
                <div s-if="_seatsRightMask" class="cosd-transport-ticket-seat-right-mask"></div>
                <div
                    s-ref="seats"
                    class="cosd-transport-ticket-seat-scroll"
                    on-scroll="updateScrollMask('seats', '_seatsLeftMask', '_seatsRightMask')"
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
                s-if="!transfer && type === 'flight' && _descArray.length > 0"
                class="cosd-transport-ticket-descs"
            >
                <span
                    s-for="item, index in _descArray"
                    class="cosd-transport-ticket-descs-item"
                >
                    {{item}}
                </span>
            </div>
            <div
                s-if="transfer && transfer.segments && transfer.segments.length > 0 && type === 'train'"
                class="cosd-transport-ticket-transfer
                    {{_transferLeftMask || _transferRightMask ? 'cosd-transport-ticket-transfer-scrollable' : ''}}"
            >
                <div s-if="_transferLeftMask" class="cosd-transport-ticket-transfer-left-mask"></div>
                <div s-if="_transferRightMask" class="cosd-transport-ticket-transfer-right-mask"></div>
                <div
                    s-ref="transfer"
                    class="cosd-transport-ticket-transfer-scroll cosd-transport-ticket-transfer-train"
                    on-scroll="updateScrollMask('transfer', '_transferLeftMask', '_transferRightMask')"
                >
                    <div
                        s-for="segment, index in transfer.segments"
                        class="cosd-transport-ticket-transfer-segment"
                    >
                        <div class="cosd-transport-ticket-transfer-segment-info">
                            <div class="cosd-transport-ticket-transfer-segment-number-wrapper">
                                <div class="cosd-transport-ticket-transfer-segment-badge">
                                    {{index + 1}}
                                </div>
                                <div class="cosd-transport-ticket-transfer-segment-number">
                                    {{segment.number}}
                                </div>
                            </div>
                            <div
                                s-if="segment.seats && segment.seats.length > 0"
                                class="cosd-transport-ticket-transfer-segment-seats"
                            >
                                <span
                                    s-for="seat in segment.seats"
                                    class="cosd-transport-ticket-transfer-segment-seat"
                                >
                                    <span class="cosd-transport-ticket-transfer-segment-seat-type">
                                        {{seat.type}}
                                    </span>
                                    <span class="cosd-transport-ticket-transfer-segment-seat-remaining">
                                        {{seat.remaining}}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                s-if="transfer && transfer.segments && transfer.segments.length > 0 && type === 'flight'"
                class="cosd-transport-ticket-transfer"
            >
                <div class="cosd-transport-ticket-transfer-flight">
                    <span
                        s-for="segment, index in transfer.segments"
                        class="cosd-transport-ticket-transfer-flight-item"
                    >
                        {{segment.operator}} {{segment.number}}
                    </span>
                </div>
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
            const operator = this.data.get('operator');
            const number = this.data.get('number');
            const model = this.data.get('model');
            return [operator, number, model].filter(item => item);
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
    private resizeObserver: ResizeObserver | null;

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
            model: '',
            service: '',
            crossDays: 0
        };
    }

    inited() {
        this.resizeObserver = null;
    }

    attached() {
        this.nextTick(() => {
            this.updateMaskVisibility();
            this.setupResizeObserver();
        });
    }

    detached() {
        this.disconnectResizeObserver();
    }

    /**
     * 设置 ResizeObserver 监听组件容器宽度变化
     */
    setupResizeObserver() {
        const rootElement = this.el as HTMLElement;
        if (!rootElement) {
            return;
        }

        // 增强兼容性判断
        if (typeof window === 'undefined' || typeof window.ResizeObserver === 'undefined') {
            return;
        }

        try {
            this.resizeObserver = new window.ResizeObserver(() => {
                this.updateMaskVisibility();
            });
            this.resizeObserver.observe(rootElement);
        }
        catch (error) {
            // nothing to do
        }
    }

    /**
     * 断开 ResizeObserver
     */
    disconnectResizeObserver() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
    }

    /**
     * 更新所有滚动容器的遮罩显示状态
     */
    updateMaskVisibility() {
        this.updateScrollMask('seats', '_seatsLeftMask', '_seatsRightMask');
        this.updateScrollMask('transfer', '_transferLeftMask', '_transferRightMask');
    }

    /**
     * 更新指定滚动容器的左右遮罩显示状态
     * @param refName - ref 引用名称
     * @param leftMaskKey - 左侧遮罩的 data key
     * @param rightMaskKey - 右侧遮罩的 data key
     */
    updateScrollMask(
        refName: string,
        leftMaskKey: string,
        rightMaskKey: string
    ) {
        const scrollContainer = this.ref(refName) as unknown as HTMLElement;
        if (!scrollContainer) {
            return;
        }

        // 检测是否能向左滚动（不在最左端）
        const canScrollLeft = scrollContainer.scrollLeft > 0;

        // 检测是否能向右滚动（不在最右端）
        const canScrollRight
            = scrollContainer.scrollWidth > scrollContainer.clientWidth + scrollContainer.scrollLeft + 1;

        this.data.set(leftMaskKey, canScrollLeft);
        this.data.set(rightMaskKey, canScrollRight);
    }

    handleTouch(e: Event, isStart: boolean) {
        if (!isStart) {
            this.data.set('_isActive', false);
            return;
        }

        const touchTarget = e?.target as HTMLElement;
        const scrollableSelectors = [
            '.cosd-transport-ticket-seat-scrollable',
            '.cosd-transport-ticket-transfer-scrollable'
        ];

        const isScrollable = scrollableSelectors.some(selector =>
            touchTarget?.closest(selector)
        );

        if (!isScrollable) {
            this.data.set('_isActive', true);
        }
    }
}