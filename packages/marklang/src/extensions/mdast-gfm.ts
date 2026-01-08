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

import {Options} from './remark-gfm';
import {
    gfmAutolinkLiteralFromMarkdown,
    gfmAutolinkLiteralToMarkdown
} from 'mdast-util-gfm-autolink-literal';
import {
    gfmFootnoteFromMarkdown,
    gfmFootnoteToMarkdown
} from 'mdast-util-gfm-footnote';
import {
    gfmStrikethroughFromMarkdown,
    gfmStrikethroughToMarkdown
} from 'mdast-util-gfm-strikethrough';
import {gfmTableFromMarkdown, gfmTableToMarkdown} from 'mdast-util-gfm-table';

/**
 * Create an extension for `mdast-util-from-markdown` to enable GFM (autolink
 * literals, footnotes, strikethrough, tables, tasklists).
 *
 * @returns {Array<FromMarkdownExtension>}
 *   Extension for `mdast-util-from-markdown` to enable GFM (autolink literals,
 *   footnotes, strikethrough, tables, tasklists).
 */
export function gfmFromMarkdown(options?: Options) {
    return [
        ...(options?.autolink ? [gfmAutolinkLiteralFromMarkdown()] : []),
        gfmFootnoteFromMarkdown(),
        gfmStrikethroughFromMarkdown(),
        gfmTableFromMarkdown()
    ];
}

/**
 * Create an extension for `mdast-util-to-markdown` to enable GFM (autolink
 * literals, footnotes, strikethrough, tables, tasklists).
 *
 * @param {Options | null | undefined} [options]
 *   Configuration.
 * @returns {ToMarkdownExtension}
 *   Extension for `mdast-util-to-markdown` to enable GFM (autolink literals,
 *   footnotes, strikethrough, tables, tasklists).
 */
export function gfmToMarkdown(options?: Options) {
    return {
        extensions: [
            gfmAutolinkLiteralToMarkdown(),
            gfmFootnoteToMarkdown(),
            gfmStrikethroughToMarkdown(),
            gfmTableToMarkdown(options)
        ]
    };
}
