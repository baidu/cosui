```san export=preview caption=film-card-基本使用
import {Component} from 'san';
import FilmCard from '@cosui/cosmic-dqa/film-card';

export default class FilmCardDefaultDemo extends Component {
    static template = `
        <div class="film-card-default-demo">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">免费播放</h4>
            <div class="cos-space-mb-xxl" style="max-width: 380px;">
                <cosd-film-card s-bind="{{list[0]}}" on-button-click="onBtnClick" />
            </div>

            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">会员播放</h4>
            <div style="max-width: 380px;">
                <cosd-film-card s-bind="{{list[1]}}" on-button-click="onBtnClick" />
            </div>
        </div>
    `;

    static components = {
        'cosd-film-card': FilmCard
    };

    initData() {
        return {
            list: [
                {
                    title: '龙猫',
                    thumbnail: 'https://gips0.baidu.com/it/u=2479417158,2594490198&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f186_248',
                    score: {source: '豆瓣', value: '9.2分'},
                    credit: [
                        {label: '导演', value: '宫崎骏'},
                        {label: '主演', value: '日高法子、坂本千夏、糸井重里'}
                    ],
                    year: '1988年',
                    categories: ['动画', '奇幻'],
                    duration: '86分钟',
                    source: '爱奇艺',
                    action: {
                        text: '播放',
                        linkInfo: {}
                    },
                    linkInfo: {}
                },
                {
                    title: '心动的信号 第七季',
                    thumbnail: 'https://gips0.baidu.com/it/u=2479417158,2594490198&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f186_248',
                    score: {source: '豆瓣', value: '7.5分'},
                    credit: [
                        {label: '主演', value: '杨紫、张雨绮、沈腾、贾玲'}
                    ],
                    year: '2025年',
                    categories: ['综艺', '情感'],
                    duration: '全24集',
                    source: '爱奇艺',
                    action: {
                        text: 'VIP',
                        linkInfo: {}
                    },
                    linkInfo: {}
                }
            ]
        };
    }

    onBtnClick() {
        console.log('[film-card] trigger button-click event');
    }
}
```
