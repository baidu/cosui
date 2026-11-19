``` san export=preview caption=按顺序执行多个Action
import san from 'san';
import {z} from 'zod';
import Button from '@cosui/cosmic/button';
import {AppletContext, defineCatalog} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

const Text = san.defineComponent({
    template: '<span>{{value}}</span>'
});

// 使用延迟展示异步 Action 的串行执行顺序。
const wait = time => new Promise(resolve => setTimeout(resolve, time));

const catalog = defineCatalog({
    ...CATALOG.definition,
    $id: 'cosui.docs.action.sequence.v2',
    components: {
        ...CATALOG.definition.components,
        Text: {
            props: z.strictObject({value: z.string()})
        }
    },
    actions: {
        ...CATALOG.definition.actions,
        checkTrip: {},
        saveTrip: {},
        showResult: {}
    }
});

const appletId = 'action-sequence';
const initialMessage = {
    version: '2.0',
    applet: {
        appletId,
        data: {running: false},
        components: [{
            id: 'root',
            type: 'Button',
            props: {appearance: 'primary', disabled: '{{running}}'},
            children: ['label'],
            events: {
                // 同一事件可以绑定多个 Action。
                // 前一个 Action 完成后，才会执行下一个。
                click: [
                    {action: 'checkTrip'},
                    {action: 'saveTrip'},
                    {action: 'showResult'}
                ]
            }
        }, {
            id: 'label',
            type: 'Text',
            props: {value: '确认行程'}
        }]
    }
};

export default class ActionSequenceDemo extends san.Component {
    static template = `
        <section>
            <div s-ref="root"></div>
            <ol>
                <li s-for="item in logs">{{item}}</li>
            </ol>
            <p s-if="error" role="alert">{{error}}</p>
        </section>
    `;

    initData() {
        return {
            logs: [],
            error: ''
        };
    }

    attached() {
        this.appletContext = new AppletContext({
            catalog,
            components: {Button, Text},
            actions: {
                // ActionHandler 可以返回 Promise。
                checkTrip: async () => {
                    this.data.set('logs', []);
                    const result = this.appletContext.processMessage({
                        version: '2.0',
                        appletId,
                        updates: [{path: '/running', value: true}]
                    });
                    if (!result.ok) {
                        throw new Error(result.errors.map(item => item.message).join('; '));
                    }
                    await wait(500);
                    this.record('行程信息检查完成');
                },
                saveTrip: async () => {
                    await wait(500);
                    this.record('行程已保存');
                },
                showResult: async () => {
                    await wait(500);
                    this.record('处理完成');
                    const result = this.appletContext.processMessage({
                        version: '2.0',
                        appletId,
                        updates: [{path: '/running', value: false}]
                    });
                    if (!result.ok) {
                        throw new Error(result.errors.map(item => item.message).join('; '));
                    }
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

    record(message) {
        this.data.push('logs', message);
    }

    disposed() {
        this.appletContext?.dispose();
    }
}
```
