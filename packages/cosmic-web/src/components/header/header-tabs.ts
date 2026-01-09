/**
 * 顶部菜单项
 */

import {Component} from 'san';
import {Link, router} from '../../utils/proxy-router';
import './header-tabs.less';

/**
 * 表示菜单项的接口定义。
 * 该接口用于描述导航菜单中的每一个项目，包括其基本属性及可能包含的子项目。
 *
 * @interface Item
 * @property {string} text - 菜单项要显示的文本内容。
 * @property {string} href - 菜单项的超链接地址，点击后将跳转的URL。
 * @property {boolean} [selected=false] - 指示该菜单项是否被选中，默认为false。
 * @property {Item[]} [children] - 该菜单项可能包含的子菜单项数组，每个子项也是Item类型，用于构建多级菜单。
 */
interface Item {
    text: string;
    href: string;
    selected?: boolean;
    children?: Item[];
}

export default class HeaderTabs extends Component {
    static template = /* html */ `
        <section class="web-header-tabs">
            <div
                class="web-header-tab-container"
                s-for="item in items"
            >
                <co-link to="{{item.href}}" class="web-header-link">
                    <div
                        class="web-header-tab{{item.selected ? ' co-active' : ''}}"
                    >
                        {{item.text}}
                    </div>
                </co-link>
                <div
                    s-if="item.selected && item.hasSubTab"
                    class="web-header-subtabs"
                >
                    <div s-for="subItem in item.children" class="web-header-subtab-container">
                        <co-link to="{{subItem.href}}" style="text-decoration: none;">
                            <div class="web-header-subtab{{subItem.subSelected ? ' co-active': ''}}"
                                on-click="handleClick(subItem)"
                            >
                                {{subItem.text}}
                            </div>
                        </co-link>
                    </div>
                </div>
            </div>
        </section>
    `;


    static components = {
        'co-link': Link
    };

    initData() {
        return {
            items: [] as Item[]
        };
    }

    attached() {
        const itemMapping = {
            'cosmic': '基础组件 cosmic',
            'cosmic-card': '卡片组件 cosmic-card',
            'cosmic-dqa': '智能化组件 cosmic-dqa',
            'cosmic-shop': '电商组件 cosmic-shop',
            'json': 'JSON 协议',
            'markdown': 'Markdown 扩展协议'
        };

        router.listen(async e => {
            const path = e.path.split('/') || [];
            const query = path?.[2];
            let searchText = itemMapping[query];

            if (searchText) {
                const items = this.data.get('items');
                this.updateSelectedItem(items, searchText);
            }
        });
    }

    handleClick(clickedItem: any) {
        if (!clickedItem) {
            return;
        }
        const items = this.data.get('items');
        this.updateSelectedItem(items, clickedItem.text);
    }

    updateSelectedItem(items: Item, searchText: string) {
        return items.map(item => {
            if (item.children) {
                item.children = this.updateSelectedItem(item.children, searchText);
            }

            if (item.text === searchText) {
                item.subSelected = true;
            }
            else {
                item.subSelected = false;
            }

            return item;
        });
    }
}
