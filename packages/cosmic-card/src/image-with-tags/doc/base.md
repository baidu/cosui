```san export=preview caption=overlays 使用示例
import {Component} from 'san';
import ImageWithTags from '@cosui/cosmic-card/image-with-tags';
import './base.less';

export default class Demo extends Component {

    static template = `
        <div>
            <div class="overlay demo-base-event">
                <p>不使用 overlay </p>
                <cosc-image-with-tags
                    image="{{eventImage}}"
                    on-click="native:changeImage"
                    on-error="handleError"
                    on-load="handleLoad"
                />
            </div>
            <div class="overlay">
                <p>使用 tag</p>
                <cosc-image-with-tags
                    image="{{image}}"
                    overlays="{{overlays}}"
                />
            </div>
            <div class="overlay">
                <p>使用 text</p>
                <cosc-image-with-tags
                    image="{{image}}"
                    overlays="{{overlays1}}"
                />
            </div>
            <div class="overlay">
                <p>使用 icon</p>
                <cosc-image-with-tags
                    image="{{image}}"
                    overlays="{{overlays2}}"
                />
            </div>
            <div class="overlay">
                <p>使用 text 和 icon</p>
                <cosc-image-with-tags
                    image="{{image}}"
                    overlays="{{overlays3}}"
                />
            </div>
            <div class="overlay">
                <p>传入多个 overlay</p>
                <cosc-image-with-tags
                    image="{{image}}"
                    overlays="{{overlays4}}"
                />
            </div>
        </div>`;

    static components = {
        'cosc-image-with-tags': ImageWithTags
    };

    initData() {
        return {
            eventImage: {
                src:'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753',
            },
            image: {
               src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'
            },
            overlays: [
                {
                    text: 'tag内容',
                    icon: 'heart1',
                    tag: {
                        appearance: 'filled',
                        size: 'md'
                    },
                }
            ],
            overlays1: [
                {
                    text: '文本内容',
                    position: 'right-bottom'
                }
            ],
            overlays2: [
                {
                    icon: 'heart1',
                    position: 'right-bottom'
                }
            ],
            overlays3: [
                {
                    text: '文本内容',
                    icon: 'heart1'
                },
            ],
            overlays4: [
                {
                    text: '文本内容'
                },
                {
                    text: 'tag内容',
                    icon: 'heart1',
                    position: 'right-bottom',
                    tag: {
                        appearance: 'filled',
                        size: 'md'
                    },
                }
            ],
            count: 0
        };
    }
    changeImage() {
        console.log('click image');

        const imgs = [
                'https://selfpage-gips.cdn.bcebos.com/480c625d7464e79788e4ae2b0583a819.jpeg',
                'https://psstatic.cdn.bcebos.com/crosswise/search_components/image-example_16993610390001.png',
                'https://img0.baidu.com/it/u=3628503530,464378779&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1709917200&t=c9be3c07e8094b0359c2580b968805bf'
        ];
        const count = this.data.get('count') + 1;
        this.data.set('eventImage.src', imgs[count % 3]);
        this.data.set('count', count);
    }

    handleLoad(e) {
        console.log('load image');
    }

    handleError(e) {
        console.log('error image');
    }
}
```