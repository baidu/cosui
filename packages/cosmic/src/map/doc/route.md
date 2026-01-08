```san export=preview caption=路线样式
import {Component} from 'san';
import Map from '@cosui/cosmic/map';
import Input from '@cosui/cosmic/input';

export default class MapRouteDemo extends Component {
     static template = `
        <div s-if="isPc">
            <div>
                <div style="margin: 10px var(--cos-space-none);">请输入百度地图apiKey:</div>
                <cos-input on-change="handleChange"/>
            </div>
            <div style="margin: 10px var(--cos-space-none);">
                地图组件预览依赖地图apiKey，输入正确apiKey后展示实际效果
            </div>
            <div style="width: 100%; height: 300px;" data-testid="route">
                <div style="margin: 10px var(--cos-space-none);">驾车路线</div>
                <cos-map
                    s-if="{{isPc && apiKey}}"
                    route="{{route}}"
                    apiKey="{{apiKey}}"
                    on-map-ready="handleMapReady"
                    on-map-click="handleMapClick"
                    on-fullscreen="handleFullScreen"
                    on-zoom-in="handleZoomIn"
                    on-zoom-out="handleZoomOut"
                />
                <img s-else src="https://gips1.baidu.com/it/u=2086505124,1054302150&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f512_302" />
            </div>
            <div style="width: 100%; height: 300px; margin-top: 40px;">
                <div style="margin: 10px var(--cos-space-none);">公共交通路线</div>
                <cos-map
                    s-if="{{isPc && apiKey}}"
                    route="{{routeTransit}}"
                    apiKey="{{apiKey}}"
                />
                <img s-else src="https://gips3.baidu.com/it/u=1198905505,4186360545&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f512_302" />
            </div>
            <div style="width: 100%; height: 300px; margin-top: 40px;">
                <div style="margin: 10px var(--cos-space-none);">步行路线</div>
                <cos-map
                    s-if="{{isPc && apiKey}}"
                    route="{{routeWalking}}"
                    apiKey="{{apiKey}}"
                />
                <img s-else src="https://gips1.baidu.com/it/u=721216040,555377640&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f512_300" />
            </div>
            <div style="width: 100%; height: 300px; margin-top: 40px;">
                <div style="margin: 10px var(--cos-space-none);">骑行路线</div>
                <cos-map
                    s-if="{{isPc && apiKey}}"
                    route="{{routeRiding}}"
                    apiKey="{{apiKey}}"
                />
                <img s-else src="https://gips1.baidu.com/it/u=3686761005,8293812&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f516_296" />
            </div>
        </div>
        <div s-else>
            由于预览环境限制，仅展示单端地图
        </div>
    `;

    static components = {
        'cos-map': Map,
        'cos-input': Input
    };

    initData() {
        return {
            route: [{
                points: [
                    [116.308681, 40.055728], // 起点A: 百度大厦
                    [116.26636, 40.055201], // 途经B: 西北旺
                    [116.486003, 40.026796], // 途经C: 望京站
                    [116.364664, 39.967516] // 终点B: 北邮
                ],
                travelType: 'driving', // 交通方式,
            }],
            routeTransit: [{
                points: [
                    [116.308681, 40.055728],
                    [116.364664, 39.967516]
                ],
                travelType: 'transit',
            }],
            routeWalking: [{
                points: [
                    [116.308681, 40.055728],
                    [116.364664, 39.967516]
                ],
                travelType: 'walking',
            }],
            routeRiding: [{
                points: [
                    [116.308681, 40.055728],
                    [116.364664, 39.967516]
                ],
                travelType: 'riding',
            }],
            apiKey: '',
        };
    }

    handleMapReady() {
        console.log('[map] trigger map-ready event');
    }

    handleMapClick(event) {
        console.log('[map] trigger map-click event');
    }

    handleFullScreen(event) {
        console.log('[map] trigger fullscreen event');
    }

    handleZoomIn() {
        console.log('[map] trigger zoom-in event');
    }

    handleZoomOut() {
        console.log('[map] trigger zoom-out event');
    }

    handleChange(value) {
        this.data.set('apiKey', value.value);
    }
}
```