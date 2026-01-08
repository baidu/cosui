```san export=preview caption=常用样式
import {Component} from 'san';
import Score from '@cosui/cosmic/score';
import './common.less';

export default class Default extends Component {
    static template = `
        <div class="score-common">
            <div>
                <h4>分值 + 星星</h4>
                <cos-score
                    max="{{5}}"
                    value="{{4.5}}"
                    score
                    controlled
                    on-change="handleChange"
                />
                <br /><br />
                <h4>分值 + 单位</h4>
                <cos-score
                    max="{{5}}"
                    value="{{4.5}}"
                    score
                    type="text"
                />
                <br /><br />
                <h4>分值 + 单位 + 文本</h4>
                <cos-score
                    max="{{5}}"
                    value="{{4.5}}"
                    score
                    type="text"
                >
                    99人评价
                </cos-score>
            </div>
        </div>
    `;

    static components = {
        'cos-score': Score
    };

    initData() {
        return {
            score: 4.5
        }
    };
    handleChange(e) {
        this.data.set('score', e.value.toFixed(1))
    }
}


```