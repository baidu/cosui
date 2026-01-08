```san export=preview caption=基础用法

import {Component} from 'san';
import Citation from '@cosui/cosmic-dqa/citation';

export default class DefaultDemo extends Component {

    static template = `
        <div style="position: relative;">
            <p>这是一个段落文本这是一个段落文本这是一个段落文本</p>
            <p>这是一个段落文本</p>
            <p>这是一个段落文本
                <span s-for="item, index in citationList">
                    <cosd-citation
                        citationId="{{index + 1}}"
                        getPopupContainer="{{getPopupContainer}}"
                        title="{{item.title}}"
                        thumbnail="{{item.thumbnail}}"
                        source="{{item.source}}"
                        abstract="{{item.abstract}}"
                        isVideo="{{item.isVideo}}"
                    />
                </span>这是段落文本段落文本
                <span s-for="item, index in citationList">
                    <cosd-citation
                        citationId="{{index + 1}}"
                        getPopupContainer="{{getPopupContainer}}"
                        title="{{item.title}}"
                        thumbnail="{{item.thumbnail}}"
                        source="{{item.source}}"
                        abstract="{{item.abstract}}"
                        isVideo="{{item.isVideo}}"
                    />
                </span>
            </p>
            <p>这是一个可信溯源，样式长这样：根据
                <span s-for="item, index in citationList">
                    <cosd-citation
                        appearance="link"
                        getPopupContainer="{{getPopupContainer}}"
                        citationId="{{index + 1}}"
                        title="{{item.title}}"
                        source="{{item.source}}"
                        on-click="handleClick"
                    />
                </span>
                可知文本这是段落文本段落文本这是段落文本段落文本这是段落文本段落文本这是段落文本段落文本这是段落文本段落文本这是段落文本段落文本这是段落文本段落文本这是段落文本段落文本这是段落文本段落文本这是段落文本段落文本
            </p>

            <p>这是可信标签类型溯源：
                <span s-for="item, index in citationList">
                    <cosd-citation
                        appearance="tag"
                        getPopupContainer="{{getPopupContainer}}"
                        citationId="{{index + 1}}"
                        title="{{item.title}}"
                        source="{{item.source}}"
                        on-click="handleClick"
                    />
                </span>
            </p>
        </div>
    `;

    static components = {
        'cosd-citation': Citation
    };

    initData() {
        return {
            getPopupContainer: () => {
                return this.el;
            },
            citationList: [
                {
                    title: "三花猫是什么样的?三花猫是什么样的?三花猫是什么样的?三花猫是什么样的?三花猫是什么样的?三花猫是什么样的?三花猫是什么样的?三花猫是什么样的?",
                    isVideo: true,
                    abstract: '简介:橘猫，是食肉目猫科动物。橘猫的全身为黄色，大多为短毛，有极少数是长毛，是中华田园猫中较为常见的毛色；身上的斑纹极像虎皮的纹路，所以先想想',
                    thumbnail: 'https://t9.baidu.com/it/u=738656724,1355220591&fm=3035&app=3035&f=JPEG?w=486&h=324&s=5EA49045027341940204B98803008089',
                    source: {
                        name: '百度百科百度百科百度百科百度百科',
                        logo: 'https://gips0.baidu.com/it/u=376766202,4218554536&fm=3012&app=3012&autime=1717572309&size=b360,360',
                        type: 'site',
                        tag: {
                            text: '官网',
                            colorVars: `--cosd-citation-tag-color: var(--cos-color-text-on-primary-light); --cosd-citation-tag-bg-color: var(--cos-color-bg-primary-light)`
                        }
                    }
                },
                {
                    title: "关于中国的七大水系包括哪些 你都记全了吗?",
                    source: {
                        name: '四平反邪教网',
                        logo: 'https://gips0.baidu.com/it/u=376766202,4218554536&fm=3012&app=3012&autime=1717572309&size=b360,360',
                        type: 'site',
                        tag: {
                            text: '官媒',
                            colorVars: `--cosd-citation-tag-color: var(--cos-tan-2); --cosd-citation-tag-bg-color: var(--cos-tan--5)`
                        }
                    },
                    abstract: '他(i)跑,他(e)追他(i)插翅难飞世间有一个亘古不变的定律每个i人的身边都有e人朋友相处之后发现e人和i人的区别真的不要太明显! 朋友之间其实有很多共通之处,比如共同的语言习惯,共同的兴趣爱好,共同的朋友等等. 朋友之间也有很多不同之处,比如共同的语言习惯,共同的兴趣爱好,共同的朋友'
                }
            ]
        }
    }
    handleClick(e, data) {
    }
}
```
