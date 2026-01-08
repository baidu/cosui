```san export=preview  platform=pc/mobile caption=基本示例
import {Component} from 'san';
import Relationship from '@cosui/cosmic-dqa/relationship';
export default class Demo extends Component {

    static template = `
        <div>
            <h3>人物关系（可横滑）</h3>
            <cosd-relationship
                members="{{members}}"
            />
            <h3>圆角头像</h3>
            <cosd-relationship
                members="{{circleMembers}}"
            />
            <h3>文字头像</h3>
            <cosd-relationship
                members="{{wordMembers}}"
            />
        </div>`;

    static components = {
        'cosd-relationship': Relationship
    };

    initData() {
        return {
            members: [
                {
                    name: '人物姓名',
                    relation: '关系',
                    avatar: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                    linkInfo: {
                        href: 'https://www.baidu.com',
                    }
                },
                {
                    name: '人物姓名',
                    relation: '关系',
                    avatar: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                    linkInfo: {
                        href: 'https://www.baidu.com',
                    }
                },
                {
                    name: '人物姓名',
                    relation: '关系',
                    avatar: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                    linkInfo: {
                        href: 'https://www.baidu.com',
                    }
                },
                {
                    name: '人物姓名',
                    relation: '关系',
                    avatar: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                    linkInfo: {
                        href: 'https://www.baidu.com',
                    }
                },
                {
                    name: '人物姓名',
                    relation: '关系',
                    avatar: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                    linkInfo: {
                        href: 'https://www.baidu.com',
                    }
                },
                {
                    name: '人物姓名',
                    relation: '关系',
                    avatar: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                    linkInfo: {
                        href: 'https://www.baidu.com',
                    }
                }
            ],
            circleMembers: [
                {
                    name: '人物姓名',
                    avatarShape: 'circle',
                    relation: '关系',
                    avatar: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                    linkInfo: {
                        href: 'https://www.baidu.com',
                    }
                },
            ],
            wordMembers: [
                {
                    name: '田所浩二',
                    avatarShape: 'circle',
                    relation: '关系',
                    avatar: '',
                    linkInfo: {
                        href: 'https://www.baidu.com',
                    }
                },
            ],
            overscrollLinkInfo: {
                href: 'https://www.baidu.com'
            }
        };
    }
}
```