``` san export=preview caption=导出业务Catalog
import san from 'san';
import {z} from 'zod';
import Button from '@cosui/cosmic/button';
import {defineCatalog, exportCatalog} from '@cosui/cosmic-dynamic-ui';

const catalog = defineCatalog({
    $id: 'travel.v2',
    version: '2.0',
    title: '旅行推荐 Catalog',
    components: {
        TravelCard: {
            props: z.strictObject({
                city: z.string(),
                days: z.number().int().positive()
            })
        }
    },
    actions: {}
});

export default class BusinessCatalogDemo extends san.Component {
    static components = {'cos-button': Button};

    static template = `
        <section>
            <cos-button size="sm" appearance="primary" on-click="exportJson">
                导出业务 Catalog
            </cos-button>
            <div s-if="exported" class="cos-space-mt-md">
                <div>
                    <p>Catalog ID：{{id}}</p>
                    <p>Component：{{components}}</p>
                    <p>序列化状态：{{status}}</p>
                    <details>
                        <summary>查看完整 JSON</summary>
                        <pre style="white-space:pre-wrap;word-break:break-word">{{json}}</pre>
                    </details>
                </div>
            </div>
        </section>
    `;

    initData() {
        return {exported: false, id: '', components: '', status: '', json: ''};
    }

    exportJson() {
        const result = exportCatalog(catalog);
        const json = JSON.stringify(result, null, 2);
        this.data.set('id', result.$id);
        this.data.set('components', Object.keys(result.components).join('、'));
        this.data.set('status', JSON.parse(json) ? '已生成 JSON' : '导出失败');
        this.data.set('json', json);
        this.data.set('exported', true);
    }
}
```
