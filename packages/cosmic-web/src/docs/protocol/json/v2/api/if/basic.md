``` san export=preview caption=显示条件示例
import san from 'san';
import {z} from 'zod';
import Button from '@cosui/cosmic/button';
import Input from '@cosui/cosmic/input';
import Loading from '@cosui/cosmic/loading';
import Markdown from '@cosui/cosmic-dqa/markdown';
import Switcher from '@cosui/cosmic/switcher';
import {AppletContext, defineCatalog} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

const catalog = defineCatalog({
    ...CATALOG.definition,
    $id: 'cosui.docs.if.v2',
    actions: {
        ...CATALOG.definition.actions,
        loadContent: {args: z.strictObject({})}
    }
});

const message = {
    version: '2.0',
    applet: {
        appletId: 'if-basic',
        data: {
            loading: false,
            loaded: false,
            age: '20',
            a: false,
            b: false
        },
        components: [
            {
                id: 'root',
                type: 'Div',
                children: [
                    'loading-section',
                    'age-section',
                    'switch-section'
                ]
            },
            {
                id: 'loading-section',
                type: 'Div',
                props: {class: 'cos-space-mb-xl'},
                children: ['loading-button', 'loading-view', 'loaded-view']
            },
            {
                id: 'loading-button',
                type: 'Button',
                props: {
                    appearance: 'primary',
                    size: 'sm',
                    disabled: '{{loading}}',
                    class: 'cos-space-mb-xs'
                },
                children: ['loading-button-label'],
                events: {
                    click: [{action: 'loadContent'}]
                }
            },
            {
                id: 'loading-button-label',
                type: 'Text',
                props: {
                    value: "{{loading ? '加载中' : loaded ? '重置状态' : '点击加载'}}"
                }
            },
            {
                id: 'loading-view',
                type: 'Loading',
                if: 'loading',
                props: {text: '内容加载中...'}
            },
            {
                id: 'loaded-view',
                type: 'Markdown',
                if: 'loaded',
                props: {content: '内容加载完成'}
            },
            {
                id: 'age-section',
                type: 'Div',
                props: {class: 'cos-space-mb-xl'},
                children: ['age-label', 'age-input', 'adult-view']
            },
            {
                id: 'age-label',
                type: 'Markdown',
                props: {
                    class: 'cos-space-mb-xs',
                    content: '年龄'
                }
            },
            {
                id: 'age-input',
                type: 'Input',
                props: {
                    class: 'cos-space-mb-xs',
                    value: '{= age =}',
                    placeholder: '请输入年龄',
                    size: 'sm'
                }
            },
            {
                id: 'adult-view',
                type: 'Markdown',
                if: 'age >= 18',
                props: {
                    class: 'cos-space-mb-xs',
                    content: '年龄大于等于 18，可以查看内容'
                }
            },
            {
                id: 'switch-section',
                type: 'Div',
                props: {class: 'cos-space-mb-xl'},
                children: ['switch-a-label', 'switch-a', 'switch-b-label', 'switch-b', 'both-view']
            },
            {
                id: 'switch-a-label',
                type: 'Markdown',
                props: {content: '开关 A'}
            },
            {
                id: 'switch-a',
                type: 'Switcher',
                props: {
                    class: 'cos-space-mb-xs',
                    checked: '{= a =}',
                    size: 'sm'
                }
            },
            {
                id: 'switch-b-label',
                type: 'Markdown',
                props: {content: '开关 B'}
            },
            {
                id: 'switch-b',
                type: 'Switcher',
                props: {
                    class: 'cos-space-mb-xs',
                    checked: '{= b =}',
                    size: 'sm'
                }
            },
            {
                id: 'both-view',
                type: 'Markdown',
                if: 'a && b',
                props: {content: '两个开关都已打开'}
            }
        ]
    }
};

export default class IfBasicDemo extends san.Component {
    static template = `
        <section>
            <div s-ref="root"></div>
            <p s-if="error" role="alert">{{error}}</p>
        </section>
    `;

    initData() {
        return {error: ''};
    }

    attached() {
        this.isLoaded = false;
        this.appletContext = new AppletContext({
            catalog,
            components: {Button, Input, Loading, Markdown, Switcher},
            actions: {
                loadContent: async () => {
                    if (this.isLoaded) {
                        const result = this.appletContext.processMessage({
                            version: '2.0',
                            appletId: 'if-basic',
                            updates: [
                                {path: '/loading', value: false},
                                {path: '/loaded', value: false}
                            ]
                        });
                        if (!result.ok) {
                            this.data.set('error', result.errors.map(item => item.message).join('; '));
                        }
                        this.isLoaded = false;
                        return;
                    }
                    const startResult = this.appletContext.processMessage({
                        version: '2.0',
                        appletId: 'if-basic',
                        updates: [{path: '/loading', value: true}]
                    });
                    if (!startResult.ok) {
                        this.data.set('error', startResult.errors.map(item => item.message).join('; '));
                        return;
                    }
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    const result = this.appletContext.processMessage({
                        version: '2.0',
                        appletId: 'if-basic',
                        updates: [
                            {path: '/loading', value: false},
                            {path: '/loaded', value: true}
                        ]
                    });
                    if (!result.ok) {
                        this.data.set('error', result.errors.map(item => item.message).join('; '));
                        return;
                    }
                    this.isLoaded = true;
                }
            },
            onAppletCreated: applet => applet.setRoot(this.ref('root')),
            onError: error => this.data.set('error', error.message)
        });

        const result = this.appletContext.processMessage(message);
        if (!result.ok) {
            this.data.set('error', result.errors.map(item => item.message).join('; '));
        }
    }

    disposed() {
        this.appletContext?.dispose();
    }
}
```
