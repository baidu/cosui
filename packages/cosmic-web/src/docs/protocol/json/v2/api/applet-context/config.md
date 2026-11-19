``` san export=preview caption=三种方式配置AppletContext
import san from 'san';
import {z} from 'zod';
import {
    AppletContext,
    appletContext,
    defineCatalog
} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

const Status = san.defineComponent({
    template: `
        <div style="padding:12px;border:1px solid #d9e2ea;border-radius:8px">
            <strong>{{title}}</strong>
            <p style="margin:6px 0 0">{{description}}</p>
        </div>
    `
});

const catalog = defineCatalog({
    ...CATALOG.definition,
    $id: 'cosui.docs.context-config.v2',
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

export default class ContextConfigDemo extends san.Component {
    static template = `
        <section>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px">
                <section>
                    <h4>构造时配置</h4>
                    <div s-ref="constructorRoot"></div>
                </section>
                <section>
                    <h4>调用 config 配置</h4>
                    <div s-ref="configRoot"></div>
                </section>
                <section>
                    <h4>配置默认实例</h4>
                    <div s-ref="defaultRoot"></div>
                </section>
            </div>
            <p s-if="error" role="alert">{{error}}</p>
        </section>
    `;

    initData() {
        return {error: ''};
    }

    attached() {
        const options = {
            catalog,
            components: {Status},
            actions: {},
            onError: error => this.data.set('error', error.message)
        };

        // 写法一：创建 Context 时直接传入配置。
        this.constructorContext = new AppletContext(options);
        this.show(this.constructorContext, 'constructor', this.ref('constructorRoot'),
            '配置已生效', '配置通过构造参数传入。');

        // 写法二：创建 Context 后，在创建 Applet 前调用 config。
        this.configContext = new AppletContext({
            onError: options.onError
        });
        this.configContext.config({
            catalog,
            components: {Status},
            actions: {}
        });
        this.show(this.configContext, 'config', this.ref('configRoot'),
            '配置已生效', '配置通过 config 方法传入。');

        // 写法三：配置库提供的默认 Context 实例。
        appletContext.dispose();
        appletContext.listen({
            onAppletCreated: undefined,
            onAppletDeleted: undefined,
            onAppletUpdated: undefined,
            onError: options.onError
        });
        appletContext.config({
            catalog,
            components: {Status},
            actions: {}
        });
        this.show(appletContext, 'default', this.ref('defaultRoot'),
            '配置已生效', '当前使用默认 appletContext。');
    }

    show(targetAppletContext, appletId, root, title, description) {
        const applet = targetAppletContext.createApplet({appletId, root});
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
        this.constructorContext?.dispose();
        this.configContext?.dispose();
        appletContext.dispose();
        appletContext.listen({
            onAppletCreated: undefined,
            onAppletDeleted: undefined,
            onAppletUpdated: undefined,
            onError: undefined
        });
    }
}
```
