``` san export=preview caption=异步节点
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
        template: '<div>markdown {{value | raw}}</div>',
        rendering: true,
        attached() {
            console.log('markdown rendering');
            setTimeout(() => {
                this.rendering = false;
                console.log('markdown render-finished');
                this.fire('render-finished', {a:1});
            }, 1000)
        }
    }),
    'echarts': san.defineComponent({
        template: '<div>echarts {{value | raw}}</div>',
        rendering: true,
        attached() {
            console.log('echarts rendering');
            setTimeout(() => {
                this.rendering = false;
                console.log('echarts render-finished');
                this.fire('render-finished', {a:1});
            }, 5000)
        }
    })
};

export default class AsyncDoc extends san.Component {

    static template = `
        <div class="demo">
            <cos-button class="cos-space-mb-lg" on-click="updateData">点击追加异步节点数据(分块渲染前有效)</cos-button>
            <cos-button class="cos-space-mb-lg" on-click="addBlock">点击分块渲染异步节点</cos-button>
            <div s-ref="content"></div>
        </div>
    `;

    static components = {
        'cos-button': Button
    };

    attached() {
        this.count = 0;

        this.$content = this.ref('content');
        const App = UIJSON.compile({
            ui: ui1,
            // 自定义组件
            components: COMPONENTS,
            actions: {
                // 自定义事件处理
                'link': (args) => {
                    console.log('action link', args);
                }
            },
            onRendered: () => {
                console.log('event ui1 render-finished');
            }
        });
        this.app = new App({
            data: data || {}
        });
        this.app.attach(this.$content);
    }

    updateData() {
        this.count = this.count < 2 ? this.count + 1 : 0;
        const finalData = [data1, data2, data3][this.count];
        this.app.appendData(finalData);
    }

    addBlock() {
        const App = UIJSON.compile({
            ui: ui2,
            // 自定义组件
            components: COMPONENTS,
            actions: {
                // 自定义事件处理
                'link': (args) => {
                    console.log('action link', args);
                }
            },
            onRendered: () => {
                console.log('event ui2 render-finished');
                this.renderNext();
            }
        });
        const app = new App();
        app.attach(this.$content);
    }

    renderNext() {
        const App = UIJSON.compile({
            ui: ui3,
            // 自定义组件
            components: COMPONENTS,
            actions: {
                // 自定义事件处理
                'link': (args) => {
                    console.log('action link', args);
                }
            },
            onRendered: () => {
                console.log('event ui3 render-finished');
            }
        });
        const app = new App();
        app.attach(this.$content);
    }
}

export const data = {
    score: 3.5,
    title: '插 -XXX- 值',
};

export const data1 = {
    score: 5,
};

export const data2 = {
    num: 3,
    markdown: '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为**玳瑁白色猫**。这种颜色组合是由基因决定的，通常只出现在母猫身上用类似语言描述橘猫',
};

export const data3 = {
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
    ],
};

export const ui1 = {
    type: 'block',
    children: [
        {
            type: 'score',
            props: {
                class: 'cos-space-mr-xxs',
                max: 5,
                value: '{{score}}',
                score: true,
            }
        },
        {
            'type': 'markdown',
            if: 'markdown',
            'props': {
                'value': '第一： {{markdown}}',
                'typingSwitch': false
            }
        },
        {
            type: 'image-group',
            if: 'list.length',
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
    type: 'block',
    children: [
        {
            'type': 'markdown',
            'props': {
                'value': '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为**玳瑁白色猫**。这种颜色组合是由基因决定的，通常只出现在母猫身上用类似语言描述橘猫',
                'typingSwitch': false
            }
        },
        {
            'type': 'echarts',
            'props': {
                'value': '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为**玳瑁白色猫**。这种颜色组合是由基因决定的，通常只出现在母猫身上用类似语言描述橘猫',
                'typingSwitch': false
            }
        },
    ]
}
```
