<!-- @file EntityCard 标题与描述蓝链示例 -->

```san export=preview caption=标题与描述蓝链
import {Component} from 'san';
import EntityCard from '@cosui/cosmic-dqa/entity-card';

export default class Demo extends Component {
    static template = `
        <div>
            <cosd-entity-card
                thumbnail="{{thumbnail}}"
                title="{{title}}"
                content="{{content}}"
                on-click="handleClick"
            />
        </div>
    `;

    static components = {
        'cosd-entity-card': EntityCard
    };

    initData() {
        return {
            thumbnail: {
                src: 'https://gips0.baidu.com/it/u=533168442,1684591793&fm=3028&app=3028&f=JPEG&fmt=auto&q=91&size=f1080_1920',
                alt: '旅行风景示例'
            },
            title: ':ml-search[旅行攻略]',
            content: '出发前可以查阅[目的地信息](https://www.baidu.com/s?wd=旅行攻略)，规划适合自己的路线。'
        };
    }

    handleClick(params) {
        console.log('EntityCard click', params);
    }
}
```
