```san export=preview  caption=自定义内容区域
import {Component} from 'san';
import Comment from '@cosui/cosmic/comment';
import Icon from '@cosui/cosmic/icon';
import Image from '@cosui/cosmic/image';
import './content.less';

export default class CommentDemo extends Component {

    static template = `
        <div data-testid="comment-content" class="comment-content-demo">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">评论短文本</h4>
            <div class="cos-space-mb-xxl">
                <cos-comment
                    avatar="{{avatar}}"
                    author="{{author}}"
                    source="{{source}}"
                    time="{{time}}"
                    location="{{location}}"
                    like="{{likes[0]}}"
                    on-like="handleLikeClick($event, 0)"
                >
                    <span class="cos-line-clamp-2">
                        <span class="cos-color-text-minor">{{commentCaption}}</span>
                        {{commentText}}
                    </span>
                </cos-comment>
            </div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">图片评论</h4>
            <div class="comment-content-demo-image">
                <cos-comment
                    avatar="{{avatar}}"
                    author="{{author}}"
                    source="{{source}}"
                    time="{{time}}"
                    like="{{likes[1]}}"
                    on-like="handleLikeClick($event, 1)"
                >
                    <span class="cos-line-clamp-2 cos-space-mb-xs">{{commentText}}</span>
                    <div class="cos-row cos-row-col-12 cos-gutter" style="--cos-grid-gutter: 2px">
                        <div class="cos-col-4">
                            <cos-image
                                src="{{src}}"
                                class="cos-image-1-1 left-image"
                            />
                        </div>
                        <div class="cos-col-4">
                            <cos-image
                                src="{{src}}"
                                class="cos-image-1-1 middle-image"
                            />
                        </div>
                        <div class="cos-col-4">
                            <cos-image
                                src="{{src}}"
                                class="cos-image-1-1 right-image"
                            >
                                <div class="image-group-icon">
                                    <cos-icon
                                        name="imagegroup"
                                        class="font-size-inherit"
                                    />
                                    99
                                </div>
                            </cos-image>
                        </div>
                    </div>
                </cos-comment>
            </div>
        </div>
    `;

    static components = {
        'cos-comment': Comment,
        'cos-icon': Icon,
        'cos-image': Image
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
                }
            ],
            commentCaption: '短文本',
            commentText: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内评论',
            src: 'https://gips1.baidu.com/it/u=2479417158,2594490198&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f186_248'
        };
    };

    handleLikeClick(e, index) {
        let likes = this.data.get('likes');
        let newLikes = [...likes];
        let like = {...newLikes[index]};

        let likeCount = parseInt(like.text, 10);
        like.active = !like.active;
        like.text = like.active ? (likeCount + 1).toString() : (likeCount - 1).toString();

        newLikes[index] = like;
        this.data.set('likes', newLikes);
    }
}

```
