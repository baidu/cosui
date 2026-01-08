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
 * @file Selected Tags
 * @description 已选标签回填，包含标签的一行展现隐藏、删除逻辑，select/cascader组件共用
 */

import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import {SelectedTagsProps} from './interface';

export default class SelectedTags extends Component<SelectedTagsProps> {
    static template = `
        <div class="cos-selected-tags">
            <div s-ref="selectedTags" class="cos-selected-tags-box">
                <div
                    s-for="option, index in options"
                    class="cos-selected-tags-item{{
                        index > _showNum - 1 ? ' cos-selected-tags-item-hidden' : ''}}{{
                        index === 0 ? ' cos-selected-tags-item-first' : ''}}"
                >
                    <div class="cos-selected-tags-item-label">
                        <span>{{option.label || option.value}}</span>
                    </div>
                    <span
                        class="cos-selected-tags-item-close"
                        on-click="onTagDelete($event, index)"
                    ><cos-icon name="close"/></span>
                </div>
                <div
                    s-if="_hiddenLength"
                    class="cos-selected-tags-hidden"
                >{{_hiddenLength}}</div>
            </div>
        </div>
    `;
    static components = {
        'cos-icon': Icon
    };

    static computed = {
        _hiddenLength(this: SelectedTags) {
            const showNum = this.data.get('_showNum');
            const optionsLen = this.data.get('options')?.length || 0;
            return optionsLen - showNum > 0 ? optionsLen - showNum : 0;
        }
    };

    selectedTags: HTMLElement | null;

    inited(): void {
        this.selectedTags = null;
    }

    initData() {
        return {
            options: [],
            _showNum: 1
        };
    }
    attached() {
        this.nextTick(() => {
            this.selectedTags = (this.ref('selectedTags') as unknown) as HTMLElement;
            this.computeHiddenLength();
        });
        this.watch('options', () => {
            this.nextTick(() => {
                this.computeHiddenLength();
            });
        });
    }

    /**
     * 计算隐藏标签的数量,同时隐藏无法完整展示的标签
     */
    computeHiddenLength() {
        const options = this.data.get('options');
        const tagConatinerWidth = this.selectedTags?.offsetWidth;
        const tagElList = this.selectedTags?.
            querySelectorAll('.cos-selected-tags-item') as unknown as HTMLElement[];

        // DOM未渲染完成或者只有一个标签时不进行隐藏计算
        if (!tagConatinerWidth || !tagElList?.length || options.length === 1) {
            options.length === 1 && this.nextTick(() => {
                const firstTagEl = this.selectedTags?.
                    querySelector('.cos-selected-tags-item-first') as unknown as HTMLElement;
                firstTagEl && (firstTagEl.style.maxWidth = '100%');
            });
            return;
        }
        let tagsWidth = tagElList[0].offsetWidth;
        let showNum = 1;

        // 比较标签长度之和与容器的宽度
        for (let i = 1; i < tagElList.length; i++) {
            if (tagConatinerWidth < tagElList[i].offsetWidth + tagsWidth) {
                break;
            }
            tagsWidth += tagElList[i].offsetWidth + 3;
            showNum++;
        }

        const showHiddenTag = showNum < options.length;
        if (showHiddenTag && tagConatinerWidth < tagsWidth + 33 && showNum > 1) {
            showNum--;
        }
        this.nextTick(() => {
            const firstTagEl = this.selectedTags?.
                querySelector('.cos-selected-tags-item-first') as unknown as HTMLElement;
            const maxWidth = showHiddenTag ? 'calc(100% - 33px)' : '100%';
            firstTagEl && (firstTagEl.style.maxWidth = maxWidth);
        });

        this.data.set('_showNum', showNum);
    }
    onTagDelete(event: Event, index: number) {
        event.stopPropagation();
        this.fire('delete', {
            event,
            index
        });
    }
}