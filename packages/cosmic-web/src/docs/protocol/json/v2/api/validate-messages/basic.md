``` san export=preview caption=编辑并校验Messages
import san from 'san';
import Button from '@cosui/cosmic/button';
import Switcher from '@cosui/cosmic/switcher';
import Textarea from '@cosui/cosmic/textarea';
import {AppletContext, validateMessages} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

const initialMessages = [{
    version: '2.0',
    applet: {
        appletId: 'validation-demo',
        data: {title: 'Messages 校验通过'},
        // 这里故意使用旧的小写类型，开启 autofix 后会修复为 Text。
        components: [{id: 'root', type: 'text', props: {value: '{{title}}'}}]
    }
}, {
    version: '2.0',
    appletId: 'validation-demo',
    updates: [{path: '/title', value: '第二条 Message 也已生效'}]
}];

export default class ValidateMessagesDemo extends san.Component {
    static components = {
        'cos-button': Button,
        'cos-switcher': Switcher,
        'cos-textarea': Textarea
    };

    static template = `
        <section>
            <cos-textarea value="{= value =}" height="{{320}}" max-height="{{320}}" clear>
                <div slot="title">填写 v2 Messages（JSON 数组）</div>
            </cos-textarea>
            <div class="cos-flex cos-items-center cos-space-mt-md" style="gap:16px;white-space:nowrap">
                <span class="cos-flex cos-items-center">
                    <cos-switcher checked="{= autofix =}" size="sm" />
                    <span class="cos-space-ml-xs">autofix</span>
                </span>
                <cos-button size="sm" appearance="primary"
                    on-click="validateAndRender">校验并渲染</cos-button>
            </div>
            <p s-if="status" class="cos-space-mt-md">{{status}}</p>
            <p s-if="error" class="cos-space-mt-md cos-color-text-em" role="alert">{{error}}</p>
            <div class="cos-text-headline cos-space-mt-lg cos-space-mb-md">生成效果</div>
            <div s-ref="root"></div>
        </section>
    `;

    initData() {
        return {
            value: JSON.stringify(initialMessages, null, 4),
            autofix: false,
            status: '',
            error: ''
        };
    }

    validateAndRender() {
        this.clearPreview();
        this.data.set('status', '');
        this.data.set('error', '');

        let messages;
        try {
            messages = JSON.parse(this.data.get('value'));
        }
        catch (error) {
            this.data.set('error', 'JSON 格式错误：' + error.message);
            return;
        }

        const autofix = this.data.get('autofix');
        const validation = validateMessages(messages, CATALOG, {autofix});
        if (!validation.ok) {
            const detail = validation.errors.map(item => {
                const prefix = item.messageIndex === undefined ? '' : 'messages[' + item.messageIndex + ']：';
                return prefix + item.message;
            }).join('；');
            const fixes = validation.fixes.length ? '；autofix：' + validation.fixes.join('；') : '';
            this.data.set('error', detail + fixes);
            return;
        }

        this.appletContext = new AppletContext({
            catalog: CATALOG,
            autofix,
            onAppletCreated: applet => applet.setRoot(this.ref('root')),
            onError: error => this.data.set('error', error.message)
        });
        for (const message of validation.value) {
            const result = this.appletContext.processMessage(message);
            if (!result.ok) {
                this.data.set('error', result.errors.map(item => item.message).join('；'));
                return;
            }
        }
        const fixes = validation.fixes.length ? '；autofix：' + validation.fixes.join('；') : '';
        this.data.set('status', '校验通过，已处理 ' + validation.value.length + ' 条 Message' + fixes);
    }

    clearPreview() {
        this.appletContext?.dispose();
        this.appletContext = null;
        const root = this.ref('root');
        if (root) {
            root.textContent = '';
        }
    }

    disposed() {
        this.clearPreview();
    }
}
```
