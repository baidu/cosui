```san export=preview caption=基本示例
import {Component} from 'san';
import CompanyGraph from '@cosui/cosmic-dqa/company-graph';
import './default.less';

export default class DefaultDemo extends Component {
    static template = `
        <div class="company-graph-demo">
            <div>
                <h4>size: md</h4>
                <cosd-company-graph
                    size="md"            
                    s-bind="stockStructureData"
                />
            </div>
            <div>
                <h4>size: sm</h4>
                <cosd-company-graph
                    size="sm"          
                    s-bind="companyData"
                />
            </div>
        </div>
    `;

    static components = {
        'cosd-company-graph': CompanyGraph
    };

    initData() {
        return {
            stockStructureData: {
                linkInfo: {
                    href: 'http://wwww.baidu.com'
                },
                name: '东菱电器科技有限公司',
                inbound: [
                    {
                        name: '香港中央结算有限公司',
                        caption: '持1,398,724,178股',
                        relation: '5.55%'
                    },
                    {
                        name: '深圳市晏清投资发展有限公司',
                        caption: '持1,258,542,349股',
                        relation: '4.45%'
                    },
                    {
                        name: '其他(12)',
                        caption: '持11,147,377,415股',
                        relation: '90%'
                    }
                ],
                outbound: [
                    {
                        name: '招银金融租赁有限公司',
                        caption: '认缴1,800,000万(元)',
                        relation: '5%'
                    },
                    {
                        name: '招商信诺人寿保险有限公司',
                        caption: '认缴1,800,000万(元)',
                        relation: '5%'
                    },
                    {
                        name: '其他',
                        caption: '认缴21,800,000万(元)',
                        relation: '90%'
                    },
                ]
            },
            companyData: {
                linkInfo: {},
                name: '东菱电器科技有限公司',
                inbound: [
                    {
                        name: '股东(4)'
                    },
                    {
                        name: '法定代表人(1)'
                    },
                    {
                        name: '主要人员(11)'
                    }
                ],
                outbound: [
                    {
                        name: '分支机构(10)'
                    },
                    {
                        name: '对外投资(20)'
                    },
                    {
                        name: '控股企业(5)'
                    },
                ]
            }
        }
    }
}
```