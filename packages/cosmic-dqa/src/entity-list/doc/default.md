<!-- @file EntityList 实体列表示例 -->

```san export=preview caption=实体列表
import {Component} from 'san';
import EntityList from '@cosui/cosmic-dqa/entity-list';

export default class Demo extends Component {
    static template = `
        <div>
            <cosd-entity-list
                items="{{items}}"
                on-click="handleClick"
            />
        </div>
    `;

    static components = {
        'cosd-entity-list': EntityList
    };

    initData() {
        return {
            items: [
                {
                    thumbnail: {
                        src: 'https://gips0.baidu.com/it/u=533168442,1684591793&fm=3028&app=3028&f=JPEG&fmt=auto&q=91&size=f1080_1920',
                        alt: '旅行风景示例',
                        hover: true
                    },
                    title: ':ml-search[吊脚楼]',
                    content: '吊脚楼是武陵山区具有代表性的传统民居形式，正屋建在地上、 厢房悬空支撑。'
                },
                {
                    thumbnail: {src: 'https://gips0.baidu.com/it/u=533168442,1684591793&fm=3028&app=3028&f=JPEG&fmt=auto&q=91&size=f1080_1920', alt: '旅行风景示例'},
                    title: '传统服饰',
                    content: '服饰上男子头包青丝帕、穿对襟短衫，女子上衣镶花边、下穿简裤。'
                },
                {
                    thumbnail: {src: 'https://gips0.baidu.com/it/u=533168442,1684591793&fm=3028&app=3028&f=JPEG&fmt=auto&q=91&size=f1080_1920', alt: '旅行风景示例'},
                    title: ':ml-search[摆手舞]',
                    content: '摆手舞是土家族最具代表性的传统舞蹈之一，过年有“过赶年”习俗，比汉族提前1-2天过年。'
                },

                // 超长截断
                {
                    thumbnail: {src: 'https://gips0.baidu.com/it/u=533168442,1684591793&fm=3028&app=3028&f=JPEG&fmt=auto&q=91&size=f1080_1920', alt: '长文本截断示例'},
                    title: '走进武陵山间的传统村落，探访吊脚楼建筑、民族服饰与摆手舞文化，感受丰富多彩的地方风情',
                    content: '沿着山间小路走进传统村落，可以看到依山而建的吊脚楼，了解当地居民的日常生活与建筑智慧。'
                        + '参观时还可以欣赏色彩鲜明的民族服饰，观看热闹的摆手舞表演，听村民讲述节庆习俗和代代相传的故事。'
                        + '出发前建议查阅[目的地信息](https://www.baidu.com/s?wd=武陵山旅行攻略)，确认交通路线、开放时间和天气情况，'
                        + '根据个人兴趣合理安排游览顺序，为拍照、休息和体验当地美食预留充足时间。'
                }
            ]
        };
    }

    // 打印组件点击事件参数
    handleClick(params) {
        console.log('EntityList click', params);
    }
}
```
