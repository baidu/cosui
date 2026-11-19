``` san export=preview caption=Action失败后中断执行
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
    $id: 'cosui.docs.action.error.v2',
    components: {
        ...CATALOG.definition.components,
        Text: {props: z.strictObject({value: z.string()})}
    },
    actions: {
        ...CATALOG.definition.actions,
        checkTrip: {},
        saveTrip: {},
        showResult: {}
    }
});

const initialMessage = {
    version: '2.0',
    applet: {
        appletId: 'action-error',
        data: {},
        components: [{
            id: 'root',
            type: 'Button',
            props: {appearance: 'primary'},
            children: ['label'],
            events: {
                click: [
                    {action: 'checkTrip'},
                    {action: 'saveTrip'},
                    {action: 'showResult'}
                ]
            }
        }, {
            id: 'label',
            type: 'Text',
            props: {value: '模拟保存失败'}
        }]
    }
};

export default class ActionErrorDemo extends san.Component {
    static template = `
        <section>
            <div s-ref="root"></div>
            <ol><li s-for="item in logs">{{item}}</li></ol>
            <p s-if="error" role="alert">{{error}}</p>
        </section>
    `;

    initData() {
        return {logs: [], error: ''};
    }

    attached() {
        this.appletContext = new AppletContext({
            catalog,
            components: {Button, Text},
            actions: {
                checkTrip: () => {
                    this.data.set('logs', ['行程信息检查完成']);
                    this.data.set('error', '');
                },
                // 抛出错误后，后续 Action 不再执行。
                saveTrip: () => {
                    throw new Error('行程保存失败');
                },
                showResult: () => this.data.push('logs', '处理完成')
            },
            onAppletCreated: applet => applet.setRoot(this.ref('root')),
            // Action 错误通过 onError 获取。
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
