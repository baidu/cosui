```san export=preview caption=行政区域样式
import {Component} from 'san';
import Map from '@cosui/cosmic/map';
import Input from '@cosui/cosmic/input';

export default class MapDistrictDemo extends Component {
     static template = `
        <div s-if="isPc">
            <div>
                <div style="margin: 10px var(--cos-space-none);">输入百度地图apiKey:</div>
                <cos-input on-change="handleChange"/>
            </div>
            <div style="margin: 10px var(--cos-space-none);">
                地图组件预览依赖地图apiKey，输入正确apiKey后展示实际效果
            </div>
            <div style="width: 100%; height: 300px;" data-testid="district">
                <div style="margin: 10px var(--cos-space-none);">二级和高光区域</div>
                <cosd-map
                    s-if="{{apiKey}}"
                    apiKey="{{apiKey}}"
                    district="{{district}}"
                />
                <img s-else src="https://gips0.baidu.com/it/u=1325925190,952363812&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f512_300" />
            </div>
            <div style="width: 100%; height: 300px; margin-top: 40px;">
                <div style="margin: 10px var(--cos-space-none);">仅存在高光区域</div>
                <cosd-map
                    s-if="{{apiKey}}"
                    apiKey="{{apiKey}}"
                    district="{{districtOnlyHighlight}}"
                />
                <img s-else src="https://gips3.baidu.com/it/u=39755312,2197217568&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f514_292" />
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
            district: [{
                lat: '22.542831',
                lng: '114.057888',
                level: 4,
                code: 440300,
                name: "深圳市",
                districts: [
                    {lat: '22.748802', lng: '113.936002', level: 5, code: 440311, name: '光明区'},
                    {lat: '22.719665', lng: '114.247984', level: 5, code: 440307, name: '龙岗区'},
                    {lat: '22.709069', lng: '114.350738', level: 5, code: 440310, name: '坪山区'},
                    {lat: '22.557101', lng: '114.236916', level: 5, code: 440308, name: '盐田区'},
                    {lat: '22.532791', lng: '113.930482', level: 5, code: 440305, name: '南山区'},
                    {lat: '22.696921', lng: '114.044591', level: 5, code: 440309, name: '龙华区'},
                    {lat: '22.553668', lng: '113.883518', level: 5, code: 440306, name: '宝安区'},
                    {lat: '22.522835', lng: '114.054944', level: 5, code: 440304, name: '福田区'},
                    {lat: '22.548216', lng: '114.131142', level: 5, code: 440303, name: '罗湖区'}   
                ],
                highLight: [
                    {lat: '22.532791', lng: '113.930482', level: 5, code: 440305, name: '南山区'},
                ]
            }],
            districtOnlyHighlight: [{
                lat: '22.542831',
                lng: '114.057888',
                level: 4,
                code: 440300,
                name: "深圳市",
                highLight: [
                    {lat: '22.532791', lng: '113.930482', level: 5, code: 440305, name: '南山区'},
                    {lat: '22.522835', lng: '114.054944', level: 5, code: 440304, name: '福田区'},
                ]
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