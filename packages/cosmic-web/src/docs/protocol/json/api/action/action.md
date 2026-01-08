``` san export=preview caption=行为处理
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

export default class ActionDoc extends san.Component {

    static template = `
        <div class="demo">
            <p class="cos-space-mb-lg">事件响应</p>
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
            components: COMPONENTS,
            actions: {
                // 自定义事件处理
                'link': (args) => {
                    console.log('action link', args);
                },
                'sendPrompt': (args) => {
                    console.log('action sendPrompt', args);
                }
            }
        });
        const app = new App({
            data
        });
        app.attach(this.$content);
    }
}

export const data = {
    value: '<em style="color: red;">140条评论</ em>',
    title: '插 -XXX- 值',
    num: 3,
    score: 5,
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
                            events: {
                                click: [
                                    {
                                        action: 'sendPrompt',
                                        option: {
                                            value: '{{value}}'
                                        }
                                    }
                                ]
                            }
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
            type: 'score',
            for: 'item, index in [{a:2}, {a:3}, {a:4}]',
            props: {
                class: 'cos-space-mr-xxs',
                max: 10,
                controlled: true,
                value: '{{score}}',
                score: true,
            },
            events: {
                change: [
                    {
                        action: 'link',
                        option: {
                            // UI event, 预期结果：点击选中的 选中 事件参数值
                            event: '{{$event}}',
                            itemA: '{{item.a}}',
                            numData: '{{$data.num}}',

                            // UI scope, 预期结果： 点击选中的 index 值
                            index: 'score index: {{index}}',

                            // UI props data, 预期结果：点击选中的 item 值
                            url: '{{item}}',

                            // UI props, 预期结果：点击选中的 props.controlled 值 undefined
                            controlled: 'score controlled value: {{controlled}}',
                            value: 'score value: {{value}}',

                            // UI props data, 预期结果：默认的 props.score 值
                            // 同名时 props > data, 因此最好不同名
                            score: 'score value: {{score}}',

                            // UI event data, 预期结果：点击选中的 选中 value 值
                            newScore: 'score value: {{$event.value}}',

                            // UI $data data, 预期结果：$data.num 值
                            num: 'score value: {{$data.num}}',

                            start: '{{index}}: start index',
                            center: 'center index: {{index}} center',
                            end: 'end index: {{index}}',

                            // UI 常量
                            constant: 'constant'
                        }
                    }
                ]
            }
        }
    ]
};
```
