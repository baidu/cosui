## 多 Applet 分步演示：旅行助手

点击“自动播放”体验内容逐段生成：图片逐张加入，地点名称和地址、商品标题与介绍连续补齐，
路线先出现地点，再补充地址、距离和交通方式。也可点击“下一段”逐条检查协议消息。
文字片段间隔 140ms，列表和字段更新间隔约 500ms；支持暂停、继续和重置。

四个 Applet 共用一个 AppletContext 和统一 CATALOG。创建消息只声明结构及初始数据，后续内容全部通过 data updates 填充。
数组以数字索引追加，文本发送累计内容；不是 Component 整块替换，也不是宿主直接修改 DOM。生成结束后保留结果，可单独移除图集。
点击图片、地点列表或路线中的地点可查看事件回传。示例使用内嵌图片和空链接，不发送网络请求。

``` san export=preview caption=多Applet内容渐进式生成
import san from 'san';
import Button from '@cosui/cosmic/button';
import {AppletContext} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';
import ImageGroup from '@cosui/cosmic-card/image-group';
import LocationList from '@cosui/cosmic-dqa/location-list';
import ProductCard from '@cosui/cosmic-dqa/product-card';
import RoutePlanner from '@cosui/cosmic-dqa/route-planner';

// 自包含的示意图，不依赖外部图片请求。
const picture = (color, scene, label) => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">'
    + '<rect width="480" height="320" fill="' + color + '"/>'
    + '<circle cx="385" cy="64" r="30" fill="#fff2c6"/>' + scene
    + '<rect y="260" width="480" height="60" fill="#163b48" fill-opacity=".7"/>'
    + '<text x="24" y="299" fill="white" font-size="25" font-family="sans-serif">' + label + '</text></svg>'
);
const park = picture('#c8e7e6', '<path d="M0 210 Q100 90 240 210 T480 180 V320 H0Z" fill="#6ca98c"/>'
    + '<path d="M0 250 Q180 150 480 230 V320 H0Z" fill="#3c806f"/>', '01 城市公园');
const museum = picture('#dbe5f2', '<path d="M75 125 L240 50 L405 125Z" fill="#7489a8"/>'
    + '<path d="M95 135 H385 V250 H95Z" fill="#fff9ee"/>'
    + '<path d="M125 145 V235 M200 145 V235 M280 145 V235 M355 145 V235" stroke="#b0bdd0" stroke-width="22"/>', '02 城市博物馆');
const river = picture('#d3e8ef', '<path d="M0 170 Q120 120 260 170 T480 145 V320 H0Z" fill="#7ba68d"/>'
    + '<path d="M170 170 Q400 210 80 320 H360 Q450 220 280 170Z" fill="#80bfd6"/>', '03 滨河步道');
const images = [
    {src: park, alt: '城市公园', linkInfo: {}},
    {src: museum, alt: '城市博物馆', linkInfo: {}},
    {src: river, alt: '滨河步道', linkInfo: {}}
];

function dataStep(appletId, title, path, value, delay = 500) {
    return {title, delay, message: {version: '2.0', appletId, updates: [{path, value}]}};
}

// 每段发送当前累计文本，符合数据更新的替换语义；不是在宿主 DOM 上模拟打字。
function textSteps(appletId, title, path, text) {
    const characters = Array.from(text);
    const steps = [];
    for (let length = 3; length < characters.length + 3; length += 3) {
        steps.push(dataStep(appletId, title, path, characters.slice(0, length).join(''), 140));
    }
    return steps;
}

const steps = [
    {title: '建立图集结构，等待图片数据', message: {version: '2.0', applet: {
        appletId: 'images', data: {images: []}, components: [{
            id: 'root', type: 'ImageGroup', if: '{{images.length > 0}}',
            // 显式三列，不启用默认图集的外层固定比例，避免图片下方留白。
            props: {list: '{{images}}', span: 4, ratio: '3-2', 'max-row': 1},
            events: {click: [{action: 'sendPrompt', args: {prompt: '图片 {{$event.index + 1}}'}}]}
        }]
    }}},
    ...images.map((image, index) => dataStep('images', '接收图片 ' + (index + 1) + ' / 3', '/images/' + index, image)),
    {title: '建立地点列表，等待地点信息', message: {version: '2.0', applet: {
        appletId: 'citations', data: {items: []}, components: [
            {
                id: 'root', type: 'LocationList', if: 'items.length > 0',
                props: {items: '{{items}}'},
                events: {click: [{action: 'sendPrompt', args: {prompt: '地点 {{$event.item.title}}'}}]}
            }
        ]
    }}},
    dataStep('citations', '接收第一个地点', '/items/0', {
        linkInfo: {}, thumbnail: park, title: '', address: '', tags: []
    }),
    ...textSteps('citations', '逐段生成地点名称', '/items/0/title', '城市公园'),
    ...textSteps('citations', '逐段补齐地点地址', '/items/0/address', '滨河路 18 号，南门入口'),
    dataStep('citations', '补充地点标签', '/items/0/tags/0', '免费开放'),
    dataStep('citations', '追加第二个地点', '/items/1', {
        linkInfo: {}, thumbnail: museum, title: '', address: '', tags: ['需预约']
    }),
    ...textSteps('citations', '逐段生成第二个地点名称', '/items/1/title', '城市博物馆'),
    ...textSteps('citations', '逐段补齐第二个地点地址', '/items/1/address', '文化路 8 号，东侧入口'),
    {title: '建立商品结构，等待推荐内容', message: {version: '2.0', applet: {
        appletId: 'product', data: {title: '', caption: '', tags: [], source: '', price: 199},
        components: [{id: 'root', type: 'ProductCard', props: {
            'link-info': {}, thumbnail: park, title: '{{title}}', caption: '{{caption}}',
            tags: '{{tags}}', source: '{{source}}', price: {value: '{{price}}', sign: '¥'}
        }}]
    }}},
    ...textSteps('product', '生成商品名称', '/title', '轻量防泼水旅行背包'),
    ...textSteps('product', '连续生成推荐理由', '/caption', '20L 容量装下日常装备，轻量背负适合公园散步与城市漫游。'),
    dataStep('product', '补充商品特点', '/tags/0', '轻量'),
    dataStep('product', '追加商品特点', '/tags/1', '防泼水'),
    dataStep('product', '收到优惠价格', '/price', 169),
    ...textSteps('product', '补齐商品来源', '/source', '城市漫游装备推荐'),
    {title: '建立路线结构，等待地点数据', message: {version: '2.0', applet: {
        appletId: 'route', data: {locations: [], routes: []}, components: [{
            id: 'root', type: 'RoutePlanner', if: '{{locations.length > 0}}',
            props: {'location-list': '{{locations}}', 'route-list': '{{routes}}', folded: false},
            events: {
                'location-click': [{action: 'sendPrompt', args: {prompt: '地点 {{$event.item.title}}'}}],
                'route-click': [{action: 'sendPrompt', args: {prompt: '路线 {{$event.item.distance}}'}}]
            }
        }]
    }}},
    dataStep('route', '接收第一个地点', '/locations/0', {
        id: 'park', linkInfo: {}, thumbnail: park, title: '', address: '', tags: []
    }),
    ...textSteps('route', '生成第一个地点名称', '/locations/0/title', '城市公园'),
    ...textSteps('route', '逐段补充地点地址', '/locations/0/address', '滨河路 18 号，南门入口'),
    dataStep('route', '补充开放时间', '/locations/0/openingHours', '08:00-18:00'),
    dataStep('route', '追加第二个地点', '/locations/1', {
        id: 'museum', linkInfo: {}, thumbnail: museum, title: '', address: ''
    }),
    ...textSteps('route', '生成第二个地点名称', '/locations/1/title', '城市博物馆'),
    ...textSteps('route', '补齐第二个地点地址', '/locations/1/address', '文化路 8 号，东侧入口'),
    dataStep('route', '连接两个地点', '/routes/0', {
        startLocationId: 'park', endLocationId: 'museum', distance: '', transportOptions: []
    }),
    ...textSteps('route', '补充路线距离', '/routes/0/distance', '距离 1.6km'),
    dataStep('route', '补充步行时间，行程生成完成', '/routes/0/transportOptions/0', {type: 'walk', duration: '20分钟'})
];

export default class CatalogDoc extends san.Component {
    static components = {'cos-button': Button};

    static template = `
        <section class="v2-catalog-demo">
            <div class="cos-space-mb-md" style="display:flex;flex-wrap:nowrap;gap:8px">
                <cos-button style="flex:1;min-width:0;width:auto" size="sm" appearance="secondary" class="v2-catalog-next" disabled="{{playing || step >= total}}" on-click="next($event)">下一段</cos-button>
                <cos-button style="flex:1;min-width:0;width:auto" size="sm" appearance="primary" class="v2-catalog-play" disabled="{{step >= total}}" on-click="togglePlay">{{playing ? '暂停' : '自动播放'}}</cos-button>
                <cos-button style="flex:1;min-width:0;width:auto" size="sm" appearance="secondary" class="v2-catalog-reset" on-click="reset">重置</cos-button>
            </div>
            <p data-catalog-step>第 {{step}} / {{total}} 段：{{title}}</p>
            <p data-catalog-ids>当前 Applet：{{appletIds || '无'}}</p>
            <p s-if="step === 0">等待第一条消息，点击“自动播放”体验内容逐段生成。</p>
            <section style="{{visible.images ? '' : 'display:none'}}">
                <h4>ImageGroup · 图集</h4><div s-ref="images" data-case="images"></div>
                <cos-button style="width:auto" size="sm" appearance="secondary" class="v2-catalog-delete" disabled="{{!visible.images || playing || step < total}}" on-click="deleteImages">移除图集</cos-button>
            </section>
            <section style="{{visible.citations ? '' : 'display:none'}}">
                <h4>LocationList · 地点列表</h4><div s-ref="citations" data-case="citations"></div>
            </section>
            <section style="{{visible.product ? '' : 'display:none'}}">
                <h4>ProductCard · 商品</h4><div s-ref="product" data-case="product"></div>
            </section>
            <section style="{{visible.route ? '' : 'display:none'}}">
                <h4>RoutePlanner · 路线</h4><div s-ref="route" data-case="route"></div>
            </section>
            <p data-catalog-action>最近事件：{{lastAction}}</p>
            <p>最近生命周期：{{lifecycle}}</p>
            <details><summary>查看当前协议消息</summary>
                <pre style="white-space:pre-wrap;word-break:break-word">{{messageJson}}</pre>
            </details>
            <p s-if="error" role="alert">{{error}}</p>
        </section>
    `;

    initData() {
        return {step: 0, total: steps.length, title: '等待接收', playing: false, visible: {}, appletIds: '',
            lastAction: '尚未点击', lifecycle: '尚未创建', messageJson: '尚未接收消息', error: ''};
    }

    attached() { this.reset(); }

    reset() {
        this.stop();
        if (this.appletContext) { this.appletContext.dispose(); }
        Object.entries(this.initData()).forEach(([key, value]) => this.data.set(key, value));
        this.ids = [];
        this.appletContext = new AppletContext({
            catalog: CATALOG,
            components: {ImageGroup, LocationList, ProductCard, RoutePlanner},
            onAppletCreated: applet => {
                this.ids.push(applet.appletId);
                this.data.set('appletIds', this.ids.join(', '));
                this.data.set('visible.' + applet.appletId, true);
                this.data.set('lifecycle', '创建 ' + applet.appletId);
                applet.setRoot(this.ref(applet.appletId));
            },
            onAppletDeleted: ({appletId}) => {
                this.ids = this.ids.filter(id => id !== appletId);
                this.data.set('appletIds', this.ids.join(', '));
                this.data.set('visible.' + appletId, false);
                this.data.set('lifecycle', '删除 ' + appletId);
            },
            actions: {sendPrompt: ({appletId, args}) => this.data.set('lastAction', appletId + ': ' + args.prompt)},
            onError: error => this.data.set('error', error.message)
        });
    }

    next(event) {
        if (event && event.disabled) { return; }
        const index = this.data.get('step');
        if (index >= steps.length) { return; }
        const step = steps[index];
        const result = this.appletContext.processMessage(step.message);
        this.data.set('messageJson', JSON.stringify(step.message, null, 2));
        if (!result.ok) { this.stop(); return; }
        this.data.set('step', index + 1);
        this.data.set('title', step.title);
        if (index + 1 === steps.length) { this.stop(); }
    }

    togglePlay() {
        if (this.data.get('playing')) { this.stop(); return; }
        if (this.data.get('step') >= steps.length) { return; }
        this.data.set('playing', true);
        this.playNext();
    }

    playNext() {
        if (!this.data.get('playing')) { return; }
        const segment = steps[this.data.get('step')];
        if (!segment) { this.stop(); return; }
        this.next();
        if (this.data.get('playing')) {
            this.timer = setTimeout(() => this.playNext(), segment.delay || 500);
        }
    }

    deleteImages() {
        if (this.data.get('playing') || this.data.get('step') < steps.length || !this.data.get('visible.images')) { return; }
        const message = {version: '2.0', applet: {appletId: 'images', delete: true}};
        this.appletContext.processMessage(message);
        this.data.set('messageJson', JSON.stringify(message, null, 2));
    }

    stop() {
        clearTimeout(this.timer);
        this.timer = null;
        this.data.set('playing', false);
    }

    disposed() {
        this.stop();
        if (this.appletContext) { this.appletContext.dispose(); }
    }
}
```
