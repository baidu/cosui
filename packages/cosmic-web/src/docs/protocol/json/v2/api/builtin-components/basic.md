``` san export=preview caption=Builtin与Cosmic Component
import san from 'san';
import Button from '@cosui/cosmic/button';
import {AppletContext} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

const message = {
    version: '2.0',
    applet: {
        appletId: 'builtin-components-demo',
        components: [
            {
                id: 'root',
                type: 'Div',
                children: ['content']
            },
            {
                id: 'content',
                type: 'Flex',
                props: {
                    direction: 'column',
                    gap: 12,
                    class: 'cos-space-p-md'
                },
                children: ['title', 'divider', 'row', 'button']
            },
            {
                id: 'title',
                type: 'Text',
                props: {value: '杭州周末行程', size: 'lg'}
            },
            {
                id: 'divider',
                type: 'Divider'
            },
            {
                id: 'row',
                type: 'Row',
                props: {columns: 12, gutter: 12},
                children: ['city', 'days']
            },
            {
                id: 'city',
                type: 'Column',
                props: {span: 6},
                children: ['city-text']
            },
            {
                id: 'city-text',
                type: 'Text',
                props: {value: '目的地：西湖'}
            },
            {
                id: 'days',
                type: 'Column',
                props: {span: 6},
                children: ['days-text']
            },
            {
                id: 'days-text',
                type: 'Text',
                props: {value: '行程：2 天'}
            },
            {
                id: 'button',
                type: 'Button',
                props: {appearance: 'primary', size: 'sm'},
                children: ['button-text']
            },
            {
                id: 'button-text',
                type: 'Text',
                props: {value: '查看行程'}
            }
        ]
    }
};

export default class BuiltinComponentsDemo extends san.Component {
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
        this.appletContext = new AppletContext({
            catalog: CATALOG,
            // Flex、Text、Divider、Row 和 Column 为内置 Component，无需注册。
            components: {Button},
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
