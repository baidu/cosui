```san export=preview caption=修改评分值
import {Component} from 'san';
import Score from '@cosui/cosmic/score';

export default class Demo extends Component {
    static template = `
        <div class="score-multiple">
            <div data-testid="clearable-false" class="cos-space-mb-xl">
                <p class="cos-space-mt-none">选择同一分数时不支持清空（不会触发 change 事件）</p>
                <cos-score
                    value="{{3}}"
                    controlled="{{true}}"
                    clearable="{{false}}"
                    size="lg"
                    on-change="handleChange"
                />
            </div>
            <div data-testid="clearable-true">
                <p class="cos-space-mt-none">选择同一分数时支持清空（会触发 change 事件）</p>
                <cos-score
                    value="{{3}}"
                    controlled="{{true}}"
                    clearable="{{true}}"
                    size="lg"
                    on-change="handleChange"
                />
            </div>
        </div>
    `;
    static components = {
        'cos-score': Score
    };
    handleChange(event) {
        console.log('[score] trigger change event', event);
    }
}
