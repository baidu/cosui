```san export=preview caption=基本用法
import {Component} from 'san';
import Score from '@cosui/cosmic/score';
import './default.less';

export default class Default extends Component {
    static template = `
        <div class="score-demo">
            <div>
                <h4>分值 + 星星</h4>
                <cos-score
                    max="{{10}}"
                    value="{{7.1}}"
                    score
                />
            </div>
            <div>
                <h4>分值 + 五星 + 评价</h4>
                <cos-score
                    value="{{3}}"
                    type="multiple"
                    score
                >
                    213人评价
                </cos-score>
            </div>
            <div>
                <h4>分值 + 单星 + 评价</h4>
                <cos-score
                    value="{{3}}"
                    type="single"
                    score
                >
                    213人评价
                </cos-score>
            </div>
            <div>
                <h4>0 星</h4>
                <cos-score
                    score
                    value="{{0}}"
                />
            </div>
            <div>
                <h4>暂无评分</h4>
                <cos-score
                    score
                />
            </div>
        </div>
    `;

    static components = {
        'cos-score': Score
    };
}


```