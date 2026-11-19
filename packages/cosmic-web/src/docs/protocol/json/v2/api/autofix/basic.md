``` san export=preview caption=AppletContext启用autofix
import san from 'san';
import Button from '@cosui/cosmic/button';
import {AppletContext} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

const message = {
    version: '2.0',
    applet: {
        appletId: 'autofix-demo',
        // text 是旧的小写名称，autofix 会将它改为 Text。
        components: [{id: 'root', type: 'text', props: {value: 'autofix 已完成修复并渲染'}}]
    }
};

export default class AutofixDemo extends san.Component {
    static components = {'cos-button': Button};

    static template = `
        <section>
            <div class="cos-text-headline cos-space-mb-sm">待处理的错误 Message</div>
            <pre class="cos-space-mb-md" style="white-space:pre-wrap;word-break:break-word">{{messageJson}}</pre>
            <cos-button size="sm" appearance="primary" on-click="render">处理 Message</cos-button>
            <p s-if="status" class="cos-space-mt-md">{{status}}</p>
            <p s-if="error" class="cos-space-mt-md cos-color-text-em" role="alert">{{error}}</p>
            <div class="cos-text-headline cos-space-mt-lg cos-space-mb-md">生成效果</div>
            <div s-ref="root"></div>
        </section>
    `;

    initData() {
        return {
            messageJson: JSON.stringify(message, null, 2),
            status: '',
            error: ''
        };
    }

    render() {
        this.appletContext?.dispose();
        this.data.set('status', '');
        this.data.set('error', '');
        this.appletContext = new AppletContext({
            catalog: CATALOG,
            autofix: true,
            onAppletCreated: applet => applet.setRoot(this.ref('root')),
            onError: error => this.data.set('error', error.message)
        });

        const result = this.appletContext.processMessage(message);
        if (!result.ok) {
            this.data.set('error', result.errors.map(item => item.message).join('；'));
            return;
        }
        this.data.set('status', result.fixes.length
            ? '修复内容：' + result.fixes.join('；')
            : 'Message 无需修复');
    }

    disposed() {
        this.appletContext?.dispose();
    }
}
```
