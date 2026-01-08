```san export=preview caption=显示文案(五星)
import {Component} from 'san';
import Score from '@cosui/cosmic/score';

export default class Demo extends Component {
    static template = `
        <div class="score-multiple">
            <cos-score
                value="{{3}}"
                type="multiple"
            >
                213人评价
            </cos-score>
        </div>
    `;
    static components = {
        'cos-score': Score
    };
}
```