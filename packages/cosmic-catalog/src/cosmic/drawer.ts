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
 * @file Drawer Catalog，依据 api/cosmic/drawer/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const DrawerProps = z.strictObject({
    open: z.boolean().default(false).describe('弹窗是否可见；仅支持 Mobile'),
    mask: z.boolean().default(true).describe('是否显示遮罩层；仅支持 Mobile'),
    title: z.string().optional().describe('标题文字；仅支持 Mobile'),
    closeable: z.boolean().default(true).describe('是否显示关闭按钮；仅支持 Mobile'),
    position: z
        .union([z.literal('bottom'), z.literal('left'), z.literal('top'), z.literal('right')])
        .default('bottom')
        .describe('抽屉的弹出方向；仅支持 Mobile'),
    'close-on-swipe': z.boolean().default(false).describe('是否支持滑动关闭；仅支持 Mobile'),
    destroyOnClose: z.boolean().default(true).describe('是否在关闭时销毁DOM；仅支持 Mobile')
});

export const components = {
    Drawer: {
        description:
            '抽屉：属于百度搜索业务下的强反馈形式，其用于承载用户对搜索内容进行后续操作的功能项；'
                + '需用户主动交互后，才可关闭，不可自动关闭',
        props: DrawerProps.extend({slot: z.enum(['title']).optional().describe('命名插槽：title 为抽屉标题')}),
        children: true,
        events: {
            close: z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
