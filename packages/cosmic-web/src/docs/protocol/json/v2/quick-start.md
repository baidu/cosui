# 快速接入

## 安装

```bash
npm install @cosui/cosmic-dynamic-ui @cosui/cosmic-catalog @cosui/cosmic san zod
```

## 配置 appletContext

```ts
import san from 'san';
import {z} from 'zod';
import Button from '@cosui/cosmic/button';
import {appletContext, defineCatalog} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

const Text = san.defineComponent({
    template: '<span>{{value}}</span>'
});

const catalog = defineCatalog({
    ...CATALOG.definition,
    $id: 'cosui.quick-start.v2',
    components: {
        ...CATALOG.definition.components,
        Text: {
            props: z.strictObject({value: z.string()})
        }
    }
});

appletContext.config({
    catalog,
    components: {Button, Text},
    actions: {
        sendPrompt: ({args}) => {
            console.log(args.prompt);
        }
    }
});

appletContext.listen({
    onError: error => {
        console.error(error);
    }
});
```

## 创建并更新 Applet

```ts
const applet = appletContext.createApplet({
    root: document.querySelector<HTMLElement>('#app')!
});

const result = applet.processMessage({
    updates: [
        {
            id: 'root',
            type: 'Button',
            props: {appearance: 'primary'},
            children: ['label'],
            events: {
                click: [{
                    action: 'sendPrompt',
                    args: {prompt: '已点击按钮'}
                }]
            }
        },
        {
            id: 'label',
            type: 'Text',
            props: {value: '开始使用'}
        }
    ]
});

if (!result.ok) {
    console.error(result.errors);
}
```

## 销毁

```ts
applet.dispose();
appletContext.dispose();
```
