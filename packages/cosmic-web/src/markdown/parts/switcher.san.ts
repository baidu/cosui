import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import Popover from '@cosui/cosmic/popover';
import Button from '@cosui/cosmic/button';
import Checkbox from '@cosui/cosmic/checkbox';
import Tabs from '@cosui/cosmic/tabs';
import Tab from '@cosui/cosmic/tab';
import resource from '../assets/resource.json';

import './switcher.less';
import businessMap from './switcher.params';

export default class Switcher extends Component {
    // eslint-disable-next-line
    static template = `
        <section>
            <div class="fixed-content">
                <div id="md-switcher" class="head-switcher">
                    <div class="head-switcher-top">
                        <div s-for="item in switcherList" class="switcher-item">
                                <div class="title">{{item.name}}</div>
                                <cos-button s-for="item2 in item.themes"
                                    on-click="tokenFilter(item,item2)"
                                    class="{{item.val === theme.val && item2.val === subTheme.val? 'selected' : ''}}"
                                >
                                    {{item2.name}}
                                </cos-button>
                        </div>
                    </div>

                    <div class="head-switcher-bottom">
                        <cos-checkbox
                            s-show="isFilterBusiness"
                            appearance="mark"
                            class=" {{isFilter? 'cos-color-bg-raised-inverse-hover' : 'cos-color-bg'}}"
                            on-change="showFilter"
                        >
                            突出显示与 {{theme.name}} 通用 Token 差异部分
                        </cos-checkbox>
                    </div>
                    <div class="outline-redirect"></div>
                </div>
            </div>
        </section>

    `;

    static components = {
        'cos-icon': Icon,
        'cos-popover': Popover,
        'cos-button': Button,
        'cos-checkbox': Checkbox,
        'cos-tabs': Tabs,
        'cos-tab': Tab
    };

    static computed = {
        switcherList(this: Switcher) {
            const res: any[] = [];
            const map = businessMap;
            map.forEach(value => {
                res.push(value);
            });
            return res;
        }
    };
    resource: object;
    tabsChange: () => void;
    scrollEvent: (this: Window, ev: Event) => any;
    themeChange: (e: Event) => void;

    initData() {
        return {
            theme: {
                name: 'Cosmic',
                val: 'cosmic'
            },
            subTheme: {
                name: '通用',
                val: 'cos'
            },
            themes: [
                'cosmic'
            ],
            subThemes: {
                'Cosmic': ['通用', '智能化', '电商', '医疗'],
                'New PC': ['通用'],
                'NewApp': ['青春版', '青春版VIP', '基础版', '基础版VIP'],
                'Baidu App': ['通用', 'ai', '专栏', '付费']
            },
            outlines: ['排版', '边框', '布局', '颜色', '全局色板'],
            business: '',
            attr: '',
            visible: false,
            isFilter: false,
            isFilterBusiness: false,
            mdRoot: document.getElementById('mdRoot'),
            offsetTop: 0,
            isFixed: false,
            outline: ''
        };
    }

    async attached() {

        // 主题切换回调
        this.tabsChange = () => {
            const business = this.data.get('theme');
            const attr = this.data.get('subTheme');

            // 判断是否展示突出差异
            if ((business.val === 'cosmic')
                && attr.val !== 'cos'
            ) {
                this.data.set('isFilterBusiness', true);
            }
            else {
                this.data.set('isFilterBusiness', false);
            }
        };
        this.data.get('mdRoot').addEventListener('md-tabs-change', this.tabsChange);

        // 吸顶效果
        const switcher = this.data.get('mdRoot').shadowRoot?.getElementById('md-switcher') as HTMLElement;
        const switcherTop = switcher.querySelector('.head-switcher-top');
        const offsetTop = this.getOffsetTop(switcher);
        const switcherHeight = switcher.offsetHeight;
        this.data.set('offsetTop', offsetTop);

        // 获取内容区域，吸顶后元素脱离文档流，内容会向上移动，需要调整内容区域margin-top
        // 而内容区域为一个md-tabs元素，难以获取，只能通过先拿到父元素
        const markdown = this.data.get('mdRoot').shadowRoot?.querySelector('.markdown') as HTMLElement;
        const content = markdown.children[1] as HTMLElement;

        this.scrollEvent = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            if (scrollTop > offsetTop) {
                // switcher 脱离文档流后，补充相应的高度
                content.style.marginTop = `${switcherHeight - offsetTop}px`;
                switcher.classList.add('switcher-fixed');
                switcherTop?.classList.add('fixed');
                this.data.set('isFixed', true);
            }
            else {
                content.style.marginTop = '0';
                switcher.classList.remove('switcher-fixed');
                switcherTop?.classList.remove('fixed');
                this.data.set('isFixed', false);
            }
        };

        // 监听滚动事件
        window.addEventListener('scroll', this.scrollEvent);


        // 监听主题变化

        this.themeChange = (e: Event) => {
            const theme = (e as CustomEvent).detail.theme;
            const params = {theme: {
                name: '',
                val: theme.business
            }, subTheme: {
                name: '',
                val: theme.prefix
            }};
            params.theme.name = businessMap.get(theme.business)?.name || '';
            businessMap.get(theme.val)?.themes.forEach(item => {
                if (item.val === theme.prefix) {
                    params.subTheme = item;
                }
            });
            if (params.theme.name !== '') {
                this.tokenFilter(params.theme, params.subTheme);
            }
        };

        document.addEventListener('theme-change', this.themeChange);
        this.resource = await resource;
        this.data.get('mdRoot')?.dispatchEvent(new CustomEvent('init-resource', {
            detail: this.resource
        }));

    }

    showFilter() {
        this.data.set('isFilter', !this.data.get('isFilter'));
        const mdRoot = document.getElementById('mdRoot');
        mdRoot?.dispatchEvent(new CustomEvent('show-filter', {
            bubbles: true,
            composed: true
        }));
    }

    /**
     * 获取元素距离文档顶部的偏移量
     *
     * @param element 要获取偏移量的HTML元素
     * @returns 返回元素距离文档顶部的偏移量
     */
    getOffsetTop(element: HTMLElement) {
        let actualTop = 0;
        while (element !== null) {
            actualTop += element.offsetTop;
            element = element.offsetParent as HTMLElement;
        }
        return actualTop;
    }

    /**
     * 理业务类型和主题类型的切换
     *
     * @param business 业务类型
     * @param attr 主题类型
     */
    tokenFilter(business: any, attr: any) {
        this.data.set('theme', business);
        this.data.set('subTheme', attr);
        this.data.set('visible', false);
        const mdRoot = document.getElementById('mdRoot');
        if (business.val === 'cosmic' && attr.val !== 'cos') {
            // 仅在Cosmic和整页焕新的非通用主题下，开启差异部分高亮
            this.data.set('isFilterBusiness', true);
        }
        else {
            this.data.set('isFilterBusiness', false);
        }
        mdRoot?.dispatchEvent(new CustomEvent('business-change', {
            detail: {
                business: business.val,
                attr: attr.val,
                resource: this.resource
            },
            bubbles: true,
            composed: true
        }));
        window.scrollTo(0, 0);
    }

    /**
     * 锚点跳转
     *
     * @param param 传入参数
     */
    turnOutline(param: string) {
        this.data.set('outline', param);
        document.dispatchEvent(new CustomEvent('outline-click', {
            detail: {param}
        }));
    }

    detached() {
        window.removeEventListener('scroll', this.scrollEvent);
        this.data.get('mdRoot').removeEventListener('md-tabs-change', this.tabsChange);
        document.removeEventListener('theme-change', this.themeChange);
    }
}
