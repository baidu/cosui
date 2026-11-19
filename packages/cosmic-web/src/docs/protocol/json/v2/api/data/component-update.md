``` san export=preview caption=Data使用
import san from 'san';
import Input from '@cosui/cosmic/input';
import Markdown from '@cosui/cosmic-dqa/markdown';
import {AppletContext, defineCatalog} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

const catalog = defineCatalog({...CATALOG.definition, $id: 'cosui.docs.data-usage.v2'});

const message = {
    version: '2.0',
    applet: {
        appletId: 'data-usage-demo',
        data: {
            user: {name: '小宇', profile: {'常住城市': '北京'}},
            form: {city: '杭州'},
            places: ['西湖', '灵隐寺', '中国美术学院'],
            settings: {showTip: true}
        },
        components: [
            {
                id: 'root',
                type: 'Div',
                props: {
                    class: 'cos-space-p-md'
                },
                children: ['title', 'city-input', 'summary', 'place']
            },
            {
                id: 'title',
                type: 'Markdown',
                // 普通文本和绑定混合，结果为字符串。
                props: {content: '### {{user.name}}的旅行计划'}
            },
            {
                id: 'city-input',
                type: 'Input',
                props: {
                    // 双向绑定：输入值变化后写回 form.city。
                    value: '{= form.city =}',
                    placeholder: '输入目的地',
                    size: 'sm'
                }
            },
            {
                id: 'summary',
                type: 'Markdown',
                props: {
                    // 根变量使用合法标识符；中文字段通过方括号访问。
                    // 同时演示点号访问、数组下标和三元表达式。
                    content: [
                        '当前目的地：**{{form.city}}**',
                        '常住城市：{{user.profile[\'常住城市\']}}',
                        '首选地点：{{places[0]}}',
                        '共 {{places.length}} 个地点',
                        '{{settings.showTip ? \'可以修改上方目的地\' : \'\'}}'
                    ].join('\n\n')
                }
            },
            {
                id: 'place',
                type: 'Markdown',
                // for 声明 item 和 index；循环变量只在当前 Component 及其子树中有效。
                for: 'item, index in places',
                // 使用循环变量，并通过算术表达式将下标转换为从 1 开始的序号。
                props: {content: '{{index + 1}}. {{item}}'}
            }
        ]
    }
};

export default class DataUsageDemo extends san.Component {
    static template = `
        <section>
            <div s-ref="root"></div>
            <p s-if="error" role="alert" style="color:#c62828">{{error}}</p>
        </section>
    `;

    attached() {
        this.appletContext = new AppletContext({
            catalog,
            components: {Input, Markdown},
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
