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
 * @file accordion 组件
 */

import {Component} from 'san';
import type {AccordionData, AccordionEvents} from './interface';
import AccordionPanel from '@cosui/cosmic/accordion-panel';

const TYPE_ERROR_MESSAGE = `Type of Accordion.value is invalid.
    Expected string when multiple is false, or string[] when multiple is true.`;

export default class Accordion extends Component<AccordionData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cos-accordion">
            <slot></slot>
        </div>
    `;
    static messages = {
        'cos:accordion-panel-attached': function (this: Accordion, event: Event) {
            const panel = event.target as AccordionPanel;
            this.accordionPanelComponents.push(panel);
            this.initPanelExpandedState(panel);
        },

        'cos:accordion-panel-detached': function (this: Accordion, event: Event) {
            const panel = event.target as AccordionPanel;
            const value = panel.data.get('value');
            const targetIndex = this.accordionPanelComponents.findIndex((item: AccordionPanel) =>
                item.data?.get('value') === value
            );

            if (targetIndex > -1) {
                this.accordionPanelComponents.splice(targetIndex, 1);
            }
        },

        'cos:accordion-panel-header-click': function (this: Accordion, data: {
            value: {
                event: Event;
                panelValue: string;
            };
        }) {
            const event = data?.value?.event;
            const value = data?.value?.panelValue;
            const targetPanel = this.accordionPanelComponents.find((item: AccordionPanel) =>
                item.data?.get('value') === value
            );

            if (targetPanel) {
                const _expanded = targetPanel.data.get('_expanded');
                this.fire<AccordionEvents['change']>('change', {
                    value,
                    expanded: !_expanded,
                    event
                });
            }
        }
    };

    accordionPanelComponents: AccordionPanel[];

    initData(): AccordionData {
        return {
            value: [],
            multiple: true
        };
    }

    attached() {
        this.watch('value', () => {
            this.updatePanelsExpandedStatus();
        });
    }

    inited(): void {
        this.accordionPanelComponents = [];
    }

    initPanelExpandedState(panel: AccordionPanel): void {
        const multiple = !!this.data.get('multiple');
        const activeValue = this.data.get('value');

        if (this.isDataValid()) {
            const panelValue = panel?.data?.get('value');
            const expanded = multiple
                ? (activeValue as string[]).includes(panelValue)
                : activeValue === panelValue;
            panel.data.set('_expanded', expanded);
        }
        else {
            throw new Error(TYPE_ERROR_MESSAGE);
        }
    }

    updatePanelsExpandedStatus() {
        const multiple = !!this.data.get('multiple');
        const activeValue = this.data.get('value');

        if (!this.isDataValid()) {
            throw new Error(TYPE_ERROR_MESSAGE);
        }

        this.accordionPanelComponents.forEach((panel: AccordionPanel) => {
            const panelValue = panel.data.get('value');

            const expanded = multiple
                ? (Array.isArray(activeValue) && activeValue.includes(panelValue))
                : (activeValue === panelValue);
            panel.data.set('_expanded', expanded);
        });
    }

    isDataValid() {
        const multiple = !!this.data.get('multiple');
        const activeValue = this.data.get('value');
        return multiple && Array.isArray(activeValue) || !multiple && typeof activeValue === 'string';
    }
}