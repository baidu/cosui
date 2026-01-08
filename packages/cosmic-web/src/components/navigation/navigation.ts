/**
 * @file doc navigation
 */

import {Component} from 'san';
import './navigation.less';

export default class Navigation extends Component {
    static template = `
        <section class="cos-web-navigation">
            <!-- 导航菜单 -->
            <ul class="cos-web-navigation-menu" on-click="handleClick">
                <li s-for="item,index in currentRoutes" data-index="{{index}}"
                    class="{{(item.list || item.leaf)
                        ? 'cos-web-navigation-menu-group' : 'cos-web-navigation-menu-item'}}{{
                        currentPath === item.key ? ' cos-web-navigation-menu-item-active' : ''}}{{
                        item.leaf ? ' cos-web-navigation-menu-leaf' : ''}}">
                    <div class="cos-web-navigation-menu-item-title-container">
                        <span class="cos-line-clamp-1 cos-web-navigation-menu-item-title">{{item.name}}</span>
                        <i
                            s-if="item.list || item.leaf"
                            class="cos-web-navigation-menu-group-arrow {{item.collapsed ? 'collapsed' : ''}}"
                        ></i>
                    </div>
                    <ul s-if="item.leaf && !item.collapsed"  class="cos-web-navigation-menu-group-item">
                        <li s-for="leafItem, leafIndex in item.leaf"
                            class="cos-line-clamp-1 cos-web-navigation-menu-item{{
                            currentPath === leafItem.key ? ' cos-web-navigation-menu-item-active' : ''}}"
                            data-index="{{index}}-{{leafIndex}}">
                            {{leafItem.searchName}}</li>
                    </ul>
                    <ul s-if="item.list && !item.collapsed" class="cos-web-navigation-menu-group-item">
                        <li s-for="subItem, subIndex in item.list">
                            <span class="cos-line-clamp-1 cos-web-navigation-menu-group-item-text">
                                {{subItem.groupName}}</span>
                            <ul class="cos-web-navigation-menu-group-item-leaf">
                                <li s-for="leafItem, leafIndex in subItem.leaf"
                                    class="cos-line-clamp-1 cos-web-navigation-menu-item{{
                                    currentPath === leafItem.key ? ' cos-web-navigation-menu-item-active' : ''}}"
                                    data-index="{{index}}-{{subIndex}}-{{leafIndex}}">
                                    {{leafItem.searchName || leafItem.name}}</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
    `;

    static computed = {
        selectedKeys() {
            return [this.data.get('currentPath')];
        },
        currentRoutes() {
            const routes = this.data.get('routes');
            const query = this.data.get('currentQuery');
            const queryPackages = query.packages;

            const filterRoutes = routes.filter(item => {
                const key = item.key;
                const queryType = query.type;
                const keyStartsWithQueryType = key.indexOf(queryType) === 0 || key.indexOf(queryType) === 1;
                const isDesignToken = queryType === 'design'
                    && key.indexOf('design-token') >= 0
                    && key.indexOf('design-token') <= 1;
                // 如果是 MarkdownUI（/auto/markdown/index），则单开一个二级 tab
                const isAutoPackages = queryType === 'auto'
                    ? queryPackages !== 'markdown'
                    : true;
                if (queryType === 'protocol') {
                    if (queryPackages === 'json') {
                        return key.split('/').includes(queryPackages);
                    }
                    else {
                        return ['protocol/markdown', 'protocol/marklang', 'protocol/content'].some(item =>
                            key.includes(item));
                    }
                }
                return keyStartsWithQueryType && !isDesignToken && isAutoPackages;
            });

            return filterRoutes.map(item => ({
                ...item,
                collapsed: item.collapsed ?? false
            }));
        }
    };

    initData() {
        return {
            routes: {},
            currentPath: '',
            currentQuery: {}
        };
    }

    created() {
        const routes = this.data.get('routes');
        this.data.set('routes', routes.map(item => ({...item, collapsed: item.key.startsWith('components') ?? false})));
    }

    toggleGroup(index: number) {
        const routes = this.data.get('routes');
        const currentRoutes = this.data.get('currentRoutes');
        const collapsed = currentRoutes[index].collapsed;
        this.data.set(`currentRoutes[${index}].collapsed`, !collapsed);
        const route = routes.find(item => item.key === currentRoutes[index].key);
        route && (route.collapsed = !collapsed);
    }

    handleClick(e: Event) {
        const target = (e.target as HTMLElement).closest('li');
        const indexStr = target?.dataset.index;
        if (!indexStr) {
            return;
        }

        const indexArr = indexStr.split('-');
        const currentRoutes = this.data.get('currentRoutes');
        if (!Array.isArray(currentRoutes)) {
            return;
        }

        let item = null;
        if (indexArr.length === 1) {
            // 点击一级菜单：若该项带有 list/leaf，说明是可折叠分组，只在此切换展开状态，不执行跳转
            const groupIndex = Number(indexArr[0]);
            if (Number.isNaN(groupIndex)) {
                return;
            }

            const route = currentRoutes[groupIndex];
            if (!route) {
                return;
            }

            if (route.list || route.leaf) {
                this.toggleGroup(groupIndex);
                return;
            }
            item = route;
        }
        else if (indexArr.length === 2) {
            const groupIndex = Number(indexArr[0]);
            const leafIndex = Number(indexArr[1]);
            if (Number.isNaN(groupIndex) || Number.isNaN(leafIndex)) {
                return;
            }

            const leafGroup = currentRoutes[groupIndex]?.leaf;
            if (!Array.isArray(leafGroup) || !leafGroup[leafIndex]) {
                return;
            }

            item = leafGroup[leafIndex];
        }
        else {
            const groupIndex = Number(indexArr[0]);
            const subIndex = Number(indexArr[1]);
            const leafIndex = Number(indexArr[2]);
            if ([groupIndex, subIndex, leafIndex].some(i => Number.isNaN(i))) {
                return;
            }

            const listGroup = currentRoutes[groupIndex]?.list;
            if (!Array.isArray(listGroup) || !listGroup[subIndex]) {
                return;
            }

            const leafGroup = listGroup[subIndex]?.leaf;
            if (!Array.isArray(leafGroup) || !leafGroup[leafIndex]) {
                return;
            }

            item = leafGroup[leafIndex];
        }

        // 只有叶子项才触发 redirect
        if (!item || item?.list?.length || item?.leaf?.length) {
            return;
        }
        this.fire('redirect', item);
    }
}
