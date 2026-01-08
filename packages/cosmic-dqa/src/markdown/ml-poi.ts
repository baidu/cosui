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

import DqaPoi from '@cosui/cosmic-dqa/poi';
import {DirectiveInfo} from './interface';
import {PoiProps} from '../poi/interface';

const mlPoi = {
    directive: 'ml-poi',
    csr: function (node: DirectiveInfo) {
        const el = document.createElement('span');
        el.setAttribute('rl-type', 'stop');
        el.setAttribute('disable-audio', 'true');
        const data = node.properties?.data as PoiProps;
        const poiComp = new DqaPoi({
            data
        });
        poiComp.on('click', (params: any) => {
            this.fire('click', {
                directive: mlPoi.directive,
                ...params,
                data
            });
        });
        poiComp.on('poi-ready', (params: any) => {
            this.fire('poi-ready', params);
        });
        poiComp.on('toggle', (params: any) => {
            this.fire('toggle', {
                directive: mlPoi.directive,
                ...params
            });
        });
        poiComp.attach(el);
        // @ts-ignore
        this.setDirectiveComponents(mlPoi.directive, poiComp);
        return el;
    },
    ssr: (node: DirectiveInfo) => {
        const data = node.properties?.data as PoiProps;
        // @ts-ignore
        // eslint-disable-next-line @babel/new-cap
        const html = DqaPoi({
            ...data
        });
        return `<span rl-type="stop">${html}</span>`;
    }
};
export default mlPoi;
