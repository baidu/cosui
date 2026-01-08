``` san export=preview caption=在线填入Markdown数据
import san from 'san';
import UIJSON from '@cosui/cosmic-dynamic-ui';
import Textarea from '@cosui/cosmic/textarea';
import Switcher from '@cosui/cosmic/switcher';
import Button from '@cosui/cosmic/button';
import Markdown from '@cosui/cosmic-dqa/markdown';
import Score from '@cosui/cosmic/score';
import {normalizeContent} from './normalize-content';

const COMPONENTS = {
    'markdown': Markdown,
    'score': Score
};

const placeholder = `==**核心答案：过期的化妆品通常不建议使用**==
## ==短答案：过期的化妆品通常不建议使用==
~一个波浪不是删除~  ~~两个波浪是删除~~
**加粗:ml-copy{text="加粗"}**:ml-tts{src="https://hanyu-word-pinyin-short.cdn.bcebos.com/bing4.mp3"}

[带文本icon的链接](http://www.baidu.com){type="text"}  [带视频icon的链接](http://www.baidu.com){type="video"}  [带笔记icon的链接](http://www.baidu.com){type="note"}

[甄嬛传网盘资源](https:/pan.baidu.com/s/1QHxSHIrvvKvBcC1ZQSLF_g?pwd=4321)

下面是一个地图插件(点击可展开)
:ml-poi{data="poi-1"}

:::ml-data{name=poi-1}
\`\`\`json
{"mapImage":"https://img1.baidu.com/it/u=1180593395,734189004&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=512","ratio":3,"linkInfo":{"href":"https://m.baidu.com/s?word=测试linkInfo"},"marker":true,"area":"河北省","address":"石家庄市长安区南高营立交桥","folded":true,"invokeInfo":{"url":"https://map.baidu.com/mobile/webapp/index/index/","params":{"show_type":"detail_tab","uid":"881a28e7bbf2f45ef842b2f5","src":"打点参数 与地图pm shanshan约定"}}}
\`\`\`
:::

下面是一个店铺插件
::ml-shop-address{data="shop-address-1"}

:::ml-data{name=shop-address-1}
\`\`\`json
{"thumbnail":"https://gimg3.baidu.com/search/src=https%3A%2F%2Fpoi-pic-gz.cdn.bcebos.com%2F001%2F161_abb77836fc89b8f07750efd0fe47d2c6.jpeg&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=r3,2&n=0&g=6&er=404&q=75&fmt=auto&maxorilen2heic=2000000?sec=1713286800&t=a9a6c40056ff11f7b758a7cc8737cf1d","title":"海底捞火锅西单店","distance":"20km","tags":[{"text":"403人访问过"},{"text":"403人访问过"},{"text":"403人访问过"},{"text":"403人访问过"},{"text":"403人访问过"}],"linkInfo":{"href":"https://m.baidu.com/s?word=测试linkInfo"},"navigationInfo":{"href":"https://m.baidu.com/s?word=测试navigationInfo"},"poi":{"name":"电玩望京店","area":"北京市","address":"北京市西城区西单北大街109号西单婚庆大楼7层(西单商场对面)"},"folded":false}
\`\`\`
:::
`;

export default class OnlineDoc extends san.Component {

    static template = `
        <div class="demo">
            <p s-if="error" class="cos-color-text-em">{{error}}</p>
            <cos-textarea
                class="cos-space-mb-lg"
                value="{{value}}"
                height="{{400}}"
                max-height="{{400}}"
                clear
                on-input="clickHandler"
                on-clear="clickHandler"
            >
                <div class="title-slot" slot="title"> 填写 Markdown 数据， 可参考代码示例 </div>
            </cos-textarea>
            <div class="cos-text-subtitle-sm">
                打字效果: <cos-switcher class="cos-inline-flex" size="sm" on-change="switchChange" />
            </div>
            <div class="cos-space-mb-lg cos-text-headline"> 以下为生成效果 </div>
            <div s-ref="content"></div>
        </div>
    `;

    initData() {
        return {
            typing: null,
            error: '',
            value: placeholder
        }
    }

    static components = {
        'cos-button': Button,
        'cos-switcher': Switcher,
        'cos-textarea': Textarea
    };

    attached() {
        this.$content = this.ref('content');
        const App = UIJSON.compile({
            ui: {
                type: 'markdown',
                props: {
                    content: normalizeContent(placeholder)
                }
            },
            components: COMPONENTS,
            actions: {
                'link': ({args}) => {
                    console.log('link', args);
                }
            }
        });
        const app = new App();
        app.attach(this.$content);
    }

    switchChange(e) {
        this.data.set('typing', e.checked ? {} : null);
    }

    clickHandler(e) {

        const value = e.value || '';
        this.data.set('error', '');
        this.$content.innerHTML = '';
        try {
            const content = value.replace(/"/g, '\"').replace(/\\n/g, '\n').replace(/\\\[/g, '\[').replace(/\\\]/g, '\]');

            const App = UIJSON.compile({
                ui: {
                    type: 'markdown',
                    props: {
                        content: normalizeContent(content),
                        typing: this.data.get('typing')
                    }
                },
                components: COMPONENTS,
                onRendered: () => {
                    console.log('event ui render-finished');
                },
                actions: {
                    'link': ({args}) => {
                        console.log('link', args);
                    }
                }
            });
            const app = new App();
            app.attach(this.$content);
        }
        catch (e) {
            this.data.set('error', '填写数据异常: \n' + e.toString());
        }
    }
}
```
