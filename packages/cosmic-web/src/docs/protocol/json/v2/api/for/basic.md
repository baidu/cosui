``` san export=preview caption=渲染旅行地点列表
import san from 'san';
import {z} from 'zod';
import {AppletContext, defineCatalog} from '@cosui/cosmic-dynamic-ui';

const List = san.defineComponent({
    template: `
        <section style="padding:16px;border:1px solid #dce4f2;border-radius:12px;background:#f7faff">
            <h4 style="margin:0 0 12px">{{title}}</h4>
            <div><slot /></div>
        </section>
    `
});

const Place = san.defineComponent({
    template: `
        <div style="padding:10px 12px;margin:8px 0;background:white;border-radius:8px">
            <strong>{{title}}</strong>
            <span style="margin-left:8px;color:#667085">{{description}}</span>
        </div>
    `
});

const catalog = defineCatalog({
    $id: 'cosui.docs.for.v2',
    version: '2.0',
    components: {
        List: {
            props: z.strictObject({title: z.string()}),
            children: true
        },
        Place: {
            props: z.strictObject({
                title: z.string(),
                description: z.string()
            })
        }
    },
    actions: {}
});

const message = {
    version: '2.0',
    applet: {
        appletId: 'for-basic',
        data: {
            places: [
                {id: 'museum', name: '苏州博物馆', description: '了解城市历史'},
                {id: 'garden', name: '拙政园', description: '欣赏园林景观'},
                {id: 'noodle', name: '苏式汤面', description: '体验当地风味'}
            ]
        },
        components: [
            {
                id: 'root',
                type: 'List',
                props: {title: '周末行程'},
                children: ['place']
            },
            {
                id: 'place',
                type: 'Place',
                for: 'place, index in places trackBy place.id',
                props: {
                    title: '{{index + 1}}. {{place.name}}',
                    description: '{{place.description}}'
                }
            }
        ]
    }
};

export default class ForBasicDemo extends san.Component {
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
            catalog,
            components: {List, Place},
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
