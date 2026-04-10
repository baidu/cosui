```san export=preview caption=分数(五星)展示对应标签说明
import {Component} from 'san';
import Score from '@cosui/cosmic/score';

export default class Demo extends Component {
    static template = `
        <div class="score-multiple">
            <cos-score
                size="lg"
                value="{{3}}"
                type="multiple"
                labels="{{labels}}"
                controlled
            />
        </div>
    `;
    static components = {
        'cos-score': Score
    };

    initData() {
        return {
            labels: ['很差', '较差', '一般', '不错', '很好']
        };
    }
}
```
