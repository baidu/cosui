``` san export=preview caption=绑定事件并读取$event
import san from 'san';
import {z} from 'zod';
import {Select} from '@cosui/cosmic/pc';
import {AppletContext, defineCatalog} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

const catalog = defineCatalog({
    ...CATALOG.definition,
    $id: 'cosui.docs.event.v2',
    components: {
        ...CATALOG.definition.components,
        Select: {
            ...CATALOG.definition.components.Select,
            events: {
                ...CATALOG.definition.components.Select.events,
                change: z.strictObject({
                    value: z.union([z.string(), z.array(z.string())])
                })
            }
        }
    }
});

const eventNames = {
    change: '选项变更',
    'toggle-panel': '面板开关'
};

const placeNames = {
    museum: '城市博物馆',
    park: '滨河公园',
    dinner: '特色晚餐'
};

const initialMessage = {
    version: '2.0',
    applet: {
        appletId: 'event-basic',
        data: {},
        components: [{
            id: 'root',
            type: 'Select',
            props: {
                title: '周末想去哪里？',
                placeholder: '点击展开并选择地点',
                options: [
                    {value: 'museum', label: '城市博物馆'},
                    {value: 'park', label: '滨河公园'},
                    {value: 'dinner', label: '特色晚餐'}
                ]
            },
            events: {
                // 读取 $event.open，获得面板展开状态。
                'toggle-panel': [{
                    action: 'sendPrompt',
                    args: {prompt: '面板状态：{{$event.open}}'}
                }],
                // 读取 $event.value，获得当前选项。
                change: [{
                    action: 'sendPrompt',
                    args: {prompt: '选择结果：{{$event.value}}'}
                }]
            }
        }]
    }
};

export default class EventDemo extends san.Component {
    static template = `
        <section>
            <div s-ref="root"></div>
            <div style="margin-top:14px;padding:14px;border:1px solid #dce4f2;border-radius:10px;background:#f7faff">
                <div style="display:grid;grid-template-columns:120px 1fr;gap:10px">
                    <strong>事件名称</strong><span>{{eventName}}</span>
                    <strong>$event</strong><pre style="margin:0;white-space:pre-wrap">{{eventData}}</pre>
                    <strong>Action 参数</strong><pre style="margin:0;white-space:pre-wrap">{{actionArgs}}</pre>
                </div>
            </div>
            <div style="margin-top:12px">
                <strong>事件时间线</strong>
                <p s-if="!logs.length" style="color:#667085">展开选择器或选择地点后显示事件</p>
                <p s-for="log, index in logs" style="margin:6px 0">
                    {{index + 1}}. {{log}}
                </p>
            </div>
            <p s-if="error" role="alert">{{error}}</p>
        </section>
    `;

    initData() {
        return {
            eventName: '等待事件',
            eventData: '{}',
            actionArgs: '{}',
            logs: [],
            error: ''
        };
    }

    attached() {
        this.appletContext = new AppletContext({
            catalog,
            components: {Select},
            actions: {
                sendPrompt: actionContext => this.record(actionContext)
            },
            onAppletCreated: applet => applet.setRoot(this.ref('root')),
            onError: error => this.data.set('error', error.message)
        });

        const result = this.appletContext.processMessage(initialMessage);
        if (!result.ok) {
            this.data.set('error', result.errors.map(item => item.message).join('; '));
        }
    }

    record({eventName, $event, args}) {
        this.data.set('eventName', eventNames[eventName]);
        this.data.set('eventData', JSON.stringify($event, null, 2));
        this.data.set('actionArgs', JSON.stringify(args, null, 2));

        const value = Array.isArray($event.value)
            ? $event.value.map(item => placeNames[item] || item).join('、')
            : placeNames[$event.value] || $event.value;
        const detail = eventName === 'change'
            ? '选项变更：' + value
            : '面板开关 → ' + ($event.open ? '已展开' : '已收起');
        this.data.set('logs', [detail, ...this.data.get('logs')].slice(0, 5));
    }

    disposed() {
        this.appletContext?.dispose();
    }
}
```
