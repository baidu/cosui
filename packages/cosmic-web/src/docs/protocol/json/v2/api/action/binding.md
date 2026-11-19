``` san export=preview caption=Action参数绑定
import san from 'san';
import {z} from 'zod';
import Score from '@cosui/cosmic/score';
import {AppletContext, defineCatalog} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

const RatingItem = san.defineComponent({
    components: {'cos-score': Score},
    template: `
        <section style="margin-bottom:16px;padding:14px;border:1px solid #e5e9f2;border-radius:8px">
            <strong>{{title}}</strong>
            <p style="margin:4px 0 10px;color:#667085">{{description}}</p>
            <cos-score value="{{0}}" max="{{5}}" score controlled on-change="change" />
        </section>
    `,
    change(event) {
        this.fire('change', event);
    }
});

const catalog = defineCatalog({
    ...CATALOG.definition,
    $id: 'cosui.docs.action.binding.v2',
    components: {
        ...CATALOG.definition.components,
        RatingItem: {
            props: z.strictObject({
                title: z.string(),
                description: z.string()
            }),
            events: {
                change: z.strictObject({value: z.number()})
            }
        }
    },
    actions: {
        ...CATALOG.definition.actions,
        recordScore: {
            args: z.strictObject({
                source: z.string(),
                tripId: z.string(),
                tripIdByPointer: z.string(),
                itemId: z.string(),
                position: z.string(),
                score: z.number(),
                metadata: z.strictObject({
                    city: z.string(),
                    tags: z.array(z.string())
                })
            })
        }
    }
});

const initialMessage = {
    version: '2.0',
    applet: {
        appletId: 'action-binding',
        data: {
            trip: {id: 'TRIP-1024', city: '苏州'},
            items: [
                {
                    id: 'museum',
                    title: '苏州博物馆',
                    description: '建筑与馆藏体验',
                    category: '人文'
                },
                {
                    id: 'park',
                    title: '拙政园',
                    description: '园林景观与游览体验',
                    category: '自然'
                }
            ]
        },
        components: [{
            id: 'root',
            type: 'RatingItem',
            for: 'item, index in items',
            props: {
                title: '{{item.title}}',
                description: '{{item.description}}'
            },
            events: {
                change: [{
                    action: 'recordScore',
                    args: {
                        // 固定值。
                        source: '行程评分',
                        // San 路径读取根 Data。
                        tripId: '{{trip.id}}',
                        // JSON Pointer 读取根 Data。
                        tripIdByPointer: '{{/trip/id}}',
                        // for 提供的 item 和 index 作用域。
                        itemId: '{{item.id}}',
                        position: '第 {{index + 1}} 项',
                        // 读取 Component 事件数据。
                        score: '{{$event.value}}',
                        // 对象和数组内也可以使用数据绑定。
                        metadata: {city: '{{trip.city}}', tags: ['评分', '{{item.category}}']}
                    }
                }]
            }
        }]
    }
};

export default class ActionBindingDemo extends san.Component {
    static template = `
        <section>
            <p>请为苏州行程中的两个景点评分：</p>
            <div s-ref="root"></div>
            <div s-if="result" class="cos-space-mt-md">
                <strong>{{result}}</strong>
                <details style="margin-top:12px">
                    <summary>查看 ActionContext</summary>
                    <pre style="white-space:pre-wrap;word-break:break-word">{{actionContext}}</pre>
                </details>
            </div>
            <p s-if="error" role="alert">{{error}}</p>
        </section>
    `;

    initData() {
        return {result: '', actionContext: '', error: ''};
    }

    attached() {
        this.appletContext = new AppletContext({
            catalog,
            components: {RatingItem},
            actions: {
                recordScore: actionContext => {
                    const {
                        args,
                        $event,
                        $data,
                        appletId,
                        componentId,
                        eventName
                    } = actionContext;
                    console.log('=====actionContext', actionContext);

                    const item = $data.items.find(item => item.id === args.itemId);
                    this.data.set('result', item.title + '已评分：' + args.score + ' 分');
                    // Action 处理函数接收完整的 ActionContext。
                    this.data.set('actionContext', JSON.stringify({
                        args,
                        $event,
                        $data,
                        appletId,
                        componentId,
                        eventName
                    }, null, 2));
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

    disposed() {
        this.appletContext?.dispose();
    }
}
```
