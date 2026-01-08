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
import Tag from '@cosui/cosmic/tag';
import {isURL} from '@cosui/cosmic/util';
import {CompanyCardProps, CompanyCardData, LEVELMap} from './interface';

export default class CompanyCard extends Component<CompanyCardData> {

    static template = `
        <div class="cosd-company-card-container">
            <component
                s-is="linkInfo && linkInfo.href ? 'a' : 'div'"
                s-bind="{{linkInfo}}"
                class="cosd-company-card"
            >
                <cos-image
                    src="{{curLevelInfo.bg}}"
                    class="cosd-company-card-box"
                >
                    <div class="cosd-company-card-box-content">
                        <cos-image 
                            s-if="curLevelInfo.label"
                            src="{{curLevelInfo.label}}"
                            class="cosd-company-card-box-content-label"
                        />
                        <div
                            s-if="name"
                            class="cosd-company-card-box-content-name
                                {{name.length > 16 && 'cosd-company-card-box-content-name-long'}}"
                        >
                            {{name}}
                        </div>
                        <div
                            s-if="legalPerson"
                            class="cosd-company-card-box-content-legal-person"
                        >
                            法定代表人：{{legalPerson}}
                        </div>
                        <div
                            s-if="registeredCapital"
                            class="cosd-company-card-box-content-registered-capital"
                        >
                            注册资本：{{registeredCapital}}
                        </div>
                        <div s-if="tags && tags.length" class="cosd-company-card-box-content-tags">
                            <cos-tag
                                s-for="text, index in tags"
                                key="{{index}}"
                                appearance="filled"
                                size="sm"
                                class="cosd-company-card-box-content-tags-item {{curLevelInfo.tagClass}}"
                            >
                                {{text}}
                            </cos-tag>
                        </div>
                    </div>
                    <div class="cosd-company-card-box-logo">
                        <cos-image 
                            src="{{curLevelInfo.mount}}"
                            class="cosd-company-card-box-logo-mount"
                        >
                            <cos-image 
                                s-if="_isUrl"
                                src="{{logo}}"
                                class="cosd-company-card-box-logo-mount-img"
                            />
                            <div
                                s-else
                                class="cosd-company-card-box-logo-mount-logoword"
                                style="background-color: {{curLevelInfo.logoWordBg}}"
                            >
                                <div class="cosd-company-card-box-logo-mount-logoword-text">
                                    {{logo}}
                                </div>
                            </div>
                        </cos-image>
                    </div>
                </cos-image>
            </component>
        </div>
    `;

    static components = {
        'cos-image': Image,
        'cos-tag': Tag
    };

    static computed = {
        curLevelInfo(this: CompanyCard) {
            const level = this.data.get('level');
            return level ? LEVELMap[level] : LEVELMap.normal;
        },

        _isUrl(this: CompanyCard) {
            const logo = this.data.get('logo');
            return isURL(logo);
        }
    };

    initData(): CompanyCardProps {
        return {
            // 作者头像链接
            level: undefined,
            // 名片logo
            logo: '',
            // 作者名称
            name: '',
            // 法定代表人
            legalPerson: '',
            // 注册资本
            registeredCapital: '',
            // 作者名称下短文本集
            tags: [],
            // 跳转链接
            linkInfo: undefined
        };
    }
}
