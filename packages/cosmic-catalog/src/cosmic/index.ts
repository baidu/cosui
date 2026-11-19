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
 * @file cosmic 组件定义汇总
 */

import {components as accordionComponents} from './accordion';
import {components as audioPlayerComponents} from './audio-player';
import {components as avatarGroupComponents} from './avatar-group';
import {components as avatarComponents} from './avatar';
import {components as badgeComponents} from './badge';
import {components as calendarComponents} from './calendar';
import {components as cascaderComponents, CascaderOption} from './cascader';
import {components as citySelectorComponents, CitySchema} from './city-selector';
import {components as commentComponents} from './comment';
import {components as commonSearchInputComponents} from './common-search-input';
import {components as datePickerComponents} from './date-picker';
import {components as dateTimePickerComponents} from './date-time-picker';
import {components as dialogComponents} from './dialog';
import {components as drawerComponents} from './drawer';
import {components as emptyComponents} from './empty';
import {components as foldSwitchComponents} from './fold-switch';
import {components as foldComponents} from './fold';
import {components as iconComponents} from './icon';
import {components as imageComponents} from './image';
import {components as inputComponents} from './input';
import {components as linkComponents} from './link';
import {components as loadingComponents} from './loading';
import {components as mapComponents, MapDistrict} from './map';
import {components as masonryComponents} from './masonry';
import {components as moreLinkComponents, MoreLinkProps} from './more-link';
import {components as paginationComponents} from './pagination';
import {components as pickerComponents} from './picker';
import {components as popoverComponents} from './popover';
import {components as priceComponents} from './price';
import {components as radioGroupComponents} from './radio-group';
import {components as radioComponents} from './radio';
import {components as rankComponents} from './rank';
import {components as rowLanesComponents} from './row-lanes';
import {components as scoreComponents, ScoreProps} from './score';
import {components as selectComponents, SelectOption} from './select';
import {components as sliderComponents} from './slider';
import {components as swiperComponents} from './swiper';
import {components as switcherComponents} from './switcher';
import {components as tagComponents, TagProps} from './tag';
import {components as textareaComponents} from './textarea';
import {components as timePickerComponents} from './time-picker';
import {components as timelineComponents} from './timeline';
import {components as tooltipComponents} from './tooltip';
import {components as voteComponents} from './vote';
import {components as buttonComponents} from './button';
import {components as checkboxComponents} from './checkbox';
import {components as checkboxGroupComponents} from './checkbox-group';
import {components as tabsComponents} from './tabs';
import {components as tableComponents, TableColumn} from './table';

export const components = {
    ...tableComponents,
    ...tabsComponents,
    ...checkboxGroupComponents,
    ...checkboxComponents,
    ...buttonComponents,
    ...accordionComponents,
    ...audioPlayerComponents,
    ...avatarGroupComponents,
    ...avatarComponents,
    ...badgeComponents,
    ...calendarComponents,
    ...cascaderComponents,
    ...citySelectorComponents,
    ...commentComponents,
    ...commonSearchInputComponents,
    ...datePickerComponents,
    ...dateTimePickerComponents,
    ...dialogComponents,
    ...drawerComponents,
    ...emptyComponents,
    ...foldSwitchComponents,
    ...foldComponents,
    ...iconComponents,
    ...imageComponents,
    ...inputComponents,
    ...linkComponents,
    ...loadingComponents,
    ...mapComponents,
    ...masonryComponents,
    ...moreLinkComponents,
    ...paginationComponents,
    ...pickerComponents,
    ...popoverComponents,
    ...priceComponents,
    ...radioGroupComponents,
    ...radioComponents,
    ...rankComponents,
    ...rowLanesComponents,
    ...scoreComponents,
    ...selectComponents,
    ...sliderComponents,
    ...swiperComponents,
    ...switcherComponents,
    ...tagComponents,
    ...textareaComponents,
    ...timePickerComponents,
    ...timelineComponents,
    ...tooltipComponents,
    ...voteComponents
};

export const $defs = {
    TableColumn,
    CascaderOption,
    MapDistrict,
    SelectOption,
    City: CitySchema,
    MoreLink: MoreLinkProps,
    Score: ScoreProps,
    Tag: TagProps
};
