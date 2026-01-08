```san export=preview caption=标记点样式
import {Component} from 'san';
import Map from '@cosui/cosmic/map';
import Input from '@cosui/cosmic/input';

export default class MapMarkerDemo extends Component {
     static template = `
        <div s-if="isPc" data-testid="marker">
            <div style="margin: 10px var(--cos-space-none);">
                <div style="margin: 10px var(--cos-space-none);">输入百度地图apiKey:</div>
                <cos-input on-change="handleChange"/>
            </div>
            <div style="margin: 10px var(--cos-space-none);">
                地图组件预览依赖地图apiKey，输入正确apiKey后展示实际效果
            </div>
            <div style="width: 100%; height: 300px;">
                <cosd-map
                    s-if="{{apiKey}}"
                    apiKey="{{apiKey}}"
                    marker="{{marker}}"
                />
                <img s-else src="https://gips1.baidu.com/it/u=4095002862,527297986&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f514_304" />
            </div>
        </div>
        <div s-else>
            由于预览环境限制，仅展示单端地图
        </div>
    `;

    static components = {
        'cosd-map': Map,
        'cos-input': Input
    };

    initData() {
        return {
            marker: [{
                lat: '40.055728',
                lng: '116.308681',
                icon: 'https://gips1.baidu.com/it/u=1257137061,2585202258&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f164_202',
                label: {
                    text: '百度大厦',
                }
            }, {
                lat: '40.055201',
                lng: '116.26636',
                icon: 'https://gips1.baidu.com/it/u=1257137061,2585202258&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f164_202',
                label: {
                    text: '西北旺',
                }
            }, {
                lat: '40.026796',
                lng: '116.486003',
                icon: 'https://gips1.baidu.com/it/u=1257137061,2585202258&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f164_202',
                label: {
                    text: '望京站',
                }
            }, {
                lat: '39.967516',
                lng: '116.364664',
                icon: 'https://gips1.baidu.com/it/u=1257137061,2585202258&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f164_202',
                label: {
                    text: '北邮',
                }
            }],
            apiKey: '',
        };
    }

    handleMapReady() {
        console.log('地图加载完成');
    }

    handleFullScreenBtnClick(event) {
        alert('执行调起', event);
    }

    handleChange(value) {
        this.data.set('apiKey', value.value);
    }
}
```