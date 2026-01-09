import {Component} from 'san';
import routes from '../../router/routes';
import {router} from '../../utils/proxy-router';


let getComponentList = () => {
    return (routes as Array<{
        name: string;
        key: string;
    }>).filter(route => route.name.startsWith('@cosui/cosmic'));
};

const componentList = getComponentList();

export default class Home extends Component {
    static template = `
        <template>
            <div class="homepage-title">Components</div>
            <div s-for="category in componentList" class="component-category">
                <div class="category-title">{{category.name}}</div>
                <div s-for="group in category.list" class="component-group">
                    <div class="group-title">{{group.groupName}}</div>
                    <div s-for="component in group.leaf" class="group-list-item" on-click="toPreview(component)">
                        <p class="component-item">
                            {{component.name}} {{component.text}}
                            <svg t="1650885692911" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6649" width="16" height="16"><path d="M320 885.333333c-8.533333 0-17.066667-4.266667-23.466667-10.666666-12.8-12.8-10.666667-34.133333 2.133334-44.8L654.933333 512 298.666667 194.133333c-12.8-10.666667-14.933333-32-2.133334-44.8 10.666667-12.8 32-14.933333 44.8-2.133333l384 341.333333c6.4 6.4 10.666667 14.933333 10.666667 23.466667 0 8.533333-4.266667 17.066667-10.666667 23.466667l-384 341.333333c-6.4 6.4-12.8 8.533333-21.333333 8.533333z" p-id="6650"></path></svg>
                        </p>
                    </div>
                </div>
            </div>
        </template>
    `;

    initData() {
        return {
            componentList
        };
    };

    toPreview(route) {
        const path = `/preview${route.key}?name=${route.name}&text=${route.text}`;
        router.locator.redirect(path);
    };

    responsive() {
        if (window.innerWidth >= 600) {
            const desktopUrl = `${location.origin}/`;
            location.href = desktopUrl;
        }
    };

    attached() {
        this.responsive();
        window.addEventListener('resize', this.responsive.bind(this));
    };

    detached() {
        window.removeEventListener('resize', this.responsive.bind(this));
    };
}