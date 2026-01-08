``` san export=preview caption=多图
import san from 'san';
import UIJSON from '@cosui/cosmic-dynamic-ui';

import Button from '@cosui/cosmic/button';
import Image from '@cosui/cosmic/image';

const COMPONENTS = {
    'image': Image,
    'button': Button,
    'markdown': san.defineComponent({
        template: '<div class="markdown">{{value}}</div>',
        attached() {
            this.nextTick(() => {
                this.fire('render-finished');
            });
        },
    })
};

export default class MutilImageDoc extends san.Component {

    static template = `
        <div class="demo">
            <div s-ref="content"></div>
        </div>
    `;

    attached() {
        this.$content = this.ref('content');
        const App = UIJSON.compile({
            ui,
            // 自定义组件
            components: COMPONENTS,
            actions: {
                // 自定义事件处理
                'link': ({args}) => {
                    console.log('link', args);
                }
            }
        });
        const app = new App();
        app.attach(this.$content);
    }
}

export const ui = {
    type: 'block',
    props: {
        class: 'cos-row cos-row-col-12 cos-gutter',
        style: {
            '--cos-grid-gutter': '16px;'
        }
    },
    children: [
        {
            type: 'image',
            props: {
                style: {
                    'border-width': '0px'
                },
                class: 'cos-col-4',
                src: 'https://gips1.baidu.com/it/u=2479417158,2594490198&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f186_248',
                alt: 'XXX'
            }
        },
        {
            type: 'image',
            props: {
                style: {
                    'border-width': '0px'
                },
                class: 'cos-col-4 cos-image-hover',
                src: 'https://gips1.baidu.com/it/u=2479417158,2594490198&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f186_248',
                alt: 'XXX'
            }
        }
    ]
};
