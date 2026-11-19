``` san export=preview caption=三种方式创建Applet
import san from 'san';
import {z} from 'zod';
import Button from '@cosui/cosmic/button';
import {AppletContext, defineCatalog} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

const Text = san.defineComponent({
    template: `
        <div style="padding:16px;border:1px solid #d9e2ea;border-radius:8px;background:#f7f9fb">
            <strong>{{title}}</strong>
            <p style="margin:8px 0 0">{{description}}</p>
        </div>
    `
});

// 为示例注册一个用于展示创建结果的 Text 组件。
const catalog = defineCatalog({
    ...CATALOG.definition,
    $id: 'cosui.docs.applet-create.v2',
    components: {
        ...CATALOG.definition.components,
        Text: {
            props: z.strictObject({
                title: z.string(),
                description: z.string()
            })
        }
    }
});

// 三种创建方式使用相同内容，便于对比创建和挂载流程。
const content = (title, description) => [
    {
        id: 'root',
        type: 'Text',
        props: {title, description}
    }
];

export default class AppletCreateDemo extends san.Component {
    static components = {'cos-button': Button};

    static template = `
        <section>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px">
                <section>
                    <h4>创建并立即挂载</h4>
                    <p>创建时传入 root，Applet 会立即挂载。</p>
                    <div s-ref="directRoot"></div>
                </section>

                <section>
                    <h4>创建后挂载</h4>
                    <p>先创建 Applet，挂载节点准备好后再调用 setRoot。</p>
                    <cos-button s-if="!delayedMounted" size="sm" appearance="primary"
                        on-click="mountDelayed">
                        挂载 Applet
                    </cos-button>
                    <div class="cos-space-mt-sm" s-ref="delayedRoot"></div>
                </section>

                <section>
                    <h4>通过消息创建</h4>
                    <p>发送完整协议消息，并在创建回调中设置挂载节点。</p>
                    <cos-button s-if="!messageCreated" size="sm" appearance="primary"
                        on-click="createByMessage">
                        发送创建消息
                    </cos-button>
                    <div class="cos-space-mt-sm" s-ref="messageRoot"></div>
                </section>
            </div>

            <div class="cos-space-mt-md">
                <cos-button size="sm" appearance="secondary" on-click="reset">
                    重置
                </cos-button>
            </div>
            <p s-if="error" role="alert">{{error}}</p>
        </section>
    `;

    initData() {
        return {
            delayedMounted: false,
            messageCreated: false,
            error: ''
        };
    }

    attached() {
        this.reset();
    }

    reset() {
        this.appletContext?.dispose();
        this.data.set('delayedMounted', false);
        this.data.set('messageCreated', false);
        this.data.set('error', '');

        this.appletContext = new AppletContext({
            catalog,
            components: {Text},
            onError: error => this.data.set('error', error.message),
            onAppletCreated: applet => {
                // 消息创建不会返回 Applet，通过回调获取实例并挂载。
                if (applet.appletId === 'message') {
                    applet.setRoot(this.ref('messageRoot'));
                    this.data.set('messageCreated', true);
                }
            }
        });

        // 写法一：创建时传入 root，立即完成挂载。
        const directApplet = this.appletContext.createApplet({
            appletId: 'direct',
            root: this.ref('directRoot')
        });
        directApplet.processMessage({
            updates: content('已立即挂载', 'root 在 createApplet 时传入。')
        });

        // 写法二：只创建 Applet，稍后再调用 setRoot。
        this.delayedApplet = this.appletContext.createApplet({
            appletId: 'delayed'
        });
        this.delayedApplet.processMessage({
            updates: content('已延迟挂载', 'Applet 创建后通过 setRoot 挂载。')
        });
    }

    mountDelayed() {
        if (this.data.get('delayedMounted')) {
            return;
        }
        this.delayedApplet.setRoot(this.ref('delayedRoot'));
        this.data.set('delayedMounted', true);
    }

    createByMessage() {
        if (this.data.get('messageCreated')) {
            return;
        }

        // 写法三：发送完整协议消息创建 Applet。
        const result = this.appletContext.processMessage({
            version: '2.0',
            applet: {
                appletId: 'message',
                catalog: catalog.definition.$id,
                components: content('已通过消息创建', 'Applet 由完整 COSUI 消息创建并挂载。'),
                data: {}
            }
        });
        if (!result.ok) {
            this.data.set('error', result.errors.map(item => item.message).join('; '));
        }
    }

    disposed() {
        this.appletContext?.dispose();
    }
}
```
