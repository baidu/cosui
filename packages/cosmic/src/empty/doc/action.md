```san export=preview caption=自定义操作区
import {Component} from 'san';
import Empty from '@cosui/cosmic/empty';
import Button from '@cosui/cosmic/button';
import Loading from '@cosui/cosmic/loading';
import './action.less';

export default class Demo extends Component {
    static template = `
        <div class="empty-demo">
            <h4>可通过插槽实现组件下方的操作区，常见示例如下：</h4>
            <h4>卡内空状态：加载信息</h4>
            <cos-empty
                title="{{title}}"
                description="{{description}}"
                class="custom-loading"
            >
                <cos-loading position="right"/>
            </cos-empty>
            <h4>空页面：强按钮</h4>
            <cos-empty
                size="md"
                title="{{title}}"
                class="custom-button"
            >
                <cos-button>强按钮</cos-button>
            </cos-empty>
            <h4>空页面：弱按钮</h4>
            <cos-empty
                size="md"
                title="{{title}}"
                class="custom-button"
            >
                <cos-button appearance="secondary">弱按钮</cos-button>
            </cos-empty>
            <h4>空页面：强按钮和超链接</h4>
            <cos-empty
                size="md"
                title="{{title}}"
                class="custom-button-link"
            >
                <div class="cos-empty-action">
                    <cos-button>强按钮</cos-button>
                    <div
                        s-is="{{linkInfo.href ? 'a' : 'div'}}"
                        class="cos-link cos-block custom-link"
                        s-bind="linkInfo"
                    >
                        这是一个超链接
                    </div>
                </div>
            </cos-empty>
            <h4>空页面：弱按钮和超链接</h4>
            <cos-empty
                size="md"
                title="{{title}}"
                class="custom-button-link"
            >
                <div class="cos-empty-action">
                    <cos-button appearance="secondary">弱按钮</cos-button>
                    <div
                        s-is="{{linkInfo.href ? 'a' : 'div'}}"
                        class="cos-link cos-block custom-link"
                        s-bind="linkInfo"
                    >
                        这是一个超链接
                    </div>
                </div>
            </cos-empty>
        </div>
    `;

    static components = {
        'cos-empty': Empty,
        'cos-button': Button,
        'cos-loading': Loading
    };

    initData() {
        return {
            title: '标题内容',
            description: '辅助信息',
            linkInfo: {
                href: 'https://www.baidu.com'
            }
        };
    }
}
```