```san export=preview caption=可点击状态切换

import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import Markdown from '@cosui/cosmic-dqa/markdown';

export default class ActivationDemo extends Component {

    static template = `
        <div>
            <cos-button
                class="cos-space-mb-sm"
                on-click="handleActivate"
            >
                {{activated ? '链接已激活' : '点击激活链接'}}
            </cos-button>
            <cosd-markdown
                s-ref="markdown"
                content="{{text}}"
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
            activated: false,
            text: ':ml-search[百度百科]{text="百度百科" id="entity_1"}',
            config: {
                'ml-search': {
                    getLinkInfo: (text) => {
                        if (!this.data.get('activated')) {
                            return {
                                clickable: false,
                                query: text
                            };
                        }
                        return {
                            clickable: true,
                            href: 'https://www.baidu.com/s?word=' + encodeURIComponent(text),
                            target: '_blank',
                            query: text
                        };
                    }
                }
            }
        };
    }

    handleActivate() {
        this.data.set('activated', !this.data.get('activated'));
        this.ref('markdown').refreshMlSearchLinks();
    }
}
```
