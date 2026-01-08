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
import type {CopyableTextData, CopyableTextEvents} from './interface';
import Markdown from '@cosui/cosmic-dqa/markdown';
import Icon from '@cosui/cosmic/icon';

export default class CopyableText extends Component<CopyableTextData> {
    static trimWhitespace = 'all';

    static components = {
        'cosd-markdown': Markdown,
        'cos-icon': Icon
    };

    static computed = {
        isPhrase(this: CopyableText) {
            return this.data.get('appearance') === 'phrase';
        }
    };

    initData(): Partial<CopyableTextData> {
        return {
            appearance: 'paragraph',
            content: [],
            note: '',
            typing: null,
            _renderFinished: false
        };
    }

    attached() {
        if (this.data.get('isPhrase')) {
            this.fire('typing-finished');
            this.data.set('_renderFinished', true);
        }
    }
    copy(event: Event, content: string) {
        this.fire<CopyableTextEvents['copy-click']>('copy-click', {
            event,
            content
        });
    }
    handleTypingFinished() {
        if (this.data.get('isPhrase')) {
            return;
        }
        this.fire('typing-finished');
        this.data.set('_renderFinished', true);
        const markdown = this.ref('markdown');
        // @ts-ignore
        markdown.stop();
    }
    stop() {
        // @ts-ignore
        this.ref('markdown')?.stop();
    }
}
