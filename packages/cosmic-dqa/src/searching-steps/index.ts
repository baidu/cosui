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
 * @file searchingSteps 组件 mobile 端
 */

import {Component} from 'san';
import {
    type SearchingStepsProps,
    type SearchingStepsData,
    type SearchingStepsEvents,
    type Step,
    StepStatus} from './interface';
import Icon from '@cosui/cosmic/icon';

// 文本轮播速度
const WORDS_SPEED = 400;

// 结束步骤动画时长（css 的 duration 为 0.4s）
const FINISH_STEP_DURATION = 400;

const formatSteps = (steps: SearchingStepsData['steps'], currentIndex: number): Step[] => {
    return steps.map((step, index) => {
        return {
            title: step.title,
            status: index < currentIndex
                ? StepStatus.FINISH
                : (index === currentIndex
                    ? StepStatus.PROCESS
                    : StepStatus.WAIT)
        } as Step;
    });
};

export default class SearchingSteps extends Component<SearchingStepsData> {
    static trimWhitespace = 'all';
    static components = {
        'cos-icon': Icon
    };

    static template = `
        <div class="cosd-searching-steps" disable-audio>
            <div
                s-for="step, index in _steps"
                class="cosd-searching-step{{step.status ? ' cosd-searching-step-' + step.status : ''}}"
            >
                <div class="cosd-searching-step-icon">
                    <div
                        s-if="step.status == 'finish'"
                        class="cosd-searching-step-icon-main"
                    >
                        <cos-icon
                            name="check"
                            class="cosd-searching-step-icon-check"
                        />
                    </div>
                </div>
                <div
                    class="cosd-searching-step-content"
                >
                    <span s-if="step.title">{{ step.title }}</span>
                    <span
                        s-if="step.description"
                        class="cosd-searching-step-description"
                    >{{ step.description }}</span>
                </div>
            </div>
        </div>
    `;

    // 轮播词的定时器
    private wordTimer: ReturnType<typeof setTimeout> | null;

    // 轮播次的轮播计数器
    private wordShowedCounts: number[];

    initData(): SearchingStepsProps {
        return {
            currentIndex: 0,
            appearance: 'full',
            steps: [],
            _steps: []
        };
    }

    inited(): void {
        const {
            steps,
            appearance,
            currentIndex = 0
        } = this.data.get();
        if (!steps?.length) {
            return;
        }
        if (appearance === 'single') {
            return this.data.set('_steps', [{
                title: steps[currentIndex].title,

                // 初始化当前步骤为 process
                status: StepStatus.PROCESS
            }]);
        }
        this.wordShowedCounts = [0];
        this.data.set('_steps', formatSteps(steps, currentIndex));
    }

    attached() {
        const currentIndex = this.data.get('currentIndex');

        // 当前步骤索引在步骤范围内 loading 时
        if (currentIndex < this.data.get('_steps').length) {

            // 初始化时触发一次 currentIndex 的数据处理（在初始化步骤就有轮播词时，需要直接进入轮播）
            this.changeCurrentIndex(currentIndex);
            this.showWords(currentIndex, true);
        }

        this.watch('steps', (steps: SearchingStepsData['steps']) => {

            // 如果没有 steps，则不处理
            if (!steps?.length) {

                // 将 _steps 置空
                this.data.set('_steps', []);
                return;
            }

            let currentIndex = this.data.get('currentIndex') || 0;
            const appearance = this.data.get('appearance');
            if (appearance === 'full') {

                // steps 中填写了 status 信息，根据配置计算 currentIndex。
                steps.forEach((step, index) => {
                    if (step.status === StepStatus.FINISH) {
                        currentIndex = index + 1;
                    }
                    if (step.status === StepStatus.PROCESS) {
                        currentIndex = index;
                        return;
                    }
                });

                this.data.set('_steps', formatSteps(steps, currentIndex));

                // 根据当前 steps 信息，同步更新当前的 currentIndex
                this.data.set('currentIndex', currentIndex);
            }
            else if (appearance === 'single') {
                if (currentIndex < steps.length) {
                    this.data.set('_steps[0].title', steps[currentIndex]?.title);
                    this.data.set('_steps[0].status', steps[currentIndex]?.status || StepStatus.PROCESS);
                }
                else {
                    this.data.set('_steps[0].status', StepStatus.FINISH);
                }
            }

            // 更新 steps 后，需要重新触发当前步骤的词轮播
            this.showWords(currentIndex, false);
        });

        this.watch('currentIndex', (val: number) => {
            this.changeCurrentIndex(+val);
            this.showWords(val, true);
        });
    }
    detached() {

        // 卸载组件时，清空轮播词定时器
        this.wordTimer && clearTimeout(this.wordTimer);
        this.wordTimer = null;
    }
    changeCurrentIndex(index: number) {
        const {
            appearance,
            steps = []
        } = this.data.get();
        const stepsLength = steps.length;
        if (index > stepsLength) {
            return;
        }

        // prevDescription 处理，如果上一个步骤没有轮播词，但有描述信息，清空上一个步骤的描述信息
        const prevIndex = index - 1;
        if (
            prevIndex >= 0
            && !steps[prevIndex]?.words?.length
            && steps[prevIndex]?.description
        ) {
            this.updateDescriptionByIndex(prevIndex, '');
        }

        // 以下部分为 _steps 内的 status 处理
        if (appearance === 'single') {

            // 最后一步的下一步没有 title，保留上一步的 title
            if (index < stepsLength) {
                this.data.set('_steps[0].title', steps[index]?.title || '');
                this.data.set('_steps[0].status', StepStatus.PROCESS);
            }
            else {
                this.data.set('_steps[0].status', StepStatus.FINISH);
            }

            // 上一个步骤 finish 动画完成则认为 change 发生
            setTimeout(() => {
                this.fire<SearchingStepsEvents['change']>('change', {index});
            }, FINISH_STEP_DURATION);
            return;
        }

        // 此时是第一个步骤 process
        if (index === 0) {
            this.data.set(`_steps[${index}].status`, StepStatus.PROCESS);
        }

        // 第二个到最后一个步骤 process
        else if (index < stepsLength) {

            // 前序状态设置为完成
            for (let i = index - 1; i >= 0; i--) {
                this.data.set(`_steps[${i}].status`, StepStatus.FINISH);
            }
            this.data.set(`_steps[${index}].status`, StepStatus.PROCESS);
        }

        // 最后一个步骤 finish
        else {
            this.data.set(`_steps[${stepsLength - 1}].status`, StepStatus.FINISH);
        }

        // 上一个步骤 finish 动画完成则认为 change 发生
        setTimeout(() => {
            this.fire<SearchingStepsEvents['change']>('change', {index});
        }, FINISH_STEP_DURATION);
    }
    showWords(currentIndex: number, nextStep = false) {
        const {
            steps = []
        } = this.data.get();
        if (currentIndex > steps.length) {
            return;
        }

        // word 轮播中 && 切换 step
        if (this.wordTimer && nextStep && currentIndex > 0) {
            clearTimeout(this.wordTimer);
            this.wordTimer = null;

            // 清除上一个步骤的展示信息
            this.updateDescriptionByIndex(currentIndex - 1, '');
        }
        const currentData = steps[currentIndex] || {};
        const words = currentData.words || [];

        // 无 words 则不在进行轮播循环了
        if (!words.length) {

            // 无 words，有 descriptions，则一直展示 description 直到下一个 step
            currentData.description && this.updateDescriptionByIndex(currentIndex, currentData.description);
            return;
        }
        const currentWordShowedCount = this.wordShowedCounts[currentIndex] || 0;
        this.updateDescriptionByIndex(currentIndex, words[currentWordShowedCount % words.length]);
        this.wordTimer && clearTimeout(this.wordTimer);
        this.wordTimer = null;
        // 递归轮播 words
        this.wordTimer = setTimeout(() => {

            // words 展示完成一次（展示了 WORDS_SPEED 时间），则计数一次
            this.wordShowedCounts[currentIndex] = currentWordShowedCount + 1;
            this.showWords(currentIndex, false);
        }, WORDS_SPEED);
    }
    updateDescriptionByIndex(index: number, value: string) {
        const {currentIndex, appearance} = this.data.get();

        // 仅展示当前步骤状态下，description 只设置当前展示的步骤
        if (appearance === 'single') {
            this.data.set('_steps[0].description', currentIndex === index ? value : '');
            return;
        }
        this.data.set(`_steps[${index}].description`, value);
    }
}
