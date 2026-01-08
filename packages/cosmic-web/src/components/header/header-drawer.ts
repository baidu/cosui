/**
 * 切换主题的侧边栏抽屉
 */

import {Component} from 'san';
import './header-drawer.less';
import './theme-switcher.less';
import UnionIcon from '../icon/svg/union';
import {imageGroups, themeMap} from './drawer-items.config.js';

export default class HeaderDrawer extends Component {
    static template = /* html */ `
        <section>
            <div class="custom-drawer {{visible ? 'visible' : ''}}">
                <div class="custom-drawer-content">
                    <div class="custom-drawer-header">
                        <p class="drawer-title">主题切换</p>
                        <div class="image-wrapper" on-click="onClose">
                            <union-icon class="cos-color-text-tiny"/>
                        </div>
                    </div>
                    <div class="custom-drawer-body">
                        <div s-for="group in imageGroups">
                            <h3 class="image-group-title">{{group.title}}</h3>
                            <div class="image-container"
                                s-for="image in group.images"
                                on-click="handleImageClick(image,group.title)"
                            >
                                <img
                                    src="{{image.src}}"
                                    alt="{{image.alt}}"
                                    draggable="false"
                                    class="drawer-image {{image.selected ? 'selected' : ''}}"
                                >
                                <div class="image-caption {{image.selected ? 'selected' : ''}}">
                                    {{image.alt}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="custom-drawer-backdrop" on-click="onClose"></div>
        </section>
    `;

    static components = {
        'union-icon': UnionIcon
    };

    initData() {
        return {
            visible: false,
            lastTheme: {
                day: 'cos-wise',
                pcDay: 'cos-pc',
                dark: 'cos-dark',
                token: ''
            },
            isNightMode: false,
            imageGroups,
            themeMap
        };
    }

    inited() {
        // 监听 isNightMode 的变化
        this.watch('isNightMode', isNightMode => {
            this.toggleNightMode(isNightMode);
            localStorage.setItem('isNightMode', isNightMode);
        });
    }

    attached() {
        this.initTheme();
    }

    onClose() {
        this.fire('close');
    }

    handleImageClick(image) {
        const imageGroups = this.data
            .get('imageGroups')
            .map(group => ({
                ...group,
                images: group.images.map(img => ({
                    ...img,
                    selected: img === image
                }))
            }));
        this.data.set('imageGroups', imageGroups);

        const isNightMode = this.data.get('isNightMode');
        const themeMap = this.data.get('themeMap');
        const theme = themeMap[image.key];
        localStorage.setItem('themeKey', image.key);
        this.toggleToken(theme, isNightMode);
    }

    toggleToken(theme, isNightMode) {
        const rootBody = document.body;
        const rootApp = document.getElementById('app');
        if (isNightMode) {
            rootBody.classList = theme.dark;
        }
        else {
            rootBody.classList = theme.day;
        }
        rootApp.classList = theme.token;
        // 主题切换触发
        document.dispatchEvent(new CustomEvent('theme-change', {
            detail: {
                isNightMode,
                theme
            }
        }));
        this.data.set('lastTheme', theme);
    }

    toggleNightMode(isNightMode) {
        const rootBody = document.body;
        const lastTheme = this.data.get('lastTheme');
        if (isNightMode) {
            rootBody.classList = lastTheme.dark;
        }
        else {
            rootBody.classList = lastTheme.day;
        }
        // 触发一个全局响应事件（让组件示例能监听到）暗夜切换触发
        document.dispatchEvent(new CustomEvent('theme-change', {
            detail: {
                isNightMode,
                theme: lastTheme
            }
        }));
    }

    initTheme() {
        const isNightMode = localStorage.getItem('isNightMode')
            ? localStorage.getItem('isNightMode')  === 'true' : false;
        const themeKey = localStorage.getItem('themeKey') || 'default';
        const themeMap = this.data.get('themeMap');
        const theme = themeMap[themeKey];
        const imageGroups = this.data
            .get('imageGroups')
            .map(group => ({
                ...group,
                images: group.images.map(img => ({
                    ...img,
                    selected: img.key === themeKey
                }))
            }));
        this.data.set('imageGroups', imageGroups);
        this.data.set('isNightMode', isNightMode);

        this.toggleToken(theme, isNightMode);
        this.toggleNightMode(isNightMode);
    }
}
