import {Component} from 'san';
import HeaderTabs from './header-tabs';
import './header.less';
import SearchIcon from '../icon/svg/search-icon';
import SkinFilledIcon from '../icon/svg/skin-filled';
import MoonFill from '../icon/svg/moon-fill.svg';
import SunFill from '../icon/svg/sun-filled.svg';
import GithubIcon from '../icon/svg/github';
import {Link} from 'san-router';
import tabItems from './tab-items.config';
import Select from './select';
import './select/index.less';
import Tooltip from '@cosui/cosmic/tooltip';
import HeaderDrawer from './header-drawer';
import CosmicIcon from '../icon/svg/cosmic';

function capFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export default class Header extends Component {
    // eslint-disable-next-line
    static template = /*html*/ `
        <section style="height: var(--web-header-height);">
            <section
                class="web-header-fixed {{isHome? 'web-header-fixed-home':''}}"
                ref="colorBox"
                >
                <co-link
                    to="/"
                    class="cos-web-header-link cos-flex cos-items-center cos-justify-between
                    cos-no-underline cos-color-text"
                    style="margin-left: 32px; cursor: pointer;text-decoration-line: none"
                >
                    <cosmic-icon class="cosmic-icon"/>
                    <div
                        class="cos-color-text cosmic-icon-text">
                        Cosui
                    </div>
                </co-link>
                <co-header-tabs style="margin-left: 75px;" items="{{tabItems}}"/>

                <!-- 搜索框 -->
                 <div class="cos-web-header-search">
                    <search-icon class="icon"/>
                    <s-select
                        class="cos-web-header-search-input"
                        showSearch
                        showArrow="{{false}}"
                        filterOption="{{false}}"
                        notFoundContent="not found"
                        placeholder="搜索..."
                        on-search="handleSearch"
                        on-select="handleSelect"
                        dropdownClassName="cos-web-header-search-option"
                    >
                        <s-select-option s-for="d in showOpts" value="{{d.key}}"
                        >
                            <div class="cos-color-text-tiny">{{d.searchName || d.name}}</div>
                        </s-select-option>
                    </s-select>
                </div>

                <!-- 主题切换 -->
                <cos-tooltip position="bottom" content="切换主题" trigger="hover"
                    bubbleClass="header-tooltip">
                    <div class="cos-web-header-change" on-click="toggleDrawer">
                        <skin-filled-icon class="svg-icon"/>
                    </div>
                </cos-tooltip>

                <!-- 夜间模式 -->
                <cos-tooltip s-if="!isNightMode" position="bottom"
                    content="切换夜间" trigger="hover" bubbleClass="header-tooltip">
                    <div class="cos-web-header-dark" on-click="toggleDark">
                        <img src=${MoonFill} />
                    </div>
                </cos-tooltip>

                <!-- 日间模式 -->
                <cos-tooltip s-if="isNightMode" position="bottom"
                    content="切换日间" trigger="hover" bubbleClass="header-tooltip">
                    <div class="cos-web-header-sun" on-click="toggleDark">
                        <img src=${SunFill} />
                    </div>
                </cos-tooltip>

                <div class="cos-web-header-github" on-click="goGithub">
                    <github-icon class="svg-icon"/>
                </div>

                <co-header-drawer
                    visible="{{drawerVisible}}"
                    on-close="handleDrawerClose"
                    isNightMode="{{isNightMode}}"
                />
            </section>
        </section>
    `;

    static computed = {
        defaultOpenKeys() {
            const routes = this.data.get('routes');
            return routes.map(item => item.key);
        },
        selectedKeys() {
            return [this.data.get('currentPath')];
        },
        currentRoutes() {
            const routes = this.data.get('routes');
            const query = this.data.get('currentQuery');
            return routes.filter(
                item => {
                    return query && (item.key.indexOf(query.type) === 0 || item.key.indexOf(query.type) === 1);
                }
            );
        }
    };

    static components = {
        'co-header-tabs': HeaderTabs,
        'co-link': Link,
        'co-header-drawer': HeaderDrawer,
        'skin-filled-icon': SkinFilledIcon,
        'github-icon': GithubIcon,
        'search-icon': SearchIcon,
        'cosmic-icon': CosmicIcon,
        's-select': Select,
        's-select-option': Select.Option,
        'cos-tooltip': Tooltip
    };

    /**
     * @description 初始化数据，返回一个包含tabItems的对象
     * @returns {Object} 包含tabItems的对象，每个tabItem是一个包含text和href属性的对象
     */
    initData() {
        return {
            tabItems,
            selectedTab: '组件',
            routes: {},
            currentPath: '',
            currentQuery: {},
            drawerVisible: false,
            isNightMode: false
        };
    }
    inited() {
    }

    attached() {
    }

    detached() {
    }

    goHome() {
    }

    created() {
        const routes = this.data.get('routes');
        this.addSearchName(routes);
        const opts = this.convertMenuToTwoLevel(routes);

        this.data.set('opts', opts);
        this.data.set('showOpts', opts.flatMap(node => node.children || []));
    }

    /**
     * 深度提取所有 leaf 叶子节点并扁平化
     * @param {Array} menuList 原始的导航菜单数据
     * @returns {Array} 转换后的两层结构数据
     */
    convertMenuToTwoLevel(menuList) {
        const newMenuList = JSON.parse(JSON.stringify(menuList));

        // 递归提取所有 leaf 节点
        function collectAllLeafNodes(node, leafList = []) {
            if (Array.isArray(node.leaf)) {
                leafList.push(...node.leaf);
            }

            if (Array.isArray(node.list)) {
                node.list.forEach(item => collectAllLeafNodes(item, leafList));
            }

            if (Array.isArray(node.children)) {
                node.children.forEach(item => collectAllLeafNodes(item, leafList));
            }

            return leafList;
        }

        // 遍历第一层节点，为每个节点挂载children属性
        newMenuList.forEach(firstLevelNode => {
            firstLevelNode.children = collectAllLeafNodes(firstLevelNode, []);
        });

        const filteredMenuList = newMenuList.filter(node => {
            return Array.isArray(node.children) && node.children.length > 0;
        });

        return filteredMenuList;
    }

    getCom(arr) {
        return arr.reduce((pre, cur) => {
            if (cur.leaf) {
                return [...pre, ...cur.leaf];
            }
            return [...pre, ...(this.getCom(cur.list || []))];
        }, []);
    }

    addSearchName(arr) {
        const opts = this.getCom(arr);
        for (const item of opts) {
            if (item.key.startsWith('/design')) {
                item.searchName = `${capFirstLetter(item.path)} ${item.name}`;
            }
            else if ((item.key.startsWith('/components') || item.key.startsWith('/agent-ui/usage')
                || item.key.startsWith('/protocol/markdown')) && item.text) {
                item.searchName = `${item.name} ${item.text}`;
            }
            else {
                item.searchName = item.name;
            }
        }
        return opts;
    }

    handleSearch(keyword) {
        const menuData = this.data.get('opts');
        // 边界处理：空数据/空关键词直接返回空数组
        if (!Array.isArray(menuData) || !keyword || typeof keyword !== 'string') {
            return [];
        }

        // 统一转小写，实现忽略大小写的模糊匹配
        const lowerKeyword = keyword.trim().toLowerCase();
        const result = [];

        // 遍历第一层节点
        for (const firstLevelNode of menuData) {
            const firstLevelName = firstLevelNode.searchName?.toLowerCase() || firstLevelNode.name?.toLowerCase() || '';
            const isFirstLevelMatch = firstLevelName.includes(lowerKeyword);

            if (isFirstLevelMatch) {
                result.push(...firstLevelNode.children);
                continue;
            }

            if (Array.isArray(firstLevelNode.children)) {
                for (const childNode of firstLevelNode.children) {
                    // 仅匹配子节点的name字段，判断name是否存在
                    const childName = childNode.searchName?.toLowerCase() || childNode.name?.toLowerCase() || '';
                    const isChildMatch = childName.includes(lowerKeyword);

                    // 子节点匹配
                    if (isChildMatch) {
                        result.push(childNode);
                    }
                }
            }
        }

        this.data.set('showOpts', result);
    }

    handleSelect(value) {
        this.fire('redirect', {key: value});
    }

    toggleDrawer() {
        this.data.set('drawerVisible', !this.data.get('drawerVisible'));
    }

    handleDrawerClose() {
        this.data.set('drawerVisible', false);
    }

    /**
     * 切换暗色模式 发布消息给父组件
     *
     * @returns 无返回值
     */
    toggleDark() {
        const isNightMode = !this.data.get('isNightMode');
        this.data.set('isNightMode', isNightMode);
        this.fire('theme-change', isNightMode);
    }

    goGithub() {
        window.open('https://github.com/baidu/cosui', '_blank');
    }

}
