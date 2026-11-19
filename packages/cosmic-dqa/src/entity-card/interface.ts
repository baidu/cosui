/**
 * @file EntityCard 组件属性和事件定义
 */

import type {PCImageProps, MobileImageProps} from '@cosui/cosmic/image/interface';

// 内部 Markdown 实际提供的点击参数
export interface MarkdownClickParams {
    [key: string]: unknown;
    event: Event;
    directive?: string;
    from?: string;
}

export interface EntityCardImage extends PCImageProps, MobileImageProps {

    // 图片地址
    src: string;
}

export interface EntityCardProps {

    // 图片配置
    thumbnail: EntityCardImage;

    // 标题内容，支持普通文本和蓝链
    title: string;

    // 描述内容，支持普通文本和蓝链
    content: string;
}

export interface EntityCardImageClickParams {

    // 原始点击事件
    event: Event;

    // 图片点击区域
    area: 'thumbnail';

    // 当前图片配置
    thumbnail: EntityCardImage;

    // 图片点击不包含交互来源
    from?: never;
}

export interface EntityCardContentClickParams {

    // 保留 markdown 组件实际提供的其他参数
    [key: string]: unknown;

    // 原始点击事件
    event: Event;

    // 文本点击区域
    area: 'title' | 'content';

    // 交互来源，实体词指令映射为 search
    from: 'link' | 'search';

    // markdown 内部组件实际提供的标识
    id?: string;

    // markdown 内部组件实际提供的链接地址
    href?: string;

    // markdown 内部组件实际提供的展示文本
    word?: string;

    // markdown 内部组件实际提供的搜索词
    query?: string;
}

export interface EntityCardEvents {

    // 点击图片或文本蓝链时 fire 事件
    click: EntityCardImageClickParams | EntityCardContentClickParams;
}

export type EntityCardData = Required<EntityCardProps>;
