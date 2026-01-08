/*
 * Copyright (c) Baidu, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {type TagProps} from '../tag/interface';
export interface CommentProps {
    /**
     * 头像地址
     */
    avatar: string;
    /**
     * 作者信息
     * @default {}
     */
    author: Author;
    /**
     * 评论标签地址
     */
    label?: string;
    /**
     * 内容来源
     */
    source?: string;
    /**
     * 内容来源链接
     */
    linkInfo?: LinkInfo;
    /**
     * 时间
     */
    time?: string;
    /**
     * 位置
     */
    location?: string;
    /**
     * 是否可回复
     * @default false
     */
    reply: boolean;
    /**
     * 点赞信息
     */
    like?: Like;
}

export interface Author {
    /**
     * 评论者名称
     */
    name: string;
    /**
     * 评论者描述
     */
    captions: string[];
    /**
     * 标签
     */
    tags: TagItem[];
}

export interface TagItem {
    /**
     * 标签文本
     */
    text: string;
    /**
     * 标签样式
     * @enum ‘filled', 'outline'
     * @default 'filled'
     */
    appearance?: TagProps['appearance'];
    /**
     * 标签样式类
     * @default 'cos-color-text-tiny cos-tag-color-bg'
     */
    class?: string;
}

export interface LinkInfo {
    [key: string]: any;
}

export interface Like {
    /**
     * 点赞是否激活
     * @default false
     */
    active?: boolean;
    /**
     * 点赞文本
     */
    text?: string;
}

export interface CommentEvents {
    like: {
        event: Event;
    };
    reply: {
        event: Event;
    };
}

export type CommentData = Required<CommentProps>;