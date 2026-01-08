```san export=preview caption=基本示例
import {Component} from 'san';
import CompanyCard from '@cosui/cosmic-dqa/company-card';

export default class DefaultDemo extends Component {
    static template = `
        <cosd-company-card
            level="{{level}}"
            linkInfo="{{linkInfo}}"
            logo="{{logo}}"
            name="{{name}}"
            legalPerson="{{legalPerson}}"
            registeredCapital="{{registeredCapital}}"
            tags="{{tags}}"
        />
    `;

    static components = {
        'cosd-company-card': CompanyCard
    };

    initData() {
        return {
            // normal | standard | intermediate | premium
            level: 'premium',
            logo: 'https://zhengxin-pub.cdn.bcebos.com/logopic/84e7d83fdf87d59c91e5d1663fe60774_fullsize.jpg?x-bce-process=image/resize,m_lfit,w_200',
            name: '广州东菱电器科技有限公司',
            legalPerson: '郭健强',
            registeredCapital: '1850000万元',
            tags: ['开业', '高新技术企业'],
            linkInfo: {
                href: 'https://www.baidu.com'
            },
        }
    }
}
```