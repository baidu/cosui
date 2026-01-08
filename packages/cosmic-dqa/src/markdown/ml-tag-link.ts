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

import TagLink from '@cosui/cosmic-dqa/tag-link';
import {DirectiveInfo} from './interface';
import {TagLinkProps} from '../tag-link/interface';

const mlTagLink = {
    directive: 'ml-tag-link',
    csr: function (node: DirectiveInfo) {
        const el = document.createElement('span');
        el.setAttribute('rl-type', 'stop');
        const data = node.properties?.data as TagLinkProps;
        const tagLinkComp = new TagLink({
            data
        });
        tagLinkComp.on('click', () => {
            this.fire('click', {
                directive: mlTagLink.directive,
                data
            });
        });
        tagLinkComp.attach(el);
        return el;
    },
    ssr: (node: DirectiveInfo) => {
        const data = node.properties?.data as TagLinkProps;
        // @ts-ignore
        // eslint-disable-next-line @babel/new-cap
        const html = TagLink({
            ...data
        });
        return `<span rl-type="stop">${html}</span>`;
    }
};
export default mlTagLink;
