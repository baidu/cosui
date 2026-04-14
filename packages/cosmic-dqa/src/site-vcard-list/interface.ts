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
 *
 * @file site-vcard-list/interface.ts
 */

import type {SiteVcardProps} from '../site-vcard/interface';

export interface FoldedOptions {
    /**
     * 默认展示条数
     */
    initialCount: number;

    /**
     * 每次点击展示条数
     */
    nextCount: number;
}

interface SiteVcardListProps {
    /**
     * 服务挂载卡片列表数据
     */
    items?: SiteVcardProps[];

    /**
     * 列表展开收起配置，默认为 false 不支持展开收起
     */
    folded?: FoldedOptions | false;

    /**
     * 当前显示的组数
     */
    _showGroupNum: number;
}

export interface SiteVcardListEvents {
    /**
     * 点击展开按钮
     */
    'more-click': void;

    /**
     * 点击挂载卡片
     */
    click: {index: number};
}

export type SiteVcardListData = Required<SiteVcardListProps>;
