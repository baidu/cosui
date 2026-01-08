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
 * @file AvatarGroup 组件
 */

import {Component} from 'san';
import type {AvatarGroupData} from './interface';
import {Size} from '../util';

export default class AvatarGroup extends Component<AvatarGroupData> {

    static trimWhitespace = 'all';

    static template = `
        <div style="{{animate ? _groupWidth : ''}}" class="cos-avatar-group cos-avatar-group-{{size}}{{
            animate && _animate ? ' cos-avatar-group-animate' : ''}}">
            <slot></slot>
        </div>
    `;

    // 动画的定时器
    intervalTimer: ReturnType<typeof setInterval> | null;
    // slot 元素 z-index 的起始值，默认是 4
    readonly baseZIndex = 4;
    // 最小缩放比例，默认是 0.66
    readonly minScale = 0.66;
    // 中间显示的头像数量，默认为 3 秒
    readonly middleAvatarCount = 3;
    // 动画播放间隔毫秒数，默认为 1.7 秒
    readonly animationDuration = 1700;

    initData(): AvatarGroupData {
        return {
            size: Size.MD,
            animate: false,
            _animate: false,
            _groupWidth: null
        };
    }

    attached() {
        // 延缓 cos-avatar-group-animate 样式生效，避免动画未计算完成时，头像已重叠在一起
        this.data.set('_animate', this.data.get('animate'));

        // 初始化头像样式
        this.nextTick(() => {
            this.updateAvatars();
        });
        // 监听 animate 状态变化
        this.watch('animate', (val: boolean) => {
            this.el?.clientWidth && this.data.set('_groupWidth', {
                width: `${this.el?.clientWidth}px`
            });
            this.data.set('_animate', val);
            this.updateAvatars();
        });
        // 监听 size 改变
        this.watch('size', this.updateAvatars.bind(this));
    }

    /**
     * 更新头像样式和动画状态
     * 根据 animate 的状态决定是否启动动画
     */
    updateAvatars() {
        const size = this.data.get('size');
        const sizeMap: Record<Size, number> = {
            [Size.XS]: 7,
            [Size.SM]: 12,
            [Size.MD]: 22,
            [Size.LG]: 22,
            [Size.XL]: 22
        };
        const avatarOffset = sizeMap[size];
        // 采用从 slot 中读取 cos-avatar 元素，是为了兼容之前的写法
        const avatarList = this.el ? Array.from(this.el.querySelectorAll('.cos-avatar')) : [];

        this.clearAvatarInterval();
        this.resetAvatarStyles(avatarList);

        if (this.data.get('animate') && avatarList.length) {
            // 如果 animate 为 true，应用样式并启动动画
            this.applyAvatarStyles(avatarList, avatarOffset);
            this.startAvatarAnimation(avatarList.length, avatarOffset);
        }
    }

    /**
     * 应用头像样式
     * 仅在有动画时执行，设置动画期间的头像样式
     */
    applyAvatarStyles(avatarList: Element[], avatarOffset: number) {
        // 头像组宽度
        let groupWidth = 0;
        let avatarWidth = 0;

        // 设置每个头像的初始样式
        avatarList.forEach((avatar: Element, index: number) => {
            const avatarElement = avatar as HTMLElement;

            // 每个头像的宽度，因为多于三个头像会被隐藏，避免获取不到宽度，获取不到宽度时用前面正常显示的头像宽度
            const width = avatarElement.clientWidth || avatarWidth;
            avatarWidth = width;
            if (index !== 0 && index <= this.middleAvatarCount) {
                // 中间头像，正常显示
                const left = (index - 1) * (width - avatarOffset);
                avatarElement.style.left = `${left}px`;
                avatarElement.style.zIndex = `${this.baseZIndex + this.middleAvatarCount - index}`;
                avatarElement.style.opacity = '1';
                avatarElement.style.transform = 'scale(1)';
                groupWidth += left === 0 ? width : width - avatarOffset;
            }
            else {
                // 其余头像，缩小并透明
                avatarElement.style.left = `${width}px`; // 初始位置
                avatarElement.style.zIndex = `${this.baseZIndex}`;
                avatarElement.style.opacity = '0';
                avatarElement.style.transform = `scale(${this.minScale})`;
            }

            avatarElement.style.transition = 'left 0.5s ease, opacity 0.5s ease, transform 0.5s ease';
        });
        this.data.set('_groupWidth', {
            width: `${groupWidth}px`
        });
    }

    /**
     * 重置头像的样式为初始状态
     * 当动画关闭或重新开始时调用
     */
    resetAvatarStyles(avatarList: Element[]) {
        avatarList.forEach((avatar: Element) => {
            const avatarElement = avatar as HTMLElement;
            // 清除所有与动画相关的样式
            avatarElement.style.removeProperty('left');
            avatarElement.style.removeProperty('z-index');
            avatarElement.style.removeProperty('opacity');
            avatarElement.style.removeProperty('transform');
            avatarElement.style.removeProperty('transition');
        });
    }

    /**
     * 启动头像的轮播动画
     * @param avatarCount 头像总数
     * @param avatarOffset 头像的偏移量
     */
    startAvatarAnimation(avatarCount: number, avatarOffset: number) {

        let count = 0;
        this.clearAvatarInterval();

        // 立即更新一次位置，确保初始位置正确
        this.updateAvatarPositions(count, avatarCount, avatarOffset);

        // 启动定时器，按间隔时间更新位置
        this.intervalTimer = setInterval(() => {
            // 检查头像数量是否变化
            const currentAvatarList = this.el ? Array.from(this.el.querySelectorAll('.cos-avatar')) : [];
            const currentAvatarCount = currentAvatarList.length;

            if (currentAvatarCount !== avatarCount) {
                // 如果头像数量发生变化，重新启动动画
                this.updateAvatars();
                return; // 退出当前定时器，等待新的动画被启动
            }

            count++;
            this.updateAvatarPositions(count, avatarCount, avatarOffset);
        }, this.animationDuration);
    }

    /**
     * 更新头像位置
     * @param count 当前轮次计数
     * @param avatarCount 头像总数
     * @param avatarOffset 头像的偏移量
     */
    updateAvatarPositions(count: number, avatarCount: number, avatarOffset: number) {
        const avatarList = this.el ? Array.from(this.el.querySelectorAll('.cos-avatar')) : [];

        const currentHeadIndex = count % avatarCount; // 当前第一个头像的索引
        let groupWidth = 0;
        let avatarWidth = 0;
        avatarList.forEach((avatar, index) => {
            const avatarElement = avatar as HTMLElement;
            const width = avatarElement.clientWidth || avatarWidth;
            avatarWidth = width;
            const relativeIndex = (index - currentHeadIndex + avatarCount) % avatarCount; // 计算相对索引

            if (relativeIndex === 0) {
                // 最左侧的头像（首），淡出并缩小
                avatarElement.style.left = `-${width / 2}px`;
                avatarElement.style.opacity = '0';
                avatarElement.style.transform = `scale(${this.minScale})`;
                if (avatarList.length === 4) {
                    // 特判 4 个头像的情况，动画逻辑特殊，提前移动第一个
                    setTimeout(() => {
                        if (this.data.get('animate')) {
                            avatarElement.style.transition = 'none';
                            avatarElement.style.left = `${(this.middleAvatarCount - 1)
                    * (width - avatarOffset) + width / 2}px`;
                        }
                    }, this.animationDuration - 50);
                }
            }
            else if (relativeIndex <= this.middleAvatarCount) {
                // 中间显示的头像，正常显示
                const left = (relativeIndex - 1) * (width - avatarOffset);
                avatarElement.style.left = `${left}px`;
                avatarElement.style.zIndex = `${this.baseZIndex + this.middleAvatarCount - relativeIndex}`;
                avatarElement.style.opacity = '1';
                avatarElement.style.transform = 'scale(1)';
                groupWidth += left === 0 ? width : width - avatarOffset;
            }
            else {
                avatarElement.style.left = `${(this.middleAvatarCount - 1)
                    * (width - avatarOffset) + width / 2}px`;
                avatarElement.style.opacity = '0';
                avatarElement.style.transform = `scale(${this.minScale})`;
            }
            avatarElement.style.transition = 'left 0.5s ease, opacity 0.5s ease, transform 0.5s ease';

        });
        this.data.set('_groupWidth', {
            width: `${groupWidth}px`
        });
    }

    /**
     * 清除头像轮播的定时器
     */
    clearAvatarInterval() {
        if (this.intervalTimer) {
            clearInterval(this.intervalTimer);
            this.intervalTimer = null;
        }
    }

    detached() {
        this.clearAvatarInterval(); // 确保组件卸载时清除定时器
    }
}