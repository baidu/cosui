```san export=preview caption=展示当前步骤

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
            <div class="cos-row cos-gutter">
                <cos-button
                    class="cos-col-3"
                    on-click="handleNext"
                >下一步</cos-button>
            </div>
            <h3>第二步仅存在description</h3>
            <cosd-searching-steps
                s-if="showSearchingStepsDes"
                s-bind="searchingStepsDataDes"
                on-change="searchingStepsChangeDes"
            />
            <div class="cos-row cos-gutter">
                <cos-button
                    class="cos-col-3"
                    on-click="handleNextDes"
                >下一步</cos-button>
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
                appearance: 'single',
                steps: [
                    {
                        title: '问题分析'
                    },
                    {
                        title: '搜索全网',
                        words: ['搜索词1', '搜索词2', '搜索词3'],
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
                appearance: 'single',
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
        this.data.set('searchingStepsData.currentIndex', currentIndex + 1);
        this.data.set('searchingStepsData.steps', [
            {
                title: '问题分析'
            },
            {
                title: '搜索全网',
                words: ['搜索词1', '搜索词2', '搜索词3'],
                description: '搜索全网3篇文章'
            },
            {
                title: '信息整理'
            }
        ]);
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
        this.data.set('searchingStepsDataDes.steps', [
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
        ]);
    }
}
```
