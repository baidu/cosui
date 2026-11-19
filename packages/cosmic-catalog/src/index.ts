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
 * @file 统一组件 Catalog
 */

import {defineCatalog} from '@cosui/cosmic-dynamic-ui';
import {baseDefinition} from './base';
import {components as dqaComponents, $defs as dqaDefs} from './cosmic-dqa';

/** 全量入口；业务入口只组合需要的组件包。 */
export const CATALOG = defineCatalog({
    ...baseDefinition,
    $id: 'cosui.v2',
    title: 'Cosui v2 Catalog',
    $defs: {
        ...baseDefinition.$defs,
        ...dqaDefs
    },
    components: {
        ...baseDefinition.components,
        ...dqaComponents
    }
});
