```san export=preview  caption=自定义头部区域
import {Component} from 'san';
import Comment from '@cosui/cosmic/comment';

export default class CommentDemo extends Component {

    static template = `
        <div data-testid="comment-header" class="comment-header-demo">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">评论者描述与标签</h4>
            <p class="cos-space-mt-xs cos-color-text-minor">设置描述文本或可编辑样式的标签，二者总和不超过3个，超出优先显示描述。</p>
            <div class="cos-space-mb-xxl">
                <cos-comment
                    avatar="{{avatar}}"
                    author="{{complexAuthor}}"
                >
                    <span class="cos-line-clamp-2">{{commentText}}</span>
                </cos-comment>
            </div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">评论标签</h4>
            <p class="cos-space-mt-xs cos-color-text-minor">右上角图片标签。</p>
            <div>
                <cos-comment
                    avatar="{{avatar}}"
                    author="{{simpleAuthor}}"
                    label="{{label}}"
                >
                    <span class="cos-line-clamp-2">{{commentText}}</span>
                </cos-comment>
            </div>
        </div>
    `;

    static components = {
        'cos-comment': Comment
    };

    initData() {
        return {
            avatar: 'https://gips0.baidu.com/it/u=1093237061,3929050000&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f670_792',
            simpleAuthor: {
                name: '爱吃狼牙的土豆'
            },
            complexAuthor: {
                name: '爱吃狼牙的土豆',
                captions: ['短文本'],
                tags: [
                    {
                        text: '标签'
                    },
                    {
                        text: '标签',
                        class: 'cos-color-text-on-primary-light cos-color-bg-primary-light'
                    }
                ]
            },
            label: 'https://gips1.baidu.com/it/u=775052945,174465206&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f90_42',
            commentText: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内评论'
        };
    };
}

```
