``` san export=preview caption=DyanmicUI对话案例
import san from 'san';
import UIJSON from '@cosui/cosmic-dynamic-ui';
import './basic.less';
import Button from '@cosui/cosmic/button';
import Textarea from '@cosui/cosmic/textarea';
import QuestionGuide from '@cosui/cosmic-dqa/question-guide';

import Comparison from '@cosui/cosmic-dqa/comparison';
import Markdown from '@cosui/cosmic-dqa/markdown';

const COMPONENTS = {
    'comparison': Comparison,
    'markdown': Markdown
};

export default class ComparisonDoc extends san.Component {

    static template = `
        <div class="chat">
            <!-- 左侧列表 -->
            <aside s-if="sidebar" class="sidebar">
                <div class="sidebar-header cos-text-headline">对话列表</div>
                <div class="chat-list">
                    <div
                        s-for="item, index in topic"
                        class="chat-item{{activeIndex === index ? ' active' : ''}}"
                        on-click="handleTopic(index)"
                    >
                        <div class="cos-text-subtitle">{{item.title}}</div>
                        <div class="cos-line-clamp-1 cos-color-text-slim cos-text-caption">{{item.caption}}</div>
                    </div>
                </div>
            </aside>
            <!-- 右侧内容 -->
            <main class="main-content">
                <!-- 顶部标题 -->
                <header class="header cos-text-headline">
                    <span class="toggle-sidebar" on-click="toggleSidebar">☰</span>
                    <div>{{topic[activeIndex].title}}</div>
                </header>
                <!-- 消息区域 -->
                <div class="message-content" s-ref="messages">
                    <fragment s-for="item, index in qa">
                        <div s-if="item.query" class="message user">
                            <div class="message-bubble">{{item.query}}</div>
                        </div>
                        <div s-if="item.answer" class="message">
                            <div class="message-bubble">{{item.answer}}</div>
                        </div>
                        <div s-ref="content{{index}}"></div>
                    </fragment>
                </div>
                <!-- 底部输入框 -->
                <cosd-question-guide
                    class="cos-space-p-md"
                    items="{{questionGuide}}"
                    on-change="handleChange"
                />
                <div class="input-area">
                    <cos-textarea
                        class="input-box"
                        value="{=query=}"
                        rows="1"
                        appearance="filled"
                        placeholder="输入消息..."
                        on-keydown="quickSend"
                    />
                    <cos-button class="send-btn" size="sm" on-click="sendMessage()">发送</cos-button>
                </div>
            </main>
        </div>
    `;

    static components = {
        'cos-button': Button,
        'cos-textarea': Textarea,
        'cosd-question-guide': QuestionGuide
    };

    initData() {
        return {
            query: '',
            sidebar: false,
            activeIndex: 0,
            questionGuide: [
                {
                    type: 'question',
                    options: [
                        {value: 'UIJSON 渲染案例'},
                        {value: 'MarkMarkdown 渲染案例'}
                    ],
                }
            ],
            topic: [
                {
                    title: '默认对话',
                    caption: '欢迎使用对话系统',
                },
                {
                    title: '项目讨论',
                    caption: '关于新项目的想法...'
                },
                {
                    title: '技术交流',
                    caption: '今天学习了新技术'
                }
            ],
            qa: [
                {
                    answer: '你好！有什么可以帮助你的吗？',
                }
            ]
        };
    }

    attached() {
        this.$messages = this.ref('messages');
    }

    toggleSidebar(event) {
        this.data.set('sidebar', !this.data.get('sidebar'));
    }

    handleTopic(index) {
        this.data.set('activeIndex', index);
        this.data.set('qa', [{
            answer: '你好！有什么可以帮助你的吗？',
        }]);
    }

    handleChange(event) {
        const value = event.option.value;
        this.sendMessage(value);
    }

    quickSend(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
            this.sendMessage();
        }
    }

    sendMessage(message) {
        const query = message || this.data.get('query').trim();
        if (!query) {
            return;
        }
        if (this.flag) {
            return;
        }
        this.flag = true;
        const len = this.data.get('qa').length;
        this.data.push('qa', {query});

        this.nextTick(() => {
            this.$content = this.ref('content' + len);
            setTimeout(() => {
                if (query === 'UIJSON 渲染案例') {
                    this.renderUIJSON(this.$content);
                }
                else if (query === 'MarkMarkdown 渲染案例') {
                    this.renderMarkdown(this.$content);
                }
                else {
                    this.renderMarkdown(this.$content);
                }
                this.flag = false;
                this.$messages.scrollTop = this.$messages.scrollHeight;
            }, 500);
        });
    }

    renderMarkdown(el) {
        const App = UIJSON.compile({
            ui: {
                props: {
                    content: '## 你好 \n  ==**我是一段 Markdown**== 可以接入 Cosmic Markdown 实现此效果',
                },
                type: 'markdown'
            },
            components: COMPONENTS
        });
        const app = new App();
        app.attach(el);
    }

    renderUIJSON(el) {
        const App = UIJSON.compile({
            ui,
            components: COMPONENTS
        });
        const app = new App({
            data
        });
        app.attach(el);
    }
}

const ui = {
    "props": {
        "bar": "{{bar}}",
        "items": "{{items}}",
        "linkInfo": "{{linkInfo}}",
        "targets": "{{targets}}"
    },
    "type": "comparison"
}

const data = {
    "bar": [
        {
            "text": "胜 75%",
            "value": 0.75
        },
        {
            "text": "平局 16%",
            "value": 0.16
        },
        {
            "text": "胜 9%",
            "value": 0.09
        }
    ],
    "items": [
        {
            "name": "近6场交锋",
            "values": [
                "4胜1平1负",
                "1胜1平4负"
            ]
        },
        {
            "name": "近10场战绩",
            "values": [
                "4胜1平5负",
                "3胜2平5负"
            ]
        },
        {
            "name": "近10场同主客",
            "values": [
                "3胜1平6负",
                "3胜2平5负"
            ]
        },
        {
            "name": "场均进球",
            "values": [
                "1.4球",
                "1.4球"
            ]
        },
        {
            "name": "场均失球",
            "values": [
                "1.7球",
                "2.0球"
            ]
        },
        {
            "name": "身价",
            "values": [
                "5.6亿欧",
                "2.1亿欧"
            ]
        }
    ],
    "linkInfo": {
        "href": "https://m.dongqiudi.com/matchDetail/53755322/analysis"
    },
    "targets": [
        {
            "image": "https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9",
            "name": "队伍1"
        },
        {
            "image": "https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9",
            "name": "队伍2"
        }
    ],
};

```