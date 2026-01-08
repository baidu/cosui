import {Component} from 'san';
import {router} from 'san-router';
import styles from '../../mobile.less?inline';

// eslint-disable-next-line max-len
const components = import.meta.glob('../../../../(cosmic|cosmic-card|cosmic-dqa|cosmic-shop)/**/doc/preview.ts');
const protocols = import.meta.glob('../../docs/protocol/**/preview.ts');
const uis = import.meta.glob('../../docs/agent-ui/**/preview.ts');


const getComponents = (query: any) => {
    const {type, packages, component, ui} = query;

    if (type === 'components') {
        const prefix = `../../../../${packages}/src/${component}/doc`;
        const alias = `${prefix}/preview.ts`;
        return components[alias] ? components[alias]() : Promise.reject('load component fail');
    }
    else if (type === 'protocol' || type === 'agent-ui') {
        const prefix = `../../docs/${type}/${packages}`;
        let alias = null;
        if (component === 'index') {
            alias = `${prefix}/preview.ts`;
        }
        else if (['components', 'api', 'case'].includes(component) && ui) {
            alias = `${prefix}/${component}${
                component === 'components' ? '/docs' : ''}/${ui}/preview.ts`;
        }
        else {
            alias = `${prefix}/${component}/preview.ts`;
        }

        return type === 'protocol'
            ? (protocols[alias] ? protocols[alias]() : Promise.reject('load component fail'))
            : (uis[alias] ? uis[alias]() : Promise.reject('load component fail'));
    }
    return;
};

const mutationCallback = (mutationList: MutationRecord[]) => {
    mutationList.forEach(mutation => {
        (mutation.addedNodes || []).forEach((node: Element) => {
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
            if (node.getAttribute('id') === 'sprite-plyr') {
                pushModuleStyle(node);
            }
            if (node.nodeName === 'LINK' && node?.getAttribute('href')?.includes('/plyr')) {
                pushModuleStyle(node);
            }
            if (node.tagName === '' || node.nodeName === 'STYLE' || node.nodeName === 'LINK') {
                if (node.hasAttribute('data-scp')
                    || node.textContent?.indexOf('.agent-ui') !== -1
                    || node.textContent?.indexOf('.plyr') !== -1
                ) {
                    pushModuleStyle(node);
                }
            }
        });
    });
};

const bodyOb = new MutationObserver(mutationCallback);
const headOb = new MutationObserver(mutationCallback);

export default class Main extends Component {
    static template = `
        <div class="mobile-preview" data-platform="mobile">
            <div id="mobile-style" style="display: none;">{{styles}}</div>
            <div s-if="route.query.name || route.query.text" class="preview-head">
                <svg on-click="toHome" t="1650885692911" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6649" width="18" height="18"><path d="M320 885.333333c-8.533333 0-17.066667-4.266667-23.466667-10.666666-12.8-12.8-10.666667-34.133333 2.133334-44.8L654.933333 512 298.666667 194.133333c-12.8-10.666667-14.933333-32-2.133334-44.8 10.666667-12.8 32-14.933333 44.8-2.133333l384 341.333333c6.4 6.4 10.666667 14.933333 10.666667 23.466667 0 8.533333-4.266667 17.066667-10.666667 23.466667l-384 341.333333c-6.4 6.4-12.8 8.533333-21.333333 8.533333z" p-id="6650"></path></svg>
                <span>{{route.query.name}} {{route.query.text}}</span>
            </div>
            <div id="content"></div>
        </div>
    `;

    initData() {
        return {
            styles
        };
    };

    update(query) {
        getComponents(query).then(({default: Doc}) => {
            const content = document.getElementById('content') as HTMLElement;
            // bca-disable-next-line
            content.innerHTML = '';
            const doc = new Doc();
            doc.attach(content);
        });
    };

    toHome() {
        router.locator.redirect('/');
    };

    responsive() {
        if (window.innerWidth >= 600) {
            // eslint-disable-next-line
            const desktopUrl = `${location.origin}/${location.hash.replace(/#\/preview\/([^\?]+)\??.*/, '$1').toLowerCase()}`;
            location.href = desktopUrl;
        }
    };

    detached() {
        window.removeEventListener('resize', this.responsive.bind(this));
    }

    attached() {
        const query = this.data.get('route').query;
        this.update(query);
        this.responsive();
        window.addEventListener('resize', this.responsive.bind(this));

        bodyOb.observe(document.body, {childList: true, attributes: false});
        headOb.observe(document.head, {childList: true, attributes: false});
    }
}
