``` san export=preview caption=设置水平对齐方式
import {Component} from 'san';
import './index.less';

export default class GridBasic extends Component {
    static template = `
        <div class="demo">
            <p>justfiy: start</p>
            <div class="cos-row cos-row-col-12 cos-justify-start">
                <div class="cos-col-2">col-2</div>
                <div class="cos-col-2">col-2</div>
                <div class="cos-col-2">col-2</div>
            </div>
            <p>justfiy: center</p>
            <div class="cos-row cos-row-col-12 cos-justify-center">
                <div class="cos-col-2">col-2</div>
                <div class="cos-col-2">col-2</div>
                <div class="cos-col-2">col-2</div>
            </div>
            <p>justfiy: end</p>
            <div class="cos-row cos-row-col-12 cos-justify-end">
                <div class="cos-col-2">col-2</div>
                <div class="cos-col-2">col-2</div>
                <div class="cos-col-2">col-2</div>
            </div>
            <p>justfiy: space-around</p>
            <div class="cos-row cos-row-col-12 cos-justify-around">
                <div class="cos-col-2">col-2</div>
                <div class="cos-col-2">col-2</div>
                <div class="cos-col-2">col-2</div>
            </div>
            <p>justfiy: between</p>
            <div class="cos-row cos-row-col-12 cos-justify-between">
                <div class="cos-col-2">col-2</div>
                <div class="cos-col-2">col-2</div>
                <div class="cos-col-2">col-2</div>
            </div>
            <p>justfiy: evenly</p>
            <div class="cos-row cos-row-col-12 cos-justify-evenly">
                <div class="cos-col-2">col-2</div>
                <div class="cos-col-2">col-2</div>
                <div class="cos-col-2">col-2</div>
            </div>
        </div>
    `;
}
```
