``` san export=preview caption=基础栅格，默认基于列数量均分空间，所有列一起撑满容器宽度
import {Component} from 'san';
import './index.less';

export default class GridBasic extends Component {

    static template = `
        <div class="demo">
            <div class="cos-row">
                <div class="cos-col">cos-col</div>
            </div>
            <div class="cos-row">
                <div class="cos-col">cos-col</div>
                <div class="cos-col">cos-col</div>
            </div>
            <div class="cos-row">
                <div class="cos-col">cos-col</div>
                <div class="cos-col">cos-col</div>
                <div class="cos-col">cos-col</div>
            </div>
            <div class="cos-row">
                <div class="cos-col">cos-col</div>
                <div class="cos-col">cos-col</div>
                <div class="cos-col">cos-col</div>
                <div class="cos-col">cos-col</div>
            </div>
            <div class="cos-row">
                <div class="cos-col-4">cos-col-4</div>
                <div class="cos-col-8">cos-col-8</div>
            </div>
        </div>
    `;
}
```
