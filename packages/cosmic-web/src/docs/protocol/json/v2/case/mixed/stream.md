## 分段流式 updates：Component 与数据

本例按顺序模拟接收 8 条完整消息。可点击“下一段”逐条观察，也可“自动播放”每隔 900ms 接收一段。
“重置”会销毁旧 AppletContext，从第一段重新开始。预览下方显示当前消息、已注册的 Component ID 和预期 data。

这里的“流式”指多条完整协议消息依次到达；实际接入 SSE/NDJSON 时，由宿主完成分帧和 JSON 解析后调用 `processMessage`，不向 AppletContext 传入半截 JSON。

``` san export=preview caption=v2分段Component与数据更新
import san from 'san';
import {z} from 'zod';
import {AppletContext, defineCatalog} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';
import Button from '@cosui/cosmic/button';

const Text = san.defineComponent({template: '<span>{{value}}</span>'});

// 示例专用文本 Component，使用独立 Catalog，不修改基础 Catalog。
function createCatalog() {
    const base = CATALOG.definition;
    return defineCatalog({
        ...base,
        $id: 'cosui.docs.stream.v2',
        components: {
            ...base.components,
            Text: {props: z.strictObject({value: z.string().default('')})}
        }
    });
}

const segments = [
    {title: '创建空 Applet', message: {version: '2.0', applet: {}}},
    {
        title: 'Component：下发 root，前向引用 label',
        message: {version: '2.0', updates: [
            {id: 'root', type: 'Button', props: {disabled: true}, children: ['label']}
        ]}
    },
    {
        title: 'Component：补齐 label，等待 text 数据',
        message: {version: '2.0', updates: [
            {id: 'label', type: 'Text', props: {value: '{{text}}'}}
        ]}
    },
    {
        title: '数据：初始化完整 data',
        message: {version: '2.0', updates: [
            {path: '', value: {text: '正在', progress: 25}}
        ]}
    },
    {
        title: '数据：更新累计文本',
        message: {version: '2.0', updates: [
            {path: '/text', value: '正在生成'}
        ]}
    },
    {
        title: '数据：同时更新文本和进度',
        message: {version: '2.0', updates: [
            {path: '/text', value: '正在生成结果'},
            {path: '/progress', value: 75}
        ]}
    },
    {
        title: 'Component：完整替换 label，增加进度绑定',
        message: {version: '2.0', updates: [
            {id: 'label', type: 'Text', props: {value: '{{text}}（{{progress}}%）'}}
        ]}
    },
    {
        title: 'Component 与数据：一起提交最终结果',
        message: {version: '2.0', updates: [
            // 完整替换 root 时仍需保留 children 引用。
            {id: 'root', type: 'Button', props: {appearance: 'secondary'}, children: ['label']},
            {path: '/text', value: '生成完成'},
            {path: '/progress', value: 100}
        ]}
    }
];

export default class StreamDoc extends san.Component {
    static components = {'cos-button': Button};

    static template = `
        <div class="v2-stream-demo">
            <div class="cos-space-mb-md" style="display:flex;flex-wrap:nowrap;gap:8px">
                <cos-button style="flex:1;min-width:0;width:auto" size="sm" appearance="secondary" class="v2-stream-next" disabled="{{playing || step >= total}}" on-click="next($event)">下一段</cos-button>
                <cos-button style="flex:1;min-width:0;width:auto" size="sm" appearance="primary" class="v2-stream-play" disabled="{{playing || step >= total}}" on-click="play">自动播放</cos-button>
                <cos-button style="flex:1;min-width:0;width:auto" size="sm" appearance="secondary" class="v2-stream-reset" on-click="reset">重置</cos-button>
            </div>
            <p data-stream-step>第 {{step}} / {{total}} 段：{{title}}</p>
            <div s-ref="content" data-stream-view class="cos-space-mt-md"></div>
            <p data-stream-components>Component ID：{{componentIds}}</p>
            <p>本段预期 data：</p>
            <pre data-stream-data>{{dataJson}}</pre>
            <p>当前消息：</p>
            <pre data-stream-message style="white-space: pre-wrap; word-break: break-word;">{{messageJson}}</pre>
            <p s-if="error" role="alert">{{error}}</p>
        </div>
    `;

    initData() {
        return {
            step: 0, total: segments.length, title: '等待接收', playing: false,
            componentIds: '无', dataJson: '{}', messageJson: '尚未接收消息', error: ''
        };
    }

    attached() {
        this.reset();
    }

    reset() {
        this.stop();
        if (this.appletContext) {
            this.appletContext.dispose();
        }
        Object.entries(this.initData()).forEach(([key, value]) => this.data.set(key, value));
        const catalog = createCatalog();
        this.appletContext = new AppletContext({
            catalog,
            components: {Button, Text},
            onAppletCreated: applet => {
                applet.setRoot(this.ref('content'));
            },
            onError: error => this.data.set('error', error.message)
        });
    }

    next(event) {
        if (event && event.disabled) { return; }
        const index = this.data.get('step');
        if (index >= segments.length || !this.appletContext) {
            return;
        }
        const segment = segments[index];
        try {
            const result = this.appletContext.processMessage(segment.message);
            if (!result.ok) {
                this.data.set('error', result.errors.map(item => item.message).join('; '));
                this.stop();
                return;
            }
            // 仅用于讲解每段消息的预期结果，不读取 AppletContext 内部状态。
            const expectedData = [
                {}, {}, {}, {text: '正在', progress: 25},
                {text: '正在生成', progress: 25}, {text: '正在生成结果', progress: 75},
                {text: '正在生成结果', progress: 75}, {text: '生成完成', progress: 100}
            ];
            const snapshot = {
                step: index + 1,
                title: segment.title,
                componentIds: index === 0 ? '无' : index === 1 ? 'root' : 'root, label',
                dataJson: JSON.stringify(expectedData[index], null, 2),
                messageJson: JSON.stringify(segment.message, null, 2)
            };
            Object.entries(snapshot).forEach(([key, value]) => this.data.set(key, value));
            if (index + 1 === segments.length) {
                this.stop();
            }
        }
        catch (error) {
            this.data.set('error', error.message);
            this.stop();
        }
    }

    play() {
        if (this.data.get('playing') || this.data.get('step') >= segments.length) {
            return;
        }
        this.data.set('playing', true);
        this.timer = setInterval(() => this.next(), 900);
    }

    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.data.set('playing', false);
    }

    disposed() {
        this.stop();
        if (this.appletContext) {
            this.appletContext.dispose();
            this.appletContext = null;
        }
    }
}
```
