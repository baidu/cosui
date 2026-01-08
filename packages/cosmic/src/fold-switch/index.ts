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
 * @file 展开收起切换组件
 */

import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import Icon from '@cosui/cosmic/icon';
import type {FoldSwitchData, FoldSwitchEvents} from './interface';

export default class FoldSwitch extends Component<FoldSwitchData> {

    static template = `
        <div class="cos-fold-switch">
            <div class="cos-fold-switch-mask" s-if="folded && mask"></div>
            <div
                on-click="handleClick"
                class="cos-fold-switch-context"
            >
                <!-- 为了处理 ios 部分浏览器下, 视图渲染与 DOM 内容不一致的问题，此处通过 s-if 控制展示不同节点 -->
                <span s-if="{{folded}}" class="cos-fold-switch-text">
                    {{unfoldText}}
                </span>
                <span s-else class="cos-fold-switch-text">
                    {{foldText}}
                </span>
                <cos-icon
                    class="cos-fold-switch-icon"
                    name="{{folded ? 'down' : 'up'}}"
                />
            </div>
        </div>
    `;

    static components = {
        'cos-button': Button,
        'cos-icon': Icon
    };

    initData(): FoldSwitchData {
        return {
            folded: true,
            foldText: '收起',
            unfoldText: '展开',
            mask: false
        };
    }

    handleClick(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        this.fire<FoldSwitchEvents['toggle']>('toggle', {
            status: this.data.get('folded') ? 'unfolded' : 'folded',
            event
        });
    }
}
