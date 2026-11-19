export default [
    {
        name: 'JSON 协议',
        key: '/protocol/json/content/index',
        path: 'index'
    },
    {
        name: 'v2 JSON 协议',
        key: '/protocol/json/v2/content',
        path: 'v2content'
    },
    {
        name: 'v2 协议解析',
        key: '/protocol/json/v2',
        path: 'index',
        leaf: [
            {
                name: '概述',
                key: '/protocol/json/v2/overview',
                path: 'overview'
            },
            {
                name: '在线体验',
                key: '/protocol/json/v2/online',
                path: 'online'
            },
            {
                name: '快速接入',
                key: '/protocol/json/v2/quick-start',
                path: 'quick-start'
            },
            {
                name: '协议说明',
                key: '/protocol/json/v2/protocol',
                path: 'protocol'
            },
            {
                name: 'API 说明',
                key: '/protocol/json/v2/api/overview',
                path: 'overview'
            }
        ],
        list: [
            {
                groupName: '概念',
                groupKey: 'concept',
                key: 'concept',
                leaf: [
                    {
                        name: 'Catalog',
                        key: '/protocol/json/v2/concept/catalog',
                        path: 'catalog'
                    },
                    {
                        name: 'Applet',
                        key: '/protocol/json/v2/concept/applet',
                        path: 'applet'
                    }
                ]
            },
            {
                groupName: 'Catalog API 接口',
                groupKey: 'catalog-api',
                key: 'catalog-api',
                leaf: [
                    {
                        name: 'defineCatalog',
                        key: '/protocol/json/v2/api/define',
                        path: 'define'
                    },
                    {
                        name: 'exportCatalog',
                        key: '/protocol/json/v2/api/export',
                        path: 'export'
                    },
                    {
                        name: 'Builtin Components',
                        key: '/protocol/json/v2/api/builtin-components',
                        path: 'builtin-components'
                    }
                ]
            },
            {
                groupName: 'Applet API 接口',
                groupKey: 'applet-api',
                key: 'applet-api',
                leaf: [
                    {
                        name: 'Applet',
                        key: '/protocol/json/v2/api/applet',
                        path: 'applet'
                    },
                    {
                        name: 'AppletContext',
                        key: '/protocol/json/v2/api/applet-context',
                        path: 'applet-context'
                    },
                    {
                        name: 'processMessage',
                        key: '/protocol/json/v2/api/process-message',
                        path: 'process-message'
                    },
                    {
                        name: 'validateMessages',
                        key: '/protocol/json/v2/api/validate-messages',
                        path: 'validate-messages'
                    },
                    {
                        name: 'autofix',
                        key: '/protocol/json/v2/api/autofix',
                        path: 'autofix'
                    },
                    {
                        name: 'Children 子节点',
                        key: '/protocol/json/v2/api/children',
                        path: 'children'
                    },
                    {
                        name: 'if 判断',
                        key: '/protocol/json/v2/api/if',
                        path: 'if'
                    },
                    {
                        name: 'for 循环',
                        key: '/protocol/json/v2/api/for',
                        path: 'for'
                    },
                    {
                        name: 'Data 数据',
                        key: '/protocol/json/v2/api/data',
                        path: 'data'
                    },
                    {
                        name: 'Action 行为',
                        key: '/protocol/json/v2/api/action',
                        path: 'action'
                    },
                    {
                        name: 'Event 事件',
                        key: '/protocol/json/v2/api/event',
                        path: 'event'
                    }
                ]
            },
            {
                groupName: 'UI 案例',
                groupKey: 'case',
                key: 'case',
                leaf: [
                    {
                        name: '混合示例',
                        key: '/protocol/json/v2/case/mixed',
                        path: 'mixed'
                    }
                ]
            }
        ]
    },
    {
        name: 'v1 JSON 协议',
        key: '/protocol/json/v1/content',
        path: 'v1content'
    },
    {
        name: 'v1 协议解析',
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
                        name: 'Reference 引用解析',
                        key: '/protocol/json/api/reference',
                        path: 'reference'
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
