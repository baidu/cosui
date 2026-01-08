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

export interface AuthorCardProps {

    /**
     * 作者头像链接
     */
    avatar?: string;

    /**
     * 作者名称
     */
    name?: string;

    /**
     * 作者名称下短文本集
     */
    caption?: string[];

    /**
     * 整个区域跳转链接
     */
    linkInfo?: LinkInfo | null;

    /**
     * 标签信息
     */
    tag?: string;
}

export type AuthorCardData = Required<AuthorCardProps>;