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
import Tag from '@cosui/cosmic/tag';
import Image from '@cosui/cosmic/image';
import type {OfficialCardCenterData} from './interface';

export default class Centered extends Component<OfficialCardCenterData> {

    static template = `
        <div class="cosd-official-card-centered">
            <cos-image
                src="{{poster && poster.src}}"
                class="cosd-official-card-centered-box"
            >
                <div class="cosd-official-card-centered-box-content">
                    <div
                        s-if="title"
                        class="cosd-official-card-centered-box-content-title"
                    >
                        {{title}}
                    </div>
                    <div
                        s-if="introduction"
                        class="cosd-official-card-centered-box-content-introduction"
                    >
                        {{introduction}}
                    </div>
                    <div s-if="showTags" class="cosd-official-card-centered-box-content-tag">
                        <cos-tag
                            s-for="text, index in tag"
                            key="{{index}}"
                            appearance="filled"
                            size="sm"
                            class="cos-color-text-on-primary-light cos-color-bg-primary-light cos-space-mr-xs"
                        >
                            {{text}}
                        </cos-tag>
                    </div>
                    <div s-else class="cosd-official-card-centered-box-content-tag">
                        <cos-tag
                            appearance="filled"
                            size="sm"
                            class="cos-color-text-on-primary-light cos-color-bg-primary-light cos-space-mr-xs"
                        >
                            {{tag}}
                        </cos-tag>
                    </div>
                </div>
                <div class="cosd-official-card-centered-box-logo">
                    <cos-image 
                        src="https://xin-static.cdn.bcebos.com/aiqicha-m/cosmic/official-card/norm-logo-mount.png"
                        class="cosd-official-card-centered-box-logo-mount"
                    >
                        <cos-image 
                            src="{{logo}}"
                            class="cosd-official-card-centered-box-logo-mount-img"
                        />
                    </cos-image>
                </div>
            </cos-image>
        </div>
    `;

    static components = {
        'cos-image': Image,
        'cos-tag': Tag
    };

    static computed = {
        showTags(this: Centered) {
            const tag = this.data.get('tag');
            return Array.isArray(tag) && tag?.length > 0;
        }
    };

    initData(): OfficialCardCenterData {
        return {
            poster: {
                src: ''
            },
            tag: '',
            logo: '',
            title: '',
            introduction: ''
        };
    }
}
