``` san export=preview caption=作用域数据
import san from 'san';
import UIJSON from '@cosui/cosmic-dynamic-ui';

import Image from '@cosui/cosmic/image';
import ImageGroup from '@cosui/cosmic-card/image-group';
import Score from '@cosui/cosmic/score';
import Title from '@cosui/cosmic-card/title';
import Tag from '@cosui/cosmic/tag';
import Button from '@cosui/cosmic/button';
import Comparison from '@cosui/cosmic-dqa/comparison';

const COMPONENTS = {
    'comparison': Comparison
};

export default class ComparisonDoc extends san.Component {

    static template = `
        <div class="demo">
            <div s-ref="content"></div>
        </div>
    `;

    static components = {
        'cos-button': Button
    };

    attached() {
        this.$content = this.ref('content');
        const App = UIJSON.compile({
            ui,
            components: COMPONENTS
        });
        const app = new App({
            data
        });
        app.attach(this.$content);

    }
}

const ui = {
    type: 'block',
    children: [
        {
            "type": "comparison",
            "props": {
                "bar": "{{items[0].bar}}",
                "items": [{
                    "name": "{{name}}",
                    "values": [
                        "4胜1平1负",
                        "1胜1平4负"
                    ]
                },{
                    "name": "{{items[0].linkInfo.logo}}",
                    "values": [
                        "4胜1平1负",
                        "1胜1平4负"
                    ]
                }],
                "linkInfo": {
                    "href": "http://www.baidu.com",
                    "data-name": "{{name}}",
                    "data-type": "comparison",
                    "data-logo": "{{items[0].linkInfo.logo}}",
                    "data-logo1": "{{items[0].linkInfo.obj.logo1}}",
                    "data-logo2":  {
                        "data-logo1": "{{items[0].linkInfo.obj.logo1}}",
                    },
                    "data-index": "{{index}}"
                },
                "targets": "{{items[0].targets}}"
            }
        },
        {
            type: 'divider'
        },
        {
            "type": "comparison",
            "for": "item, index in items",
            "props": {
                "bar": "{{item.bar}}",
                "items": "{{item.items}}",
                "delimiter": {
                    "icon": "{{item.delimiter.icon}}"
                },
                "linkInfo": {
                    "href": "http://www.baidu.com",
                    "data-name": "{{name}}",
                    "data-type": "comparison",
                    "data-logo": "{{item.linkInfo.logo}}",
                    "data-logo1": "{{items.linkInfo.obj.logo1}}",
                    "data-logo2":  {
                        "data-logo1": "{{items.linkInfo.obj.logo1}}",
                        "data-logo": "{{item.linkInfo.logo}}",
                    },
                    "data-index": "{{index}}"
                },
                "targets": "{{item.targets}}"
            }
        }
    ]
}

const data = {
    "name": "dynamic-ui",
    "items": [{
        "delimiter": {
            "icon": "hot-fill"
        },
        "bar": [
            {
                "text": "胜 75%",
                "value": 0.75
            },
            {
                "text": "平局 16%",
                "value": 0.16
            },
            {
                "text": "胜 9%",
                "value": 0.09
            }
        ],
        "items": [
            {
                "name": "近6场交锋",
                "values": [
                    "4胜1平1负",
                    "1胜1平4负"
                ]
            },
            {
                "name": "近10场战绩",
                "values": [
                    "4胜1平5负",
                    "3胜2平5负"
                ]
            },
            {
                "name": "近10场同主客",
                "values": [
                    "3胜1平6负",
                    "3胜2平5负"
                ]
            },
            {
                "name": "场均进球",
                "values": [
                    "1.4球",
                    "1.4球"
                ]
            },
            {
                "name": "场均失球",
                "values": [
                    "1.7球",
                    "2.0球"
                ]
            },
            {
                "name": "身价",
                "values": [
                    "5.6亿欧",
                    "2.1亿欧"
                ]
            }
        ],
        "linkInfo": {
            "href": "https://m.dongqiudi.com/matchDetail/53755322/analysis",
            "logo": "baidu",
            "obj": {
                "logo1": "baidu1"
            }
        },
        "targets": [
            {
                "image": "https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9",
                "name": "队伍1"
            },
            {
                "image": "https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9",
                "name": "队伍2"
            }
        ],
    }]
};
