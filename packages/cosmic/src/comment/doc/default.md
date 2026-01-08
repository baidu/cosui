```san export=preview  caption=基础样式
import {Component} from 'san';
import Comment from '@cosui/cosmic/comment';

export default class CommentDemo extends Component {

    static template = `
        <div data-testid="comment-default" class="comment-default-demo">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">基础演示</h4>
            <div class="cos-space-mb-xxl">
                <cos-comment
                    avatar="{{avatar}}"
                    author="{{simpleAuthor}}"
                >
                    <span class="cos-line-clamp-2">{{commentText}}</span>
                </cos-comment>
            </div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">扩展选项</h4>
            <div>
                <cos-comment
                    reply
                    avatar="{{avatar}}"
                    author="{{complexAuthor}}"
                    label="{{label}}"
                    source="{{source}}"
                    link-info="{{linkInfo}}"
                    time="{{time}}"
                    location="{{location}}"
                    like="{{like}}"
                    on-reply="handleReplyClick"
                    on-like="handleLikeClick"
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
                        text: '标签',
                        class: 'cos-color-text-on-primary-light cos-color-bg-primary-light'
                    }
                ]
            },
            label: 'https://gips1.baidu.com/it/u=775052945,174465206&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f90_42',
            source: '内容来源',
            linkInfo: {
                href: 'https://www.baidu.com',
                'data-click-info': '{}',
                'data-tc-redirect': 'https://www.baidu.com'
            },
            time: '时间因子',
            location: '地区',
            like: {
                active: false,
                text: '999'
            },
            commentText: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内评论'
        };
    };
    ;

    handleReplyClick(e) {
        // 调用端能力输入框进行回复
    }

    handleLikeClick(e) {
        let like = this.data.get('like');
        let likeCount = parseInt(like.text, 10);

        like.active = !like.active;
        like.text = like.active ? (likeCount + 1).toString() : (likeCount - 1).toString();

        // 对原对象修改无法触发渲染，需要创建新对象后 set 数据
        this.data.set('like', {...like});
    }
}
```
