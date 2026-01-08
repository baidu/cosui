```san export=preview caption=轴线类型
import {Component} from 'san';
import Timeline from '@cosui/cosmic/timeline';
import TimelineItem from '@cosui/cosmic/timeline-item';

export default class TimelineDemo extends Component {
    static template = `
        <div class="cos-timeline-demo">
            <p class="cos-space-mb-sm cos-space-mt-none ">提供 3 种类型轴线(实线、虚线、点线)</p>
            <div class="cos-row cos-row-col-2 cos-gutter " style="--cos-grid-gutter: 16px">
                <div s-for="timeline in timelineList" class="cos-col">
                    <p class="cos-space-mb-sm cos-space-mt-none ">lineType:{{timeline.lineType}}</p>
                    <cos-timeline line-type="{{timeline.lineType}}">
                        <cos-timeline-item
                            s-for="item in timeline.items"
                            title="{{item.title}}">
                            <template slot="content">
                                <div s-if="{{item.content.head}}" class="cos-timeline-item-text-title">
                                    {{item.content.head}}
                                </div>
                                <div s-if="item.content.paragraph" class="cos-timeline-item-text-paragraph">
                                    {{item.content.paragraph}}
                                </div>
                            </div>
                        </cos-timeline-item>
                    </cos-timeline>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-timeline': Timeline,
        'cos-timeline-item': TimelineItem,
    };

    initData() {
        return {
            timelineList: [{
                lineType: 'solid',
                items: [{
                    title: '2024-11-04',
                    content: {
                        head: '审核通过',
                        paragraph: '审核通过，欢迎你参加活动',
                    }
                }, {
                    title: '2024-11-03',
                    content: {
                        head: '报名审核',
                        paragraph: '活动审核中，请等待审核结果。活动审核中，请等待审核结果。活动审核中，请等待审核结果',
                    }
                }, {
                    title: '2024-11-02',
                    content: {
                        head: '报名申请',
                        paragraph: '已经提交报名申请，请等待活动审核',
                    }
                }, {
                    title: '2024-11-01',
                    content: {
                        head: '报名开始',
                        paragraph: '活动开始报名',
                    }
                }],
            }, {
                lineType: 'dashed',
                items: [{
                    title: '2024-11-04',
                    content: {
                        head: '审核通过',
                        paragraph: '审核通过，欢迎你参加活动',
                    }
                }, {
                    title: '2024-11-03',
                    content: {
                        head: '报名审核',
                        paragraph: '活动审核中，请等待审核结果。活动审核中，请等待审核结果。活动审核中，请等待审核结果',
                    }
                }, {
                    title: '2024-11-02',
                    content: {
                        head: '报名申请',
                        paragraph: '已经提交报名申请，请等待活动审核',
                    }
                }, {
                    title: '2024-11-01',
                    content: {
                        head: '报名开始',
                        paragraph: '活动开始报名',
                    }
                }],
            }, {
                lineType: 'dotted',
                items: [{
                    title: '2024-11-04',
                    content: {
                        head: '审核通过',
                        paragraph: '审核通过，欢迎你参加活动',
                    }
                }, {
                    title: '2024-11-03',
                    content: {
                        head: '报名审核',
                        paragraph: '活动审核中，请等待审核结果。活动审核中，请等待审核结果。活动审核中，请等待审核结果',
                    }
                }, {
                    title: '2024-11-02',
                    content: {
                        head: '报名申请',
                        paragraph: '已经提交报名申请，请等待活动审核',
                    }
                }, {
                    title: '2024-11-01',
                    content: {
                        head: '报名开始',
                        paragraph: '活动开始报名',
                    }
                }],
            }]
        };
    }
}

```
