``` san export=preview caption=Data更新
import san from 'san';
import {z} from 'zod';
import Button from '@cosui/cosmic/button';
import {AppletContext, defineCatalog} from '@cosui/cosmic-dynamic-ui';

const TravelBoard = san.defineComponent({
    template: `
        <section style="padding:16px;border:1px solid #dce4f2;border-radius:12px;background:#f7faff">
            <h4 style="margin:0 0 4px">{{user.name}}的{{trip.city}}之旅</h4>
            <p style="margin:0 0 12px;color:#667085">{{trip.label}} · 完成 {{trip.completed}} 项</p>
            <div s-for="task in tasks" style="margin:8px 0;padding:10px;background:white;border-radius:8px">
                {{task.done ? '已完成' : '待处理'}}：{{task.title}}
            </div>
            <p s-if="note" style="margin:12px 0 0;color:#8a5a00">提醒：{{note}}</p>
        </section>
    `
});

const task = z.strictObject({title: z.string(), done: z.boolean()});
const catalog = defineCatalog({
    $id: 'cosui.docs.data.v2', version: '2.0',
    components: {TravelBoard: {props: z.strictObject({
        user: z.strictObject({name: z.string()}),
        trip: z.strictObject({city: z.string(), label: z.string(), completed: z.number()}),
        tasks: z.array(task), note: z.string().default('')
    })}}, actions: {}
});

const appletId = 'data-travel-demo';
const initialMessage = {version: '2.0', applet: {
    appletId,
    data: {user: {name: '旅行者'}, trip: {city: '待定', label: '尚未规划', completed: 0}, tasks: [], note: ''},
    components: [{id: 'root', type: 'TravelBoard', props: {
        user: '{{user}}', trip: '{{trip}}', tasks: '{{tasks}}', note: '{{note}}'
    }}]
}};

const steps = [
    {title: '整体替换根 Data', updates: [{path: '', value: {
        user: {name: '小宇'}, trip: {city: '杭州', label: '周末计划', completed: 0},
        tasks: [{title: '预订博物馆门票', done: false}, {title: '规划骑行路线', done: false}],
        note: '周末可能有雨'
    }}]},
    {title: '更新对象字段', updates: [{path: '/trip/city', value: '苏州'}]},
    {title: '整体替换对象，不与旧值合并', updates: [{
        path: '/trip', value: {city: '南京', label: '历史文化行', completed: 0}
    }]},
    {title: '整体替换第一项', updates: [{
        path: '/tasks/0', value: {title: '参观南京博物院', done: true}
    }]},
    {title: '在数组末尾追加', updates: [{
        path: '/tasks/2', value: {title: '夜游秦淮河', done: false}
    }]},
    {title: '删除数组项', updates: [{path: '/tasks/1', value: null}]},
    {title: '删除对象字段', updates: [{path: '/note', value: null}]},
    {title: '多条更新按顺序执行', updates: [
        {path: '/tasks/1/done', value: true},
        {path: '/trip/completed', value: 1},
        {path: '/trip/completed', value: 2}
    ]}
].map(step => ({title: step.title, message: {version: '2.0', appletId, updates: step.updates}}));

export default class DataUpdateDemo extends san.Component {
    static components = {'cos-button': Button};
    static template = `
        <section>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
                <cos-button size="sm" appearance="secondary" disabled="{{playing || step >= total}}" on-click="next">下一步</cos-button>
                <cos-button size="sm" appearance="primary" disabled="{{playing || step >= total}}" on-click="play">全部演示</cos-button>
                <cos-button size="sm" appearance="secondary" on-click="reset">重置</cos-button>
            </div>
            <p>第 {{step}} / {{total}} 步：{{title}}</p>
            <div s-ref="root"></div>
            <details style="margin-top:12px" open>
                <summary>本次完整 update Message</summary>
                <pre style="white-space:pre-wrap;word-break:break-word">{{messageJson}}</pre>
            </details>
            <p s-if="error" role="alert" style="color:#c62828">{{error}}</p>
        </section>
    `;
    initData() {
        return {step: 0, total: steps.length, title: '等待更新', playing: false,
            messageJson: '尚未发送 update Message', error: ''};
    }
    attached() { this.reset(); }
    reset() {
        this.stop();
        this.appletContext?.dispose();
        Object.entries(this.initData()).forEach(([key, value]) => this.data.set(key, value));
        this.appletContext = new AppletContext({
            catalog, components: {TravelBoard},
            onAppletCreated: applet => applet.setRoot(this.ref('root')),
            onError: error => this.data.set('error', error.message)
        });
        this.showResult(this.appletContext.processMessage(initialMessage));
    }
    showResult(result) {
        if (!result.ok) {
            this.data.set('error', result.errors.map(item => item.message).join('; '));
            this.stop();
        }
        return result.ok;
    }
    next() {
        const index = this.data.get('step');
        if (index >= steps.length) { return; }
        const step = steps[index];
        this.data.set('error', '');
        this.data.set('messageJson', JSON.stringify(step.message, null, 2));
        if (this.showResult(this.appletContext.processMessage(step.message))) {
            this.data.set('step', index + 1);
            this.data.set('title', step.title);
        }
    }
    play() {
        if (!this.data.get('playing')) {
            this.data.set('playing', true);
            this.playNext();
        }
    }
    playNext() {
        if (!this.data.get('playing') || this.data.get('step') >= steps.length) {
            this.stop();
            return;
        }
        this.next();
        this.timer = setTimeout(() => this.playNext(), 900);
    }
    stop() {
        clearTimeout(this.timer);
        this.timer = null;
        this.data.set('playing', false);
    }
    disposed() {
        this.stop();
        this.appletContext?.dispose();
    }
}
```
