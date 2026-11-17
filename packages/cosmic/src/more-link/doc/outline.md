```san export=preview caption=边框样式

import {Component} from 'san';
import MoreLink from '@cosui/cosmic/more-link';

export default class MoreLinkDemo extends Component {

    static template = `
        <div>
            <cos-more-link url="/" link-info="{{link}}" appearance="outline">
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
            },
        };
    };
}

```