# 混合示例

## 单 Applet：点击计数

主动创建并挂载默认 Applet，点击按钮后宿主通过 `applet.processMessage` 更新计数。
Text 是示例扩展 Component；Button 使用真实 COSUI Component，省略的属性由 Catalog 补齐默认值。

``` san export=preview caption=单Applet创建与更新
import san from 'san';
import {z} from 'zod';
import {AppletContext, defineCatalog} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';
import Button from '@cosui/cosmic/button';

const Text = san.defineComponent({template: '<span>{{value}}</span>'});
const catalog = defineCatalog({
    ...CATALOG.definition,
    $id: 'cosui.docs.counter.v2',
    components: {...CATALOG.definition.components, Text: {props: z.strictObject({value: z.string()})}}
});

export default class CounterDoc extends san.Component {
    static template = `
        <div class="v2-counter-demo">
            <div s-ref="content"></div>
            <p class="cos-space-mt-md" data-v2-action>最近一次 Action：{{lastPrompt}}</p>
            <p s-if="error" role="alert">{{error}}</p>
        </div>
    `;

    initData() { return {lastPrompt: '尚未点击', error: ''}; }

    attached() {
        this.appletContext = new AppletContext({
            catalog, components: {Button, Text},
            actions: {
                sendPrompt: ({args, $data}) => {
                    this.data.set('lastPrompt', args.prompt);
                    this.applet.processMessage({updates: [{path: '/count', value: $data.count + 1}]});
                }
            },
            onError: error => this.data.set('error', error.message)
        });
        this.applet = this.appletContext.createApplet({root: this.ref('content')});
        this.applet.processMessage({updates: [
            {path: '', value: {count: 0}},
            {
                id: 'root', type: 'Button', children: ['label'],
                events: {click: [{action: 'sendPrompt', args: {prompt: '第 {{count + 1}} 次点击'}}]}
            },
            {id: 'label', type: 'Text', props: {value: '已点击 {{count}} 次，点击 +1'}}
        ]});
    }

    disposed() {
        if (this.appletContext) { this.appletContext.dispose(); }
    }
}
```
