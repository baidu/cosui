```san export=preview caption=基本示例
import {Component} from 'san';
import DocumentScroll from '@cosui/cosmic-dqa/document-scroll';

export default class DefaultDemo extends Component {
    static template = `
        <cosd-document-scroll
            items="{{items}}"
        />
    `;

    static components = {
        'cosd-document-scroll': DocumentScroll
    };

    initData() {
        return {
            items: [
                {
                    title: '菠菜的种植方法',
                    logo: 'https://gips1.baidu.com/it/u=807281971,1981100198&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f120_120',
                    size: '1.8MB',
                    actionText: '去查看',
                    type: 'PDF'
                }
            ]
        }
    }
}
```