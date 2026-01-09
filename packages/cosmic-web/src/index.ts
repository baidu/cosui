import {Component} from 'san';
import {router} from './utils/proxy-router';
import './index.less';
import routes from './router/routes';

import Input from '@cosui/cosmic/input';
import Tabs from '@cosui/cosmic/tabs';
import Tab from '@cosui/cosmic/tab';
import './markdown/markdown';
import Header from './components/header/header';
import Homepage from './components/homepage/homepage';
import Navigation from './components/navigation/navigation';
import Content from './components/content/content';
import Outline from './components/outline/outline';
import tabItems from './components/header/tab-items.config';
import {getComponents} from './service/get-components';
import {getDocs} from './service/get-docs';
import DesignTokenMD from './md-template.md';

const excludedPatterns = [
    /\/components\/cosmic\/(overview|quickstart|dependencies)/,
    /\/components\/cosmic-card\/overview/,
    /\/components\/cosmic-dqa\/overview/
];

const makeMobileLink = () => {
    const currentPath = location.pathname;

    // 检查当前路径是否匹配任何排除模式
    const isExcluded = excludedPatterns.some(pattern => pattern.test(currentPath));

    // 生成移动端链接
    if ((currentPath.includes('components') || currentPath.includes('json/') || currentPath.includes('agent-ui/'))
        && !isExcluded
    ) {
        return `${location.origin}/mobile/#/preview${currentPath}`;
    }

    // 生成默认链接
    return `${location.origin}/mobile/#/`;
};



const mutationCallback = (mutationList: MutationRecord[]) => {
    mutationList.forEach(mutation => {
        (mutation.addedNodes || []).forEach((node: Node) => {
            const pushModuleStyle = (node: Element) => {
                if (!window.moduleStyleList) {
                    window.moduleStyleList = [];
                }
                document.dispatchEvent(
                    new CustomEvent(
                        'insertstyle',
                        {detail: node, composed: true, bubbles: true}
                    )
                );
                window.moduleStyleList.push(node);
            };

            // 首先检查是否是元素节点，再进行
            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                if (element.getAttribute('id') === 'sprite-plyr') {
                    pushModuleStyle(element);
                }
                if (element.nodeName === 'LINK' && element?.getAttribute('href')?.includes('/plyr')) {
                    pushModuleStyle(element);
                }
                if (element.tagName === '' || element.nodeName === 'STYLE' || element.nodeName === 'LINK') {
                    if (element.hasAttribute('data-scp')
                        || element.textContent?.indexOf('.agent-ui') !== -1
                        || element.textContent?.indexOf('.plyr') !== -1
                    ) {
                        pushModuleStyle(element);
                    }
                }
            }
        });
    });
};

const bodyOb = new MutationObserver(mutationCallback);
const headOb = new MutationObserver(mutationCallback);

class Main extends Component {

    static template = `
        <div class="web-wrapper web-wrapper{{!isHome? '-normal' : ''}}" >
            <web-header
                tabItems="{{tabItems}}"
                routes="{{routes}}"
                isHome="{{isHome}}"
                currentPath="{{currentPath}}"
                currentQuery="{{currentQuery}}"
                isNightMode="{{isNightMode}}"
                on-redirect="handleRedirect"
                on-theme-change="handleThemeChange"
            />
            <web-homepage s-if="{{isHome}}" isNightMode="{{isNightMode}}" />
            <div s-else class="web-main">
                <div class="cos-row cos-row-col-12">
                    <div s-if="currentPath!=='/design-token/cosmic'
                        && currentPath!=='/practices/design-token/practices'
                        && currentPath!=='/overview/index'
                        && currentPath!=='/protocol/overview'"
                        class="web-navigation-wrapper cos-color-bg cos-color-text cos-col-2"
                    >
                        <web-navigation
                            class="web-navigation-fixed"
                            routes="{{routes}}"
                            currentPath="{{currentPath}}"
                            currentQuery="{{currentQuery}}"
                            on-redirect="handleRedirect"
                        />
                    </div>
                    <div class="web-content-wrapper
                        {{(currentPath === '/design-token/cosmic'
                            || currentPath === '/one-card/index'
                            || currentPath === '/statistic/core-data/index'
                            || currentPath === '/statistic/template-list/index')
                            ? 'token-content' : 'cos-col-10' }}
                        {{(currentPath === '/statistic/core-data/index'
                            || currentPath === '/statistic/template-list/index'
                            || currentPath === '/one-card/index')
                            ? 'fit-width-container' : ''}}
                        cos-color-bg"
                    >
                        <div
                            class="web-doc-container cos-color-bg"
                            on-update-headings="getHeadings"
                            on-md-tabs-change="getHeadings"
                        >
                            <div class="web-main-content-container">
                                <co-md
                                    s-if="{{isWebComp}}"
                                    value="{{mdContent}}"
                                    id="mdRoot"
                                />
                                <web-content s-else content="{{content}}" />
                            </div>
                        </div>
                    </div>
                </div>
                <web-outline s-if="currentPath!=='/protocol/markdown/marklang/example'"
                    headings="{{headings}}"
                    currentPath="{{currentPath}}"
                />
            </div>
        </div>
    `;

    static components = {
        'cos-input': Input,
        'cos-tabs': Tabs,
        'cos-tab': Tab,
        // 自定义组件
        'web-homepage': Homepage,
        'web-header': Header,
        'web-navigation': Navigation,
        'web-outline': Outline,
        'web-content': Content
    };

    /**
     * @description
     * 初始化数据，返回一个包含默认值的对象。
     * 该对象包含以下属性：
     * - routes (Array)：路由列表，默认为空数组；
     * - currentPath (String)：当前路径，默认为空字符串；
     * - currentQuery (Object)：当前查询参数，默认为一个空对象；
     * - mdContent (String)：Markdown 内容，默认为空字符串；
     * - content (String)：HTML 内容，默认为空字符串；
     * - tabItems (Array)：标签页项目，默认为空数组；
     * - headings (Array)：标题，默认为空数组；
     * - isHome (Boolean)：是否首页，默认为true；
     * - isHasSubTab (Boolean)：是否有二级 tab，默认为false；
     * - isTabRouteComp (Boolean)：是否标签路由组件，默认为false；
     * - isWebComp (Boolean)：是否 Web 组件，默认为false；
     * - activeIndex (Number)：激活索引，默认为0。
     * - isNightMode (Boolean)：是否为夜间模式，默认为false。
     *
     * @returns {Object} 包含默认值的对象
     */
    initData() {
        return {
            routes,
            currentPath: '',
            currentQuery: {},
            mdContent: '',
            content: '',
            tabItems,
            headings: [],
            isHome: true,
            isHasSubTab: false,
            isTabRouteComp: false,
            isWebComp: true,
            activeIndex: 0,
            isNightMode: false
        };
    }

    /**
     * @description
     * 在组件被挂载时，进行路由初始化操作。包括设置路由模式、添加路由规则、监听路由变化等。
     * 同时根据不同的路由情况，更新相应的数据并调用对应的方法处理路由。
     *
     * @returns {Promise<void>} 无返回值
     */
    async attached() {
        const isNightMode = localStorage.getItem('isNightMode')
            ? localStorage.getItem('isNightMode')  === 'true' : false;
        this.data.set('isNightMode', isNightMode);
        this.responsive();
        window.addEventListener('resize', this.responsive.bind(this));

        bodyOb.observe(document.body, {childList: true, attributes: false});
        headOb.observe(document.head, {childList: true, attributes: false});

        router.setMode('html5' as any);
        router.add({
            rule: /\/([^\/]*)\/([\w-]*)(\/([\w-]*))?(\/([\w-]*))?/,
            handler() {}
        });

        // 路由监听
        router.listen(async e => {
            const pathArr = e.path.split('/') || [];
            const query = {
                type: pathArr?.[1],
                packages: pathArr?.[2],
                component: pathArr?.[3],
                subId: pathArr?.[4],
                platform: e.query?.platform || 'mobile'
            };
            this.data.set('currentPath', e.path);
            this.data.set('currentQuery', query);
            this.data.set('activeIndex', 0);

            // TODO: token 预览和工具迁移到 iCode 后删除
            this.data.set('isWebComp', false);
            const idMap: any = {
                '/design-token/cosmic': 5
            };

            // 有二级 tab 的路由
            const subTabRoutes: string[] = [];
            const generalPackages = ['introduction', 'overview', 'quickstart', 'dependencies', 'example', 'summary'];
            const isComponentRoute = e.path.startsWith('/components');
            const isGeneralPackage = generalPackages.includes(query.component);

            this.data.set('isHome', e.path === '/');
            this.data.set('isHasSubTab', subTabRoutes.some(route => e.path.startsWith(route)));

            if (!this.data.get('isHome')) {
                // Token 预览和工具页面的路由
                if (query.type === 'design-token') {
                    this.data.set('isTabRouteComp', false);
                    const targetId = idMap[e.path];
                    // 若从 idMap 中找到对应的 targetId 才会使用 setArtical 方法，否则默认使用 attachDoc 兜底
                    if (targetId) {
                        this.setArtical(idMap[e.path]);
                    }
                    else {
                        this.attachDoc(e.path);
                    }
                }
                else if (['overview'].includes(query.type) || (isComponentRoute && isGeneralPackage)) {
                    // 非组件 tab 的路由
                    this.data.set('isTabRouteComp', false);
                    this.attachDoc(e.path);
                }
                else if (isComponentRoute) {
                    // 组件 tab 的路由
                    this.data.set('isTabRouteComp', true);
                    this.attachComponent(query);
                }
                else if (['agent-ui', 'practices'].includes(query.type)) {
                    this.data.set('isTabRouteComp', !!e.tab);
                    this.attachDoc(e.path);
                }
                // markdown组件单独从组件doc获取
                else if (query.type === 'protocol') {
                    this.data.set('isTabRouteComp', false);
                    if (query.packages === 'markdown' && query.component === 'component') {
                        this.attachComponent({
                            ...query,
                            packages: 'cosmic-dqa',
                            component: 'markdown',
                            docPath: query.subId,
                            subId: ''
                        });
                    }
                    else {
                        this.attachDoc(e.path);
                    }
                }
                else {
                    // 其余路由重定向到首页
                    router.locator.redirect('/');
                }
            }

            this.setTab();
            this.setHomePage();
            this.nextTick(() => this.changeMaxWidthLimit(e.path));
        });

        router.start();
    }

    /**
     * @description 改变最大宽度限制，根据路由地址判断是否添加类名
     * @param {string} path 路由地址，如 '/design-token/'
     */
    changeMaxWidthLimit(path: string) {
        const restrictedElements = document.querySelectorAll('.web-main-content-container');
        if (path.startsWith('/design-token/')) {
            restrictedElements.forEach(element => {
                element.classList.add('web-main-content-container-token');
            });
        }
        else {
            restrictedElements.forEach(element => {
                element.classList.remove('web-main-content-container-token');
            });
        }
    }

    setHomePage() {
        const isHome = this.data.get('isHome');
        if (isHome) {
            document.body.classList.add('web-is-home');
        }
        else {
            document.body.classList.remove('web-is-home');
        }

        const isHasSubTab = this.data.get('isHasSubTab');
        const root = document.body;
        if (isHasSubTab) {
            root.style.setProperty('--web-header-height', '104px');
        }
        else {
            root.style.setProperty('--web-header-height', '56px');
        }
    }

    /**
     * @description 设置标签页，根据当前查询类型选中相应的标签项
     * @returns {void} - 无返回值
     */
    setTab() {
        const currentQuery = this.data.get('currentQuery');
        const tabItems = this.data.get('tabItems').map((item: any) => {
            if (item.children) {
                // 更新子项
                const children = item.children.map((child: any) => {
                    if (child.children) {
                        // 更新子子项
                        const subChildren = child.children.map((subChild: any) => {
                            const type = subChild.href.split('/')[1];
                            return {
                                ...subChild,
                                selected: type === currentQuery?.type
                            };
                        });
                        const selected = subChildren.some((subChild: any) => subChild.selected);
                        return {
                            ...child,
                            children: subChildren,
                            selected
                        };
                    }
                    const type = child.href.split('/')[1];
                    return {
                        ...child,
                        selected: type === currentQuery?.type
                    };
                });

                const selected = children.some((child: any) => child.selected);

                return {
                    ...item,
                    children,
                    selected
                };
            }
            const [, type = '', packages = ''] = item.href.split('/');
            let selected = type === currentQuery?.type;
            if (type === 'protocol') {
                selected = packages === currentQuery?.packages;
            }
            return {
                ...item,
                selected
            };
        });

        this.data.set('tabItems', tabItems);
    }

    /**
     * @async
     * @description
     * 设置文章，并更新页面内容。
     */
    async setArtical() {
        this.data.set('mdContent', DesignTokenMD.template);
        this.data.set('isWebComp', true);
        window.scrollTo(0, 0);
    }

    handleRedirect(item) {
        if (item.key) {
            router.locator.redirect(item.key);
        }
    }

    attachComponent(query) {
        getComponents(query).then(({default: Doc}) => {
            this.nextTick(() => {
                if (query.subId) {
                    const content = document.getElementById('content');
                    // bca-disable-line
                    content.innerHTML = '';
                    const doc = new Doc();
                    doc.attach(content);
                }
                else {
                    this.docChange(() => {
                        // 得到的是san component 对象
                        const doc = new Doc();
                        doc.attach(document.getElementById('content'));
                    });
                }
            });
        }).catch(e => {
            console.log(e);
        });
    }

    /**
     * @description
     * 附加文档，根据路径获取对应的文档组件并进行渲染。
     * 支持两种形式的路径：
     * - /cosmic/xxx.html
     * - /cosmic-card/xxx.html
     * 如果路径为前者，则将 cosmic 改为 design-cosmic；如果路径为后者，则将 cosmic-card 改为 design-cosmic-card。
     *
     * @param {string} path 文档路径，以 '/' 开头，不包含 '.html'。例如 '/cosmic/xxx'、'/cosmic-card/xxx'。
     *
     * @returns {void} 无返回值。
     */
    attachDoc(path: string) {
        getDocs(path).then(({default: Doc}) => {
            this.nextTick(() => {
                this.docChange(() => {
                    // 得到的是 san component 对象
                    const doc = new Doc({
                        data: {
                            isNightMode: this.data.get('isNightMode')
                        }
                    });
                    doc.attach(document.getElementById('content'));
                });
            });
        }).catch(e => {
            console.log(e);
        });
    }

    /**
     * docChange 文档内容改变
     *
     * @param {Function} changeFun 自定义 doc change 事件
     */
    docChange(changeFun) {
        // before
        // 清除当前页面 doc内容
        // bca-disable-next-line
        document.getElementById('content').innerHTML = '';
        this.data.set('content', '');

        // 执行自定义 change 执行事件
        changeFun && changeFun();

        this.getHeadings();
        window.scroll(0, 0);
    }

    /**
     * @description
     * 获取页面中所有标题（包括 h2、h3、h4）的文本内容和对应的 DOM 元素，并存入 data 中。
     * 如果是 Web 组件，则从自定义 markdown 组件里获取标题，否则从 content 区域获取。
     *
     * @returns {void} 无返回值
     */
    getHeadings() {
        let doms = [];
        let headings: Array<{level: string, text: string, dom: Element, active: boolean}> = [];
        const isWebComp = this.data.get('isWebComp');
        if (isWebComp) {
            // 获取自定义 markdown 组件里的标题，TODO: 迁移后删除
            const shadowRoot = document.querySelector('co-md')?.shadowRoot;
            const tabRoot = shadowRoot?.querySelector('md-tab-pane.co-active');
            let beforeDoms = [];
            beforeDoms = tabRoot ? tabRoot.querySelectorAll('h2,h3,h4') : shadowRoot ?.querySelectorAll('h2,h3,h4');
            // md中不获取被隐藏的标题
            for (let node of beforeDoms) {
                if (!node.classList.contains('cos-hidden')) {
                    doms.push(node);
                }
            }
        }
        else {
            // 匹配含 id 的标题
            doms = document.getElementById('content')?.querySelectorAll('h2[id],h3[id],h4[id]');
        }

        doms.forEach(element => {
            headings.push({
                text: (element as HTMLElement).innerText,
                level: element.tagName[1],
                dom: element,
                active: false
            });
        });
        this.data.set('headings', headings);
    }

    responsive() {
        if (window.innerWidth < 600) {
            window.location.href = makeMobileLink();
        }
    }

    /**
     * 处理主题变更
     *
     * @param isNight 是否为夜间模式
     */
    handleThemeChange(isNight: boolean) {
        this.data.set('isNightMode', isNight);
    }
}

const main = new Main();
main.attach(document.querySelector('#app') as Element);
