```san export=preview caption=高亮文本段落示例
import {Component} from 'san';
import Switcher from '@cosui/cosmic/switcher';

export default class Demo extends Component {
    static template = `
        <div>
            <p class="cos-color-text-minor">卡片内容区应用规范: 首位卡可使用高亮文本。退化到 2-5 位时，文本只加粗不显示高亮下划线。</p>
            <div class="cos-flex cos-items-center">
                <p class="cos-space-mr-xs cos-color-text-minor">是否首位卡: </p>
                <cos-switcher
                    size="sm"
                    checked="{=isFirstCard=}"
                    on-change="handleChange"
                />
            </div>

            <div>
                <div class="cos-text-subtitle-sm">
                    <span>{{text}}</span>
                    <span class="{{tplInfo.order === 1 ? 'cos-highlight' : 'cos-font-medium'}}">{{highlightText}}</span>
                    <span>{{text}}</span>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-switcher': Switcher
    };

    static computed = {
        isFirstCard() {
            return this.data.get('tplInfo').order === 1;
        }
    };

    initData() {
        return {
            tplInfo: {
                order: 1
            },
            highlightText: '这是一段高亮文本段落。这是一段高亮文本段落。这是一段高亮文本段落。',
            text: '这是一段普通文本段落。这是一段普通文本段落。这是一段普通文本段落。这是一段普通文本段落。'
        }
    };

    handleChange({checked}) {
        const order = checked ? 1 : 2;
        this.data.set('tplInfo.order', order);
    }
}

```