export default [
    {
        name: 'Markdown 扩展协议',
        key: '/protocol/markdown/content/index',
        path: 'index'
    },
    {
        name: 'Marklang 协议解析',
        key: 'protocol/markdown/marklang/',
        leaf: [
            {
                name: '概述',
                key: '/protocol/markdown/marklang/overview',
                path: 'overview'
            },
            {
                name: '在线体验',
                key: '/protocol/markdown/marklang/example',
                path: 'example'
            },
            {
                name: '快速接入',
                key: '/protocol/markdown/marklang/quick-start',
                path: 'quick-start'
            },
            {
                name: 'API 说明',
                key: '/protocol/markdown/marklang/api',
                path: 'api'
            },
            {
                name: '新增协议',
                key: '/protocol/markdown/marklang/add-directive',
                path: 'add-directive'
            }
        ],
        list: [
            {
                groupName: '协议扩展',
                groupKey: 'directive',
                key: 'directive',
                leaf: [
                    {
                        name: '文本',
                        text: '基础语法',
                        key: '/protocol/markdown/marklang/text',
                        path: 'text'
                    },
                    {
                        name: '表格',
                        key: '/protocol/markdown/marklang/table',
                        path: 'table'
                    },
                    {
                        name: '数学公式',
                        key: '/protocol/markdown/marklang/math-katex',
                        path: 'math-katex'
                    },
                    {
                        name: 'ml-data 数据',
                        key: '/protocol/markdown/marklang/data',
                        path: 'data'
                    }
                ]
            }
        ]
    },
    {
        name: 'Markdown 组件',
        key: '/protocol/markdown/component',
        path: 'index',
        leaf: [
            {
                name: '概述',
                key: '/protocol/markdown/component/overview',
                path: 'overview'
            },
            {
                name: '在线体验',
                key: '/protocol/markdown/component/online',
                path: 'online'
            },
            {
                name: '开发指南',
                key: '/protocol/markdown/component/development',
                path: 'development'
            },
            {
                name: 'Markdown 组件',
                key: '/protocol/markdown/component/index',
                path: 'index'
            }
        ],
        list: [
            {
                groupName: '协议扩展',
                groupKey: 'base',
                leaf: [
                    {
                        name: '基础增强',
                        text: '基础增强',
                        path: 'base',
                        key: '/protocol/markdown/component/base'
                    },
                    {
                        name: 'image 图片增强',
                        text: '图片增强',
                        path: 'image',
                        key: '/protocol/markdown/component/image'
                    },
                    {
                        name: 'latex 公式增强',
                        text: '公式增强',
                        path: 'latex',
                        key: '/protocol/markdown/component/latex'
                    },
                    {
                        name: 'link 链接增强',
                        text: '链接增强',
                        path: 'link',
                        key: '/protocol/markdown/component/link'
                    },
                    {
                        name: 'table 表格增强',
                        text: '表格增强',
                        path: 'table',
                        key: '/protocol/markdown/component/table'
                    },
                    {
                        name: 'ml-brief 左图右文',
                        text: '左图右文',
                        path: 'ml-brief',
                        key: '/protocol/markdown/component/ml-brief'
                    },
                    {
                        name: 'ml-copy 复制文本',
                        text: '复制文本',
                        path: 'ml-copy',
                        key: '/protocol/markdown/component/ml-copy'
                    },
                    {
                        name: 'ml-search 回搜',
                        text: '回搜',
                        path: 'ml-search',
                        key: '/protocol/markdown/component/ml-search'
                    },
                    {
                        name: 'ml-search-more 划词',
                        text: '划词',
                        path: 'ml-search-more',
                        key: '/protocol/markdown/component/ml-search-more'
                    },
                    {
                        name: 'ml-tag-link 文本标签链接',
                        text: '文本标签链接',
                        path: 'ml-tag-link',
                        key: '/protocol/markdown/component/ml-tag-link'
                    },
                    {
                        name: 'ml-text 特殊样式文本',
                        text: '特殊样式文本',
                        path: 'ml-text',
                        key: '/protocol/markdown/component/ml-text'
                    },
                    {
                        name: 'ml-citation 溯源角标及浮层',
                        text: '溯源角标及浮层',
                        path: 'ml-citation',
                        key: '/protocol/markdown/component/ml-citation'
                    },
                    {
                        name: 'ml-citation-text 溯源文字角标',
                        text: '溯源文字角标',
                        path: 'ml-citation-text',
                        key: '/protocol/markdown/component/ml-citation-text'
                    },
                    {
                        name: 'ml-audio 音频指令',
                        text: '音频指令',
                        path: 'ml-audio',
                        key: '/protocol/markdown/component/ml-audio'
                    },
                    {
                        name: 'ml-tts 语音播报',
                        text: '语音播报',
                        path: 'ml-tts',
                        key: '/protocol/markdown/component/ml-tts'
                    }
                ]
            },
            {
                groupName: '结构化',
                groupKey: 'scene',
                leaf: [
                    {
                        name: 'ml-poi 地图指令',
                        text: '地图指令',
                        path: 'ml-poi',
                        key: '/protocol/markdown/component/ml-poi'
                    },
                    {
                        name: 'ml-relationship 人物关系指令',
                        text: '人物关系指令',
                        path: 'ml-relationship',
                        key: '/protocol/markdown/component/ml-relationship'
                    },
                    {
                        name: 'ml-shop-address 店铺指令',
                        text: '店铺指令',
                        path: 'ml-shop-address',
                        key: '/protocol/markdown/component/ml-shop-address'
                    },
                    {
                        name: 'ml-site-vcard 资源展示指令',
                        text: '资源展示指令',
                        path: 'ml-site-vcard',
                        key: '/protocol/markdown/component/ml-site-vcard'
                    }
                ]
            }
        ]
    }
];
