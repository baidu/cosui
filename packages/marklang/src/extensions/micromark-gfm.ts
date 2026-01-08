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

import {
    combineExtensions
} from 'micromark-util-combine-extensions';
import {
    gfmAutolinkLiteral
} from 'micromark-extension-gfm-autolink-literal';
import {gfmFootnote} from 'micromark-extension-gfm-footnote';
import {
    gfmStrikethrough
} from 'micromark-extension-gfm-strikethrough';
import {gfmTable} from 'micromark-extension-gfm-table';
import {Options} from './remark-gfm';

/**
 * Create an extension for `micromark` to enable GFM syntax.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 *
 *   Passed to `micromark-extens-gfm-strikethrough`.
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions` to enable GFM
 *   syntax.
 */
export function gfm(options?: Options) {
    return combineExtensions([
        ...(options?.autolink ? [gfmAutolinkLiteral()] : []),
        gfmFootnote(),
        gfmStrikethrough(options),
        gfmTable()
    ]);
}
