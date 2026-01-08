```san export=preview caption=水平轴线
import {Component} from 'san';
import Timeline from '@cosui/cosmic/timeline';
import TimelineItem from '@cosui/cosmic/timeline-item';

export default class TimelineDemo extends Component {
    static template = `
        <div class="cos-timeline-demo">
            <p class="cos-space-mb-sm cos-space-mt-none ">支持 2 种方向(垂直方向、水平方向)</p>
            <div s-for="timeline in timelineList" class="cos-row cos-row-col-1 cos-gutter " style="--cos-grid-gutter: 16px">
                <div class="cos-col" style="--cos-grid-gutter: 16px">
                    <p class="cos-space-mb-sm cos-space-mt-none ">{{timeline.name}}</p>
                    <cos-timeline horizontal="{{timeline.horizontal}}">
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
                            </template>
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
                name: '垂直时间线',
                horizontal: false,
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
                name: '水平时间线',
                horizontal: true,
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
