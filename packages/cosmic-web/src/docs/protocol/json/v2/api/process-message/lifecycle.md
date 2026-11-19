``` san export=preview caption=通过消息创建、更新和删除Applet
import san from 'san';
import {z} from 'zod';
import Button from '@cosui/cosmic/button';
import {AppletContext, defineCatalog} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

const Status = san.defineComponent({
    template: `
        <section style="padding:16px;border:1px solid #d9e2ea;border-radius:8px">
            <strong>{{title}}</strong>
            <p style="margin:8px 0 0">{{description}}</p>
        </section>
    `
});

const catalog = defineCatalog({
    ...CATALOG.definition,
    $id: 'cosui.docs.process-message.v2',
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

const messages = [
    // 创建消息：Applet 配置位于 applet 中。
    {
        version: '2.0',
        applet: {
            appletId: 'travel',
            data: {
                title: '周末行程',
                description: '正在规划行程。'
            },
            components: [{
                id: 'root',
                type: 'Status',
                props: {
                    title: '{{title}}',
                    description: '{{description}}'
                }
            }]
        }
    },
    // 更新消息：appletId 位于消息顶层。
    {
        version: '2.0',
        appletId: 'travel',
        updates: [
            {path: '/title', value: '周末行程已完成'},
            {path: '/description', value: '博物馆和滨河公园已加入行程。'}
        ]
    },
    // 删除消息：delete 与 appletId 位于 applet 中。
    {
        version: '2.0',
        applet: {appletId: 'travel', delete: true}
    }
];

export default class ProcessMessageDemo extends san.Component {
    static components = {'cos-button': Button};

    static template = `
        <section>
            <cos-button appearance="primary" on-click="next">
                {{step === 3 ? '重新开始' : labels[step]}}
            </cos-button>
            <p>{{status}}</p>
            <div s-ref="root"></div>
            <p s-if="error" role="alert">{{error}}</p>
        </section>
    `;

    initData() {
        return {
            step: 0,
            labels: ['创建 Applet', '更新 Applet', '删除 Applet'],
            status: '等待创建 Applet',
            error: ''
        };
    }

    attached() {
        this.setup();
    }

    setup() {
        this.appletContext?.dispose();
        this.appletContext = new AppletContext({
            catalog,
            components: {Status},
            onAppletCreated: applet => applet.setRoot(this.ref('root')),
            onError: error => this.data.set('error', error.message)
        });
        this.data.set('step', 0);
        this.data.set('status', '等待创建 Applet');
        this.data.set('error', '');
    }

    next() {
        const step = this.data.get('step');
        if (step === messages.length) {
            this.setup();
            return;
        }

        const result = this.appletContext.processMessage(messages[step]);
        if (!result.ok) {
            this.data.set('error', result.errors.map(item => item.message).join('; '));
            return;
        }

        this.data.set('step', step + 1);
        this.data.set('status', [
            'Applet 已创建',
            'Applet 已更新',
            'Applet 已删除'
        ][step]);
    }

    disposed() {
        this.appletContext?.dispose();
    }
}
```
