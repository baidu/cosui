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
 * @file 锁定滚动区域；处理弹层滚动穿透问题
 * touchmove 的默认行为是滚动页面。如果弹出的模态框上无滚动条，不响应滚动事件，浏览器会继续将 touchmove 事件的默认滚动行为应用到背景页面上，从而导致了滚动穿透
 */

export enum ScrollStatus {
    /**
     * 没有滚动区域
     */
    NO_SCROLL = 0,

    /**
     * 滚动到顶部
     */
    SCROLL_TOP,

    /**
     * 滚动到底部
     */
    SCROLL_BOTTOM,

    /**
     * 滚动到左部
     */
    SCROLL_LEFT,

    /**
     * 滚动到左部
     */
    SCROLL_RIGHT,

    /**
     * 滚动在滚动区域
     */
    SCROLLING
}

export enum Position {
    TOP = 'top',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    LEFT = 'left'
}

/**
 * 是否为可滚动元素
 *
 * @param element 检查元素
 * @param position 滚动方向
 */
function isScrollable(element: HTMLElement, position: Position) {
    if (!element) {
        return false;
    }
    // 可滚动区域大于可见高度也存在不需要滚动的情况，如：子元素设置了负 margin
    const overflowScrollReg = /scroll|auto|overlay/i;
    const {overflowX, overflowY} = window.getComputedStyle(element);
    if (position === Position.TOP || position === Position.BOTTOM) {
        return overflowScrollReg.test(overflowY) && element.scrollHeight > element.offsetHeight;
    }
    return overflowScrollReg.test(overflowX) && element.scrollWidth > element.offsetWidth;
}

/**
 *
 * @param position 滚动方向
 * @returns status 是否是垂直滚动
 */
export function isVertical(position: Position) {
    return position === Position.TOP || position === Position.BOTTOM;
}

/**
 * 判断是否让滚动默认事件传播，把滚动区域锁定在弹层内
 *
 * @param event 触摸事件
 * @param root 根元素
 * @param position 滚动方向
 * @returns 是否阻止 touchmove 默认事件
 */
export function lockScroll(event: TouchEvent, root: HTMLElement, position: Position) {

    let target = event.target as HTMLElement;

    // 找到最近的滚动区域
    while (target && target !== root && !isScrollable(target, position)) {
        target = target.parentNode as HTMLElement;
    }

    let status = ScrollStatus.SCROLLING;

    if (position === Position.TOP || position === Position.BOTTOM) {
        if (target?.scrollTop === 0) {

            // 如果内容可滚动高度小于容器则禁止上下滚动
            status = target.scrollHeight <= target.offsetHeight
                ? ScrollStatus.NO_SCROLL
                : ScrollStatus.SCROLL_TOP;
        }

        // 等于 target.scrollHeight 时，表示滚动已经到了底部。但由于浏览器的渲染机制、像素取整、缩放等因素，可能会导致这两个值并不完全相等。
        // 添加一个小的容差值（如 +1）有助于确保即使在存在细微渲染差异的情况下，也能准确地检测到滚动条是否已经到达底部。
        else if (target.scrollTop + target.offsetHeight + 1 >= target.scrollHeight) {
            status = ScrollStatus.SCROLL_BOTTOM;
        }
    }

    else if (position === Position.LEFT || position === Position.RIGHT) {
        if (target?.scrollLeft === 0) {
            // 如果内容可滚动宽度小于容器则禁止左右滚动
            status = target.scrollWidth <= target.offsetWidth
                ? ScrollStatus.NO_SCROLL
                : ScrollStatus.SCROLL_LEFT;
        }
        else if (target.scrollLeft + target.offsetWidth + 1 >= target.scrollWidth) {
            status = ScrollStatus.SCROLL_RIGHT;
        }
    }

    if (status !== ScrollStatus.SCROLLING) {

        /**
         * 以下情况，阻止 touchmove 默认事件传播
         * 无滚动区域
         * 顶部继续往上(往下滚)
         * 底部继续往下（往上滚）
         */
        if (status === ScrollStatus.NO_SCROLL
            || (status === ScrollStatus.SCROLL_TOP && position === Position.BOTTOM)
            || (status === ScrollStatus.SCROLL_BOTTOM && position === Position.TOP)
            || (status === ScrollStatus.SCROLL_LEFT && position === Position.RIGHT)
            || (status === ScrollStatus.SCROLL_RIGHT && position === Position.LEFT)) {

            // 仅阻止垂直滚动穿透的默认事件，无水平滚动应用场景，且禁止水平的 touchmove 默认事件会影响 ios 系统划词
            isVertical(position) && event.cancelable && event.preventDefault();
            return true;
        }

        return false;
    }
    return false;
}