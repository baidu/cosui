```san export=preview caption=图表渲染
import {Component} from 'san';
import Markdown from '@cosui/cosmic-dqa/markdown';

export default class CSRDemo extends Component {

    static template = `
        <div>
            <cosd-markdown
                content="{{text}}"
                diagram="{{diagram}}"
                on-click="handleClick($event)"
            />
        </div>
    `;

    static components = {
        'cosd-markdown': Markdown
    };

    initData() {
        return {
            // 传入配置对象即开启 diagram；各字段控制内置基础控件的展示（初始视图固定为图表）
            diagram: {
                mode: true,
                copy: true,
                download: true,
                fullscreen: true,
                'zoom-in': true,
                'zoom-out': true,
                reset: true
            },
            text: [
                '## Mermaid 流程图',
                '```mermaid',
                'flowchart TD',
                '    A[开始] --> B{是否命中实验}',
                '    B -->|是| C[渲染为可交互图表]',
                '    B -->|否| D[降级为代码块]',
                '    C --> E[结束]',
                '    D --> E[结束]',
                '```',
                '',
                '## Mermaid 时序图',
                '```mermaid',
                'sequenceDiagram',
                '    participant U as 用户',
                '    participant M as cosd-markdown',
                '    participant D as diagram',
                '    U->>M: 输入含图表的 markdown',
                '    M->>D: 命中开关注册插件',
                '    D-->>M: 渲染图表 + 抛 click(from=diagram) 事件',
                '```',
                '',
                '## Markmap 脑图',
                '```markmap',
                '# cosmic 图表',
                '## 渲染',
                '- mermaid',
                '- markmap',
                '## 交互',
                '- 缩放',
                '- 复制/导出',
                '- 全屏',
                '```',
            ].join('\n')
        };
    }

    handleClick(data) {
        // 演示：业务侧统一监听 click 事件，diagram 能力走 {from: 'diagram', action, data}
        // 复制/下载提示、全屏调端、视图/横竖屏切换等在此处理，打点亦由业务自行上报
        if (data.from !== 'diagram') {
            return;
        }
        // eslint-disable-next-line no-console
        console.log('[diagram]', data.action, data.data);
    }
}
```
