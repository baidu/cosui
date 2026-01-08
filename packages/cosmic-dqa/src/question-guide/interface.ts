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
 * @file question-guide/interface.ts
 * @description question-guide Interface
 */

export interface Option {
    value: string;
    image?: string;
    caption?: string;
}
export interface Item {
    // 选项类型
    type: 'question' | 'radio' | 'checkbox';
    // 反问选择前置标签
    label?: string;
    // 问题列表
    options: Option[];
}
export interface QuestionGuideProps {
    // 引导语
    title: string;
    // 引导语图标
    icon?: string;
    // 是否可滚动
    scrollable?: boolean;
    // 问题选项列表
    items: Item[];
    // 样式变体
    appearance: '' | 'ghost';
}

export type QuestionGuideData = Required<QuestionGuideProps>;

export interface QuestionGuideEvents {
    change: {
        event: Event;
        label: Item['label'];
        type: Item['type'];
        option: Option;
        checked: boolean;
        optionIndex: number;
        index: number;
    };

    /**
     * pc 端点击切换事件触发，mobile 端滚动事件触发
     */
    scroll: {
        action?: string;
        event?: Event;
    };
}