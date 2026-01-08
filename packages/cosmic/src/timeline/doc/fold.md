```san export=preview caption=折叠时间轴
import {Component} from 'san';
import Timeline from '@cosui/cosmic/timeline';
import TimelineItem from '@cosui/cosmic/timeline-item';
import Fold from '@cosui/cosmic/fold';

export default class TimelineDemo extends Component {
    static template = `
        <div class="cos-timeline-demo">
            <cos-fold fold-height="80">
                <cos-timeline>
                    <cos-timeline-item
                        s-for="item in timeline"
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
            </cos-fold>
        </div>
    `;

    static components = {
        'cos-fold': Fold,
        'cos-timeline': Timeline,
        'cos-timeline-item': TimelineItem,
    };

    initData() {
        return {
            timeline: [{
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
            }]
        };
    }
}

```
