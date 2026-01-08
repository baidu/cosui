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

import DqaShopAddress from '@cosui/cosmic-dqa/shop-address';
import {DirectiveInfo} from './interface';
import type {ShopAddressProps} from '../shop-address/interface';

const mlShopAddress = {
    directive: 'ml-shop-address',
    csr: function (node: DirectiveInfo) {
        const el = document.createElement('span');
        el.setAttribute('rl-type', 'stop');
        el.setAttribute('disable-audio', 'true');
        const data = node.properties?.data as ShopAddressProps;
        const shopAddressComp = new DqaShopAddress({
            data
        });
        shopAddressComp.on('click', (params: any) => {
            this.fire('click', {
                directive: mlShopAddress.directive,
                ...params,
                data
            });
        });
        shopAddressComp.on('poi-ready', (params: any) => {
            this.fire('poi-ready', params);
        });
        shopAddressComp.on('toggle', (params: any) => {
            this.fire('toggle', {
                directive: mlShopAddress.directive,
                ...params
            });
        });
        shopAddressComp.attach(el);
        // @ts-ignore
        this.setDirectiveComponents(mlShopAddress.directive, shopAddressComp);
        return el;
    },
    ssr: (node: DirectiveInfo) => {
        const data = node.properties?.data as ShopAddressProps;
        // @ts-ignore
        // eslint-disable-next-line @babel/new-cap
        const html = DqaShopAddress({
            ...data
        });
        return `<span rl-type="stop" disable-audio="true">${html}</span>`;
    }
};
export default mlShopAddress;
