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
 * @file drawer 组件
 */

import {Component} from 'san';
import {DrawerProps, DrawerEvents} from './interface';
import Icon from '@cosui/cosmic/icon';
import {Position, lockScroll} from '../util';

export default class Drawer extends Component<DrawerProps> {

    static trimWhitespace = 'all';
    static template = `
        <div
            s-if="destroyOnClose ? open : true"
            class="cos-drawer {{!open && !destroyOnClose ? 'cos-hidden' : ''}}"
            rl-type="stop"
        >
        <!-- rl-type="stop" 弹窗打开时，不响应整卡点击 -->
            <div
                style="{{_maskStyle}}"
                class="cos-drawer-mask{{mask ? '' : ' cos-drawer-mask-none'}}"
                on-click="handleClose"
                on-touchmove="handleTouchmove">
            </div>
            <div
                s-ref="container"
                style="{{_containerStyle}}"
                class="cos-drawer-container{{position ? ' cos-drawer-' + position : ''}}"
                on-touchstart="handleContainerTouchstart"
                on-touchmove="handleContainerTouchmove"
                on-touchend="handleContainerTouchend"
            >
                <slot name="title" />
                <div
                    s-if="closeable"
                    class="cos-drawer-close"
                    on-click="handleClose"
                    on-touchmove="handleTouchmove"
                >
                    <cos-icon name="close" />
                </div>
                <div class="cos-drawer-content">
                    <slot />
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-icon': Icon
    };

    /**
     * 触摸开始时间
     */
    touchStartTime: number;

    /**
     * 触摸开始 x 位置
     */
    startX: number;

    /**
     * 触摸开始 y 位置
     */
    startY: number;

    /**
     * 当前触摸方向
     */
    direction: Position|undefined = undefined;

    /**
     * touchMove 移动速率
     */
    speedThreshold: number = 0.23;

    /**
     *  是否锁定滚动，无法滚动
     */
    isScrollLocked: boolean = false;

    /**
     * 弹窗是否在滚动
     */
    isScrolling: boolean;

    /**
     * 弹窗是否被拖拽
     */
    isSwiper: boolean;

    initData() {
        return {
            position: Position.BOTTOM,
            open: false,
            mask: true,
            title: undefined,
            closeable: true,
            closeOnSwipe: false,
            getPopupContainer: undefined,
            destroyOnClose: true,
            _maskStyle: '',
            _containerStyle: ''
        };
    }

    attached() {

        this.watch('open', value => {
            // ios 上偶现滚动穿透问题，增加下列代码处理
            if (value) {
                document.body.style.height = '100vh';
                document.body.style.overflow = 'hidden';
            }
            else {
                this.data.set('_containerStyle', '');
                this.data.set('_maskStyle', '');
                document.body.style.height = '';
                document.body.style.overflow = 'auto';
            }
        });
    }

    handleTouchmove(e: TouchEvent) {
        e.preventDefault();
    }

    handleClose(e: TouchEvent | MouseEvent) {
        e && e.preventDefault();
        this.data.set('open', false);
        this.fire<DrawerEvents['close']>('close', {event: e});
    }

    /**
     * 获得当前触摸方向
     *
     * @param diffX x 方向偏移
     * @param diffY y 方向偏移
     * @returns 方向
     */
    getDirection(diffX: number, diffY: number) {
        if (Math.abs(diffX) > Math.abs(diffY)) {
            return diffX > 0 ? Position.RIGHT : Position.LEFT;
        }
        return diffY > 0 ? Position.BOTTOM : Position.TOP;
    }

    /**
     * 响应滑动手势，设置滑动样式
     *
     * @param direction 滑动方向
     * @param distanceX x 方向偏移
     * @param distanceY y 方向偏移
     */
    handleSwipe(direction: string, distanceX: number, distanceY: number) {
        if (Math.abs(distanceY) < 30 && Math.abs(distanceX) < 30) {
            return;
        }
        const element = this.ref('container') as unknown as HTMLElement;
        if (direction === Position.TOP || direction === Position.BOTTOM) {
            const opacity = Math.abs(distanceY) / element.offsetHeight;
            // 在下拉/右滑过程中，蒙层透明度从 50%-0% 跟手变化。
            this.data.get('mask') && this.data.set('_maskStyle', `opacity: ${0.5 - opacity};`);
            this.data.set('_containerStyle', `transform: translateY(${distanceY}px);transition:none;`);
        }
        else {
            const opacity = Math.abs(distanceX) / element.offsetWidth;
            this.data.get('mask') && this.data.set('_maskStyle', `opacity: ${0.5 - opacity};`);
            this.data.set('_containerStyle', `transform: translateX(${distanceX}px);transition:none;`);
        }
    }

    handleContainerTouchstart(event: TouchEvent) {

        // 多根手指触摸屏幕时，不处理
        if (event.changedTouches.length !== 1) {
            return;
        }
        this.touchStartTime = new Date().getTime();
        this.startX = event.touches[0].clientX;
        this.startY = event.touches[0].clientY;
    }

    handleContainerTouchmove(event: TouchEvent) {
        if (event.changedTouches.length !== 1) {
            event.preventDefault();
            return;
        }
        const currentX = event.touches[0].clientX;
        const currentY = event.touches[0].clientY;

        // 获得触摸实时偏移距离
        const disX = currentX - this.startX;
        const disY = currentY - this.startY;

        // 获得触摸方向
        const direction = this.direction = this.getDirection(disX, disY);
        const root = this.ref('container') as unknown as HTMLElement;

        if (!this.data.get('closeOnSwipe')) {
            return lockScroll(event, root, direction);
        }

        // 弹层被拖拽；无法触发滚动 && 本次touch没有触发过滚动时 禁止滚动
        if (this.isSwiper || (this.isScrollLocked && !this.isScrolling)) {
            event.preventDefault();
            this.isScrollLocked = true;
        }
        else {
            this.isScrollLocked = lockScroll(event, root, direction);
        }

        // 标记页面正在滚动，在这一次触摸结束前，禁止响应滑动关闭手势
        if (!this.isScrollLocked) {
            this.isScrolling = true;
        }

        // drawer 内部没有在滚动，响应滑动关闭手势
        if (!this.isScrolling && direction === this.data.get('position')) {
            this.isSwiper = true;
            this.handleSwipe(direction, disX, disY);
        }
    }

    handleContainerTouchend(event: TouchEvent) {
        if (event.changedTouches.length !== 1 || !this.data.get('closeOnSwipe')) {
            return;
        }

        // 一次 touch 结束了, 重置 this.lock
        this.isScrollLocked = false;

        // 弹层滚动，当前没有在拖拽；不响应滑动关闭手势，重置各项参数
        if (this.isScrolling
            || this.direction !== this.data.get('position')
            || !this.isSwiper) {

            // 拖拽还原
            this.isSwiper && this.data.set('_containerStyle', 'transform: translateX(0px);transition: all .4s');
            this.isScrolling = false;
            this.isSwiper = false;
            return;
        }
        this.isSwiper = false;

        const touchEndTime = new Date().getTime();
        const touchDuration = touchEndTime - this.touchStartTime;

        const endX = event.changedTouches[0].clientX;
        const endY = event.changedTouches[0].clientY;
        const disX = endX - this.startX;
        const disY = endY - this.startY;
        const element = this.ref('container') as unknown as HTMLElement;

        if (this.direction === Position.TOP || this.direction === Position.BOTTOM) {

            // 计算本次 touch 持续时间
            const speed = Math.abs(disY / touchDuration);
            if (this.shouldBeClosed(speed, disY, element.offsetHeight)) {
                this.handleCloseOnSwipe(event);
            }
            else {

                // 本次拖拽未满足滑动关闭抽屉条件时，重置样式
                this.data.set('_containerStyle', 'transform: translateY(0px);transition: all .4s');
            }
        }
        else if (this.direction === Position.LEFT || this.direction === Position.RIGHT) {
            const speed = Math.abs(disX / touchDuration);
            if (this.shouldBeClosed(speed, disX, element.offsetWidth)) {
                this.handleCloseOnSwipe(event);
            }
            else {
                this.data.set('_containerStyle', 'transform: translateX(0px);transition: all .4s');
            }
        }
    }

    /**
     * 判断是否应该滑动关闭抽屉,滑动速度大于speedThreshold 或者 滑动距离大于弹层宽度/3
     *
     * @param speed 滑动速度
     * @param distance 滑动距离
     * @param size 弹层宽度｜弹层高度
     */
    shouldBeClosed(speed: number, distance: number, size: number) {
        return speed >= this.speedThreshold || Math.abs(distance) > size / 3;
    }

    /**
     * 滑动关闭动画
     */
    handleCloseOnSwipe(event: TouchEvent) {
        const element = this.ref('container') as unknown as HTMLElement;
        const duration = 200;
        switch (this.direction) {
            case Position.TOP:
                this.data.set('_containerStyle', `transform: translateY(${-element.offsetHeight}px);
                transition: all ${duration}ms`);
                break;
            case Position.RIGHT:
                this.data.set('_containerStyle', `transform: translateX(${element.offsetWidth}px);
                transition: all ${duration}ms`);
                break;
            case Position.BOTTOM:
                this.data.set('_containerStyle', `transform: translateY(${element.offsetHeight}px);
                transition: all ${duration}ms`);
                break;
            case Position.LEFT:
                this.data.set('_containerStyle', `transform: translateX(${-element.offsetWidth}px);
                transition: all ${duration}ms`);
                break;
        }
        setTimeout(() => {
            this.handleClose(event);
        }, duration);
    }
}