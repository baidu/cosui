```san export=preview caption=基础使用
import {Component} from 'san';
import Timeline from '@cosui/cosmic/timeline';
import TimelineItem from '@cosui/cosmic/timeline-item';

export default class TimelineDemo extends Component {
    static template = `
        <cos-timeline>
            <cos-timeline-item s-for="item in timeline" title="{{item.title}}">
                <template slot="content">
                    <div class="cos-timeline-item-text-paragraph">
                        {{item.content}}
                    </div>
                </template>
            </cos-timeline-item>
        </cos-timeline>
    `;

    static components = {
        'cos-timeline': Timeline,
        'cos-timeline-item': TimelineItem,
    };

    initData() {
        return {
            timeline: [{
                title: '2024-11-04',
                content: '审核通过，欢迎你参加活动',
            }, {
                title: '2024-11-03',
                content: '活动审核中，请等待审核结果。活动审核中，请等待审核结果。活动审核中，请等待审核结果',
            }, {
                title: '2024-11-02',
                content: '已经提交报名申请，请等待活动审核'
            }, {
                title: '2024-11-01',
                content: '活动开始报名',
            }],
        };
    }
}

```
