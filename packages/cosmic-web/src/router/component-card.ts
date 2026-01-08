export default [
    /** cosmic-card */
    {
        name: 'cosmic-card',
        key: 'components/cosmic-card',
        list: [
            {
                groupName: '基础展示',
                groupKey: 'basic',
                leaf: [
                    {
                        name: 'Title',
                        text: '标题',
                        path: 'title',
                        key: '/components/cosmic-card/title'
                    }
                ]
            },
            {
                groupName: '内容展示',
                groupKey: 'display',
                leaf: [
                    {
                        name: 'AvatarBadge',
                        text: '头像徽章',
                        path: 'avatar-badge',
                        key: '/components/cosmic-card/avatar-badge'
                    },
                    {
                        name: 'BubbleScore',
                        text: '气泡评分',
                        path: 'bubble-score',
                        key: '/components/cosmic-card/bubble-score'
                    },
                    {
                        name: 'ImageGroup',
                        text: '图集',
                        path: 'image-group',
                        key: '/components/cosmic-card/image-group'
                    },
                    {
                        name: 'ImageWithTags',
                        text: '带标签图片',
                        path: 'image-with-tags',
                        key: '/components/cosmic-card/image-with-tags'
                    }
                ]
            },
            {
                groupName: '操作反馈',
                groupKey: 'feedback',
                leaf: [
                    {
                        name: 'CardLoading',
                        text: '卡片加载中',
                        path: 'card-loading',
                        key: '/components/cosmic-card/card-loading'
                    }
                ]
            }
        ]
    }
];
