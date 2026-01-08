export class MarkdownTabs extends HTMLElement {
    activeKey: string;

    /**
     * @description 构造函数，初始化组件。
     * 根据给定的ShadowRoot（可选）创建一个新的Tabs实例。
     * 遍历所有的md-tab-pane元素，获取其key属性值，并将符合条件的key添加到keys数组中。
     * 创建一个md-tab-list元素，并将所有的md-tab元素插入其中。
     * 如果存在selected属性，则设置为当前激活的key。
     *
     * @param {ShadowRoot} [root] - 可选参数，指定ShadowRoot，默认值为undefined。
     *
     * @returns {void} 无返回值。
     */
    constructor(private readonly root?: ShadowRoot) {
        super();
        const panes = this.querySelectorAll('md-tab-pane');
        const tabsWrapper = document.createElement('md-tab-list');
        let keys: string[] = [];
        panes.forEach(pane => {
            const key = pane.getAttribute('key');
            if (key) {
                keys.push(key);
            }
        });
        keys.forEach(key => {
            const tab = document.createElement('md-tab');
            // bca-disable-line
            tab.innerHTML = '<div>' + key + '</div>';
            tab.setAttribute('key', key);
            tab.addEventListener('click', () => {
                this.setKey(key);
                this.dispatchEvent(new CustomEvent('md-tabs-change', {
                    detail: key,
                    bubbles: true,
                    composed: true
                }));
            });
            tabsWrapper.appendChild(tab);
        });
        const mdRoot = document.getElementById('mdRoot');
        // 增加事件监听switcher的切换
        mdRoot?.addEventListener('business-change', e => {
            const params = (e as CustomEvent).detail;
            this.setTabPane(params.business, params.attr);
            this.dispatchEvent(new CustomEvent('md-tabs-change', {
                detail: params,
                bubbles: true,
                composed: true
            }));
        });

        this.setTabPane('cosmic', 'cos');
        this.prepend(tabsWrapper);
    }

    /**
     * 设置键值。移除当前活动的 md-tab 和 md-tab-pane，并添加新的 md-tab 和 md-tab-pane。
     *
     * @param key 要设置的键值字符串
     */
    setKey(key: string) {
        this.querySelector('md-tab.co-active')?.classList.remove('co-active');
        this.querySelector('md-tab-pane.co-active')?.classList.remove('co-active');
        this.activeKey = key;
        this.querySelector(`md-tab[key="${key}"]`)?.classList.add('co-active');
        this.querySelector(`md-tab-pane[key="${key}"]`)?.classList.add('co-active');
    }

    /**
     * 设置激活的tabPane
     *
     * @param business 业务名称
     * @param prefix 前缀
     */
    setTabPane(business: string, prefix: string) {
        this.querySelector('md-tab-pane.co-active')?.classList.remove('co-active');
        const tabPanes = this.querySelectorAll(`md-tab-pane[prefix="${prefix}"]`);
        tabPanes.forEach(pane => {
            const businessName = pane.getAttribute('business') || '';
            if (businessName === business) {
                pane.classList.add('co-active');
                if (!pane?.querySelector('.md-rule')) {
                    const ruleDom = document.createElement('div');
                    ruleDom.innerHTML = `
                    <p class="cos-space-mb-3xl md-rule" style="position: absolute;right: 30px;">
                        <a target="_blank"
                            href="../practices/design-token/practices">
                            Design Token 最佳实践</a>
                    </p>`;
                    pane && pane.insertBefore(ruleDom, pane.firstChild);
                }
            }
        });
    }

    /**
     * 判断是否为搜索网页
     *
     * @returns {boolean} true 表示是搜索网页，false 表示不是搜索网页
     */
    isCosmic() {
        if (location.href.includes('design-token/cosmic')) {
            return true;
        }
        return false;
    }
}
customElements.define('md-tabs', MarkdownTabs);
