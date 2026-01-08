```san export=preview caption=修改尺寸
import {Component} from 'san';
import Score from '@cosui/cosmic/score';
import './default.less';

export default class Default extends Component {
    static template = `
        <div class="score-demo">
            <div>
                <h4>sm，数字 14px，星星 12px</h4>
                <cos-score
                    size="sm"
                    value="{{3}}"
                    type="multiple"
                    score
                >
                    213人评价
                </cos-score>
            </div>
            <div>
                <h4>md（默认），数字 16px，星星 14px</h4>
                <cos-score
                    value="{{3}}"
                    type="multiple"
                    score
                >
                    213人评价
                </cos-score>
            </div>
            <div>
                <h4>lg，数字 24px，星星 24px</h4>
                <cos-score
                    size="lg"
                    value="{{3}}"
                    type="multiple"
                    score
                >
                    213人评价
                </cos-score>
            </div>
        </div>
    `;

    static components = {
        'cos-score': Score
    };
}

```
