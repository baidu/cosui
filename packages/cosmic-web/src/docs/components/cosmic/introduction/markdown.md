```san export=preview caption=Markdown协议
import {Component} from 'san';
import Markdown from '@cosui/cosmic-dqa/markdown';
import marklang from 'marklang';

export default class BaseDemo extends Component {

    static template = `
        <div style="position: relative;">
            <cosd-markdown s-ref="markdown" content="{{text}}" config="{{config}}" />
        </div>
    `;

    static components = {
        'cosd-markdown': Markdown
    };

    initData() {
        return {
            config: {
                'ml-citation': {
                    getPopupContainer: () => {
                        return this.el;
                    }
                }
            },
            citationList: [{
                title: '三花猫是什么样的?',
                isVideo: true,
                type: 'note',
                abstract: '简介:橘猫，是食肉目猫科动物。橘猫的全身为黄色，大多为短毛，有极少数是长毛，是中华田园猫中较为常见的毛色；身上的斑纹极像虎皮的纹路，所以先想想',
                thumbnail: 'https://t7.baidu.com/it/u=898364561,384191820&fm=3031&app=3031&size=r3,4&q=100&n=0&g=11n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=E102FF1F434E76EF1068B1D2030060B1',
                source: {
                    name: '中国宠物网',
                    icon: 'summarize',
                    type: 'site',
                    tag: '宠物'
                }
            }, {
                title: 'CS专业详细介绍!一文了解CS专业那些事!',
                isVideo: true,
                type: 'note',
                abstract: '如果你不知道什么是计算机科学、课程内容有什么,甚至不知道CS专业适不适合自己,就赶快往下看吧!  Part 1.  什么是计算机科学?  你听过“写程序”吗? 没错,这就是计算机科学最广泛的意义。 计',
                thumbnail: 'https://t8.baidu.com/it/u=5362138,303861653&fm=3031&app=3031&size=r3,4&q=100&n=0&g=11n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=C8019D181BBDF1ED48FC9DCA030050B1',
                source: {
                    name: '百度百科',
                    logo: 'https://gips0.baidu.com/it/u=3518334338,254386365&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f32_32',
                    type: 'site',
                    tag: '百科'
                }
            }],
            text: '**普通溯源**\n根据:ml-citation{ref="1" data="citationList"}:ml-citation{ref="2" data="citationList"}可知，猫可以通过飞机进行托运，但需要满足一定的条件和准备相应的材料\n<br>'
            + '**可信溯源**\n根据:ml-citation{ref="1,2" appearance="link" data="citationList"}可知，猫可以通过飞机进行托运，但需要满足一定的条件和准备相应的材料\n<br>'
            + '**可信标签溯源**\n根据:ml-citation{ref="1,2" appearance="tag" data="citationList"}可知，猫可以通过飞机进行托运，但需要满足一定的条件和准备相应的材料\n'
        };
    }
    attached() {
        const markdown = this.ref('markdown');
        const citationList = this.data.get('citationList');
        const sourceCitationList = marklang.dataToSource('citationList', citationList);
        markdown.appendContent(sourceCitationList);
    }
}
```