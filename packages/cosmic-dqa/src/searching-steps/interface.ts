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
 * @file searching-steps
 */

export enum StepStatus {
    WAIT = 'wait',
    PROCESS = 'process',
    FINISH = 'finish',
}
export interface Step {
    title: string;
    status?: StepStatus;

    // 描述
    description?: string;
}

interface SearchingStep extends Step {
    words?: string[];
}

export interface SearchingStepsProps {
    currentIndex?: number;

    /**
     * 思考组件展现模式
     * full 显示每一步骤，默认值
     * single 仅显示当前步骤
     */
    appearance?: 'full' | 'single';
    steps: SearchingStep[];

    // 内置 status
    _steps: Step[];
    _carouselTimer?: ReturnType<typeof setTimeout> | null;
    _carouselCount?: number;
}
export type SearchingStepsData = Required<SearchingStepsProps>;

export interface SearchingStepsEvents {
    change: {
        index: number;
    };
}

export interface DqaStepsProps {
    steps: Step[];
}