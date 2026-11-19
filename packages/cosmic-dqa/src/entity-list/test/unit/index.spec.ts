import {nextTick} from 'san';
import EntityList from '../../index';

// 使用真实 EntityCard 验证完整父子事件绑定
jest.mock('@cosui/cosmic-dqa/entity-card', () => jest.requireActual('../../../entity-card/index'), {virtual: true});
// 隔离图片加载，保留真实 DOM 点击冒泡
jest.mock('@cosui/cosmic/image', () => {
    const {Component} = jest.requireActual<typeof import('san')>('san');
    return class ImageStub extends Component {
        static template = '<div><img src="{{src}}" alt="{{alt}}" /></div>';
    };
}, {virtual: true});

// 只模拟 Markdown 的文本展示和链接点击参数
jest.mock('@cosui/cosmic-dqa/markdown', () => {
    const {Component} = jest.requireActual<typeof import('san')>('san');
    return class MarkdownStub extends Component {
        static template = `
            <div>
                <span class="plain-text">{{content}}</span>
                <button type="button" on-click="handleLink">链接</button>
            </div>
        `;

        // 模拟 Markdown 原始链接点击参数并 fire 事件
        handleLink(event: Event): void {
            this.fire('click', {event, from: 'link'});
        }
    };
}, {virtual: true});

// 验证真实列表渲染、动态下标和参数转发
describe('EntityList', () => {
    // 组件和 DOM 在 beforeEach 中初始化，确保用例隔离
    /* eslint-disable @typescript-eslint/init-declarations */
    let component: EntityList;
    let host: HTMLDivElement;
    let onClick: jest.Mock;
    /* eslint-enable @typescript-eslint/init-declarations */
    const first = {thumbnail: {src: 'first.png'}, title: '第一项', content: '第一项描述'};
    const second = {thumbnail: {src: 'second.png'}, title: '第二项', content: '第二项描述'};

    // 挂载包含两个真实 EntityCard 的列表
    beforeEach(() => {
        host = document.createElement('div');
        document.body.appendChild(host);
        onClick = jest.fn();
        component = new EntityList({data: {items: [first, second]}});
        component.on('click', onClick);
        component.attach(host);
    });

    // 清理组件和 DOM
    afterEach(() => {
        component.dispose();
        host.remove();
    });

    // 图片点击通过父子事件绑定追加下标
    it('第二项图片点击只追加 index: 1，且只 fire 一次事件', () => {
        const event = new MouseEvent('click', {bubbles: true});
        host.querySelectorAll('img')[1].dispatchEvent(event);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick.mock.calls[0][0]).toEqual({event, area: 'thumbnail', thumbnail: second.thumbnail, index: 1});
    });

    // 列表保持文本区域和蓝链来源
    it.each(['title', 'content'] as const)('%s 链接经列表转发后保留区域并追加 index', area => {
        const event = new MouseEvent('click', {bubbles: true});
        host.querySelectorAll(`.cosd-entity-card-${area} button`)[1].dispatchEvent(event);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick.mock.calls[0][0]).toEqual({event, area, from: 'link', index: 1});
    });

    // 反转数据后不能继续使用原位置或旧图片配置
    it('列表重排后点击使用当前下标及当前图片', async () => {
        component.data.set('items', [second, first]);
        await new Promise<void>(nextTick);
        const event = new MouseEvent('click', {bubbles: true});
        host.querySelectorAll('img')[0].dispatchEvent(event);
        expect(onClick.mock.calls[0][0]).toEqual({event, area: 'thumbnail', thumbnail: second.thumbnail, index: 0});
    });

    // 清空数据应移除所有子项，重新赋值后仍可正常 fire 事件
    it('支持空列表及重新添加列表项', async () => {
        component.data.set('items', []);
        await new Promise<void>(nextTick);
        expect(host.querySelector('.cosd-entity-list')).not.toBeNull();
        expect(host.querySelectorAll('.cosd-entity-card')).toHaveLength(0);
        component.data.set('items', [first]);
        await new Promise<void>(nextTick);
        expect(host.querySelectorAll('.cosd-entity-card')).toHaveLength(1);
        host.querySelector('img')!.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick.mock.calls[0][0].index).toBe(0);
    });

    // 转发自 EntityCard 的搜索点击参数，保持原样保留、下标追加
    it('收到 EntityCard 的搜索点击参数后原样保留，仅追加 index', () => {
        const event = new MouseEvent('click');
        const extra = {source: 'business'};
        const params = Object.freeze({event, area: 'title' as const, from: 'search' as const, id: 'entity-1', extra});
        component.handleClick(params, 2);
        expect(onClick.mock.calls[0][0]).toEqual({...params, index: 2});
        expect(onClick.mock.calls[0][0].extra).toBe(extra);
        expect(onClick.mock.calls[0][0].event).toBe(event);
    });
});
