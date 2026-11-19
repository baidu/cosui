``` san export=preview caption=导出统一Catalog
import san from 'san';
import Button from '@cosui/cosmic/button';
import {exportCatalog} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

export default class UnifiedCatalogDemo extends san.Component {
    static components = {'cos-button': Button};

    static template = `
        <section>
            <cos-button size="sm" appearance="primary" on-click="exportJson">
                导出统一 Catalog
            </cos-button>
            <div s-if="exported" class="cos-space-mt-md">
                <div>
                    <p>Catalog ID：{{id}}</p>
                    <p>Component 数量：{{componentCount}}</p>
                    <p>Action 数量：{{actionCount}}</p>
                    <p>部分 Component：{{components}}</p>
                    <details>
                        <summary>查看完整 JSON</summary>
                        <pre style="max-height:420px;overflow:auto;white-space:pre-wrap;word-break:break-word">{{json}}</pre>
                    </details>
                </div>
            </div>
        </section>
    `;

    initData() {
        return {
            exported: false,
            id: '',
            componentCount: 0,
            actionCount: 0,
            components: '',
            json: ''
        };
    }

    exportJson() {
        const result = exportCatalog(CATALOG);
        const componentNames = Object.keys(result.components);
        this.data.set('id', result.$id);
        this.data.set('componentCount', componentNames.length);
        this.data.set('actionCount', Object.keys(result.actions).length);
        this.data.set('components', componentNames.slice(0, 8).join('、'));
        this.data.set('json', JSON.stringify(result, null, 2));
        this.data.set('exported', true);
    }
}
```
