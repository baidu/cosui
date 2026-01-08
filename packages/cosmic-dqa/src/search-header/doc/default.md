```san export=preview caption=基本示例
import {Component} from 'san';
import SearchHeader from '@cosui/cosmic-dqa/search-header';

export default class DefaultDemo extends Component {
    static template = `
        <div>
            <h3>基础品牌</h3>
            <cosd-search-header
                appearance="{{appearance}}"
                subjective="{{subjective}}"
                citationCount="{{citationCount}}"
            />

            <h3>通用品牌联名</h3>
            <cosd-search-header
                overview="{{overview}}"
                brandLogo="{{brandLogo}}"
                brandLogoDark="{{brandLogoDark}}"
                appearance="{{appearance}}"
            />

            <h3>强品牌联名</h3>
            <cosd-search-header
                brandLogo="{{brandLogo1}}"
                brandLogoDark="{{brandLogoDark1}}"
                appearance="{{appearance1}}"
            />

            <h3>热点品牌</h3>
            <cosd-search-header
                appearance="{{appearance2}}"
                overview="上升热点"
            />
        </div>
    `;

    static components = {
        'cosd-search-header': SearchHeader
    };

    initData() {
        return {
            brandLogo: 'https://gips3.baidu.com/it/u=3743835331,3755552466&fm=3028&app=3028&f=PNG&fmt=auto&q=99&size=f193_48',
            brandLogoDark: 'https://gips3.baidu.com/it/u=3743835331,3755552466&fm=3028&app=3028&f=PNG&fmt=auto&q=99&size=f193_48',
            brandLogo1: 'https://gips1.baidu.com/it/u=1535904864,1852646303&fm=3028&app=3028&f=PNG&fmt=auto&q=99&size=f239_50',
            brandLogoDark1: 'https://gips1.baidu.com/it/u=1535904864,1852646303&fm=3028&app=3028&f=PNG&fmt=auto&q=99&size=f239_50',
            overview: '解答',
            appearance: 'primary',
            appearance1: 'enhance',
            appearance2: 'secondary',
            subjective: true,
            citationCount: 20,
        }
    }
}
```