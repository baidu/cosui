``` san export=preview caption=两种方式设置监听
import san from 'san';
import {z} from 'zod';
import Button from '@cosui/cosmic/button';
import {AppletContext, defineCatalog} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

const Text = san.defineComponent({
    template: '<p>{{value}}</p>'
});

const catalog = defineCatalog({
    ...CATALOG.definition,
    $id: 'cosui.docs.context-listen.v2',
    components: {
        ...CATALOG.definition.components,
        Text: {
            props: z.strictObject({value: z.string()})
        }
    }
});

export default class ContextListenDemo extends san.Component {
    static components = {'cos-button': Button};

    static template = `
        <section>
            <div class="cos-space-mb-md" style="display:flex;gap:8px;flex-wrap:wrap">
                <cos-button size="sm" appearance="{{mode === 'options' ? 'primary' : 'secondary'}}"
                    on-click="changeMode('options')">
                    构造参数
                </cos-button>
                <cos-button size="sm" appearance="{{mode === 'listen' ? 'primary' : 'secondary'}}"
                    on-click="changeMode('listen')">
                    listen 方法
                </cos-button>
                <cos-button size="sm" appearance="secondary" on-click="next">
                    {{step === 4 ? '重新开始' : '下一步'}}
                </cos-button>
            </div>

            <p>{{status}}</p>
            <div s-ref="root"></div>
            <ol>
                <li s-for="item in logs">{{item}}</li>
            </ol>
        </section>
    `;

    initData() {
        return {
            mode: 'options',
            step: 0,
            status: '等待操作',
            logs: []
        };
    }

    attached() {
        this.setup('options');
    }

    setup(mode) {
        this.appletContext?.dispose();
        this.data.set('mode', mode);
        this.data.set('step', 0);
        this.data.set('status', '等待操作');
        this.data.set('logs', []);

        const listeners = {
            onAppletCreated: applet => {
                applet.setRoot(this.ref('root'));
                this.record('Applet 已创建');
            },
            onAppletUpdated: () => this.record('Applet 已更新'),
            onAppletDeleted: () => this.record('Applet 已删除'),
            onError: error => this.record('发生错误：' + error.message)
        };

        if (mode === 'options') {
            // 写法一：在构造参数中设置监听。
            this.appletContext = new AppletContext({
                catalog,
                components: {Text},
                ...listeners
            });
        }
        else {
            // 写法二：创建后通过 listen 设置监听。
            this.appletContext = new AppletContext({
                catalog,
                components: {Text}
            });
            this.appletContext.listen(listeners);
        }
    }

    changeMode(mode) {
        if (mode !== this.data.get('mode')) {
            this.setup(mode);
        }
    }

    next() {
        const step = this.data.get('step');
        if (step === 4) {
            this.setup(this.data.get('mode'));
            return;
        }

        const messages = [
            {
                version: '2.0',
                applet: {
                    appletId: 'listener',
                    components: [{
                        id: 'root',
                        type: 'Text',
                        props: {value: '监听示例'}
                    }]
                }
            },
            {
                version: '2.0',
                appletId: 'listener',
                updates: [{path: '/updated', value: true}]
            },
            {
                version: '2.0',
                applet: {appletId: 'listener', delete: true}
            },
            {
                version: '2.0',
                appletId: 'missing',
                updates: []
            }
        ];
        const labels = ['创建 Applet', '更新 Applet', '删除 Applet', '触发错误'];
        this.appletContext.processMessage(messages[step]);
        this.data.set('step', step + 1);
        this.data.set('status', labels[step]);
    }

    record(message) {
        this.data.unshift('logs', message);
        if (this.data.get('logs').length > 5) {
            this.data.pop('logs');
        }
    }

    disposed() {
        this.appletContext?.dispose();
    }
}
```
