``` san export=preview caption=管理一个或多个Applet
import san from 'san';
import {z} from 'zod';
import {AppletContext, defineCatalog} from '@cosui/cosmic-dynamic-ui';

const Status = san.defineComponent({
    template: `
        <section style="padding:12px;border:1px solid #d9e2ea;border-radius:8px">
            <strong>{{title}}</strong>
            <p style="margin:6px 0 0">{{description}}</p>
        </section>
    `
});

const catalog = defineCatalog({
    $id: 'cosui.docs.context-manage.v2',
    version: '2.0',
    components: {
        Status: {
            props: z.strictObject({
                title: z.string(),
                description: z.string()
            })
        }
    },
    actions: {}
});

export default class ContextManageDemo extends san.Component {
    static template = `
        <section>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px">
                <section>
                    <h4>管理一个 Applet</h4>
                    <div s-ref="singleRoot"></div>
                </section>
                <section>
                    <h4>管理多个 Applet</h4>
                    <div style="display:grid;gap:8px">
                        <div s-ref="travelRoot"></div>
                        <div s-ref="productRoot"></div>
                    </div>
                </section>
            </div>
            <p s-if="error" role="alert">{{error}}</p>
        </section>
    `;

    initData() {
        return {error: ''};
    }

    attached() {
        // 一个 AppletContext 管理一个 Applet。
        this.singleAppletContext = new AppletContext({
            catalog,
            components: {Status},
            onError: error => this.data.set('error', error.message)
        });
        const singleApplet = this.singleAppletContext.createApplet({
            appletId: 'single',
            root: this.ref('singleRoot')
        });
        this.renderStatus(singleApplet, '行程助手', '由独立的 AppletContext 管理。');

        // 同一个 AppletContext 可以通过 appletId 管理多个 Applet。
        this.multipleAppletContext = new AppletContext({
            catalog,
            components: {Status},
            onError: error => this.data.set('error', error.message)
        });
        const travelApplet = this.multipleAppletContext.createApplet({
            appletId: 'travel',
            root: this.ref('travelRoot')
        });
        const productApplet = this.multipleAppletContext.createApplet({
            appletId: 'product',
            root: this.ref('productRoot')
        });
        this.renderStatus(travelApplet, '行程 Applet', 'appletId：travel');
        this.renderStatus(productApplet, '商品 Applet', 'appletId：product');
    }

    renderStatus(applet, title, description) {
        const result = applet.processMessage({
            updates: [{
                id: 'root',
                type: 'Status',
                props: {title, description}
            }]
        });
        if (!result.ok) {
            this.data.set('error', result.errors.map(item => item.message).join('; '));
        }
    }

    disposed() {
        this.singleAppletContext?.dispose();
        this.multipleAppletContext?.dispose();
    }
}
```
