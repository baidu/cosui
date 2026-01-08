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
import Icon from '@cosui/cosmic/icon';
import Tab from '@cosui/cosmic/tab';
import TabPane from '@cosui/cosmic/tab-pane';
import {TabsData, TabsEvents, TabsMethods} from './interface';

const curAppearancesArr = ['line', 'pill-filled', 'pill'];

export default class Tabs extends Component<TabsData> implements TabsMethods {

    static components = {
        'cos-tab': Tab,
        'cos-icon': Icon
    };

    static messages = {
        'cos:tab-attached': function (this: Tabs, event: Event) {
            this.tabComponents.push(event.target as unknown as Tab);
            this.updateActiveChild();
        },

        'cos:tab-pane-attached': function (this: Tabs, event: Event) {
            this.tabPaneComponents.push(event.target as unknown as TabPane);
            this.updateActiveChild();
        },

        'cos:tab-detached': function (this: Tabs, event: Event) {
            const tab = event.target as unknown as Tab;
            const targetIndex = (this.tabComponents).findIndex(tc => tc === tab);
            if (targetIndex > -1) {
                this.tabComponents.splice(targetIndex, 1);
                this.updateActiveChild();
            }
        },

        'cos:tab-pane-detached': function (this: Tabs, event: Event) {
            const tabPane = event.target as unknown as TabPane;
            const targetIndex = (this.tabPaneComponents).findIndex(tp => tp === tabPane);
            if (targetIndex > -1) {
                this.tabPaneComponents.splice(targetIndex, 1);
                this.updateActiveChild();
            }
        },

        'cos:tab-click': function (this: Tabs, event: Event) {
            // 下面用 as any 是因为 san 目前暴露的类型在 ts 检查不出 id 这个属性
            const tab = event.target as any;
            const index = this.tabComponents.findIndex((tabComponent: any) => {
                return tabComponent.id === tab.id;
            });
            if (index !== -1 && index !== this.data.get('activeIndex')) {
                this.data.set('activeIndex', index);
            }
        }
    };

    static computed = {
        arrowType(this: Tabs) {
            const _curAppearance = this.data.get('appearance');
            const _arrowType = this.data.get('arrow');
            if (curAppearancesArr.includes(_curAppearance) && _arrowType === 'right') {
                return _arrowType;
            }
        }
    };

    /**
     * Tabs 感知到渲染的 Tab 子组件列表
     */
    tabComponents: Tab[];

    /**
     * Tabs 感知到渲染的 TabPane 子组件列表
     */
    tabPaneComponents: TabPane[];

    /**
     * 定义 activeTab 用于缓存当前激活的 Tab 元素
     */
    activeTab?: HTMLElement;

    /**
     * 用于计算滚动方向
     */
    previousScrollLeft: number;

    /**
     * window resize 事件处理函数的引用，用于清理
     */
    resizeHandler: () => void;

    initData(): TabsData {
        return {
            activeIndex: 0,
            appearance: 'bar',
            arrow: false,
            _showLeftArrowAndMargin: false,
            _showRightArrowAndMargin: false
        };
    }

    /**
     * @description
     * 初始化组件，设置 tabComponents、tabPaneComponents 和 messages。
     * 注册事件监听器，包括：
     * - cos:tab-attached：当一个 Tab 组件被添加时触发，将该组件添加到 tabComponents 中并更新 activeChild。
     * - cos:tab-pane-attached：当一个 TabPane 组件被添加时触发，将该组件添加到 tabPaneComponents 中并更新 activeChild。
     * - cos:tab-detached：当一个 Tab 组件被移除时触发，从 tabComponents 中移除该组件并更新 activeChild。
     * - cos:tab-pane-detached：当一个 TabPane 组件被移除时触发，从 tabPaneComponents 中移除该组件并更新 activeChild。
     * - cos:tab-click：当一个 Tab 组件被点击时触发，根据点击的 tab 的 id 和 activeIndex，更新 activeIndex。
     *
     * @param this {any} 调用此方法的上下文对象（this）。
     *
     * @returns {void} 无返回值。
     */
    inited(this: any): void {
        this.tabComponents = [];
        this.tabPaneComponents = [];
    }

    /**
     * 当组件被附加到页面时触发的函数，用于初始化相关操作
     */
    attached() {
        this.watch('activeIndex', newIndex => {
            this.handleTabChange(newIndex);
        });

        this.updateActiveChild();

        this.nextTick(() => {
            this.setArrow();
        });
        this.handleWindowResize();
    }

    detached() {
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
        }

        // 清理组件引用
        this.tabComponents = [];
        this.tabPaneComponents = [];
        this.activeTab = undefined;
    }

    /**
     * 设置箭头显示状态
     */
    setArrow() {
        const header = this.ref('tabsHeader') as unknown as HTMLElement;
        const {
            showLeftArrow,
            showRightArrow
        } = this.computeArrowState(header);

        // 更新右箭头显示状态
        this.data.set('_showRightArrowAndMargin', showRightArrow);

        // 更新左箭头显示状态
        const _curAppearance = this.data.get('appearance');
        const _arrowType = this.data.get('arrow');
        if (curAppearancesArr.includes(_curAppearance) && _arrowType === 'right') {
            this.data.set('_showLeftArrowAndMargin', showLeftArrow);
        }
    }

    /**
     * 监听 window resize 事件，重新计算箭头显示状态
     */
    handleWindowResize() {
        this.resizeHandler = () => {
            requestAnimationFrame(() => {
                this.setArrow();
            });
        };
        window.addEventListener('resize', this.resizeHandler);
    }

    /**
     * 更新宽度后重新计算箭头状态
     * 提供给外部调用，用于特殊 DOM 宽度变化时手动更新箭头状态
     */
    updatedWidth() {
        this.setArrow();
    }

    /**
     * 处理 Tab 切换
     *
     * @param {number} activeIndex
     */
    handleTabChange(activeIndex: number) {
        this.updateActiveChild(true);
        this.fire<TabsEvents['change']>('change', {index: activeIndex});
    }

    /**
     * 更新当前激活的 Tab 和对应的 TabPane
     */
    updateActiveChild(needUpdateIndex: boolean = false) {
        let activeIndex = this.data.get('activeIndex');

        if (!Array.isArray(this.tabComponents)) {
            this.tabComponents = [];
        }
        if (!Array.isArray(this.tabPaneComponents)) {
            this.tabPaneComponents = [];
        }

        // 在 tabComponents 为空时，不修改 activeIndex
        if (this.tabComponents.length && needUpdateIndex) {
            // 保证 activeIndex 在 [0, length - 1] 区间
            activeIndex = Math.max(0, Math.min(activeIndex, this.tabComponents.length - 1));
            this.data.set('activeIndex', activeIndex);
        }

        this.tabComponents.forEach((tabComponent: Component, index: number) => {
            tabComponent.data.set('active', index === activeIndex);
            if (index === activeIndex) {
                this.activeTab = tabComponent.el as HTMLElement;
            }
        });
        this.tabPaneComponents.forEach((paneComponent: Component, index: number) => {
            paneComponent.data.set('active', index === activeIndex);
        });

        this.nextTick(() => {
            this.scrollToActiveTab();
            if (this.data.get('appearance') === 'line') {
                this.updateLineIndicator();
            }
        });
    }

    /**
     * 切换后滚动到当前激活的 Tab
     */
    scrollToActiveTab() {
        const header = this.ref('tabsHeader') as unknown as HTMLElement;
        if (header && header.scrollTo && this.activeTab) {
            const scrollX = this.activeTab.offsetLeft - (header.offsetWidth - this.activeTab.offsetWidth) / 2;
            header.scrollTo({left: scrollX, behavior: 'smooth'});
        }
    }

    /**
     * 更新指示器的位置和宽度
     */
    updateLineIndicator() {
        const activeIndex = this.data.get('activeIndex');
        const header = this.ref('tabsHeader') as unknown as HTMLElement;
        const lineIndicator = this.ref('lineIndicator') as unknown as HTMLElement;

        if (header && lineIndicator) {
            if (header && lineIndicator) {
                const activeTab = header.children[activeIndex] as HTMLElement;
                if (activeTab) {
                    const customWidth = parseFloat(getComputedStyle(lineIndicator).width) || activeTab.offsetWidth;
                    const tabOffsetLeft = activeTab.offsetLeft;
                    const tabWidth = activeTab.offsetWidth;
                    const translateX = tabOffsetLeft + (tabWidth - customWidth) / 2;
                    lineIndicator.style.transform = `translateX(${translateX}px)`;
                }
            }
        }
    }

    /**
     * 处理 Tabs Header 的滚动事件
     */
    handleScroll() {
        const header = this.ref('tabsHeader') as unknown as HTMLElement;
        const {
            scrollWidth,
            scrollLeft
        } = header;

        const {
            showLeftArrow,
            showRightArrow
        } = this.computeArrowState(header);

        // 更新箭头显示以及边距显示状态
        const previousShowRightArrow = this.data.get('showRightArrow');
        this.data.set('_showLeftArrowAndMargin', showLeftArrow);
        this.data.set('_showRightArrowAndMargin', showRightArrow);

        // 计算滚动方向
        const previousScrollLeft = this.previousScrollLeft || 0;
        const scrollingRight = scrollLeft > previousScrollLeft;
        this.previousScrollLeft = scrollLeft;

        // 修正 可能的负间距恢复后的滚动位置，只需考虑右滑时的右侧情况，其他情况由浏览器托管，无需处理
        if (scrollingRight && previousShowRightArrow && !showRightArrow) {
            // nextTick 保证 header.clientWidth 变化后再修正位置
            this.nextTick(() => {
                header.scrollTo({
                    left: scrollLeft + (scrollWidth - scrollLeft - header.clientWidth),
                    behavior: 'instant'
                });
            });
        }
    }

    /**
     * 处理左箭头的点击事件
     */
    handleLeftArrowClick(e: Event) {
        e.stopPropagation();
        this.turnPage('left');
    }

    /**
     * 处理右箭头的点击事件
     */
    handleRightArrowClick(e: Event) {
        e.stopPropagation();
        this.turnPage('right');
    }

    /**
     * 横滑翻页
     */
    turnPage(direction: 'left' | 'right') {
        const header = this.ref('tabsHeader') as unknown as HTMLElement;
        const scrollCoord = ((direction === 'left') ? -1 : 1) * header.offsetWidth;
        header.scrollBy(scrollCoord, 0);
    }

    computeArrowState(header: HTMLElement) {
        const {
            scrollWidth,
            clientWidth,
            scrollLeft
        } = header;
        const rightDifference = scrollWidth - clientWidth - scrollLeft;
        // 用于判断横滑到达边缘的缓冲值，单位为px
        const buffer = 3;

        // 计算箭头显示以及边距显示状态
        let showRightArrow = rightDifference > buffer;
        let showLeftArrow = scrollLeft > buffer;
        const showArrow = showRightArrow || showLeftArrow;

        // 如果是 line 或者 pill-filled，且 用户指定箭头放在右边，且 箭头可以显示的时候，则左右箭头必须同时显示
        const _curAppearance = this.data.get('appearance');
        const _arrowType = this.data.get('arrow');
        if (showArrow && (curAppearancesArr.includes(_curAppearance) && _arrowType === 'right')) {
            showLeftArrow = true;
            showRightArrow = true;
        }

        return {
            showLeftArrow,
            showRightArrow
        };
    }
}
