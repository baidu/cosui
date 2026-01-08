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
 * @file comment
 */

import {Component} from 'san';
import Avatar from '@cosui/cosmic/avatar';
import Icon from '@cosui/cosmic/icon';
import Tag from '@cosui/cosmic/tag';
import {CommentProps, CommentData, CommentEvents} from './interface';

const MAX_CAPTION_TAG_NUM = 3;
export default class Comment extends Component<CommentData> {
    static trimWhitespace = 'all';

    static template = `
        <div class="cos-comment">
            <!-- 评论头部 -->
            <div class="cos-comment-header">
                <!-- 头像 -->
                <cos-avatar class="cos-comment-header-avatar"
                    src="{{avatar}}"
                    alt="{{author.name}}"
                    size="sm"
                />
                <div class="cos-comment-header-author">
                    <span class="cos-comment-header-author-name">{{author.name}}</span>
                    <span
                        s-for="item, index in visibleCaptions"
                        class="cos-comment-header-author-caption">
                        {{item}}
                    </span>
                    <cos-tag
                        s-for="item, index in visibleTags"
                        appearance="{{item.appearance || 'filled'}}"
                        class="cos-comment-header-author-tag {{item.class || 'cos-color-text-tiny cos-tag-color-bg'}}"
                    >
                        {{item.text}}
                    </cos-tag>
                </div>
                <img s-if="label" class="cos-comment-header-label"
                    src="{{label}}"
                />
            </div>
            <!-- 评论内容 -->
            <div class="cos-comment-content">
                <slot></slot>
            </div>
            <!-- 评论底部 -->
            <div s-if="showFooter" class="cos-comment-footer">
                <component
                    s-is="{{linkInfo && linkInfo.href ? 'a' : 'span'}}"
                    s-if="source"
                    s-bind="linkInfo"
                    class="cos-comment-footer-source"
                >
                    {{source}}
                    <cos-icon
                        s-if="linkInfo && linkInfo.href"
                        name="right"
                        class="cos-comment-footer-source-icon"
                    />
                </component>
                <span s-if="time" class="cos-comment-footer-time">{{time}}</span>
                <span s-if="location" class="cos-comment-footer-location">{{location}}</span>
                <span s-if="reply" class="cos-comment-footer-reply" on-click="handleReply">回复</span>
                <span
                    s-if="like"
                    class="cos-comment-footer-like{{ like.active ? ' cos-comment-footer-like-active' : ''}}"
                    on-click="handleLike"
                >
                    {{like.text}}
                    <cos-icon
                        name="{{ like.active ? 'heart-fill1' : 'heart1'}}"
                        class="cos-comment-footer-like-icon"
                    />
                </span>
            </div>
        </div>
    `;

    static components = {
        'cos-avatar': Avatar,
        'cos-icon': Icon,
        'cos-tag': Tag
    };

    static computed = {
        // 可见评论者描述，不超过3个
        visibleCaptions(this: Comment) {
            const captions = this.data.get('author').captions;
            return captions ? captions.slice(0, MAX_CAPTION_TAG_NUM) : [];
        },
        // 可见评论者标签，与标签相加不超过3个
        visibleTags(this: Comment) {
            const captions = this.data.get('author').captions;
            const captionNum = captions ? captions.length : 0;
            const tags = this.data.get('author').tags;
            const remaining = MAX_CAPTION_TAG_NUM - captionNum;
            return tags ? remaining > 0 ? tags.slice(0, remaining) : [] : [];
        },
        // 是否显示底部信息
        showFooter(this: Comment) {
            return this.data.get('source') || this.data.get('time') || this.data.get('location')
                || this.data.get('reply') || this.data.get('like');
        }

    };
    initData(): CommentProps {
        return {
            // 头像地址
            avatar: '',
            // 评论者信息
            author: {
                // 评论者名称
                name: '',
                // 评论者描述
                captions: [],
                // 评论者标签
                tags: []
            },
            // 评论标签地址
            label: '',
            // 内容来源
            source: '',
            // 内容来源链接
            linkInfo: undefined,
            // 时间
            time: '',
            // 位置
            location: '',
            // 是否可回复
            reply: false,
            // 点赞信息
            like: undefined
        };
    };

    /**
     * 处理回复事件
     *
     * @param event 事件对象
     */
    handleReply(event: Event): void {
        this.fire<CommentEvents['reply']>('reply', {
            event
        });
    }

    /**
     * 处理点赞事件
     *
     * @param event 事件对象
     */
    handleLike(event: Event): void {
        this.fire<CommentEvents['like']>('like', {
            event
        });
    }
}
