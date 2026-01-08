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
 * @file tooltip 气泡；计算和控制 Tooltip 气泡展现位置
 */

import {Component} from 'san';
import {TooltipTriggerData, TooltipTriggerProps, Position, TipPosition, SafeLimitMap} from './interface';

// 小三角在 end/start 位置上与气泡的距离
const MARGIN: number = 15;

export default class TooltipTrigger extends Component<TooltipTriggerData> {

    static trimWhitespace = 'all';

    static template = `
    <div
        class="cos-tooltip-trigger{{bubbleClass ? ' ' + bubbleClass : ''}} {{_tipPosition.position | direction}}
        {{open ? '' : ' cos-tooltip-trigger-hidden'}}"
        style="top:{{_tipPosition.top}}px;
            bottom:{{_tipPosition.bottom}}px;
            left:{{_tipPosition.left}}px;
            right:{{_tipPosition.right}}px;"
    >
            <div class="cos-tooltip-content">
                {{content}}
                <slot s-if="!content"></slot>
            </div>
        <div s-ref="arrow" class="cos-tooltip-arrow"
            style="top:{{_tipPosition.arrowTop}}px;
            right:{{_tipPosition.arrowRight}}px;
            bottom:{{_tipPosition.arrowBottom}}px;
            left:{{_tipPosition.arrowLeft}}px;"
        >
        </div>
    </div>
    `;

    static filters = {
        direction: (position: Position) => {
            return `cos-tooltip-${position?.split('-')[0]}`;
        }
    };

    initData(): TooltipTriggerProps {
        return {
            content: '',
            position: 'top',
            open: false,
            getPopupContainer: undefined,
            bubbleClass: '',
            _ownerEl: undefined,
            _tipPosition: {},
            _platform: 'mobile'
        };
    }

    open() {
        this.data.set('_tipPosition', {});
        const ownerEl = this.data.get('_ownerEl');
        const position = this.data.get('position');
        const getPopupContainer = this.data.get('getPopupContainer');
        const container = getPopupContainer ? getPopupContainer() : document.body;

        // 业务传入的 getPopupContainer 可能返回 undefined，此时不展示气泡
        if (!container) {
            return;
        }

        const isAttachBody = container === document.body;
        const arrow = this.ref('arrow');
        const arrowRect = (arrow as unknown as HTMLElement).getBoundingClientRect();

        // 气泡挂载的 DOM 节点
        const containerRect = container.getBoundingClientRect();

        // 瞄点指向元素
        const ownerRect = ownerEl.getBoundingClientRect();
        // 瞄点元素宽/高为 0 时，认为是异常使用，不展示
        if (!ownerRect.height || !ownerRect.width) {
            return;
        }
        const elRect = (this.el as HTMLElement).getBoundingClientRect();
        const placements = this.getPlacements(
            containerRect,
            ownerRect,
            elRect,
            arrowRect,
            position,
            true,
            isAttachBody
        );
        this.data.set('_tipPosition', placements);
        this.data.set('open', true);
    }

    hide() {
        this.data.set('open', false);
    }

    /**
     *
     * 获得挂载容器可见高度
     * @param rect 挂载容器位置信息
     * @returns 挂载容器可见高度
     */
    getVisibleHeight(rect: DOMRect, isAttachBody: boolean) {
        const windowHeight = window.innerHeight;
        if (isAttachBody) {
            return windowHeight;
        }
        const elemTop = rect.top;
        const elemBottom = rect.bottom;

        // 元素完全在视口下方 元素完全在视口上方，元素不在视口内，可见高度为 0
        if (elemTop >= windowHeight || elemBottom <= 0) {
            return 0;
        }

        // 计算元素在视口中的可见高度
        const visibleTop = Math.max(elemTop, 0);
        const visibleBottom = Math.min(elemBottom, windowHeight);

        // 计算元素的顶部和底部相对于视口的位置
        return visibleBottom - visibleTop;
    }

    /**
     *
     * 计算气泡挂载位置
     * @param containerRect 挂载容器的位置信息
     * @param ownerRect 瞄点元素的位置信息
     * @param elRect 气泡初始位置信息
     * @param arrowRect 箭头位置信息
     * @param position 气泡展示位置
     * @param allowAdjustPosition 是否允许调整气泡位置
     * @param isAttachBody 是否挂载在 body 上
     * @returns 气泡展现的位置信息
     */
    getPlacements(
        containerRect: DOMRect,
        ownerRect: DOMRect,
        elRect: DOMRect,
        arrowRect: DOMRect,
        position: string,
        allowAdjustPosition: boolean,
        isAttachBody: boolean
    ): TipPosition {
        // 瞄点元素 相对 挂载容器的位置
        const ownerRectInContainer = {
            top: ownerRect.top - containerRect.top,
            left: ownerRect.left - containerRect.left,
            bottom: ownerRect.bottom - containerRect.top,
            right: ownerRect.right - containerRect.left,
            width: ownerRect.width,
            height: ownerRect.height
        };
        const _platform = this.data.get('_platform');
        const elWidth = elRect.width;
        const elHeight = elRect.height;
        let elLeft = null;
        let elRight = null;
        let arrowLeft = null;
        let arrowRight = null;
        let availableWidth = null;

        // 计算气泡当前的最大可用宽度以及水平方向的定位信息
        switch (position) {
            case 'top-start':
            case 'bottom-start':
                elLeft = ownerRectInContainer.left;
                availableWidth = containerRect.width - ownerRectInContainer.left;
                arrowLeft = MARGIN;
                break;
            case 'top-end':
            case 'bottom-end':
                elRight = containerRect.width - ownerRectInContainer.right;
                availableWidth = ownerRectInContainer.right;
                arrowRight = MARGIN;
                break;
            case 'left-start':
            case 'left':
            case 'left-end':
                elRight = containerRect.width - ownerRectInContainer.left;
                availableWidth = ownerRectInContainer.left;
                break;
            case 'right-start':
            case 'right':
            case 'right-end':
                elLeft = ownerRectInContainer.right;
                availableWidth = containerRect.width - ownerRectInContainer.right;
                break;
            case 'top':
            case 'bottom':
            default:
                elLeft = ownerRectInContainer.left + ownerRectInContainer.width / 2 - elWidth / 2;
                availableWidth = containerRect.width;

                // 计算气泡水平方向上是否发生遮挡，如发生，保持箭头位置不变，挪动气泡
                // 气泡从锚点中心区往左/右的移动，需要保留的最小宽度；除去居中的箭头之外，还要保留 MARGIN 间距
                const limitLeft = elRect.width / 2 - arrowRect.width / 2 - MARGIN;

                // 气泡当前定位展现需要的的宽度
                const width = elRect.width + elLeft;
                let contentLeft = 0;

                // 气泡的左边被遮挡
                if (elLeft < 0) {
                    contentLeft = elLeft < -limitLeft ? limitLeft : -elLeft;
                }

                // 气泡的右边被遮挡
                else if (width > containerRect.width) {
                    contentLeft = containerRect.width - width < -limitLeft
                        ? -limitLeft : containerRect.width - width;
                }
                elLeft = elLeft + contentLeft;
                arrowLeft = elWidth / 2 - contentLeft - arrowRect.width / 2;
                // 判断是否贴边，wise 要有 9 px 的间距，pc 要有 16 px 的间距
                // 判断气泡是否贴左边，如果贴边就往右一些
                const weltLeft = containerRect.left - document.body.getBoundingClientRect().left + elLeft;
                const weltRight = Math.abs(document.body.scrollWidth - containerRect.left - elLeft - elRect.width);
                if (containerRect.left >= 0 && weltLeft < SafeLimitMap[_platform].welt) {
                    elLeft += SafeLimitMap[_platform].welt - weltLeft;
                    arrowLeft -= SafeLimitMap[_platform].welt - weltLeft;
                }
                // 判断气泡是否贴右边，如果贴边就往左一些
                else if (weltRight < SafeLimitMap[_platform].welt) {
                    elLeft -= SafeLimitMap[_platform].welt - weltRight;
                    arrowLeft += SafeLimitMap[_platform].welt - weltRight;
                }
        }
        let elTop = null;
        let elBottom = null;
        let availableHeight = null;
        let arrowTop = null;
        let arrowBottom = null;

        // 计算气泡当前的最大可用高度以及垂直方向的定位信息
        switch (position) {
            case 'top-start':
            case 'top':
            case 'top-end':
                let paddingBottom = Number(getComputedStyle(this.el as HTMLElement)?.paddingBottom?.split('px')[0])
                    || 0;
                paddingBottom = paddingBottom === 0 ? SafeLimitMap[_platform].padding : 0;
                elTop = ownerRectInContainer.top - elRect.height - paddingBottom;
                availableHeight = ownerRectInContainer.top;

                // containerRect.top 小于 0，说明有滚动条，需要减去滚动的高度
                availableHeight = containerRect.top < 0
                    ? availableHeight + containerRect.top : availableHeight;
                break;

            case 'bottom-start':
            case 'bottom':
            case 'bottom-end':
                elTop = ownerRectInContainer.bottom;
                availableHeight = this.getVisibleHeight(containerRect, isAttachBody) - ownerRectInContainer.bottom;
                // // containerRect.top 小于 0，说明有滚动条，需要加上滚动的高度
                availableHeight = containerRect.top < 0
                    ? availableHeight - containerRect.top : availableHeight;
                break;
            case 'left-start':
            case 'right-start':
                elTop = ownerRectInContainer.top;
                availableHeight = this.getVisibleHeight(containerRect, isAttachBody) - ownerRectInContainer.top;

                // containerRect.top 小于 0，说明有滚动条，需要加上滚动的高度
                availableHeight = containerRect.top < 0
                    ? availableHeight - containerRect.top : availableHeight;
                arrowTop = MARGIN;
                break;

            case 'left':
            case 'right':
                elTop = ownerRectInContainer.top + ownerRectInContainer.height / 2 - elHeight / 2;
                availableHeight = this.getVisibleHeight(containerRect, isAttachBody);

                // 气泡从锚点中心区往上/下的移动，需要保留的最小高度；除去居中的箭头之外，还要保留 MARGIN 间距
                const limitTop = elRect.height / 2 - arrowRect.width / 2 - MARGIN;

                // 气泡可见 top 值；containerRect.top 小于 0，说明有滚动条，需要减去滚动的高度(负数)
                const absTop = containerRect.top < 0
                    ? elTop + containerRect.top
                    : elTop;
                let contentTop = 0;

                // 气泡上半部分被遮挡：气泡的 top 值小于挂载元素的 top 绝对值
                if (absTop < 0) {
                    contentTop = absTop < -limitTop ? limitTop : -absTop;
                }

                // 气泡下半部分被遮挡：容器可见高度减去气泡的 top 值，得到的可用高度小于气泡高度
                else if (availableHeight - absTop < elRect.height) {
                    contentTop = availableHeight - absTop - elRect.height;
                    contentTop = contentTop < -limitTop ? -limitTop : contentTop;

                }
                elTop = elTop + contentTop;
                arrowTop = elHeight / 2 - arrowRect.height / 2 - contentTop;
                break;

            case 'left-end':
            case 'right-end':
            default:
                elTop = ownerRectInContainer.bottom - elRect.height;
                availableHeight = ownerRectInContainer.bottom;

                // containerRect.top 小于 0，说明有滚动条，需要减去滚动的高度
                availableHeight = containerRect.top < 0
                    ? availableHeight + containerRect.top : availableHeight;
                arrowBottom = MARGIN;
                break;
        }
        let newPosition = '';
        let positions = position.split('-');
        const isVertical = position.includes('top') || position.includes('bottom');

        // 气泡的可用宽度小于实际宽度
        if (availableWidth < elWidth) {

            // 对于 left-xxx、right-xxx，方向对换,然后重新计算
            if (!isVertical) {
                newPosition = position.includes('left') ? 'right' : 'left';
                newPosition += positions[1] ? `-${positions[1]}` : '';
                positions = newPosition.split('-');
            }

            // 对于 top/bottom 的 xxx-end、xxx-start，方向对换,然后重新计算
            else if (position.includes('end') || position.includes('start')) {
                newPosition = position.includes('end') ? 'start' : 'end';
                newPosition = `${positions[0]}-${newPosition}`;
                positions = newPosition.split('-');
            }
        }

        // 气泡的可用高度小于实际高度
        if (availableHeight < elHeight) {

            // 对于 top-xxx、bottom-xxx，方向对换,然后重新计算
            if (isVertical) {
                newPosition = position.includes('top') ? 'bottom' : 'top';
                newPosition += positions[1] ? `-${positions[1]}` : '';
            }

            // 对于 left/right 的 xxx-end、xxx-start，方向对换,然后重新计算
            else if (position.includes('end') || position.includes('start')) {
                newPosition = position.includes('end') ? 'start' : 'end';
                newPosition = `${positions[0]}-${newPosition}`;
            }
        }

        // 有新方向并且允许交换时，进行一次方向更新
        if (newPosition && allowAdjustPosition) {
            const swap = this.getPlacements(
                containerRect,
                ownerRect,
                elRect,
                arrowRect,
                newPosition,
                false,
                isAttachBody
            );

            // 检查是否交换 start / end
            const newPositions = newPosition.split('-')[1];
            let isSwapSuffix = positions[1] && newPositions[1] && positions[1] !== newPositions[1];

            // 交换后方向的 可用高度/宽度 比原来多了，说明交换更合适
            if ((isVertical && (swap.availableHeight as number) > availableHeight)
                    || (isVertical && isSwapSuffix && (swap.availableHeight as number) === availableHeight)
                    || (!isVertical && (swap.availableWidth as number) > availableWidth)
                    || (!isVertical && isSwapSuffix && (swap.availableWidth as number) === availableWidth)) {
                return swap;
            }
        }
        return {
            position: position as Position,
            left: elLeft,
            right: elRight,
            top: elTop,
            bottom: elBottom,
            availableHeight,
            availableWidth,
            arrowTop,
            arrowRight,
            arrowBottom,
            arrowLeft
        };
    }
}