```san export=preview caption=表格扩展语法
import {Component} from 'san';
import Markdown from '@cosui/cosmic-dqa/markdown';

export default class CSRDemo extends Component {

    static template = `
        <div>
            <cosd-markdown content="{{text}}"/>
        </div>
    `;

    static components = {
        'cosd-markdown': Markdown
    };

    initData() {
        return {
            text: '|序号|项目|>|年利率（%）|\n| :---: | :---: | :---: | :---: |\n|1.|一、个人住房公积金存款|>|1|\n|2.|当年缴存|>|1.5|\n|3.|上年结转|>|1.5|\n|4.|二、个人住房公积金贷款|>|1|\n|5.|首套|五年以下（含五年）|2.6|\n|6.|^|五年以上|3.1|\n|7.|第二套|五年以下（含五年）|不低于3.025|\n|8.|^|>|五年以上|\n\n'
        };
    }
}
```