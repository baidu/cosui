``` san export=preview caption=通过字符串ID引用子节点
import san from 'san';
import {z} from 'zod';
import {AppletContext, defineCatalog} from '@cosui/cosmic-dynamic-ui';

const Panel = san.defineComponent({
    template: `
        <section style="padding:16px;border:1px solid #dce4f2;border-radius:12px;background:#f7faff">
            <h4 style="margin:0 0 12px">{{title}}</h4>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
                <slot></slot>
            </div>
        </section>
    `
});

const TripItem = san.defineComponent({
    template: `
        <button
            style="padding:10px 14px;border:1px solid #b8c8e8;border-radius:8px;background:white;cursor:pointer"
            on-click="choose"
        >
            {{icon}} {{label}}
        </button>
    `,
    choose() {
        this.fire('choose', {label: this.data.get('label')});
    }
});

const catalog = defineCatalog({
    $id: 'cosui.docs.children.reference.v2',
    version: '2.0',
    components: {
        Panel: {
            props: z.strictObject({title: z.string()}),
            children: ['TripItem']
        },
        TripItem: {
            props: z.strictObject({icon: z.string(), label: z.string()}),
            events: {
                choose: z.strictObject({label: z.string()})
            }
        }
    },
    actions: {selectTrip: {}}
});

const message = {
    version: '2.0',
    applet: {
        // 父 Component 通过字符串 ID 引用下面三个子 Component。
        components: [
            {
                id: 'root',
                type: 'Panel',
                props: {title: '周末行程'},
                children: ['museum', 'park', 'dinner']
            },
            {
                id: 'museum',
                type: 'TripItem',
                props: {icon: '🏛️', label: '城市博物馆'},
                events: {choose: [{action: 'selectTrip'}]}
            },
            {
                id: 'park',
                type: 'TripItem',
                props: {icon: '🌳', label: '滨河公园'},
                events: {choose: [{action: 'selectTrip'}]}
            },
            {
                id: 'dinner',
                type: 'TripItem',
                props: {icon: '🍜', label: '特色晚餐'},
                events: {choose: [{action: 'selectTrip'}]}
            }
        ]
    }
};

export default class ReferenceChildrenDemo extends san.Component {
    static template = `
        <div>
            <div s-ref="root"></div>
            <p style="margin-top:12px">当前选择：{{selected}}</p>
            <p s-if="error" role="alert">{{error}}</p>
        </div>
    `;

    initData() {
        return {selected: '暂未选择', error: ''};
    }

    attached() {
        this.appletContext = new AppletContext({
            catalog,
            components: {Panel, TripItem},
            actions: {
                selectTrip: ({$event}) => this.data.set('selected', $event.label)
            },
            onAppletCreated: applet => applet.setRoot(this.ref('root')),
            onError: error => this.data.set('error', error.message)
        });
        this.appletContext.processMessage(message);
    }

    disposed() {
        this.appletContext?.dispose();
    }
}
```
