```san export=preview caption=overlays.position使用示例
import {Component} from 'san';
import ImageWithTags from '@cosui/cosmic-card/image-with-tags';
import Icon from '@cosui/cosmic/icon';

import './position.less';

export default class Demo extends Component {

    static template = `
        <div>
            <cosc-image-with-tags
                image="{{image}}"
                overlays="{{overlays}}"
            />
            <cosc-image-with-tags
                image="{{image}}"
                overlays="{{overlays1}}"
            />
            <cosc-image-with-tags
                image="{{image}}"
                overlays="{{overlays2}}"
            />
            <cosc-image-with-tags
                image="{{image}}"
                overlays="{{overlays3}}"
            />
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">自定义覆盖位置</h4>
             <cosc-image-with-tags
                image="{{image}}">
                <cos-icon name="play" class="center-position" />
            </cosc-image-with-tags>
        </div>`;

    static components = {
        'cosc-image-with-tags': ImageWithTags,
        'cos-icon': Icon
    };

    initData() {
        return {
            image: {
               src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'
            },
            overlays: [
                {
                    text: '文本内容'
                }
            ],
            overlays1: [
                {
                    text: '文本内容',
                    position: 'left-bottom'
                }
            ],
            overlays2: [
               {
                    text: '文本内容',
                    position: 'right-top'
                }
            ],
            overlays3: [
                {
                    text: '文本内容',
                    position: 'right-bottom'
                }
            ]
        };
    }
}
```