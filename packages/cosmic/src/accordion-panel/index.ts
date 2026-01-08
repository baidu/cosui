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
import type {AccordionPanelData, AccordionPanelMessages} from './interface';

export default class AccordionPanel extends Component<AccordionPanelData> {
    static template = `
        <div class="cos-accordion-panel">
            <div
                class="cos-accordion-panel-header"
                on-click="handleHeaderClick($event)"
            >
                <div
                    s-if="title"
                    class="cos-accordion-panel-header-text"
                >
                    {{title}}
                </div>
                <slot name="header"/>
                <div class="cos-accordion-panel-header-icon{{
                    _expanded ? ' cos-accordion-panel-header-icon-rotate' : ''}}{{
                    _allowAnimation? ' cos-accordion-panel-header-icon-animation' : ''}}"
                >
                    <cos-icon name="down"/>
                </div>
            </div>
            <div
                s-show="_expanded"
                class="cos-accordion-panel-content"
            >
                <slot></slot>
            </div>
            <div class="cos-divider"/>
        </div>
    `;

    static components = {
        'cos-icon': Icon
    };

    initData(): AccordionPanelData {
        return {
            value: '',
            title: '',
            _expanded: false,
            _allowAnimation: false
        };
    }

    inited(): void {
        this.dispatch<AccordionPanelMessages['cos:accordion-panel-attached']>('cos:accordion-panel-attached', this);
    }

    attached() {
        this.nextTick(() => {
            this.data.set('_allowAnimation', true);
        });
    }

    detached(): void {
        this.dispatch<AccordionPanelMessages['cos:accordion-panel-detached']>('cos:accordion-panel-detached', this);
    }

    /**
     * @description 处理标题点击事件
     * @returns {void}
     */
    handleHeaderClick(event: Event): void {
        this.dispatch<AccordionPanelMessages['cos:accordion-panel-header-click']>('cos:accordion-panel-header-click', {
            panelValue: this.data.get('value'),
            event
        });
    }
}
