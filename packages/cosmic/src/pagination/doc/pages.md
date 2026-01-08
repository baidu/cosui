```san export=preview  caption=页码展示
import {Component} from 'san';
import Pagination from '@cosui/cosmic/pagination';

export default class Basic extends Component {
    static template = `
        <div data-testid="pages-pagination">
            <h4 class="cos-color-text-minor cos-space-mb-xs cos-font-regular" s-if="isPc">7 页以内直接展示所有页码</h4>
            <p s-if="isPc" class="cos-space-mt-xs cos-color-text-minor">页码为5，现在是第 {{current1}} 页</p>
            <cos-pagination
                class="display-all-pages"
                page-count="{{5}}"
                on-change="pageChange($event, 'current1')"
            />
            <div s-if="isPc">
                <p class="cos-space-mt-xs cos-color-text-minor">页码为7，现在是第 {{current2}} 页</p>
                <cos-pagination
                    class="display-all-pages"
                    page-count="{{7}}"
                    on-change="pageChange($event, 'current2')"
                />

                <br />

                <h4 class="cos-color-text-minor cos-space-mb-xs cos-font-regular">超过 7 页省略部分页码</h4>
                <p class="cos-space-mt-xs cos-color-text-minor">页码为10，现在是第 {{current3}} 页</p>
                <cos-pagination
                    class="display-first-6-pages"
                    total="{{100}}"
                    page-size="{{10}}"
                    on-change="pageChange($event, 'current3')"
                />

                <p class="cos-space-mt-xs cos-color-text-minor">页码为20，现在是第 {{current4}} 页</p>
                <cos-pagination
                    class="display-last-6-pages"
                    page-count="{{20}}"
                    current="{{current4}}"
                    on-change="pageChange($event, 'current4')"
                />

                <p class="cos-space-mt-xs cos-color-text-minor">页码为50，现在是第 {{current5}} 页</p>
                <cos-pagination
                    class="display-center-pages"
                    page-count="{{50}}"
                    current="{{current5}}"
                    on-change="pageChange($event, 'current5')"
                />
            </div>
        </div>
    `;

    initData() {
        return {
            current1: 1,
            current2: 1,
            current3: 1,
            current4: 20,
            current5: 13
        }
    }

    static components = {
        'cos-pagination': Pagination
    };

    pageChange(arg, key) {
        console.log('[pagination] change event, current:', arg.current, ',prev:', arg.prev);
        // 若业务也需修改 current，请及时更新 current
        this.data.set(key, arg.current);
    }
}
```