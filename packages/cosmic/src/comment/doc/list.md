```san export=preview  caption=评论列表
import {Component} from 'san';
import Comment from '@cosui/cosmic/comment';

export default class CommentDemo extends Component {

    static template = `
        <div data-testid="comment-list" class="comment-list-demo">
            <div>
                <cos-comment
                    s-for="item, index in [1, 2, 3]"
                    avatar="{{avatar}}"
                    author="{{author}}"
                    source="{{source}}"
                    time="{{time}}"
                    like="{{likes[index]}}"
                    class="cos-space-mb-xs"
                    on-like="handleLikeClick($event, index)"
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
            author: {
                name: '爱吃狼牙的土豆'
            },
            label: 'https://gips1.baidu.com/it/u=775052945,174465206&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f90_42',
            source: '内容来源',
            time: '时间因子',
            likes: [
                {
                    active: true,
                    text: '1000'
                },
                {
                    active: false,
                    text: '999'
                },
                {
                    active: false,
                    text: '999'
                },
            ],
            commentText: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内评论'
        };
    };

    handleLikeClick(e, index) {
        let likes = this.data.get('likes');
        let newLikes = [...likes];
        let like = {...newLikes[index]};

        let likeCount = parseInt(like.text);
        like.active = !like.active;
        like.text = like.active ? (likeCount + 1).toString() : (likeCount - 1).toString();

        newLikes[index] = like;
        this.data.set('likes', newLikes);
    }
}

```
