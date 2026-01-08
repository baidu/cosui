export default [
    {
        name: 'JSON 协议',
        key: '/protocol/json/content/index',
        path: 'index'
    },
    {
        name: 'Dynamic UI 协议解析',
        key: '/protocol/json',
        path: 'index',
        leaf: [
            {
                name: '概述',
                key: '/protocol/json/overview/index',
                path: 'index'
            },
            {
                name: '在线体验',
                key: '/protocol/json/online/index',
                path: 'index'
            },
            {
                name: '快速接入',
                key: '/protocol/json/quick-start',
                path: 'quick-start'
            },
            {
                name: '协议说明',
                key: '/protocol/json/dynamic-ui',
                path: 'dynamic-ui'
            }
        ],
        list: [
            {
                groupName: 'API 接口',
                groupKey: 'api',
                key: 'api',
                leaf: [
                    {
                        name: 'API 说明',
                        key: '/protocol/json/api/overview',
                        path: 'overview'
                    },
                    {
                        name: 'Compile 编译',
                        key: '/protocol/json/api/compile',
                        path: 'compile'
                    },
                    {
                        name: 'Data 数据处理',
                        key: '/protocol/json/api/data',
                        path: 'data'
                    },
                    {
                        name: 'Action 行为处理',
                        key: '/protocol/json/api/action',
                        path: 'action'
                    },
                    {
                        name: 'Event 事件处理',
                        key: '/protocol/json/api/event',
                        path: 'event'
                    },
                    {
                        name: 'Node 节点处理',
                        key: '/protocol/json/api/node',
                        path: 'node'
                    },
                    {
                        name: 'Async 异步节点',
                        key: '/protocol/json/api/async',
                        path: 'async'
                    }
                ]
            },
            {
                groupName: 'UI 案例',
                groupKey: 'case',
                key: 'case',
                leaf: [
                    {
                        name: '多图组合',
                        key: '/protocol/json/case/image',
                        path: 'image'
                    },
                    {
                        name: '景点推荐',
                        key: '/protocol/json/case/image-text',
                        path: 'image-text'
                    },
                    {
                        name: '赛事 PK',
                        key: '/protocol/json/case/comparison',
                        path: 'comparison'
                    }
                ]
            }
        ]
    }
];
