# 快速接入
这份快速接入指南将帮助开发者迅速理解 **Cosmic Dynamic UI** 的输入配置与 API 使用，并完成集成。

## 安装
在你的项目中安装 Cosmic Dynamic UI：

```bash
npm install @cosui/cosmic-dynamic-ui --save
```

## 快速接入

```
import UIJSON from '@cosui/cosmic-dynamic-ui';

import Image from '@cosui/cosmic/image';
import ImageGroup from '@cosui/cosmic-card/image-group';
import Score from '@cosui/cosmic/score';

const COMPONENTS = {
    'image': Image,
    'image-group': ImageGroup,
    'score': Score,
    'markdown': san.defineComponent({
        template: '<div class="markdown">{{value | raw}}</div>',
        attached() {
            this.fire('render-finished', {a:1});
        }
    })
};

// 编译
const App = UIJSON.compile({
    ui: ui1,

    // 自定义组件
    components: COMPONENTS,

    // 扩展数据
    dataExtends: null,

    // 自定义行为处理
    actions: {
        'link': (args) => {
            console.log('action link', args);
        }
    },

    // 自定义事件监听处理
    events: {
        markdown: {
            'click': {
                dom: true,
                listener: (e) => {
                    console.log('event ui1 markdown click', e);
                }
            },
            'render-finished': (e) => {
                console.log('markdown render-finished', e);
            }
        },
        title: {
            'click': (e) => {
                console.log('title click', e);
            }
        },
        text: {
            'click': {
                listener: (e) => {
                    console.log('title click', e);
                }
            }
        }
    },

    nodeTransformer(node) {
        return node;
    },
    onRendered: () => {
        console.log('event ui1 render-finished');
    }
});

// 渲染
const app = new App({
    // 初始数据
    data
});
app.attach(el);

// 追加分段数据
app.appendData(data);
```

## 协议说明
参见：[协议说明章节](/protocol/json/dynamic-ui)

## API 说明
参见：[API 说明章节](/protocol/json/api/overview)
