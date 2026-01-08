```san export=preview caption=展示全部步骤

import {Component} from 'san';
import SearchingSteps from '@cosui/cosmic-dqa/searching-steps';
import Button from '@cosui/cosmic/button';

export default class DefaultDemo extends Component {

    static template = `
        <div>
            <h3>第二步轮播搜索词</h3>
            <cosd-searching-steps
                s-if="showSearchingSteps"
                s-bind="searchingStepsData"
                on-change="searchingStepsChange"
            />
            <div
                class="cos-space-mt-lg"
            >
                <cos-button on-click="handleNext">下一步</cos-button>
            </div>
            <h3>第二步仅存在description</h3>
            <cosd-searching-steps
                s-if="showSearchingStepsDes"
                s-bind="searchingStepsDataDes"
                on-change="searchingStepsChangeDes"
            />
            <div
                class="cos-space-mt-lg"
            >
                <cos-button on-click="handleNextDes">下一步</cos-button>
            </div>
        </div>
    `;

    static components = {
        'cos-button': Button,
        'cosd-searching-steps': SearchingSteps
    };

    initData() {
        return {
            showSearchingSteps: true,
            searchingStepsData: {
                currentIndex: 0,
                appearance: 'full',
                steps: [
                    {
                        title: '问题分析'
                    },
                    {
                        title: '搜索全网',
                        words: ['搜索词特别长搜索词特别长搜索词特别长长长长', '搜索词2', '搜索词3'],
                        description: '搜索全网3篇文章'
                    },
                    {
                        title: '信息整理'
                    }
                ]
            },
            showSearchingStepsDes: true,
            searchingStepsDataDes: {
                currentIndex: 0,
                appearance: 'full',
                steps: [
                    {
                        title: '问题分析'
                    },
                    {
                        title: '搜索全网',
                        description: '搜索全网3篇文章'
                    },
                    {
                        title: '信息整理'
                    }
                ]
            },
        }
    }
    searchingStepsChange({index}) {
        console.log('currentIndex is: ', index);
        if (index >= 3) {
            this.data.set('showSearchingSteps', false);
        }
    }
    handleNext() {
        const currentIndex = this.data.get('searchingStepsData.currentIndex');
        if (currentIndex > 3) {
            return;
        }

        // 在切换步骤时动态更新 steps 数据
        this.data.set('searchingStepsData.steps', [
            {
                title: '问题分析'
            },
            {
                title: '搜索全网',
                words: ['1搜索词特别长搜索词特别长搜索词特别长长长长', '搜索词2', '搜索词3'],
                description: '搜索全网5篇文章'
            },
            {
                title: '信息整理'
            }
        ])
        this.data.set('searchingStepsData.currentIndex', currentIndex + 1);
    }
    searchingStepsChangeDes({index}) {
        console.log('currentIndex is: ', index);
        if (index >= 3) {
            this.data.set('showSearchingStepsDes', false);
        }
    }
    handleNextDes() {
        const currentIndex = this.data.get('searchingStepsDataDes.currentIndex');
        if (currentIndex > 3) {
            return;
        }
        this.data.set('searchingStepsDataDes.currentIndex', currentIndex + 1);

        // 在切换步骤时动态更新 steps 数据
        this.data.set('searchingStepsDataDes.steps', [
            {
                title: '问题分析'
            },
            {
                title: '搜索全网',
                description: '搜索全网5篇文章'
            },
            {
                title: '信息整理'
            }
        ])
    }
}
```
