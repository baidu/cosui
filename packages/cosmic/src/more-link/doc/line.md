```san export=preview platform=pc caption=横向延伸（仅PC支持）

import {Component} from 'san';
import MoreLink from '@cosui/cosmic/more-link';


export default class MoreLinkDemo extends Component {

    static template = `
        <div>
            <cos-more-link url="/" link-info="{{link}}" appearance="line">
                查看更多
            </cos-more-link>
        </div>
    `;

    static components = {
        'cos-more-link': MoreLink
    };

    initData() {
        return {
            url: '/',
            link: {
                target: '_blank'
            }
        };
    };
}

```