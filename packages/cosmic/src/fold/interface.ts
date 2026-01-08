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
 *
 * @file Fold 组件 Interface
 */

import type {LinkInfo} from '../util/interface';

export interface FoldProps {

    /**
     * 展开后的交互行为
     *
     * foldable：可以反复操作展开收起
     * unfold-only：展开后不可以收起
     * more：展开后展示查看更多
     * @default 'foldable'
     * @platform PC/Mobile
     */
    action?: 'foldable' | 'unfold-only' | 'more';

    /**
     * 折叠时展示的高度
     *
     * @default 24
     * @platform PC/Mobile
     */
    foldHeight: number;

    /**
     * 是否展示渐变背景遮罩
     *
     * @default false
     * @platform PC/Mobile
     */
    mask: boolean;

    /**
     * 展开文本，折叠状态下显示的操作文案
     *
     * @default '展开'
     * @platform PC/Mobile
     */
    unfoldText: string;

    /**
     * 收起文本，展开状态下显示的操作文案
     *
     * @default '收起'
     * @platform PC/Mobile
     */
    foldText: string;

    /**
     * 查看更多文本
     *
     * @default '查看更多'
     * @platform PC/Mobile
     */
    moreText: string;

    /**
     * 查看更多跳转 url
     *
     * @default undefined
     * @platform PC/Mobile
     */
    moreUrl: string;

    /**
     * 查看更多跳转打开方式
     *
     * @default ''
     * @platform PC/Mobile
     */
    moreTarget?: '_blank' | '_self';

    /**
     * 挂载在a标签上的属性集，可根据业务使用场景自行定义
     *
     * @default {}
     * @platform PC/Mobile
     */
    moreLinkInfo?: LinkInfo;

    /**
     * 是否正在异步加载数据中
     *
     * @default false
     * @platform PC/Mobile
     */
    asyncLoading: boolean;

    /**
     * [内部] 是否为折叠状态
     *
     * @default true
     * @platform PC/Mobile
     */
    _isFolded: boolean;

    /**
     * [内部] 是否展示查看更多
     *
     * @default false
     * @platform PC/Mobile
     */
    _showMore: boolean;

    /**
     * [内部] 是否展示展开收起切换按钮
     *
     * @default true
     * @platform PC/Mobile
     */
    _showSwitch: boolean;
}

export interface FoldEvents {
    /**
     * 切换展开收起状态时触发
     */
    toggle: {
        status: 'folded' | 'unfolded';
        event: Event;
    };
}

export type FoldData = Required<FoldProps>;
