```san export=preview caption=常用样式
import {Component} from 'san';
import CitySelector from '@cosui/cosmic/city-selector';
import Button from '@cosui/cosmic/button';

export default class Demo extends Component {
    static template = `
        <div class="city-selector-demo">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">以下城市数据仅供示例展现使用，不保证数据可靠性</h4>
            <cos-button on-click="handleClick">含国际化</cos-button>
            <cos-city-selector open="{=open=}"
                nativeCities="{{nativeCities}}"
                foreignCities="{{foreignCities}}"
                selectedCities="{=selectedCities=}"
                on-change="handleChange"
                on-close="handleClose"
                on-relocate="handleRelocate">
            </cos-city-selector>

            <cos-button class="cos-space-mt-xs" on-click="handleClick1">不含国际化</cos-button>
            <cos-city-selector
                open="{=open1=}"
                nativeCities="{{nativeCities}}"
                selectedCities="{=selectedCities=}"
                on-change="handleChange"
                on-close="handleClose"
                on-relocate="handleRelocate"
            >
            </cos-city-selector>

            <cos-button class="cos-space-mt-xs" on-click="handleClick2">anchor 使用示例</cos-button>
            <cos-city-selector open="{=open2=}"
                anchor
                nativeCities="{{nativeCities}}"
                foreignCities="{{foreignCities}}"
                selectedCities="{=selectedCities1=}"
                on-change="handleChange"
                on-close="handleClose"
                on-relocate="handleRelocate">
            </cos-city-selector>

        </div>`;

    static components = {
        'cos-city-selector': CitySelector,
        'cos-button': Button
    };

    initData() {
        return {
            open: false,
            open1: false,
            open2: false,
            selectedCities: [
                {
                    city: '北京',
                    pinyin: 'beijing',
                    code: 110100,
                    level: '1'
                }
            ],
            selectedCities1: [
                {
                    city: '北京',
                    pinyin: 'beijing',
                    code: 110100,
                    level: '1'
                }
            ]
        };
    }

    attached() {
        this.getCityList();
    }
    handleClick() {
        this.data.set('open', true);
    }

    handleClick1() {
        this.data.set('open1', true);
    }

    handleClick2() {
        this.data.set('open2', true);
    }

    handleChange(data) {
        console.log('====change', data)
    }

    handleClose() {
        console.log('====close')
    }

    handleRelocate(data) {
        console.log('====relocate', data)
    }

    fetchCityList(url) {
        return fetch(url, {
            method: 'get'
        }).then(async res => [await res.json(), null]).catch(err => [null, err]);
    }

    // 以下数据仅供示例展现使用，不保证数据可靠性，业务不可在线上使用
    getCityList() {
        this.fetchCityList('https://psstatic.cdn.bcebos.com/basics/cosmic/citylist_1734861547000.json')
        .then(([res]) => {
            this.data.set('nativeCities', res);
        });

        this.fetchCityList('https://psstatic.cdn.bcebos.com/basics/cosmic/foreignlist_1734878215000.json')
        .then(([res]) => {
            this.data.set('foreignCities', res);
        });
    }
}
```