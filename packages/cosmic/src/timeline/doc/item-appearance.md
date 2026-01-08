```san export=preview caption=标题字体类型
import {Component} from 'san';
import Timeline from '@cosui/cosmic/timeline';
import TimelineItem from '@cosui/cosmic/timeline-item';

export default class TimelineDemo extends Component {
    static template = `
        <div class="cos-timeline-demo">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">提供 2 种标题类型(默认、 强调)</h4>
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
                title: '审核通过（强调）',
                appearance: 'strong',
                content: {
                    paragraph: '审核通过，欢迎你参加活动',
                }
            }, {
                title: '2024-11-03 （默认）',
                appearance: '',
                content: {
                    head: '报名审核',
                    paragraph: '活动审核中，请等待审核结果。活动审核中，请等待审核结果。活动审核中，请等待审核结果',
                }
            }, {
                title: '2024-11-01（默认）',
                appearance: '',
                content: {
                    head: '报名申请',
                    paragraph: '已经提交报名申请，请等待活动审核',
                }
            }]
        };
    }
}

```
