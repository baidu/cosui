``` san export=preview caption=设置子项间隔
import {Component} from 'san';
import './gutter.less';

export default class GridBasic extends Component {

    static template = `
        <div class="demo">
            <p>子项间隔：cos-gutter PC 16px Mobile 8px</p>
            <div class="cos-row cos-gutter">
                <div class="cos-col"><div>cos-col</div></div>
                <div class="cos-col"><div>cos-col</div></div>
                <div class="cos-col"><div>cos-col</div></div>
                <div class="cos-col"><div>cos-col</div></div>
            </div>
            <div class="cos-row cos-gutter">
                <div class="cos-col-6"><div>cos-col-6</div></div>
                <div class="cos-col-3"><div>cos-col-3</div></div>
                <div class="cos-col-3"><div>cos-col-3</div></div>
            </div>
            <div class="cos-row cos-gutter">
                <div class="cos-col-9"><div>cos-col-9</div></div>
                <div class="cos-col-3"><div>cos-col-3</div></div>
            </div>

            <p>自定义子项间隔：--cos-gutter: 12px</p>
            <div class="cos-row cos-gutter" style="--cos-grid-gutter: 3px">
                <div class="cos-col"><div>cos-col</div></div>
                <div class="cos-col"><div>cos-col</div></div>
                <div class="cos-col"><div>cos-col</div></div>
                <div class="cos-col"><div>cos-col</div></div>
            </div>
        </div>
    `;
}
```
