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
import Button from '@cosui/cosmic/button';
import type {DocumentCardData} from './interface';

export default class DocumentCard extends Component<DocumentCardData> {

    static template = `
        <div class="cosd-document-scroll-card">
            <div class="cosd-document-scroll-card-content">
                <div class="cosd-document-scroll-card-logo">
                    <cos-image
                        src="{{logo}}"
                        class="cos-image-fit-cover cos-image-position-center cos-image-1-1"
                    />
                </div>
                <div class="cos-line-clamp-1">
                    <div class="cosd-document-scroll-card-title">
                        {{title}}
                    </div>
                    <div class="cosd-document-scroll-card-size">
                        {{type}} {{size}}
                    </div>
                </div>
            </div>
            <div s-if="actionText" class="cos-space-ml-xs">
                <cos-button
                    size="sm"
                    appearance="plain"
                    class="cosd-document-scroll-card-btn"
                >{{actionText}}</cos-button>
            </div>
        </div>
    `;

    static components = {
        'cos-image': Image,
        'cos-button': Button
    };

    initData() {
        return {
            logo: '',
            title: '',
            type: '',
            size: '',
            actionText: ''
        };
    }
}
