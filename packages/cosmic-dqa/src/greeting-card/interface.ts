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

/**
 * 按钮项配置
 */
export interface ButtonItem {
    /**
     * 按钮图标
     */
    icon?: string;

    /**
     * 按钮文本
     */
    text?: string;

    /**
     * 跳转链接信息
     */
    linkInfo?: LinkInfo | null;
}

export interface GreetingCardProps {
    /**
     * 头像图片url
     */
    avatar: string;

    /**
     * 打招呼标题
     */
    title?: string;

    /**
     * 打招呼内容
     */
    content?: string;

    /**
     * 卡片样式
     */
    appearance?: 'card' | 'filled';

    /**
     * 语音按钮数据
     */
    voice?: ButtonItem | null;

    /**
     * 视频按钮数据
     */
    video?: ButtonItem | null;
}

export type GreetingCardData = Required<GreetingCardProps>;
