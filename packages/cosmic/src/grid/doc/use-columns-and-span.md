``` san export=preview caption=基础栅格，设置总栅格数和子项栅格宽度
import {Component} from 'san';
import './gutter.less';

export default class GridBasic extends Component {

    static template = `
        <div class="demo">
            <p>总栅格数：12</p>
            <div class="cos-row cos-gutter cos-row-col-12">
                <div class="cos-col cos-col-4"><div>cos-col-4</div></div>
                <div class="cos-col cos-col-4"><div>cos-col-4</div></div>
                <div class="cos-col cos-col-4"><div>cos-col-4</div></div>
            </div>
            <div class="cos-row cos-gutter cos-row-col-12">
                <div class="cos-col cos-col-8"><div>cos-col-8</div></div>
                <div class="cos-col cos-col-4"><div>cos-col-4</div></div>
            </div>
            <p>总栅格数：12，子项2个4N 宽度，子项总宽度不够一行不撑开</p>
            <div class="cos-row cos-gutter cos-row-col-12">
                <div class="cos-col-4"><div>cos-col-4</div></div>
                <div class="cos-col-4"><div>cos-col-4</div></div>
            </div>
            <p>总栅格数：12，子项4个4N 宽度，子项总宽度超过一行换行</p>
            <div class="cos-row cos-gutter cos-row-col-12 cos-flex-wrap">
                <div class="cos-col-4"><div>cos-col-4</div></div>
                <div class="cos-col-4"><div>cos-col-4</div></div>
                <div class="cos-col-4"><div>cos-col-4</div></div>
                <div class="cos-col-4"><div>cos-col-4</div></div>
            </div>
            <p>总栅格数：8</p>
            <div class="cos-row cos-gutter cos-row-col-8">
                <div class="cos-col-2"><div>cos-col-2</div></div>
                <div class="cos-col-4"><div>cos-col-4</div></div>
                <div class="cos-col-2"><div>cos-col-2</div></div>
            </div>
            <div class="cos-row cos-gutter cos-row-col-8">
                <div class="cos-col-6"><div>cos-col-6</div></div>
                <div class="cos-col-2"><div>cos-col-2</div></div>
            </div>
            <p>总栅格数：8，子项总宽度不足一行不撑开</p>
            <div class="cos-row cos-gutter cos-row-col-8">
                <div class="cos-col-2"><div>cos-col-2</div></div>
                <div class="cos-col-4"><div>cos-col-4</div></div>
            </div>
        </div>
    `;
}
```
