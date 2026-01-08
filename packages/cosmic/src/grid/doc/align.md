``` san export=preview caption=设置垂直对齐方式
import {Component} from 'san';
import './index.less';

export default class GridBasic extends Component {

    static template = `
        <div class="demo">
            <p>align: start</p>
            <div class="cos-row cos-row-col-12 cos-items-start cos-justify-around">
                <div class="cos-col cos-col-2">
                    <div class="height100">cos-col-2</div>
                </div>
                <div class="cos-col cos-col-2">
                    <div class="height50">cos-col-2</div>
                </div>
                <div class="cos-col cos-col-2">
                    <div class="height80">cos-col-2</div>
                </div>
                <div class="cos-col cos-col-2">
                    <div class="height60">cos-col-2</div>
                </div>
            </div>
            <p>align: center</p>
            <div class="cos-row cos-row-col-12 cos-items-center cos-justify-around">
                <div class="cos-col cos-col-2">
                    <div class="height100">cos-col-2</div>
                </div>
                <div class="cos-col cos-col-2">
                    <div class="height50">cos-col-2</div>
                </div>
                <div class="cos-col cos-col-2">
                    <div class="height80">cos-col-2</div>
                </div>
                <div class="cos-col cos-col-2">
                    <div class="height60">cos-col-2</div>
                </div>
            </div>
            <p>align: end</p>
            <div class="cos-row cos-row-col-12 cos-items-end cos-justify-around">
                <div class="cos-col cos-col-2">
                    <div class="height100">cos-col-2</div>
                </div>
                <div class="cos-col cos-col-2">
                    <div class="height50">cos-col-2</div>
                </div>
                <div class="cos-col cos-col-2">
                    <div class="height80">cos-col-2</div>
                </div>
                <div class="cos-col cos-col-2">
                    <div class="height60">cos-col-2</div>
                </div>
            </div>
        </div>
    `;
}
```
