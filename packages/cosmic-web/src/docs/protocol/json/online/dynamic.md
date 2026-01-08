``` san export=preview caption=在线填入JSON
import san from 'san';
import UIJSON from '@cosui/cosmic-dynamic-ui';

import Avatar from '@cosui/cosmic/avatar';
import AvatarGroup from '@cosui/cosmic/avatar-group';
import Badge from '@cosui/cosmic/badge';
import Button from '@cosui/cosmic/button';
import Cascader from '@cosui/cosmic/cascader';
import Checkbox from '@cosui/cosmic/checkbox';
import CheckboxGroup from '@cosui/cosmic/checkbox-group';
import Dialog from '@cosui/cosmic/dialog';
import Drawer from '@cosui/cosmic/drawer';
import Fold from '@cosui/cosmic/fold';
import FoldSwitch from '@cosui/cosmic/fold-switch';
import Icon from '@cosui/cosmic/icon';
import Image from '@cosui/cosmic/image';
import Input from '@cosui/cosmic/input';
import Loading from '@cosui/cosmic/loading';
import MoreLink from '@cosui/cosmic/more-link';
import Popover from '@cosui/cosmic/popover';
import Price from '@cosui/cosmic/price';
import Radio from '@cosui/cosmic/radio';
import RadioGroup from '@cosui/cosmic/radio-group';
import Rank from '@cosui/cosmic/rank';
import Score from '@cosui/cosmic/score';
import Select from '@cosui/cosmic/select';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import Switcher from '@cosui/cosmic/switcher';
import Tab from '@cosui/cosmic/tab';
import Table from '@cosui/cosmic/table';
import TabPane from '@cosui/cosmic/tab-pane';
import Tabs from '@cosui/cosmic/tabs';
import Tag from '@cosui/cosmic/tag';
import Textarea from '@cosui/cosmic/textarea';
import Toast from '@cosui/cosmic/toast';
import Tooltip from '@cosui/cosmic/tooltip';

import AudioPlayer from '@cosui/cosmic/audio-player';



const COMPONENTS = {
    'audio-player': AudioPlayer,
    'avatar': Avatar,
    'avatar-group': AvatarGroup,
    'badge': Badge,
    'button': Button,
    'cascader': Cascader,
    'checkbox': Checkbox,
    'checkbox-group': CheckboxGroup,
    'dialog': Dialog,
    'drawer': Drawer,
    'fold': Fold,
    'fold-switch': FoldSwitch,
    'icon': Icon,
    'image': Image,
    'input': Input,
    'loading': Loading,
    'more-link': MoreLink,
    'popover': Popover,
    'price': Price,
    'radio': Radio,
    'radio-group': RadioGroup,
    'rank': Rank,
    'score': Score,
    'select': Select,
    'swiper': Swiper,
    'swiper-item': SwiperItem,
    'switcher': Switcher,
    'tab': Tab,
    'tab-pane': TabPane,
    'table': Table,
    'tabs': Tabs,
    'tag': Tag,
    'textarea': Textarea,
    'toast': Toast,
    'tooltip': Tooltip,

    'image-button':  san.defineComponent({
        components: {
            'ai-image': Image,
        },
        template: `<div class="image">
            <ai-image src="{{src}}"></ai-image>
            <div s-for="item, index in buttonGroup" on-click="onClick(item, index)">
                {{item.text}}
            </div>
        </div>`,
        initData() {
            return {
                src: '',
                buttonGroup: [{text: '查看大图'}],
            }
        },

        onClick(item, index) {
            this.fire('click-' + index, {item, index});
        },
    }),
};

export default class OnlineDoc extends san.Component {

    static template = `
        <div class="demo">
            <p s-if="error" class="cos-color-text-em">{{error}}</p>
            <cos-textarea
                class="cos-space-mb-lg"
                value="{= value =}"
                height="{{400}}"
                max-height="{{400}}"
                clear
            >
                <div class="title-slot" slot="title"> 填写 UI 数据 (JSON)， 可参考代码示例 </div>
            </cos-textarea>
            <cos-button class="cos-space-mb-lg" on-click="clickHandler">提交新数据</cos-button>
            <div class="cos-space-mb-lg cos-text-headline"> 以下为生成效果 </div>

            <div s-ref="content"></div>
        </div>
    `;

    initData() {
        return {
            error: '',
            value: JSON.stringify({
                ui: {
                    type: 'score',
                    props: {
                        class: 'cos-space-mr-xxs',
                        max: 10,
                        value: 4.5,
                        score: true
                    }
                },
                dataExtends: null,
                data: {}
            }, null, 4)
        }
    }

    static components = {
        'cos-button': Button,
        'cos-textarea': Textarea
    };

    attached() {
        this.$content = this.ref('content');
        const App = UIJSON.compile({
            ui,
            components: COMPONENTS,
            actions: {
                'link': ({args}) => {
                    console.log('link', args);
                }
            }
        });
        const app = new App({
            data
        });
        app.attach(this.$content);
    }

    clickHandler() {
        const value = this.data.get('value');
        if (!value) {
            this.data.set('error', '请填入 JOSN 格式数据');
            return;
        }
        let options = {};
        this.data.set('error', '');
        this.$content.innerHTML = '';
        try {
            options = JSON.parse(value);
            const App = UIJSON.compile({
                ui: options.ui,
                dataExtends: options.dataExtends || null,
                events: {},
                components: COMPONENTS,
                onRendered: () => {
                    console.log('event ui render-finished');
                },
                actions: {
                    'link': ({args}) => {
                        console.log('link', args);
                    }
                }
            });
            const app = new App({
                data: options.data || {}
            });
            app.attach(this.$content);
        }
        catch (e) {
            this.data.set('error', '填写标准 JSON 数据，数据异常: \n' + e.toString());
        }
    }
}


export const ui = {
    type: 'block',
    children: [
        {
            type: 'block',
            props: {
                class: 'cos-row cos-row-col-12 cos-space-mb-lg',
            },
            children: [
                {
                    type: 'block',
                    props: {
                        class: 'cos-col-3 cos-space-mr-sm',
                    },
                    children: [{
                        type: 'image',
                        props: {
                            class: 'cos-image-3-2 cos-image-fit-cover cos-image-hover',
                            src: 'https://gips1.baidu.com/it/u=2479417158,2594490198&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f186_248',
                        }
                    }]
                },
                {
                    type: 'block',
                    props: {
                        class: 'cos-col-9',
                    },
                    children: [
                        {
                            type: 'title',
                            props: {
                                class: 'cos-color-text',
                            },
                            children: [
                                {
                                    type: 'text',
                                    props: {
                                        // XXX
                                        value: '{{title}}'
                                    }
                                }
                            ],
                        },
                        {
                            type: 'block',
                            props: {
                                class: 'cos-flex cos-space-mt-3xs',
                            },
                            children: [
                                {
                                    type: 'score',
                                    props: {
                                        class: 'cos-space-mr-xxs',
                                        max: 10,
                                        value: 4.5,
                                        score: true,
                                    }
                                },
                                {
                                    type: 'block',
                                    props: {
                                        class: 'cos-font-regular cos-color-text-minor cos-space-mr-xxs',
                                    },
                                    children: [
                                        {
                                            type: 'text',
                                            props: {
                                                value: '140条评论'
                                            }
                                        }
                                    ],
                                }
                            ],
                        },
                        {
                            type: 'block',
                            props: {
                                class: 'cos-font-regular',
                            },
                            children: [
                                {
                                    type: 'text',
                                    props: {
                                        value: 'xx市xx区xx路xx号'
                                    }
                                }
                            ],
                        },
                        {
                            type: 'block',
                            props: {
                                class: 'cos-space-mt-3xs',
                            },
                            children: [
                                {
                                    type: 'tag',
                                    props: {
                                        class: 'cos-color-border cos-color-text-minor',
                                        appearance: 'rounded',
                                    },
                                    children: [
                                        {
                                            type: 'text',
                                            props: {
                                                title: 1,
                                                value: '风景如画'
                                            }
                                        },
                                        {
                                            type: 'text',
                                            props: {
                                                value: '山清水秀 {{title ? "1": "2"}}'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

export const data = {
    title: '插 -XXX- 值',
    num: 3
};
```
