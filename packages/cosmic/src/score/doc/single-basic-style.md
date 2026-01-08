```san export=preview caption=单星评分
import {Component} from 'san';
import Score from '@cosui/cosmic/score';

export default class Demo extends Component {
    static template = `
        <div class="score-single">
            <cos-score
                value="{{3}}"
                type="single"
                on-change="handleChange"
            />
        </div>

    `;
    static components = {
        'cos-score': Score
    };
    handleChange(event) {
        console.log('[score] trigger change event', event);
    }
}

```