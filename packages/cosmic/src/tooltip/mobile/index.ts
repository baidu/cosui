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
import {TooltipData, TooltipProps, SafeLimitMap, TooltipMethods} from '../interface';
import TooltipTrigger from '../tooltip-trigger';
import {isInShadow, Debounce} from '../../util';

export default class Tooltip extends Component<TooltipData> implements TooltipMethods {
    static trimWhitespace = 'all';

    static template = `
    <span class="cos-tooltip">
        <slot />
    </span>`;

    tooltip: null | TooltipTrigger;
    delayTimer: null | ReturnType<typeof setTimeout>;
    debounce: Debounce | null;
    mouseenter: null | (() => void);
    mouseleave: null | (() => void);
    click: null | ((e: Event) => void);
    pagePositionChange: null | (() => void);

    initData(): TooltipProps {
        return {
            content: '',
            trigger: 'click',
            position: 'top',
            disabled: false,
            openDelay: 0,
            closeDelay: 0,
            open: false,
            getPopupContainer: undefined,
            _ownerEl: undefined,
            _hoverTarget: false,
            _hoverTooltip: false,
            _platform: 'mobile' as keyof typeof SafeLimitMap,
            bubbleClass: ''
        };
    }
    attached() {
        const el = (this.el as unknown) as HTMLElement;
        this.data.set('_ownerEl', el);
        // 若触发方式为 custom，则通过 open 控制气泡显隐
        if (this.data.get('trigger') === 'custom') {
            this.data.get('open') && this.beforeOpen();

            this.watch('open', (val: boolean) => {
                val ? this.beforeOpen() : this.beforeClose();
            });
        }
        // 其他受控模式，添加监听器
        else if (!this.data.get('disabled')) {
            this.addListener(el);
        }
        this.watch('disabled', (val: boolean) => {
            if (val) {
                this.close();
                this.removeListener();
            }
            else {
                this.addListener(el);
            }
        });
        const getPopupContainer = this.data.get('getPopupContainer');
        if (getPopupContainer && getPopupContainer() !== document.body) {
            return;
        }

        // 如果元素挂载在 body 上，页面宽高发生变化时，需要重新定位正在显示的气泡
        this.pagePositionChange = () => {
            this.data.get('open') && this.tooltip?.open();
        };

        //  移动端监听手百端切换字号时的分发事件app_font_chang，重新计算气泡位置
        this.data.get('_platform') === 'mobile'
            ? window.addEventListener('app_font_change', this.pagePositionChange)
            : window.addEventListener('resize', this.pagePositionChange);
    }

    addListener(el: HTMLElement) {
        const trigger = this.data.get('trigger');

        // 若触发方式为 click，则向该挂载元素添加 click 事件监听
        if (trigger === 'click') {
            this.click = (e: Event) => {
                this.handleClick(e);
            };
            document.addEventListener('click', this.click);
        }

        // 若触发方式为 hover，则向该挂载元素添加鼠标移入/移出事件监听
        else if (trigger === 'hover') {
            this.debounce = new Debounce(10);
            this.mouseenter = () => {
                this.data.set('_hoverTarget', true);
                this.beforeOpen();
            };
            this.mouseleave = () => {
                this.data.set('_hoverTarget', false);
                this.debounce?.debounce(this.beforeClose, this);
            };
            el.addEventListener('mouseenter', this.mouseenter);
            el.addEventListener('mouseleave', this.mouseleave);
        }
    }
    removeListener() {
        this.clearDelayTimer();
        const trigger = this.data.get('trigger');

        // 若触发方式为 click，则移除该挂载元素的 click 事件监听
        if (trigger === 'click' && this.click) {
            document.removeEventListener('click', this.click);
        }

        // 若触发方式为 hover，则移除该挂载元素的鼠标移入/移出事件监听
        else if (trigger === 'hover' && this.mouseenter && this.mouseleave) {
            const el = (this.el as unknown) as HTMLElement;
            el?.removeEventListener('mouseenter', this.mouseenter);
            el?.removeEventListener('mouseleave', this.mouseleave);
            this.debounce?.clean();
        }
    }
    detached() {
        this.removeListener();
        if (!this.pagePositionChange) {
            return;
        }
        this.data.get('_platform') === 'mobile'
            ? window.removeEventListener('app_font_change', this.pagePositionChange as (() => void))
            : window.removeEventListener('resize', this.pagePositionChange as (() => void));
    }

    /**
     *
     * 清除定时器
     */
    clearDelayTimer() {
        if (this.delayTimer) {
            clearTimeout(this.delayTimer);
            this.delayTimer = null;
        }
    }

    /**
     * 切换气泡显示
     */
    toggle() {
        this.data.get('open') ? this.beforeClose() : this.beforeOpen();
    }
    close() {
        this.tooltip?.hide();
        if (this.data.get('open')) {
            this.fire('toggle', false);
            this.data.set('open', false);
        }
    }

    open() {
        if (!this.tooltip) {
            this.createTooltipTrigger();
        }
        else {
            this.tooltip.open();
        }
        this.fire('toggle', true);
        this.data.set('open', true);
    }

    /**
     * 挂载气泡
     */
    createTooltipTrigger() {
        this.tooltip = new TooltipTrigger({
            owner: this,
            source: `
                <cos-tooltip-trigger
                    content="{{content}}"
                    position="{{position}}"
                    bubbleClass="{{bubbleClass}}"
                    getPopupContainer="{{getPopupContainer}}"
                    _ownerEl="{{_ownerEl}}"
                    _platform="{{_platform}}"
                >
                    <slot name="content"></slot>
                </cos-tooltip-trigger>
            `
        });
        const getPopupContainer = this.data.get('getPopupContainer');
        const container = getPopupContainer ? getPopupContainer() : document.body;
        this.tooltip.attach(container);
        const el = this.tooltip?.el;

        if (this.data.get('trigger') === 'hover') {
            // 鼠标移入气泡，气泡继续显示
            el?.addEventListener('mouseenter', () => {
                this.data.set('_hoverTooltip', true);
                this.beforeOpen();
            });
            el?.addEventListener('mouseleave', () => {
                this.data.set('_hoverTooltip', false);
                this.beforeClose();
            });
        }
        this.nextTick(() => {
            this.tooltip?.open();
        });
    }

    /**
     * 延迟气泡的显示/隐藏
     * @param delay 延迟时间
     * @param callback 回调函数
     */
    delaySetTooltipVisible(delay: number, callback: () => void) {
        this.delayTimer = setTimeout(() => {
            callback();
        }, delay);
    }

    beforeOpen() {
        // 已打开的气泡，无需再次触发打开
        if ((this.data.get('trigger') !== 'custom' && this.data.get('open'))
                || this.data.get('disabled')) {
            return true;
        }
        // 清空可能有的上一次的延迟关闭定时器
        this.clearDelayTimer();
        const openDelay = this.data.get('openDelay');
        openDelay ? this.delaySetTooltipVisible(openDelay, () => {
            // 延迟后，如果是 hover 方式，只鼠标还在瞄点上时显示气泡
            const trigger = this.data.get('trigger');
            if ((trigger === 'hover' && this.data.get('_hoverTarget'))
                || trigger !== 'hover') {
                this.open();
            }
        }) : this.open();
    }

    beforeClose() {
        // 已关闭的气泡，无需再次触发关闭；对于 hover 情况，鼠标在气泡、瞄点元素上时，保持展示，不关闭
        if ((this.data.get('trigger') !== 'custom' && !this.data.get('open'))
                || this.data.get('_hoverTooltip') || this.data.get('_hoverTarget')) {
            return;
        }
        const closeDelay = this.data.get('closeDelay');
        this.clearDelayTimer();
        closeDelay ? this.delaySetTooltipVisible(closeDelay, () => {
            this.close();
        }) : this.close();
    }

    handleClick(e: Event) {
        const root = this.el;
        let target = e.target;
        if (this.data.get('disabled')) {
            return;
        }
        // 在 Shadow DOM 中，取出真正的 target
        if (isInShadow(root)) {
            const path = e.composedPath();
            target = path && path[0];
        }

        // 如果点击的是 tooltip 的锚点元素，再次点击则隐藏/显示 tooltip
        if (root?.contains && root?.contains((target as unknown) as Node)) {
            this.toggle();
        }

        // 如果点击的是非 tooltip 的挂载元素，隐藏 tooltip
        else {
            this.beforeClose();
        }
    }

    /**
     * 对外暴露的 api，主动更新气泡位置
     */
    updatePosition() {
        // 气泡未打开，无需更新位置
        if (!this.data.get('open')) {
            return;
        }
        this.tooltip?.open();
    }
}