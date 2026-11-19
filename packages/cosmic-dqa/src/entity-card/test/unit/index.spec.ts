import {nextTick} from 'san';
import EntityCard from '../../index';
import type {EntityCardProps} from '../../interface';

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

// 验证实体卡片的 DOM 绑定和事件协议
describe('EntityCard', () => {
    // 组件和 DOM 在 beforeEach 中初始化，确保用例隔离
    /* eslint-disable @typescript-eslint/init-declarations */
    let component: EntityCard;
    let host: HTMLDivElement;
    let onClick: jest.Mock;
    /* eslint-enable @typescript-eslint/init-declarations */

    // 每个用例挂载独立组件并监听实际 fire 事件
    beforeEach(() => {
        host = document.createElement('div');
        document.body.appendChild(host);
        onClick = jest.fn();
        component = new EntityCard({
            data: {thumbnail: {src: 'demo.png', alt: '图片'}, title: '标题', content: '描述'}
        });
        component.on('click', onClick);
        component.attach(host);
    });

    // 清理组件和 DOM，避免用例间共享状态
    afterEach(() => {
        component.dispose();
        host.remove();
    });

    // 真实图片 DOM 点击只生成一次图片事件
    it('图片点击只带 event、area 和当前 thumbnail', () => {
        const event = new MouseEvent('click', {bubbles: true});
        const thumbnail = component.data.get('thumbnail');
        host.querySelector('img')!.dispatchEvent(event);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick.mock.calls[0][0]).toEqual({event, area: 'thumbnail', thumbnail});
        expect(onClick.mock.calls[0][0].thumbnail).toBe(thumbnail);
    });

    // 不同空图片配置均不渲染图片，文字正常展示
    it.each([undefined, null, {}, {src: ''}])('图片配置 %p 时不渲染图片', async thumbnail => {
        component.data.set('thumbnail', thumbnail as EntityCardProps['thumbnail']);
        await new Promise<void>(nextTick);
        expect(host.querySelector('.cosd-entity-card-thumbnail')).toBeNull();
        expect(host.querySelector('.cosd-entity-card-body')!.textContent).toContain('描述');
    });

    // 从无图状态补充地址后恢复图片展示
    it('空图片地址更新为有效地址后恢复展示', async () => {
        component.data.set('thumbnail', {src: ''});
        await new Promise<void>(nextTick);
        expect(host.querySelector('img')).toBeNull();
        component.data.set('thumbnail', {src: 'updated.png'});
        await new Promise<void>(nextTick);
        expect(host.querySelector('img')!.getAttribute('src')).toBe('updated.png');
    });

    // 验证模板事件绑定能区分标题和描述，且不会从 DOM 补充字段
    it.each(['title', 'content'] as const)('%s 链接保留原始 Event 并只追加 area', area => {
        const event = new MouseEvent('click', {bubbles: true});
        host.querySelector(`.cosd-entity-card-${area} button`)!.dispatchEvent(event);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick.mock.calls[0][0]).toStrictEqual({event, from: 'link', area});
        expect(onClick.mock.calls[0][0].event).toBe(event);
    });

    // 普通文字与内容留白不应触发组件点击
    it('普通文本和内容区域点击不 fire 事件', () => {
        host.querySelectorAll('.plain-text, .cosd-entity-card-body').forEach(element => {
            // 使用真实冒泡事件检查是否误绑定了整个内容区
            element.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        expect(onClick).not.toHaveBeenCalled();
    });

    // 验证收到参数后的映射
    it.each(['title', 'content'] as const)('%s 收到 ml-search 参数后映射 directive 并保留其余参数', area => {
        const event = new MouseEvent('click');
        const extra = {source: 'business'};
        const params = Object.freeze({
            event, directive: 'ml-search', id: 'entity-1', word: '原文',
            query: '搜索词', href: '/search', extra
        });
        component.handleContentClick(params, area);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick.mock.calls[0][0]).toStrictEqual({
            event, area, from: 'search', id: 'entity-1', word: '原文',
            query: '搜索词', href: '/search', extra
        });
        expect(onClick.mock.calls[0][0].extra).toBe(extra);
        expect(onClick.mock.calls[0][0].event).toBe(event);
        expect(params.directive).toBe('ml-search');
    });

    // 兼容 Markdown 仅提供 directive 和 event 的点击分支
    it('收到仅含 event 和 directive 的 ml-search 参数时不补充缺失字段', () => {
        const event = new MouseEvent('click');
        component.handleContentClick({event, directive: 'ml-search'}, 'title');
        expect(onClick.mock.calls[0][0]).toStrictEqual({event, area: 'title', from: 'search'});
    });

    // 区分实际存在的空值与缺失字段，避免过滤掉底层参数
    it('链接实际提供的空字段和扩展参数原样保留', () => {
        const params = Object.freeze({event: new MouseEvent('click'), from: 'link', id: '', href: undefined, text: ''});
        component.handleContentClick(params, 'content');
        expect(onClick.mock.calls[0][0]).toStrictEqual({...params, area: 'content'});
    });

    // 非蓝链 Markdown 事件不在实体卡片的交互范围内
    it.each([
        {}, {from: 'img'}, {from: 'table'}, {from: 'code'},
        {directive: 'ml-citation', from: 'link'}
    ])('忽略非蓝链参数 %p', params => {
        component.handleContentClick({event: new MouseEvent('click'), ...params}, 'content');
        expect(onClick).not.toHaveBeenCalled();
    });
});
