``` san export=preview caption=景点推荐
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
        template: '<div class="markdown">{{value}}</div>',
        attached() {
            this.nextTick(() => {
                this.fire('render-finished');
            });
        },
    })
};

export default class ImageTextDoc extends san.Component {

    static template = `
        <div class="demo">
            <div s-ref="content"></div>
        </div>
    `;

    static components = {
        'cos-button': Button
    };

    attached() {
        this.$content = this.ref('content');
        const App = UIJSON.compile({
            ui,
            components: COMPONENTS
        });
        const app = new App();
        app.attach(this.$content);
    }
}

export const ui = {
    type: 'block',
    children: [
        {
            type: 'block',
            props: {
                class: 'cos-row cos-row-col-12',
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
                                        value: 'XXX'
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
                                        class: 'cos-color-border cos-color-bg-primary cos-space-mr-xxs',
                                        appearance: 'filled',
                                    },
                                    children: [
                                        {
                                            type: 'text',
                                            props: {
                                                value: '山清水秀'
                                            }
                                        }
                                    ]
                                },
                                {
                                    type: 'tag',
                                    props: {
                                        class: 'cos-color-text-on-primary-light cos-color-bg-primary-light',
                                        appearance: 'filled',
                                    },
                                    children: [
                                        {
                                            type: 'text',
                                            props: {
                                                value: '山清水秀'
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
