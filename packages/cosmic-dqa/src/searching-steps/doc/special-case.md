```san export=preview caption=逐步增加步骤
// 不在文档对外展示
import {Component} from 'san';
import SearchingSteps from '@cosui/cosmic-dqa/searching-steps';
import Button from '@cosui/cosmic/button';

export default class DefaultDemo extends Component {

    static template = `
        <div>
            <h3>逐步增加 - 第二步轮播搜索词</h3>
            <cosd-searching-steps
                s-if="{{showFullSteps}}"
                s-bind="{{fullModeStepsData}}"
            />
            <div
                class="cos-space-mt-lg"
            >
                <cos-button on-click="handleAddStep">下一步</cos-button>
            </div>

            <h3>修改步骤内容 - 单步展示</h3>
            <cosd-searching-steps
                s-if="{{showSingleStep}}"
                s-bind="{{singleModeStepsData}}"
            />
            <div
                class="cos-space-mt-lg"
            >
                <cos-button on-click="changeSingleStep">下一步</cos-button>
            </div>

            <h3>初始设置 steps 与 currentIndex</h3>
            <cosd-searching-steps
                current-index="{{1}}"
                steps="{{stepsData}}"
                appearance="full"
            />
    `;

    static components = {
        'cos-button': Button,
        'cosd-searching-steps': SearchingSteps
    };

    initData() {
        return {
            showFullSteps: true,
            fullStepsIndex: 1,
            fullModeStepsData: {
                currentIndex: 0,
                appearance: 'full',
                steps: [ {
                        title: '问题分析',
                        status: 'process'
                    }
                ]
            },
            showSingleStep: true,
            singleStepsIndex: 1,
            singleModeStepsData: {
                currentIndex: 0,
                appearance: 'single',
                steps: [
                    {
                        title: '问题分析',
                        status: 'process'
                    }
                ]
            },
            stepsData:[
                {
                    title: '问题分析',
                    status: 'process'
                },
                {
                    title: '搜索全网',
                    words: ['搜索词特别长搜索词特别长搜索词特别长长长长', '搜索词2', '搜索词3'],
                    description: '搜索全网3篇文章',
                    status: 'process'
                },
                {
                    title: '信息整理',
                    status: 'process'
                }
            ],
            currentIndex: 0,
        }
    }
    handleAddStep() {
        const currentIndex = this.data.get('fullStepsIndex');
        const stepsData = this.data.get('stepsData');
        if (currentIndex === stepsData.length) {
            this.data.set('fullModeStepsData.steps[2].status', 'finish');
            this.data.set('fullStepsIndex', currentIndex + 1);
            return;
        }
        else if (currentIndex > stepsData.length) {
            this.data.set('showFullSteps', false);
            return;
        }
        this.data.push('fullModeStepsData.steps', stepsData[currentIndex]);
        this.data.set('fullStepsIndex', currentIndex + 1);
    }
    changeSingleStep() {
        const currentIndex = this.data.get('singleStepsIndex');
        const stepsData = this.data.get('stepsData');
        if (currentIndex >= stepsData.length) {
            return;
        }
        this.data.set('singleModeStepsData.steps', [stepsData[currentIndex]]);
        this.data.set('singleStepsIndex', currentIndex + 1);
    }
}
```
