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

import Relationship from '@cosui/cosmic-dqa/relationship';
import {DirectiveInfo} from './interface';

const mlRelationship = {
    directive: 'ml-relationship',
    csr: function (node: DirectiveInfo) {
        const data = node.properties?.data || {};
        const el = document.createElement('div');
        el.setAttribute('rl-type', 'stop');
        el.setAttribute('disable-audio', 'true');
        el.setAttribute('disable-copy', 'true');
        const comp = new Relationship({
            data
        });
        comp.on('scrollend', (params: any) => {
            this.fire('scrollend', {
                directive: mlRelationship.directive,
                ...params,
                data
            });
        });
        comp.on('click', (params: any) => {
            this.fire('click', {
                directive: mlRelationship.directive,
                ...params,
                data
            });
        });
        comp.attach(el);
        // @ts-ignore
        this.setDirectiveComponents(mlRelationship.directive, comp);
        return el;
    },
    ssr: function (node: DirectiveInfo) {
        const data = node.properties?.data || {};
        // @ts-ignore
        // eslint-disable-next-line @babel/new-cap
        const html = Relationship({
            ...data
        });
        return `<div rl-type="stop">${html}</div>`;
    }
};
export default mlRelationship;
