```san export=preview caption=不同外观风格

import {Component} from 'san';
import SearchingOutlines from '@cosui/cosmic-dqa/searching-outlines';

export default class DefaultDemo extends Component {

    static template = `
        <div>

            <h3>Dashed 外观（默认样式）</h3>
            <cosd-searching-outlines
                appearance="dashed"
                s-bind="{{data}}"
            />
            <br />

            <h3>Regular 外观</h3>
            <cosd-searching-outlines
                appearance="regular"
                s-bind="{{data}}"
            />
        </div>
    `;

    static components = {
        'cosd-searching-outlines': SearchingOutlines
    };

    initData() {
        return {
            data: {
                title: {
                    icon: '🤔️',
                    text: '你可能还想知道',
                },
                outlines: [
                    {
                        title: '📐 常见勾股数',
                        linkInfo: {
                            href:"https://m.baidu.com/s?word=%E5%AD%A6%E9%87%91%E8%9E%8D%E5%93%AA%E4%B8%AA%E5%A4%A7%E5%AD%A6%E6%9C%80%E5%A5%BD"
                        }
                    },
                    {
                        title: '📚 勾股定理的实际应用',
                        linkInfo: {
                            href:"https://m.baidu.com/s?word=%E5%AD%A6%E9%87%91%E8%9E%8D%E5%93%AA%E4%B8%AA%E5%A4%A7%E5%AD%A6%E6%9C%80%E5%A5%BD"
                        }
                    },
                    {
                        title: '🔍 勾股定理的 3 种证明方法',
                        linkInfo: {
                            href:"https://m.baidu.com/s?word=%E5%AD%A6%E9%87%91%E8%9E%8D%E5%93%AA%E4%B8%AA%E5%A4%A7%E5%AD%A6%E6%9C%80%E5%A5%BD"
                        }
                    },
                    {
                        title: '📖 除勾股定理外，直角三角形还有哪些相关定理？',
                        linkInfo: {
                            href:"https://m.baidu.com/s?word=%E5%AD%A6%E9%87%91%E8%9E%8D%E5%93%AA%E4%B8%AA%E5%A4%A7%E5%AD%A6%E6%9C%80%E5%A5%BD"
                        }
                    },
                ]
            }
        }
    }
}
```
