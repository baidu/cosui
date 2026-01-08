```san export=preview caption=打字机效果

import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import marklang from 'marklang';
import Markdown from '@cosui/cosmic-dqa/markdown';

export default class TypingDemo extends Component {

    static template = `
        <div>
            <div class="cos-row cos-gutter cos-space-mb-xs">
                <div class="cos-col-4">
                    <cos-button
                        on-click="handleStart"
                    >开始打字</cos-button>
                </div>
                <div class="cos-col-4">
                    <cos-button
                        on-click="handleStop"
                    >停止打字</cos-button>
                </div>
                <div class="cos-col-4" />
            </div>
            <cosd-markdown
                s-if="showMarkdown"
                s-ref="markdown"
                typing="{{typing}}"
                on-typing-finished="handleTypingFinished"
                normalizeContent="{{normalizeContent}}"
                config="{{config}}"
            />
        </div>
    `;

    static components = {
        'cos-button': Button,
        'cosd-markdown': Markdown
    };

    initData() {
        return {
            showMarkdown: false,
            normalizeContent: (content) => {
                return content.replace('^1^', ':ml-citation{ref="1" data="citationList"}');
            },
            isLastText: false,
            citationList: [{
                title: '三花猫是什么样的?',
                isVideo: true,
                type: 'note',
                abstract: '简介:橘猫，是食肉目猫科动物。橘猫的全身为黄色，大多为短毛，有极少数是长毛，是中华田园猫中较为常见的毛色；身上的斑纹极像虎皮的纹路，所以先想想',
                thumbnail: 'https://t9.baidu.com/it/u=738656724,1355220591&fm=3035&app=3035&f=JPEG?w=486&h=324&s=5EA49045027341940204B98803008089',
                source: {
                    name: 'haokan.baidu.com',
                    logo: 'https://gips0.baidu.com/it/u=376766202,4218554536&fm=3012&app=3012&autime=1717572309&size=b360,360'
                }
            }, {
                title: 'CS专业详细介绍!一文了解CS专业那些事!',
                isVideo: true,
                type: 'note',
                abstract: '如果你不知道什么是计算机科学、课程内容有什么,甚至不知道CS专业适不适合自己,就赶快往下看吧!  Part 1.  什么是计算机科学?  你听过“写程序”吗? 没错,这就是计算机科学最广泛的意义。 计',
                thumbnail: 'http://t8.baidu.com/it/u=4250880134,3835127290&fm=217&app=126&f=JPEG?w=800&h=533&s=2141BB46B932AA4F58FA9014030040C9',
                source: {
                    name: 'baijiahao.baidu.com',
                    logo: 'https://gips0.baidu.com/it/u=3518334338,254386365&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f32_32'
                }
            }],
            typing: {
                cursor: true,
                mode: 'all'
            },
            hasSetCitation: false,
            text1: '## ==*',
            text2: '*短答案**==^1^\n测试测试:ml-',
            text3: 'search[回搜]测试内容\n这是一长串文本这是一长串文本这是一长串文本这是一长串文本这是一长串文本这是一长串文本这是一长串文本这是一长串文本这:ml-search[回搜]是一长串文本:ml-search[回搜]这是一长串文本这是一长串文本这是一长串文本这是一长串文本:ml-search-more[划词样式]这是一串长文本:ml-search-more[划词展示2]{text="关键词"}这是一长串文本这是一长串文本这是一长串文本\n下面是个代码块：\n```javascript\n// Using ES6 import syntax\nimport pandas as pd\n// load the library and ALL languages\nconst hljs = require("highlight.js");',
            text4: '\nenum TYPE = 1;\nvar reg = /^http:/g;\nconsole.log(hljs, reg);\n```\n\n|序号|项目|>|年利率（%）|\n',
            table: '| :---: | :---: | :---: | :---: |\n|1.|一、个人住房公积金存款|>|1|\n|2.|当年缴存|>|1.5|\n|3.|上年结转|>|1.5|\n|4.|二、个人住房公积金贷款|>|1|\n|5.|首套|五年以下（含五年）|2.6|\n|6.|^|五年以上|3.1|\n|7.|第二套|五年以下（含五年）|不低于3.025|\n|8.|^|>|五年以上|\n\n',
            text5: `\n`,
            text6: '## 胸椎膨出\n胸椎膨出是一种常见的脊柱疾病，通常是由于胸椎的过度伸展或压缩导致的。这种疾病可能会导致背部疼痛、僵硬和不适等症状。如果您正在经历这些症状，建议您咨询医生以获取更详细的信息和治疗建议',
            text7: '。\n',
            config: {
                'ml-search': {
                    getLinkInfo: function(text) {
                        let href = `https://www.baidu.com/s?wd=` + text;
                        return {
                            target: '_blank',
                            href
                        };
                    }
                }
            },
        };
    }
    handleStart() {
        this.data.set('isLastText', false);
        this.data.set('showMarkdown', false);
        this.nextTick(() => {
            this.data.set('showMarkdown', true);
            this.nextTick(() => {
                // mock 异步返回数据
                const markdown = this.ref('markdown');
                markdown.appendContent(this.data.get('text1'));
                setTimeout(() => {
                    markdown.appendContent(this.data.get('text2'));
                    setTimeout(() => {
                        markdown.appendContent(this.data.get('text3'));
                        setTimeout(() => {
                            markdown.appendContent(this.data.get('text4'));
                            markdown.appendContent(this.data.get('table'));
                            setTimeout(() => {
                                markdown.appendContent(this.data.get('text5'));
                                markdown.appendContent(this.data.get('text6'));
                                setTimeout(() => {
                                    markdown.appendContent(this.data.get('text7'));
                                }, 1000);
                                this.data.set('isLastText', true);
                            }, 1500);
                        }, 1300);
                    }, 2500);
                }, 1500);
            });
        });
    }
    handleTypingFinished() {
        const markdown = this.ref('markdown');
        if (this.data.get('isLastText')) {
            markdown.stop();
            console.log(markdown.getDirectives());
        }
    }
    handleStop() {
        const markdown = this.ref('markdown');
        setTimeout(() => {
            markdown.stop();
        }, 1000);
        console.log(markdown.getDirectives());
    }
}
```
