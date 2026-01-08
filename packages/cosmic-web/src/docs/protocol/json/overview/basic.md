``` san export=preview caption=UI编译
import san from 'san';
import UIJSON from '@cosui/cosmic-dynamic-ui';

import Image from '@cosui/cosmic/image';
import ImageGroup from '@cosui/cosmic-card/image-group';
import Score from '@cosui/cosmic/score';
import Title from '@cosui/cosmic-card/title';
import Tag from '@cosui/cosmic/tag';
import Button from '@cosui/cosmic/button';

const COMPONENTS = {
    'image': Image,
    'image-group': ImageGroup,
    'score': Score,
    'title': Title,
    'tag': Tag,
    'markdown': san.defineComponent({
        template: '<div class="markdown">{{value | raw}}</div>',
        attached() {
            this.fire('render-finished', {a:1});
        }
    })
};

export default class OverviewDoc extends san.Component {

    static template = `
        <div class="demo">
            <cos-button class="cos-space-mb-lg" on-click="clickHandler">点击分段渲染</cos-button>
            <div s-ref="content"></div>
        </div>
    `;

    static components = {
        'cos-button': Button
    };

    attached() {
        this.$content = this.ref('content');
        const App = UIJSON.compile({
            ui: ui1,
            onRendered: () => {
                console.log('event ui1 render-finished');
            },

            // 自定义组件
            components: COMPONENTS,
            actions: {
                // 自定义事件处理
                'link': (args) => {
                    console.log('action link', args);
                }
            }
        });
        const app = new App({data});
        app.attach(this.$content);
    }

    clickHandler() {
        const App = UIJSON.compile({
            ui: ui2,
            components: COMPONENTS,
            onRendered: () => {
                console.log('event ui2 render-finished');
                this.renderNext();
            },
            events: {
                markdown: {
                    'render-finished': (e) => {
                        console.log('event ui2 markdown render-finished', e);
                    }
                }
            }
        });
        const app = new App();
        app.attach(this.$content);
    }

    renderNext() {
        const App = UIJSON.compile({
            ui: ui3,
            components: COMPONENTS,
            onRendered: () => {
                console.log('event ui3 render-finished');
            }
        });
        const app = new App();
        app.attach(this.$content);
    }
}

export const data = {
    value: '<em style="color: red;">140条评论</ em>',
    title: '插 -XXX- 值',
    num: 3,
    list: [
        {
            src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'
        },
        {
            src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'
        },
        {
            src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'
        },
        {
            src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'
        },
        {
            src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'
        }
    ]
};

export const ui1 = {
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
                                                value: '{{value | raw}}'
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
        },
        {
            type: 'image-group',
            props: {
                maxRow: 2,
                list: '{{list}}'
            },
            events: {
                click: [
                    {
                        action: 'link',
                        option: {
                            url: '{{list[0].src}}'
                        }
                    }
                ]
            }
        },
        {
            if: 'num < 1',
            type: 'text',
            props: {
                value: 'num < 1'
            }
        },
        {
            if: '{{num > 1}}',
            type: 'text',
            props: {
                value: 'num > 1111'
            }
        }
    ]
};

export const ui2 = {
    'text': '',
    'showType': '',
    'antiFlag': 0,
    'isFinished': false,
    'component': 'markdown',
    'group': 1,
    'data': {
        'value': '布偶猫是一种毛色柔软、体态优雅的大型家猫。<span style="color: red;" data-safe-html class="chat-answer-typing-loading">这是一个标签</span>',
        'theme': {
            'reference': {
                'position': 'center'
            },
            'sample': 'normal'
        },
        'type': 'sfm',
        'typingSwitch': true
    }
};

export const ui3 = {
    'text': '',
    'showType': '',
    'antiFlag': 0,
    'isFinished': false,
    'component': 'markdown',
    'group': 1,
    'data': {
        'value': '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为**玳瑁白色猫**。这种颜色组合是由基因决定的，通常只出现在母猫身上用类似语言描述橘猫',
        'theme': {
            'reference': {
                'position': 'center'
            },
            'sample': 'normal'
        },
        'type': 'sfm',
        'typingSwitch': false
    }
}
```
