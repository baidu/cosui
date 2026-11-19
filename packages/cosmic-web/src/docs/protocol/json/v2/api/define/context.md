``` san export=preview caption=直接使用已有Catelog
import san from 'san';
import Button from '@cosui/cosmic/button';
import {AppletContext} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

export default class ContextCatalogDemo extends san.Component {
    static template = `
        <div>
            <div s-ref="root"></div>
            <p s-if="feedback" style="margin-top:10px;color:#0b6b3a">{{feedback}}</p>
            <p s-if="error" role="alert">{{error}}</p>
        </div>
    `;

    initData() {
        return {feedback: '', error: ''};
    }

    attached() {
        this.appletContext = new AppletContext({
            catalog: CATALOG,
            // Text 是 v2 内置 Component，无需注册实现。
            components: {Button},
            actions: {
                sendPrompt: ({args}) => this.data.set('feedback', args.prompt)
            },
            onError: error => this.data.set('error', error.message)
        });
        this.applet = this.appletContext.createApplet({root: this.ref('root')});
        const result = this.applet.processMessage({
            updates: [
                {
                    id: 'root',
                    type: 'Button',
                    props: {appearance: 'primary'},
                    children: ['label'],
                    events: {
                        click: [{
                            action: 'sendPrompt',
                            args: {prompt: '点击成功，RuntimeCatalog 已正常工作'}
                        }]
                    }
                },
                {
                    id: 'label',
                    type: 'Text',
                    props: {value: 'RuntimeCatalog 已配置并生效'}
                }
            ]
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
