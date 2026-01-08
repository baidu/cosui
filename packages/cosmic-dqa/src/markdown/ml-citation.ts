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

import {DirectiveInfo} from './interface';
import Citation from '@cosui/cosmic-dqa/citation';
import type {CitationProps, Source as CitationSource} from '../citation/interface';

// 格式化返回source中tag的数据，tag中注入颜色和背景色的css变量
function getFormatTagSource(source?: CitationSource) {
    if (!source || !source.tag) {
        return {
            ...(source || {}),
            tag: {}
        };
    }

    const tag = typeof source.tag === 'object' ? source.tag : {text: source.tag};
    const vars: string[] = [];
    const tagColor = tag.color || '--cos-color-text-on-primary-light';
    const tagBgColor = tag.bgColor || '--cos-color-bg-primary-light';
    vars.push(`--cosd-citation-tag-color:${tagColor.startsWith('--') ? `var(${tagColor})` : tagColor}`);
    vars.push(`--cosd-citation-tag-bg-color:${tagBgColor.startsWith('--') ? `var(${tagBgColor})` : tagBgColor}`);

    return {
        ...source,
        tag: {
            text: tag.text || '',
            colorVars: vars.join(';')
        }
    };
}

// 所有:ml-citation的指令都会走到这里，溯源角标和可信溯源都是:ml-citation指令
const mlCitation = {
    directive: 'ml-citation',
    ssr: function (node: DirectiveInfo) {
        const citationsData = node.properties?.data || [];
        let data = {} as CitationProps;
        let str = '';
        // 这里的ref实际上就是每一个:ml-citation指令携带的ref参数
        const refs = node.properties?.ref ? (node.properties?.ref as string).split(',') : [node.content];
        const appearance = (node.properties?.appearance as string) || '';
        if (appearance === 'link') {
            const allDefault = refs.every(ref => {
                if (ref && Array.isArray(citationsData)) {
                    data = citationsData[+ref - 1] || {};
                }
                else {
                    data = (citationsData || {}) as CitationProps;
                }
                return data?.source?.type === 'default';
            });
            if (allDefault) {
                str = '搜索结果';
                return `<span>${str}</span>`;
            }
        }

        refs.map(ref => {
            if (!ref) {
                return;
            }
            let curRef = +ref;
            if (ref && Array.isArray(citationsData)) {
                data = citationsData[+ref - 1] || {};

                // 判断本项前面是否有隐藏项，如果有隐藏项，下标需要减去本项之前隐藏项的数量
                curRef -= citationsData.slice(0, curRef - 1).reduce((acc, item) => (item.hidden ? acc + 1 : acc), 0);
            }
            else {
                data = (citationsData || {}) as CitationProps;
            }

            // 权威溯源 (link 类型的溯源)，直接展示链接到文本中
            if (appearance === 'link') {

                // 有文本且没中兜底，则渲染，否则不渲染
                if (data?.source?.name && data?.source?.type !== 'default') {
                    // eslint-disable-next-line @babel/new-cap
                    const citationHtml = Citation({
                        appearance: 'link',
                        ...data
                    });
                    str += citationHtml;
                }
                return;
            }

            // 可信溯源，溯源类型在 data 中
            if (appearance === 'tag' || data.appearance === 'tag') {
                // 有来源信息则渲染，否则不渲染
                if (data?.source?.tag && !data.hidden) {
                    // eslint-disable-next-line @babel/new-cap
                    const citationHtml = Citation({
                        ...data,
                        appearance: 'tag',
                        citationId: curRef,
                        source: getFormatTagSource(data.source)
                    });
                    str += citationHtml;
                }
                return;
            }
            if (data.hidden) {

                // 隐藏该项，结束这一次循环，不对str进行拼接
                return;
            }
            // eslint-disable-next-line max-len
            str += `<span class="cosd-citation" rl-type="stop"><span class="cosd-citation-citationId">${curRef}</span></span>`;
        });
        // link 模式下，需要被播报
        return `<span ${appearance === 'link' ? '' : 'disable-audio disable-copy disable-jump'}>${str}</span>`;
    },
    csr: function (node: DirectiveInfo) {
        const element = document.createElement('span');
        // 兼容单个和多个数据
        const refs = node.properties?.ref ? (node.properties?.ref as string).split(',') : [node.content];
        const appearance = (node.properties?.appearance as string) || '';
        if (appearance === 'link') {
            const citationsData = node.properties?.data || [];
            let data = {} as CitationProps;
            const allDefault = refs.every(ref => {
                if (ref && Array.isArray(citationsData)) {
                    data = citationsData[+ref - 1] || {};
                }
                else {
                    data = (citationsData || {}) as CitationProps;
                }
                return data?.source?.type === 'default';
            });
            if (allDefault) {
                element.textContent = '搜索结果';
                return element;
            }
        }
        else {
            element.setAttribute('disable-audio', 'true');
            element.setAttribute('disable-copy', 'true');
            element.setAttribute('disable-jump', 'true');
        }

        refs.forEach(ref => {
            if (!ref) {
                return;
            }
            let curRef = +ref;
            const el = document.createElement('span');
            const citationsData = node.properties?.data || [];
            let data = {} as CitationProps;
            // 打字机效果下，可能存在数据没返回的情况
            if (!citationsData || typeof citationsData === 'string') {
                data = {} as CitationProps;

                // link 类型强依赖数据，没有数据则不展现
                if (appearance === 'link') {
                    return;
                }
                // eslint-disable-next-line max-len
                el.innerHTML = `<span class="cosd-citation" rl-type="stop"><span class="cosd-citation-citationId">${ref}</span></span>`; // bca-disable-line
                element.appendChild(el);
                return;
            }
            else if (Array.isArray(citationsData)) {
                data = citationsData[curRef - 1] || {};

                // 判断本项前面是否有隐藏项，如果有隐藏项，下标需要减去本项之前隐藏项的数量
                curRef -= citationsData.slice(0, curRef - 1).reduce((acc, item) => (item.hidden ? acc + 1 : acc), 0);
            }
            else {
                data = (citationsData || {}) as CitationProps;
            }

            if ((appearance !== 'link' && data.hidden)
                || (appearance === 'link' && (!data?.source?.name || data?.source?.type === 'default'))
                || (data.appearance === 'tag' && !data.source?.tag)
            ) {
                return;
            }
            el.setAttribute('rl-type', 'stop');
            data.citationId = String(curRef);
            const config = this.data.get('config')[mlCitation.directive];
            if (config && typeof config.getPopupContainer === 'function') {
                data.getPopupContainer = config.getPopupContainer;
            }

            // 兼容老组件的数据，待业务修改后删除
            // @ts-ignore
            data.isVideo = data.type === 'video';
            let citationCompData = {
                ...data,
                appearance: data.appearance || appearance,
                source: getFormatTagSource(data.source)
            };

            const citationComp = new Citation({
                data: citationCompData
            });
            citationComp.on('click', (params: any) => {
                this.fire('click', {
                    directive: mlCitation.directive,
                    ...params,
                    data
                });
            });
            citationComp.on('toggle', (params: any) => {
                this.fire('toggle', {
                    directive: mlCitation.directive,
                    ...params,
                    data
                });
            });
            citationComp.attach(el);

            // @ts-ignore
            this.setDirectiveComponents(mlCitation.directive, citationComp);
            element.appendChild(el);
        });
        return element;
    }
};
export default mlCitation;
