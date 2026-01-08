```san export=preview caption=内容区字体样式
import {Component} from 'san';
import Timeline from '@cosui/cosmic/timeline';
import TimelineItem from '@cosui/cosmic/timeline-item';

export default class TimelineDemo extends Component {
    static template = `
        <div class="cos-timeline-demo">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">提供 4 个文本样式</h4>
            <cos-timeline>
                <cos-timeline-item
                    s-for="item in timeline"
                    title="{{item.title}}"
                    appearance="{{item.appearance}}">
                    <template slot="content">
                        <div s-if="{{item.content.head}}" class="cos-timeline-item-text-title">
                            {{item.content.head}}
                        </div>
                        <div s-if="item.content.paragraph" class="cos-timeline-item-text-paragraph">
                            {{item.content.paragraph}}
                        </div>
                        <div s-if="item.content.paraLight" class="cos-timeline-item-text-paragraph-minor">
                            {{item.content.paraLight}}
                        </div>
                        <div s-if="item.content.time" class="cos-timeline-item-text-time">
                            {{item.content.time}}
                        </div>
                    </template>
                </cos-timeline-item>
            </cos-timeline>
        </div>
    `;

    static components = {
        'cos-timeline': Timeline,
        'cos-timeline-item': TimelineItem,
    };

    initData() {
        return {
            timeline: [{
                title: '审核通过',
                appearance: 'strong',
                content: {
                    paraLight: '审核通过，欢迎你参加活动。审核通过，欢迎你参加活动。审核通过，欢迎你参加活动。审核通过，欢迎你参加活动',
                    time: '2024-11-05 15:00'
                }
            }, {
                content: {
                    head: '报名审核',
                    paragraph: '活动审核中，请等待审核结果。活动审核中，请等待审核结果。活动审核中，请等待审核结果。活动审核中，请等待审核结果',
                    time: '2024-11-04 15:00'
                }
            }, {
                content: {
                    head: '报名申请',
                    paragraph: '已经提交报名申请，请等待活动审核',
                    time: '2024-11-03 15:00'
                }
            }]
        };
    }
}

```
