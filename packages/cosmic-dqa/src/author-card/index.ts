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
import Avatar from '@cosui/cosmic/avatar';
import Tag from '@cosui/cosmic/tag';
import type {AuthorCardProps, AuthorCardData} from './interface';

export default class AuthorCard extends Component<AuthorCardData> {

    static template = `
        <component
            s-is="linkInfo.href ? 'a' : 'div'"
            s-bind="{{linkInfo}}"
            class="cosd-author-card"
        >

            <!-- 头像  -->
            <cos-avatar
                src="{{avatar}}"
                size="md"
                class="cos-space-mr-sm cosd-author-card-avatar"
            />

            <!-- 作者内容 -->
            <div class="cosd-author-card-content">
                <div class="cosd-author-card-name">
                    <!-- 作者名字 -->
                    <span class="cosd-author-card-name-text">{{name}}</span>
                    <!-- tag -->
                    <cos-tag
                        s-if="tag"
                        class="cosd-author-card-tag"
                    >
                        {{tag}}
                    </cos-tag>
                </div>

                <!-- 作者名称下短文本集 -->
                <div class="cosd-author-card-abstract">
                    <span
                        s-for="text, index in caption"
                        class="cos-space-mr-xxs"
                        key="{{index}}"
                    >
                        {{text}}
                    </span>
                </div>
            </div>
        </component>
    `;

    static components = {
        'cos-avatar': Avatar,
        'cos-tag': Tag
    };

    initData(): AuthorCardProps {
        return {
            // 作者头像链接
            avatar: '',
            // 作者名称
            name: '',
            // 作者名称下短文本集
            caption: [],
            // 跳转链接
            linkInfo: undefined,
            // tag信息
            tag: ''
        };
    }
}
