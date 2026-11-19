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
 * @file cosmic-card 组件定义汇总
 */

import {components as avatarBadgeComponents} from './avatar-badge';
import {components as bubbleScoreComponents} from './bubble-score';
import {components as cardLoadingComponents} from './card-loading';
import {components as imageWithTagsComponents} from './image-with-tags';
import {components as titleComponents, TitleProps} from './title';
import {components as imageGroupComponents, ImageGroupItem} from './image-group';

export const components = {
    ...imageGroupComponents,
    ...avatarBadgeComponents,
    ...bubbleScoreComponents,
    ...cardLoadingComponents,
    ...imageWithTagsComponents,
    ...titleComponents
};

export const $defs = {
    ImageGroupItem,
    Title: TitleProps
};
