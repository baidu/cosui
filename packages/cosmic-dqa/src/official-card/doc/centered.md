```san export=preview caption=居中布局
import {Component} from 'san';
import OfficialCard from '@cosui/cosmic-dqa/official-card';

export default class DefaultDemo extends Component {
    static template = `
        <cosd-official-card
            appearance="{{appearance}}"
            poster="{{poster}}"
            linkInfo="{{linkInfo}}"
            title="{{title}}"
            tag="{{tag}}"
            introduction="{{introduction}}"
            logo="{{logo}}"
        />
    `;

    static components = {
        'cosd-official-card': OfficialCard
    };

    initData() {
        return {
            appearance: 'centered',
            poster: {
                src: 'https://xin-static.cdn.bcebos.com/aiqicha-m/cosmic/official-card/norm-bg.png'
            },
            title: '东菱电器官网东菱电器官网东菱电器官网',
            linkInfo: {
                href: 'https://www.baidu.com'
            },
            tag: ['开业', '高新技术企业'],
            introduction: 'www.donlim.cn',
            logo: 'https://zhengxin-pub.cdn.bcebos.com/logopic/84e7d83fdf87d59c91e5d1663fe60774_fullsize.jpg?x-bce-process=image/resize,m_lfit,w_200',
        }
    }
}
```