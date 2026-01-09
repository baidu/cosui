import sanRouter, {Router, createLink, RedirectOptions} from 'san-router';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || '/cosui';

const handleLink = (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    if (!link) return;

    let href = link.getAttribute('href');
    if (!href) return;

    // ---------- 排除外链 ----------
    if (
        href.startsWith('http') ||
        href.startsWith('//')
    ) {
        return;
    }

    // ---------- 已加前缀 ----------
    if (href.startsWith(BASE_URL)) {
        return;
    }

    // ---------- 处理 # ----------
    if (href.startsWith('#')) {
        link.setAttribute('href', BASE_URL + href);
        return;
    }

    // ---------- 处理根路径 / ----------
    if (href === '/') {
        link.setAttribute('href', BASE_URL);
        return;
    }

    // ---------- 普通站内 ----------
    if (href.startsWith('/')) {
        link.setAttribute('href', BASE_URL + href);
    }
};

function proxyRouter() {
    document.addEventListener(
        'click',
        handleLink,
        true // 捕获阶段
    );

    function getLocation() {
        let path = location.pathname;

        if (BASE_URL && path.startsWith(BASE_URL)) {
            path = path.slice(BASE_URL.length) || '';
        }
        return path + location.search;
    }

    const Origin = sanRouter.HTML5Locator;
    const originRedirect = sanRouter.HTML5Locator.prototype.redirect;

    class PatchedHTML5Locator extends Origin {
        constructor() {
            super();
            this.current = getLocation();

            this.popstateHandler = () => {
                this.referrer = this.current;
                this.current = getLocation();

                this.fire('redirect', {
                    url: this.current,
                    referrer: this.referrer
                });
            };
        }
    }

    PatchedHTML5Locator.prototype.redirect = function (url: string, options: RedirectOptions) {
        if (typeof url === 'string') {

            // 外链不处理
            if (
                !url.startsWith('http') &&
                !url.startsWith('//') &&
                !url.startsWith(BASE_URL)
            ) {
                if (url.startsWith('/')) {
                    url = BASE_URL + url;
                }
            }
        }

        // 调回原逻辑
        return originRedirect.call(this, url, options);
    };

    // 保留静态属性
    (PatchedHTML5Locator as any).isSupport = Origin.isSupport;

    // 覆盖构造器
    sanRouter.HTML5Locator = PatchedHTML5Locator as any;

    Router.prototype.setMode = function (mode: string) {
        mode = mode.toLowerCase();
        if (this.mode === mode) {
            return this;
        }

        this.mode = mode;

        let restart = false;
        if (this.isStarted) {
            this.stop();
            restart = true;
        }

        switch (mode) {
            case 'hash':
                this.locator = new sanRouter.HashLocator();
                break;

            case 'html5':
                this.locator = new PatchedHTML5Locator();
                break;
        }

        if (restart) {
            this.start();
        }

        return this;
    };

    const originListen = Router.prototype.listen;

    Router.prototype.listen = function (listener) {
        const wrapped = function (e) {
            if (e && typeof e.path === 'string') {

                if (e.path.startsWith(BASE_URL)) {
                    e = {
                        ...e,
                        path: e.path.slice(BASE_URL.length) || ''
                    };
                }
            }

            return listener.call(this, e);
        };

        return originListen.call(this, wrapped);
    };
}

BASE_URL && proxyRouter();

const router = new Router({mode: 'html5'});
const Link = createLink(router);

export {router, Link};