import {Component} from 'san';
import './layout.less';
import Card from './card';
import routes from '../../../../router/routes';
import {Link} from '../../../../utils/proxy-router';


export default class Layout extends Component {
    static template = `
        <div class="layout">
            <h2 id="content" class="title">{{routeTitle}}</h2>
            <div class="group" s-for="group in groups">
                <h3 id="content" class="group-title">{{group.groupName}}</h3>
                <div class="card-container">
                    <card
                        s-for="item in group.searchNames"
                        chin="{{item.chin}}"
                        eng="{{item.eng}}"
                        key="{{item.key}}"
                        image="{{item.imageSrc}}"
                    ></card>
                </div>
            </div>
        </div>
    `;

    static components = {
        'card': Card,
        'co-link': Link
    };

    initData() {
        return {
            routes,
            groups: [],
            cosmicRouteKey: '',
            routeTitle: ''
        };
    }

    inited() {
        this.updateGroups();
    }

    updateGroups() {
        const routes = this.data.get('routes');
        const cosmicRouteKey = this.data.get('cosmicRouteKey');
        const routeTitle = routes.find(item => item.key === cosmicRouteKey);
        routeTitle && this.data.set('routeTitle', routeTitle.name);


        const cosmicRouteItem = routes.find(item => item.key === cosmicRouteKey && item.list);
        if (cosmicRouteItem) {
            const groupedAndProcessedResult = cosmicRouteItem.list.reduce((acc, group) => {
                const searchNamesProcessed = group.leaf.map(item => {
                    const eng = item.name;
                    const chin = item.text;
                    const key = item.key;
                    const imageSrc = `./assets${key}.png`;
                    return {chin, eng, key, imageSrc};
                });
                const groupName = group.groupName + ' ' + '(' + group.leaf.length + ')';
                acc.push({groupName: groupName, searchNames: searchNamesProcessed});
                return acc;
            }, []);
            this.data.set('groups', groupedAndProcessedResult);
        }

    }
}