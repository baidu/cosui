```san export=preview caption=高亮文本示例
import {Component} from 'san';

export default class Demo extends Component {
    static template = `
        <div>
            <div class="cos-row cos-row-col-12 cos-gutter">
                <div class="cos-col cos-col-4">
                    <span class="cos-text-subtitle-sm cos-highlight">{{highlightText}}</span>
                </div>
                <div class="cos-col cos-col-4">
                    <span class="cos-text-subtitle cos-highlight">{{highlightText}}</span>
                </div>
                <div class="cos-col cos-col-4">
                    <span class="cos-text-headline cos-highlight">{{highlightText}}</span>
                </div>
            </div>
        </div>
    `;

    initData() {
        return {
            highlightText: '高亮文本'
        }
    };
}

```