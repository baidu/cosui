```san export=preview caption=显示分数(五星)
import {Component} from 'san';
import Score from '@cosui/cosmic/score';

export default class Demo extends Component {
    static template = `
        <div class="score-multiple">
            <cos-score
                max="{{10}}"
                value="{{7.1}}"
                score
            />
        </div>
    `;
    static components = {
        'cos-score': Score
    };
}
```