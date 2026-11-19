``` san export=preview caption=更新与销毁Applet
import san from 'san';
import {z} from 'zod';
import Button from '@cosui/cosmic/button';
import {AppletContext, defineCatalog} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

const Status = san.defineComponent({
    template: `
        <div style="padding:16px;border:1px solid #d9e2ea;border-radius:8px">
            <strong>{{title}}</strong>
            <p style="margin:8px 0 0">{{description}}</p>
        </div>
    `
});

const catalog = defineCatalog({
    ...CATALOG.definition,
    $id: 'cosui.docs.applet-lifecycle.v2',
    components: {
        ...CATALOG.definition.components,
        Status: {
            props: z.strictObject({
                title: z.string(),
                description: z.string()
            })
        }
    }
});

export default class AppletLifecycleDemo extends san.Component {
    static components = {'cos-button': Button};

    static template = `
        <section>
            <div class="cos-space-mb-md" style="display:flex;gap:8px;flex-wrap:wrap">
                <cos-button size="sm" appearance="primary"
                    disabled="{{destroyed}}" on-click="updateApplet">
                    更新 Applet
                </cos-button>
                <cos-button size="sm" appearance="secondary" on-click="toggleApplet">
                    {{destroyed ? '重新创建' : '销毁 Applet'}}
                </cos-button>
            </div>
            <div s-ref="root"></div>
            <p s-if="destroyed">Applet 已销毁。</p>
            <p s-if="error" role="alert">{{error}}</p>
        </section>
    `;

    initData() {
        return {
            destroyed: false,
            error: ''
        };
    }

    attached() {
        this.appletContext = new AppletContext({
            catalog,
            components: {Status},
            onError: error => this.data.set('error', error.message)
        });
        this.createApplet();
    }

    createApplet() {
        this.applet = this.appletContext.createApplet({
            appletId: 'lifecycle',
            root: this.ref('root')
        });
        this.applet.processMessage({
            updates: [
                {path: '', value: {
                    title: '行程待确认',
                    description: '点击“更新 Applet”确认行程。'
                }},
                {
                    id: 'root',
                    type: 'Status',
                    props: {
                        title: '{{title}}',
                        description: '{{description}}'
                    }
                }
            ]
        });
        this.data.set('destroyed', false);
        this.data.set('error', '');
    }

    updateApplet() {
        const result = this.applet.processMessage({
            updates: [
                {path: '/title', value: '行程已确认'},
                {path: '/description', value: 'Applet 已通过 processMessage 更新。'}
            ]
        });
        if (!result.ok) {
            this.data.set('error', result.errors.map(item => item.message).join('; '));
        }
    }

    toggleApplet() {
        if (this.data.get('destroyed')) {
            this.createApplet();
            return;
        }

        // dispose 只销毁当前 Applet，AppletContext 仍可继续创建 Applet。
        this.applet.dispose();
        this.applet = null;
        this.data.set('destroyed', true);
    }

    disposed() {
        this.appletContext?.dispose();
    }
}
```
