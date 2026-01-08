```san export=preview  caption=动态修改props
import {Component} from 'san';
import Pagination from '@cosui/cosmic/pagination';
import Input from '@cosui/cosmic/input';
import Switcher from '@cosui/cosmic/switcher';

export default class Basic extends Component {
    static template = `
        <div data-testid="set-props">
            <div s-if="isPc">
                <h4 class="cos-color-text-minor cos-space-mb-xs cos-font-regular">当传入 page-count，则页数应用 page-count，否则页数应用 total 和 page-size 计算。</h4>
                <div id="total-input" class="cos-flex cos-items-center cos-space-mb-xs">
                    <label class="cos-space-mr-xxs">total:</label>
                    <cos-input value="{=total=}" size="sm"/>
                </div>
                <div id="current-input" class="cos-flex cos-items-center cos-space-mb-xs">
                    <label class="cos-space-mr-xxs">current:</label>
                    <cos-input value="{=current=}" size="sm"/>
                </div>
                <div id="page-size-input" class="cos-flex cos-items-center cos-space-mb-xs">
                    <label class="cos-space-mr-xxs">page-size:</label>
                    <cos-input value="{=pageSize=}" size="sm"/>
                </div>
                <div id="page-count-input" class="cos-flex cos-items-center cos-space-mb-xs">
                    <label class="cos-space-mr-xxs">是否应用 page-count:</label>
                    <cos-switcher
                        size="sm"
                        checked="{=usePageCount=}"
                    />
                </div>
                <div id="page-count-input" class="cos-flex cos-items-center cos-space-mb-xs">
                    <label class="cos-space-mr-xxs">page-count:</label>
                    <cos-input value="{=pageCount=}" size="sm"/>
                </div>
                <p class="cos-space-mt-xs cos-color-text-minor">分页器效果：</p>
            </div>
            <cos-pagination
                total="{{total}}"
                page-size="{{pageSize}}"
                current="{{current}}"
                s-bind="{{usePageCount ?  {pageCount} : {}}}"
                on-change="pageChange"
            />
        </div>
    `;

    initData() {
        return {
            total: 120,
            current: 1,
            pageSize: 10,
            pageCount: 10,
            usePageCount: false
        }
    }

    static components = {
        'cos-pagination': Pagination,
        'cos-input': Input,
        'cos-switcher': Switcher
    };

    pageChange(arg) {
        // 若业务也需修改 current，请及时更新 current
        this.data.set('current', arg.current);
        console.log('[pagination] change event, current:', arg.current, ',prev:', arg.prev);
    }
}
```