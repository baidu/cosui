```san export=preview caption=气泡评分
import {Component} from 'san';
import BubbleScore from '@cosui/cosmic-card/bubble-score';

export default class BasicStyleDemo extends Component {
    static template = `
        <div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">基本</h4>
            <div>
                <cosc-bubble-score
                    value="{{4.8}}"
                />
            </div>
        </div>
    `;
    static components = {
        'cosc-bubble-score': BubbleScore
    };
}

```