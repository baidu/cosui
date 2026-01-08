``` san export=preview caption=大图带按钮
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
    'button': Button,
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

export default class ImageDoc extends san.Component {

    static template = `
        <div class="demo">
            <div s-ref="content"></div>
        </div>
    `;

    attached() {
        this.$content = this.ref('content');
        const App = UIJSON.compile({
            ui,
            components: COMPONENTS,
            actions: {
                'link': (args) => {
                    console.log('action link', args);
                }
            }
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
                'class': 'cos-row cos-row-col-12'
            },
            children: [
                {
                    type: 'block',
                    props: {
                        'class': 'cos-col-6 cos-space-mr-sm'
                    },
                    children: [
                        {
                            type: 'image',
                            props: {
                                'class': 'cos-image-3-2 cos-image-fit-cover',
                                'src': 'https://gips1.baidu.com/it/u=2479417158,2594490198&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f186_248'
                            },
                            children: [
                                {
                                    type: 'block',
                                    props: {
                                        class: 'cos-row cos-row-col-12 cos-justify-end cos-items-end',
                                        style: {
                                            height: '100%'
                                        }
                                    },
                                    children: [
                                        {
                                            type: 'button',
                                            props: {
                                                class: 'cos-col-3 cos-space-mr-xs  cos-space-mb-xs',
                                                appearance: 'secondary',
                                                size: 'sm'
                                            },
                                            children: [
                                                {
                                                    type: 'text',
                                                    props: {
                                                        value: '查看'
                                                    }
                                                }
                                            ],
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
                                            type: 'button',
                                            props: {
                                                class: 'cos-col-3 cos-space-mr-xs cos-space-mb-xs',
                                                appearance: 'secondary',
                                                size: 'sm'
                                            },
                                            children: [
                                                {
                                                    type: 'text',
                                                    props: {
                                                        value: '下载'
                                                    }
                                                }
                                            ],
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
