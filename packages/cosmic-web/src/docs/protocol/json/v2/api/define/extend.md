``` san export=preview caption=自定义Catalog
import san from 'san';
import {z} from 'zod';
import {defineCatalog} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

const base = CATALOG.definition;
const catalog = defineCatalog({
    ...base,
    $id: 'travel.extended.v2',
    components: {
        ...base.components,
        TravelCard: {
            props: z.strictObject({value: z.string()})
        }
    }
});

export default class ExtendCatalogDemo extends san.Component {
    static template = `
        <section style="padding:14px;border:1px solid #dce4f2;border-radius:10px;background:#f7faff">
            <strong>自定义 Catalog 扩展成功</strong>
            <p>原有 Component：{{baseCount}} 个</p>
            <p>新增 Component：TravelCard</p>
            <p>当前 Component：{{totalCount}} 个</p>
        </section>
    `;

    initData() {
        return {
            baseCount: Object.keys(base.components).length,
            totalCount: Object.keys(catalog.definition.components).length
        };
    }
}
```
