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
 *
 * @file 展开收起组件
 */

import {Component} from 'san';
import MoreLink from '@cosui/cosmic/more-link';
import FoldSwitch from '@cosui/cosmic/fold-switch';
import Loading from '@cosui/cosmic/loading';
import type {FoldProps, FoldData, FoldEvents} from './interface';

export default class Fold extends Component<FoldData> {

    static template = `
        <div class="cos-fold">
            <div
                s-ref="content"
                style="{{ _isFolded && _curHeight ? 'overflow: hidden; height: ' + _curHeight + 'px' : '' }}"
                class="cos-fold-content"
            >
                <slot></slot>
            </div>
            <cos-more-link
                s-if="_showMore"
                class="cos-fold-more"
                url="{{moreUrl || (moreLinkInfo && moreLinkInfo.href)}}"
                target="{{moreTarget || (moreLinkInfo && moreLinkInfo.target)}}"
                link-info="{{moreLinkInfo}}"
            >
                {{moreText}}
            </cos-more-link>
            <cos-fold-switch
                s-if="_showSwitch && !asyncLoading"
                folded="{{_isFolded}}"
                mask="{{mask}}"
                unfold-text="{{unfoldText}}"
                fold-text="{{foldText}}"
                on-toggle="handleToggle"
            />
            <cos-loading s-if="asyncLoading" text="{{null}}" position="right" />
        </div>
    `;

    static components = {
        'cos-more-link': MoreLink,
        'cos-fold-switch': FoldSwitch,
        'cos-loading': Loading
    };

    initData(): FoldProps {
        return {
            action: 'foldable',
            foldHeight: 24,
            foldText: '收起',
            unfoldText: '展开',
            moreUrl: '',
            moreTarget: undefined,
            moreText: '查看更多',
            moreLinkInfo: {},
            asyncLoading: false,
            mask: false,

            _isFolded: true,
            _showMore: false,
            _showSwitch: true
        };
    }

    inited() {
        this.data.set('_curHeight', this.data.get('foldHeight'));
    }

    created() {
        this.watch('foldHeight', height => {
            if (!this.data.get('_isFolded')) {
                return;
            }
            // 收起状态更新高度
            this.data.set('_curHeight', height);
        });
    }

    handleToggle(e: {
        status: 'folded' | 'unfolded';
        event: Event;
    }) {
        // 点击收起，折叠态
        if (e.status === 'folded') {
            this.data.set('_isFolded', true);
            this.fire<FoldEvents['toggle']>('toggle', {
                status: 'folded',
                event: e.event
            });
            return;
        }

        // 点击展开，显示全部内容
        const action = this.data.get('action');
        if (action === 'more') {
            this.data.set('_showMore', true);
            this.data.set('_showSwitch', false);
        }
        else if (action === 'unfold-only') {
            this.data.set('_showMore', false);
            this.data.set('_showSwitch', false);
        }

        this.data.set('_isFolded', false);
        this.fire<FoldEvents['toggle']>('toggle', {
            status: 'unfolded',
            event: e.event
        });
    }
}
