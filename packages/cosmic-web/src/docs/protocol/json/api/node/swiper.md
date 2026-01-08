``` san export=preview caption=节点处理-tabs
import san from 'san';
import UIJSON from '@cosui/cosmic-dynamic-ui';

import Button from '@cosui/cosmic/button';
import Image from '@cosui/cosmic/image';
import Score from '@cosui/cosmic/score';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import Tabs from '@cosui/cosmic/tabs';
import Tab from '@cosui/cosmic/tab';
import TabPane from '@cosui/cosmic/tab-pane';
import AuthorCard from '@cosui/cosmic-dqa/author-card';

const COMPONENTS = {
    'button': Button,
    'image': Image,
    'score': Score,
    'swiper': Swiper,
    'swiper-item': SwiperItem,
    'tabs': Tabs,
    'tab': Tab,
    'tab-pane': TabPane,
    'author-card': AuthorCard,
    'markdown': san.defineComponent({
        template: '<div>markdown: {{content | raw}}</div>',
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
            <cos-button class="cos-space-mb-lg" on-click="updateView">点击改列表为 Tabs</cos-button>
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

    updateView() {
        this.$content.innerHTML = '';
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
            nodes: {
                'tabs': (node) => {
                    const children = node.children;
                    const finalChildren = [];

                    children.length && children.forEach((child) => {
                        if (child.type === 'tab-pane'
                            && child.props
                            && child.props.title) {

                            child.props.style = Object.assign({
                                width: '100%'
                            }, child.props.style)

                            finalChildren.push({
                                "type": "tab",
                                "props": {
                                    "slot": "tab"
                                },
                                "children": [
                                    {
                                        "type": "text",
                                        "props": {
                                            "value": child.props.title
                                        }
                                    }
                                ]
                            });

                            delete child.props.title;
                            finalChildren.push(child);
                        }
                    });

                    node.children = finalChildren;
                    return node;
                },
                'author-card': (node) => {
                    if (!node.for) {
                        return node;
                    }
                    const forProps = node.for;
                    delete node.for;
                    delete node.props.class;
                    return {
                        type: 'swiper',
                        props: {
                            spaceBetween: 5
                        },
                        children: [
                            {
                                type: 'swiper-item',
                                for: forProps,
                                props: {
                                    style: {
                                        width: 'calc(80% - 5px)'
                                    }
                                },
                                children: [
                                    node
                                ]
                            }
                        ]
                    };
                }
            },
            onRendered: () => {
                console.log('event ui2 render-finished');
            }
        });

        this.app = new App({
            data: data || {}
        });
        this.app.attach(this.$content);
    }
}

export const data = {
    "list": [
        {
            avatar: 'https://gips2.baidu.com/it/u=182824533,4089501659&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f40_40',
            name: '张一',
            caption: ['国家食品安全评估中心研究员', '技术总顾问'],
            linkInfo: {
                href: 'https://www.baidu.com'
            },
            tag: '中国科学院大学核科学与技术学院教授'
        },
        {
            avatar: 'https://gips2.baidu.com/it/u=182824533,4089501659&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f40_40',
            name: '张二',
            caption: ['国家食品安全评估中心研究员', '技术总顾问'],
            linkInfo: {
                href: 'https://www.baidu.com'
            },
            tag: '中国科学院大学核科学与技术学院教授'
        },
        {
            avatar: 'https://gips2.baidu.com/it/u=182824533,4089501659&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f40_40',
            name: '张三',
            caption: ['国家食品安全评估中心研究员', '技术总顾问'],
            linkInfo: {
                href: 'https://www.baidu.com'
            },
            tag: '中国科学院大学核科学与技术学院教授'
        },
        {
            avatar: 'https://gips2.baidu.com/it/u=182824533,4089501659&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f40_40',
            name: '张四',
            caption: ['国家食品安全评估中心研究员', '技术总顾问'],
            linkInfo: {
                href: 'https://www.baidu.com'
            },
            tag: '中国科学院大学核科学与技术学院教授'
        }
    ]
}

export const ui1 = {
    "type": "block",
    "children": [
        {
            "type": "markdown",
            "props": {
                "content": "我是一大段话我是一大段话, 下方 tabs 样式显示不正常，为预期"
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "tabs",
            "props": {
                "appearance": "bar"
            },
            "children": [
                {
                    "type": "tab-pane",
                    "props": {
                        "title": "鼻窦炎1 (95%内容提及)"
                    },
                    "children": [
                        {
                            "type": "block",
                            "props": {
                                "class": "cos-space-mb-xl"
                            },
                            "children": [
                                {
                                    "type": "markdown",
                                    "props": {
                                        "content": "鼻塞老不好考虑主要症状为鼻塞、..."
                                    }
                                },
                                {
                                    "type": "author-card",
                                    "for": "item, index in list",
                                    "props": {
                                        "class": "cos-space-pt-xl",
                                        "linkInfo": "{{item.linkInfo}}",
                                        "avatar": "{{item.avatar}}",
                                        "name": "{{item.name}}",
                                        "caption": "{{item.caption}}",
                                        "logo": "{{item.logo}}",
                                        "tag": "{{item.tag}}"
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "tab-pane",
                    "props": {
                        "title": "鼻窦炎2 (92%内容提及)"
                    },
                    "children": [
                        {
                            "type": "markdown",
                            "props": {
                                "content": "鼻塞老不好考虑2主要症状为鼻塞2、..."
                            }
                        }
                    ]
                }
            ]
        }
    ]
};
```
