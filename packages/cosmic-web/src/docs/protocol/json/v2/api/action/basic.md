``` san export=preview caption=注册并执行Action
import san from 'san';
import {z} from 'zod';
import Button from '@cosui/cosmic/button';
import {AppletContext, defineCatalog} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

const Text = san.defineComponent({
    template: '<span>{{value}}</span>'
});

const catalog = defineCatalog({
    ...CATALOG.definition,
    $id: 'cosui.docs.action.basic.v2',
    components: {
        ...CATALOG.definition.components,
        Text: {
            props: z.strictObject({value: z.string()})
        }
    },
    actions: {
        ...CATALOG.definition.actions,
        // 在 Catalog 中声明 Action 及参数格式。
        saveTrip: {
            args: z.strictObject({tripId: z.string()})
        }
    }
});

const initialMessage = {
    version: '2.0',
    applet: {
        appletId: 'action-basic',
        data: {},
        components: [{
            id: 'root',
            type: 'Button',
            props: {appearance: 'primary'},
            children: ['label'],
            events: {
                click: [{
                    // 绑定 Catalog 允许的 Action，并传入固定参数。
                    action: 'saveTrip',
                    args: {tripId: 'TRIP-1024'}
                }]
            }
        }, {
            id: 'label',
            type: 'Text',
            props: {value: '收藏行程'}
        }]
    }
};

export default class ActionBasicDemo extends san.Component {
    static template = `
        <section>
            <div s-ref="root"></div>
            <p>{{status}}</p>
            <p s-if="error" role="alert">{{error}}</p>
        </section>
    `;

    initData() {
        return {
            status: '尚未收藏',
            error: ''
        };
    }

    attached() {
        this.appletContext = new AppletContext({
            catalog,
            components: {Button, Text},
            // 注册与 Catalog 同名的 Action 处理函数。
            actions: {
                saveTrip: ({args}) => {
                    this.data.set('status', '已收藏行程：' + args.tripId);
                }
            },
            onAppletCreated: applet => applet.setRoot(this.ref('root')),
            onError: error => this.data.set('error', error.message)
        });

        const result = this.appletContext.processMessage(initialMessage);
        if (!result.ok) {
            this.data.set('error', result.errors.map(item => item.message).join('; '));
        }
    }

    disposed() {
        this.appletContext?.dispose();
    }
}
```
