``` san export=preview caption=定义旅行推荐Component Catalog
import san from 'san';
import {z} from 'zod';
import Button from '@cosui/cosmic/button';
import {AppletContext, defineCatalog} from '@cosui/cosmic-dynamic-ui';

const Recommendation = san.defineComponent({
    template: `
        <section style="padding:16px;border:1px solid #dce4f2;border-radius:12px;background:#f7faff">
            <div style="display:flex;justify-content:space-between;gap:12px;align-items:center">
                <div>
                    <h4 style="margin:0 0 6px">{{city}}</h4>
                    <p style="margin:0;color:#667085">{{days}} 天行程 · {{theme}}</p>
                </div>
                <strong style="color:#2468f2">{{price}} 元起</strong>
            </div>
        </section>
    `
});

const catalog = defineCatalog({
    $id: 'cosui.docs.travel.v2',
    version: '2.0',
    title: '旅行推荐 Catalog',
    description: '定义旅行推荐卡片及其数据约束。',
    components: {
        Recommendation: {
            description: '旅行推荐卡片',
            props: z.strictObject({
                city: z.string(),
                days: z.number().int().positive(),
                theme: z.enum(['人文', '自然', '美食']),
                price: z.number().nonnegative()
            })
        }
    },
    actions: {}
});

const examples = [
    {city: '苏州', days: 2, theme: '人文', price: 699},
    {city: '桂林', days: 3, theme: '自然', price: 1299},
    {city: '成都', days: 4, theme: '美食', price: 1599}
];

export default class DefineCatalogDemo extends san.Component {
    static components = {'cos-button': Button};

    static template = `
        <section>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
                <cos-button s-for="item, index in examples" size="sm"
                    appearance="{{active === index ? 'primary' : 'secondary'}}"
                    on-click="renderExample(index)">
                    {{item.city}}
                </cos-button>
                <cos-button size="sm" appearance="secondary" on-click="renderInvalid">
                    尝试无效数据
                </cos-button>
            </div>
            <div s-ref="root"></div>
            <p style="margin-top:12px;padding:10px;border-radius:8px;background:{{
                valid ? '#e9f8ef' : '#fff1f0'
            }};color:{{valid ? '#0b6b3a' : '#b42318'}}">
                {{message}}
            </p>
        </section>
    `;

    initData() {
        return {
            examples,
            active: 0,
            valid: true,
            message: '数据符合 Catalog，Component 已正常渲染'
        };
    }

    attached() {
        this.appletContext = new AppletContext({
            catalog,
            components: {Recommendation}
        });
        this.applet = this.appletContext.createApplet({root: this.ref('root')});
        this.renderExample(0);
    }

    renderExample(index) {
        const item = examples[index];
        const result = this.applet.processMessage({
            updates: [{
                id: 'root',
                type: 'Recommendation',
                props: item
            }]
        });
        this.data.set('active', index);
        this.data.set('valid', result.ok);
        this.data.set('message', result.ok
            ? item.city + '数据符合 Catalog，Component 已正常渲染'
            : result.errors[0].message);
    }

    renderInvalid() {
        const result = this.applet.processMessage({
            updates: [{
                id: 'root',
                type: 'Recommendation',
                props: {
                    city: '杭州',
                    days: '三天',
                    theme: '购物',
                    price: -100
                }
            }]
        });
        this.data.set('active', -1);
        this.data.set('valid', result.ok);
        this.data.set('message', result.ok ? '数据有效' : '数据不符合 Catalog，保留上一次有效内容');
    }

    disposed() {
        this.appletContext?.dispose();
    }
}
```
