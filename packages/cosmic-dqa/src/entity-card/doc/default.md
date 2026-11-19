<!-- @file EntityCard 实体卡片基础示例 -->

```san export=preview caption=基础实体卡片
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
                alt: '旅行风景示例',
                hover: true,
                lazy: false
            },
            title: '旅行目的地',
            content: '用一张图片、一段标题和描述介绍目的地，帮助读者快速了解行程特色。'
        };
    }

    handleClick(params) {
        console.log('EntityCard click', params);
    }
}
```
