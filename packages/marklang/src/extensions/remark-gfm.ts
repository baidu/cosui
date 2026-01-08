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
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast-util-gfm').Options} MdastOptions
 * @typedef {import('micromark-extension-gfm').Options} MicromarkOptions
 * @typedef {import('unified').Processor<Root>} Processor
 * @typedef {MicromarkOptions & MdastOptions} Options
 * Configuration.
 */

import {gfmFromMarkdown, gfmToMarkdown} from './mdast-gfm';
import {gfm} from './micromark-gfm';
import type {Options as TableOptions} from 'mdast-util-gfm-table';
export interface Options extends TableOptions {
    autolink?: boolean;
    singleTilde?: boolean;
}
/**
 * Add support GFM (autolink literals, footnotes, strikethrough, tables,
 * tasklists).
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns {undefined}
 *   Nothing.
 */
export default function remarkGfm(options: Options) {

    // @ts-ignore
    const data = this.data();

    const micromarkExtensions = data.micromarkExtensions;
    const fromMarkdownExtensions = data.fromMarkdownExtensions;
    const toMarkdownExtensions = data.toMarkdownExtensions;

    micromarkExtensions.push(gfm(options));
    fromMarkdownExtensions.push(gfmFromMarkdown(options));
    toMarkdownExtensions.push(gfmToMarkdown(options));
}
