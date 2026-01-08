```san export=preview caption=单个示例

import {Component} from 'san';
import SearchingOutlines from '@cosui/cosmic-dqa/searching-outlines';

export default class DefaultDemo extends Component {

    static template = `
        <div>
            <h3>基本样式</h3>
            <cosd-searching-outlines s-bind="{{data}}" />
        </div>
    `;

    static components = {
        'cosd-searching-outlines': SearchingOutlines
    };

    initData() {
        return {
            data: {
                title: {
                    emoji: '🤔️',
                    text: '你可能还想知道',
                },
                outlines: [
                    {
                        title: '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”',
                        linkInfo: {
                            href:"https://m.baidu.com/s?word=%E5%AD%A6%E9%87%91%E8%9E%8D%E5%93%AA%E4%B8%AA%E5%A4%A7%E5%AD%A6%E6%9C%80%E5%A5%BD"
                        },
                        outlines: [
                            {
                                title: '玳瑁白色猫',
                                linkInfo: {
                                    href:"https://m.baidu.com/s?word=%E5%AD%A6%E9%87%91%E8%9E%8D%E5%93%AA%E4%B8%AA%E5%A4%A7%E5%AD%A6%E6%9C%80%E5%A5%BD"
                                }
                            },
                            {
                                title: '玳瑁白色猫',
                                linkInfo: {
                                    href:"https://m.baidu.com/s?word=%E5%AD%A6%E9%87%91%E8%9E%8D%E5%93%AA%E4%B8%AA%E5%A4%A7%E5%AD%A6%E6%9C%80%E5%A5%BD"
                                }
                            },
                            {
                                title: '玳瑁白色猫',
                                linkInfo: {
                                    href:"https://m.baidu.com/s?word=%E5%AD%A6%E9%87%91%E8%9E%8D%E5%93%AA%E4%B8%AA%E5%A4%A7%E5%AD%A6%E6%9C%80%E5%A5%BD"
                                }
                            }
                        ]
                    },
                    {
                        title: '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”',
                        linkInfo: {
                            href:"https://m.baidu.com/s?word=%E5%AD%A6%E9%87%91%E8%9E%8D%E5%93%AA%E4%B8%AA%E5%A4%A7%E5%AD%A6%E6%9C%80%E5%A5%BD"
                        },
                        outlines: [
                            {
                                title: '玳瑁白色猫',
                                linkInfo: {
                                    href:"https://m.baidu.com/s?word=%E5%AD%A6%E9%87%91%E8%9E%8D%E5%93%AA%E4%B8%AA%E5%A4%A7%E5%AD%A6%E6%9C%80%E5%A5%BD"
                                }
                            },
                            {
                                title: '玳瑁白色猫',
                                linkInfo: {
                                    href:"https://m.baidu.com/s?word=%E5%AD%A6%E9%87%91%E8%9E%8D%E5%93%AA%E4%B8%AA%E5%A4%A7%E5%AD%A6%E6%9C%80%E5%A5%BD"
                                }
                            },
                            {
                                title: '玳瑁白色猫',
                                linkInfo: {
                                    href:"https://m.baidu.com/s?word=%E5%AD%A6%E9%87%91%E8%9E%8D%E5%93%AA%E4%B8%AA%E5%A4%A7%E5%AD%A6%E6%9C%80%E5%A5%BD"
                                }
                            }
                        ]
                    }
                ]
            }
        }
    }
}
```
