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

import type {LinkInfo} from '@cosui/cosmic/util/interface';

export type MicroContentScrollAppearance = 'top' | 'bottom';

interface MicroContentItemProps {

    /**
     * 作者头像
     */
    avatar: string;

    /**
     * 作者名称
     */
    author: string;

    /**
     * 1、文本内容
     * 2、支持 html 挂载, 此时 value 为 html 字符串
     * 该接口不对外暴露，不在文档体现
     */
    content: string | {
        value: string;
        html?: boolean;
    };

    /**
     * 贴图内容
     */
    thumbnail?: string;

    /**
     * 标签
     */
    tag?: string;

    /**
     * 跳转链接
     */
    linkInfo?: LinkInfo;
}

interface MicroContentScrollProps {

    items: MicroContentItemProps[];

    /**
     * 引导语
     */
    title?: string;

    /**
     * 作者位置
     */
    appearance?: MicroContentScrollAppearance;

    /**
     * 栅格布局的栅格数
     */
    span?: number;
}

export interface MicroContentScrollEvents {
    itemClick: {
        event: Event;
        item: MicroContentItemData;
    };
    scrollend: {
        index: number;
        prevIndex: number;
    };
}

export type MicroContentScrollData = Required<MicroContentScrollProps>;

export type MicroContentItemData = Required<MicroContentItemProps & {
    appearance?: MicroContentScrollAppearance;
}>;
