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
 * @file AvatarBadge 组件
 */

import {Component} from 'san';
import type {AvatarBadgeData} from './interface';

//  目前编译暂不支持别名的方式使用 comsic 里的类型声明，暂使用相对路径
import {Size} from '../util/constant';
import Icon from '@cosui/cosmic/icon';
import Badge from '@cosui/cosmic/badge';
export default class AvatarBadge extends Component<AvatarBadgeData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cosc-avatar-badge cosc-avatar-badge-{{size}}">
            <!-- 文字徽章(包含直播中) -->
            <cos-badge s-if="{{(text ||(type === 'live'))}}"
                value="{{isLargerSize ? (text || '直播中') : ''}}"
                class="cosc-avatar-badge-text{{type === 'live' ? ' cosc-avatar-badge-live' : ''}}">
                <!--该div节点存在是为了直播动画实现需要 -->
                <div>
                    <slot />
                    <template s-if="{{type === 'live'}}">
                        <div class="cosc-avatar-badge-border-inner"></div>
                        <div class="cosc-avatar-badge-border-outer"></div>
                    </template>
                </div>
            </cos-badge>
            <!-- vip 徽章 -->
            <template s-else>
                <slot />
                <div s-if="{{isVip}}" class="cosc-avatar-badge-vip cosc-avatar-badge-{{type}}">
                    <img s-if="{{type === 'vip-1'}}" src="https://psstatic.cdn.bcebos.com/basics/cosmic/v1_1736760310000.png"/>
                    <cos-icon s-else name="v-mark"></cos-icon>
                </div>
            </template>
        </div>
    `;

    static components = {
        'cos-icon': Icon,
        'cos-badge': Badge
    };

    static computed = {
        isVip(this: AvatarBadge) {
            const type = this.data.get('type');
            const pattern = /^vip-(1|2|3|4)$/;
            return type && pattern.test(type);
        },
        isLargerSize(this: AvatarBadge) {
            const size = this.data.get('size');
            return size === Size.MD || size === Size.LG;
        }
    };

    initData(): AvatarBadgeData {
        return {
            type: null,
            text: '',
            size: Size.MD
        };
    }
}