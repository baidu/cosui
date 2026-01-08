```san export=preview caption=显示文案(单星)
import {Component} from 'san';
import Score from '@cosui/cosmic/score';

export default class Demo extends Component {
    static template = `
        <div class="score-single">
            <cos-score
                max="{{10}}"
                value="{{7.0}}"
                type="single"
            >
                213人评价
            </cos-score>
        </div>
    `;
    static components = {
        'cos-score': Score
    };
}
