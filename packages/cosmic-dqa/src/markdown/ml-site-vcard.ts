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

import SiteVcard from '@cosui/cosmic-dqa/site-vcard';
import {DirectiveInfo} from './interface';

const mlSiteVcard = {
    directive: 'ml-site-vcard',
    csr: function (node: DirectiveInfo) {
        let data = node.properties || {};
        // 当前互动定的数据为linkinfo，后续转换为url后删除data.linkinfo
        const href = data.url || data.linkinfo;
        data = {
            ...data,
            linkInfo: href ? {
                href,
                target: '_blank'
            } : {}
        };
        const el = document.createElement('div');
        el.setAttribute('rl-type', 'stop');
        const comp = new SiteVcard({
            data
        });
        comp.attach(el);
        this.fire('show', {
            directive: mlSiteVcard.directive,
            target: comp,
            data
        });
        // @ts-ignore
        this.setDirectiveComponents(mlSiteVcard.directive, comp);
        return el;
    },
    ssr: function (node: DirectiveInfo) {
        const data = node.properties?.data || {};
        // @ts-ignore
        // eslint-disable-next-line @babel/new-cap
        const html = SiteVcard({
            ...data
        });
        return `<div rl-type="stop">${html}</div>`;
    }
};
export default mlSiteVcard;