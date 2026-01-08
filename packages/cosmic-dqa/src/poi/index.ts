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

import {Component} from 'san';
import Image from '@cosui/cosmic/image';
import Icon from '@cosui/cosmic/icon';

import type {PoiData, PoiEvents} from './interface';

export default class Poi extends Component<PoiData> {
    static template = `
        <component
            s-is="{{folded ? 'span' : 'div'}}"
            class="cosd-poi cos-text-body cos-line-clamp-1"
            style="{{boxStyle}}"
        >
            <!--弱样式-->
            <a
                s-if="folded"
                class="cosd-poi-weak"
                s-bind="{{linkInfo}}"
                on-click="invokeMap"
            >
                <cos-icon name="mappin" class="cosd-poi-weak-icon" />
                <span s-if="area" class="cos-space-ml-xxs">{{area}}</span>
                <span s-if="area" class="cosd-poi-line">|</span>
                <span s-if="address" class="cos-space-ml-xxs cos-line-clamp-1">{{address}}</span>
            </a>
            <!--强样式-->
            <a
                s-else
                s-bind="{{linkInfo}}"
                on-click="invokeMap"
                class="cosd-poi-block"
            >
                <cos-image
                    src="{{mapImage}}"
                    class="cos-image-3-1 cos-image-fit-cover cos-image-position-center"
                >
                    <img s-if="marker" class="cosd-poi-map-icon" src="https://gips1.baidu.com/it/u=1257137061,2585202258&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f164_202">
                </cos-image>
            </a>
        </component>
    `;

    static components = {
        'cos-image': Image,
        'cos-icon': Icon
    };
    static computed = {
        boxStyle(this: Poi) {
            const folded = this.data.get('folded');
            const maxWidth = this.data.get('maxWidth') || '100%';
            if (folded) {
                return {
                    display: 'inline-block',
                    'max-width': maxWidth,
                    'padding-right': maxWidth === '100%' ? '0' : '6px'
                };
            }
            return {
                display: 'block',
                width: '100%'
            };
        }
    };

    initData(): PoiData {
        return {
            mapImage: '',
            marker: false,
            linkInfo: {},
            invokeInfo: {},
            // 仅弱样式下传
            area: '',
            address: '',
            folded: false
        };
    }

    attached() {

        this.nextTick(() => {
            const invokeInfo = this.data.get('invokeInfo');
            this.fire<PoiEvents['poi-ready']>('poi-ready', {
                posName: 'pos_invoke_bdmap_poi',
                params: invokeInfo?.params,
                defaultUrl: invokeInfo?.defaultUrl,
                inited: (invokeCallback: (event: Event) => void) => {

                    // 导航点击覆盖常规处理函数
                    this.invokeMap = (event: Event) => {
                        this.fire<PoiEvents['click']>('click', {event});
                        invokeCallback(event);
                    };
                }
            });
        });
    }

    // 调起地图单点页
    invokeMap(event: Event) {
        this.fire<PoiEvents['click']>('click', {event});
    }
}
