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

import type AccordionPanel from './index';

export interface AccordionPanelProps {
    value?: string;
    title?: string;
    _expanded?: boolean;
    _allowAnimation?: boolean;
}

export type AccordionPanelData = Required<AccordionPanelProps>;

export interface AccordionPanelMessages {
    /**
     * 面板添加时触发
     */
    'cos:accordion-panel-attached': AccordionPanel;
    /**
     * 面板移除时触发
     */
    'cos:accordion-panel-detached': AccordionPanel;
    /**
     * 面板头部点击时触发
     */
    'cos:accordion-panel-header-click': {
        event: Event;
        panelValue: string;
    };
}