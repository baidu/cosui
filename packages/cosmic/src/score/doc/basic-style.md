```san export=preview caption=score的默认用法
import {Component} from 'san';
import Score from '@cosui/cosmic/score';

export default class Demo extends Component {
    static template = `
        <div class="score-multiple">
            <cos-score
                value="{{3.5}}"
            />
        </div>
    `;
    static components = {
        'cos-score': Score
    };
}
