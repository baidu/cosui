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
 * @file cosmic-dqa 组件定义汇总
 */

import {components as agentCardComponents} from './agent-card';
import {components as authorCardComponents} from './author-card';
import {components as carScrollComponents, CarItemSchema} from './car-scroll';
import {components as chartComponents} from './chart';
import {components as citationComponents} from './citation';
import {components as companyCardComponents} from './company-card';
import {components as companyGraphComponents} from './company-graph';
import {components as comparisonComponents} from './comparison';
import {components as copyableTextComponents} from './copyable-text';
import {components as documentScrollComponents, DocumentSchema} from './document-scroll';
import {components as entityCardComponents} from './entity-card';
import {components as entityListComponents} from './entity-list';
import {components as generatingViewComponents} from './generating-view';
import {components as greetingCardComponents} from './greeting-card';
import {components as hotelCardComponents} from './hotel-card';
import {components as locationCardComponents} from './location-card';
import {components as locationListComponents, LocationListItem} from './location-list';
import {components as markdownComponents} from './markdown';
import {components as microContentScrollComponents, MicroContentSchema} from './micro-content-scroll';
import {components as musicPlayerComponents} from './music-player';
import {components as officialCardComponents} from './official-card';
import {components as questionGuideComponents, OptionSchema} from './question-guide';
import {components as relationshipComponents} from './relationship';
import {components as searchHeaderComponents} from './search-header';
import {components as searchingOutlinesComponents, SearchingOutlinesItem} from './searching-outlines';
import {components as searchingStepsComponents} from './searching-steps';
import {components as shopAddressComponents} from './shop-address';
import {components as siteVcardListComponents} from './site-vcard-list';
import {components as siteVcardComponents, SiteVcardProps} from './site-vcard';
import {components as tagLinkComponents} from './tag-link';
import {components as transportTicketListComponents} from './transport-ticket-list';
import {components as transportTicketComponents, TransportTicketProps} from './transport-ticket';
import {components as productCardComponents, ProductTag} from './product-card';
import {
    components as routePlannerComponents,
    LocationItem,
    TransportOption,
    RouteItem
} from './route-planner';

import {components as filmCardComponents} from './film-card';

export const components = {
    ...filmCardComponents,
    ...routePlannerComponents,
    ...productCardComponents,
    ...agentCardComponents,
    ...authorCardComponents,
    ...carScrollComponents,
    ...chartComponents,
    ...citationComponents,
    ...companyCardComponents,
    ...companyGraphComponents,
    ...comparisonComponents,
    ...copyableTextComponents,
    ...documentScrollComponents,
    ...entityCardComponents,
    ...entityListComponents,
    ...generatingViewComponents,
    ...greetingCardComponents,
    ...hotelCardComponents,
    ...locationCardComponents,
    ...locationListComponents,
    ...markdownComponents,
    ...microContentScrollComponents,
    ...musicPlayerComponents,
    ...officialCardComponents,
    ...questionGuideComponents,
    ...relationshipComponents,
    ...searchHeaderComponents,
    ...searchingOutlinesComponents,
    ...searchingStepsComponents,
    ...shopAddressComponents,
    ...siteVcardListComponents,
    ...siteVcardComponents,
    ...tagLinkComponents,
    ...transportTicketListComponents,
    ...transportTicketComponents
};

export const $defs = {
    ProductTag,
    LocationItem,
    TransportOption,
    RouteItem,
    SearchingOutlinesItem,
    LocationListItem,
    CarItem: CarItemSchema,
    DocumentItem: DocumentSchema,
    MicroContentItem: MicroContentSchema,
    QuestionGuideOption: OptionSchema,
    SiteVcard: SiteVcardProps,
    TransportTicket: TransportTicketProps
};
