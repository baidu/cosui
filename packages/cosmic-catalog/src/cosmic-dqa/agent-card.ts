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
 * @file AgentCard Catalog，依据 api/cosmic-dqa/agent-card/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

export const AgentCardProps = z.strictObject({
    thumbnail: z.string().default('').describe('头像图片URL'),
    'action-text': z.string().default('').describe('蒙层文字'),
    title: z.string().default('').describe('标题'),
    caption: z.string().default('').describe('描述信息'),
    'link-info': LinkInfo.optional().describe('跳转所需的参数')
});

export const components = {
    AgentCard: {
        description: 'Agent卡片：用于展示AI助手的基本信息，包括头像、名称和描述信息',
        props: AgentCardProps
    }
} satisfies CatalogDefinition['components'];
