<!-- @file EntityCard 长文本与蓝链截断示例 -->

```san export=preview caption=长文本截断
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
            title: '周末出发：:ml-search[旅行攻略]，探索山间美景与沿途人文风光，收藏适合自己的旅行路线',
            content: '提前查看[目的地信息](https://www.baidu.com/s?wd=旅行攻略)，结合交通方式、景点距离和个人兴趣安排行程。沿途可以欣赏自然风光，了解当地文化，体验特色美食。出发前关注目的地天气和开放时间，适当预留休息时间，并根据实际情况调整计划。'
        };
    }

    handleClick(params) {
        console.log('EntityCard click', params);
    }
}
```
