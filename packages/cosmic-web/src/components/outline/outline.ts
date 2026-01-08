import {Component} from 'san';
import './outline.less';

export default class Outline extends Component {
    static template = `

        <div class="web-outline {{open ? ' web-outline-on' : ' web-outline-off'}}">
            <div
                class="web-outline-button"
                on-click="handleButtonClick"
            />
            <div class="web-outline-list">
                <div
                    s-for="heading in headings"
                    class="web-outline-item web-outline-item-{{heading.level}}{{heading.active ? ' co-active' : ''}}"
                    on-click="handleItemClick(heading)"
                >
                    {{heading.text}}
                </div>
            </div>
        </div>

    `;

    /**
     * @description 初始化数据函数，返回一个包含open和headings两个属性的对象，其中open默认为true，headings默认为空数组, offset为偏移量。
     * @returns {Object} 返回一个对象，包含open和headings两个属性，分别表示是否打开和表头列表。
     */
    initData() {
        return {
            open: true,
            headings: [],
            currentPath: '',
            offset: 0
        };
    }

    /**
     * 当组件被挂载到 DOM 上时调用，设置根节点的样式属性。
     *
     * @returns void
     */
    attached() {
        const root = document.body;
        root.style.setProperty('--web-main-margin-right', '169px');
        this.watch('headings', newValue => {
            // 当无锚点自动关闭大纲栏
            if (newValue.length === 0) {
                this.data.set('open', false);
                root.style.setProperty('--web-main-margin-right', '0px');
            }
            else {
                this.data.set('open', true);
                root.style.setProperty('--web-main-margin-right', '169px');
            }
        });
        // 创建大纲跳转监听，非大纲区域点击进行跳转
        document.addEventListener('outline-click', e => {
            const detail = (e as CustomEvent).detail;
            for (const heading of this.data.get('headings')) {
                if (heading.text === detail.param) {
                    this.handleItemClick(heading);
                }
            }
        });
    }

    detached(): void {
        const root = document.body;
        root.style.setProperty('--web-main-margin-right', '0px');
    }

    updated() {
        if (this.data.get('currentPath') === '/design-token/cosmic') {
            this.data.set('offset', 50);
        }
        else {
            this.data.set('offset', 0);
        }
    }

    handleButtonClick() {
        const open = this.data.get('open');
        let root = document.body;
        if (open) {
            root.style.setProperty('--web-main-margin-right', '0px');
        }
        else {
            root.style.setProperty('--web-main-margin-right', '169px');
        }
        this.data.set('open', !open);
    }

    handleItemClick(item) {
        const offset = this.data.get('offset');
        const shadowRoot = document.querySelector('co-md')?.shadowRoot;
        // 70 是 header 的最小高度
        const headHeight = shadowRoot?.querySelector('.head-switcher')?.clientHeight || 70;
        window.scrollTo({top: item.dom.getBoundingClientRect().top + window.scrollY - offset - 10 - headHeight});
        const headings = this.data.get('headings');
        this.data.set('headings', headings.map(heading => ({
            ...heading,
            active: heading === item
        })));
    }

}
