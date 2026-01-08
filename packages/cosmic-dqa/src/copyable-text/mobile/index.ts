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

import CopyableTextBase from '../base';

export default class CopyableText extends CopyableTextBase {
    static template = /* html */ `
    <div
        class="cosd-copyable-text cos-row cos-row-col-12 cos-flex-wrap cos-gutter
            cosd-copyable-text-{{appearance}}"
        style="--cos-grid-gutter: 24px"
    >
        <div
            s-for="item, index in content"
            class="cosd-copyable-text-item
                {{isPhrase ? 'cos-col-6' : 'cos-col-12'}}"
        >
            <div class="cosd-copyable-text-content">
                <cosd-markdown
                    s-if="!isPhrase"
                    s-ref="markdown"
                    content="{{item}}"
                    typing="{{typing}}"
                    on-typing-finished="handleTypingFinished(index)"
                />
                <span s-else>{{item}}</span>
                <div
                    s-if="_renderFinished || !typing"
                    class="cosd-copyable-text-footer"
                >
                    <span class="cosd-copyable-text-note">{{note}}</span>
                    <div class="cos-link" on-click="copy($event, item)">
                        <cos-icon s-if="isPhrase" name="copy" class="cos-color-text-tiny"/>
                        <span s-else class="cosd-copyable-text-copy">复制</span>
                    </div>
                </div>
            </div>
            <div
                s-if="_renderFinished || !typing"
                class="cosd-copyable-text-divider"
            ></div>
        </div>
    </div>
    `;
    static trimWhitespace = CopyableTextBase.trimWhitespace;
    static components = CopyableTextBase.components;
    static computed = CopyableTextBase.computed;
}