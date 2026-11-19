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
 * @file BubbleScore Catalog，依据 api/cosmic-card/bubble-score/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const BubbleScoreProps = z.strictObject({
    value: z.number().default(0).describe('当前评分值')
});

export const components = {
    BubbleScore: {
        description: '气泡评分：使用气泡将分数包裹展示的组件',
        props: BubbleScoreProps
    }
} satisfies CatalogDefinition['components'];
