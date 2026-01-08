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
 * https://github.com/ipikuka/remark-flexible-markers/issues/3
 * 为了兼容 regex lookbehind, 修改了正则表达式
 */

import {CONTINUE, SKIP, visit} from 'unist-util-visit';
import type {Visitor, VisitorResult} from 'unist-util-visit';
import type {Plugin, Transformer} from 'unified';
import type {Data, Parent, PhrasingContent, Root, Text} from 'mdast';
import {findAllBetween} from 'unist-util-find-between-all';
import {findAllBefore} from 'unist-util-find-all-before';
import {findAllAfter} from 'unist-util-find-all-after';
import {findAfter} from 'unist-util-find-after';
import {u} from 'unist-builder';

// eslint-disable-next-line @typescript-eslint/ban-types
type Prettify<T> = { [K in keyof T]: T[K] } & {};

// eslint-disable-next-line @typescript-eslint/ban-types
type PartiallyRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MarkData extends Data { }

interface Mark extends Parent {
    /**
     * Node type of mdast Mark.
     */
    type: 'mark';
    /**
     * Children of paragraph.
     */
    children: PhrasingContent[];
    /**
     * Data associated with the mdast paragraph.
     */
    data?: MarkData | undefined;
}

declare module 'mdast' {
    interface PhrasingContentMap {
        mark: Mark;
    }

    interface RootContentMap {
        mark: Mark;
    }
}

// satisfies the regex [a-z]
type Key =
    | 'a'
    | 'b'
    | 'c'
    | 'd'
    | 'e'
    | 'f'
    | 'g'
    | 'h'
    | 'i'
    | 'j'
    | 'k'
    | 'l'
    | 'm'
    | 'n'
    | 'o'
    | 'p'
    | 'q'
    | 'r'
    | 's'
    | 't'
    | 'u'
    | 'v'
    | 'w'
    | 'x'
    | 'y'
    | 'z';

type Dictionary = Partial<Record<Key, string>>;

const dictionary: Dictionary = {
    a: 'amber',
    b: 'blue',
    c: 'cyan',
    d: 'brown',
    e: 'espresso',
    f: 'fuchsia',
    g: 'green',
    h: 'hotpink',
    i: 'indigo',
    j: 'jade',
    k: 'kiwi',
    l: 'lime',
    m: 'magenta',
    n: 'navyblue',
    o: 'orange',
    p: 'purple',
    q: 'pink',
    r: 'red',
    s: 'silver',
    t: 'teal',
    u: 'umber',
    v: 'violet',
    w: 'white',
    x: 'gray',
    y: 'yellow',
    z: 'black'
};

type RestrictedRecord = Record<string, unknown> & { className?: never };
type TagNameFunction = (color?: string) => string;
type ClassNameFunction = (color?: string) => string[];
type PropertyFunction = (color?: string) => RestrictedRecord;

export interface FlexibleMarkerOptions {
    dictionary?: Dictionary;
    markerTagName?: string | TagNameFunction;
    markerClassName?: string | ClassNameFunction;
    markerProperties?: PropertyFunction;
    equalityOperator?: string;
    actionForEmptyContent?: 'keep' | 'remove' | 'mark';
};

const DEFAULT_SETTINGS: FlexibleMarkerOptions = {
    dictionary,
    markerTagName: 'mark',
    markerClassName: 'flexible-marker',
    actionForEmptyContent: 'mark'
};

type PartiallyRequiredFlexibleMarkerOptions = Prettify<
    PartiallyRequired<
        FlexibleMarkerOptions,
        'dictionary' | 'markerTagName' | 'markerClassName' | 'actionForEmptyContent'
    >
>;

// the previous regex was not strict related with spaces
// export const REGEX = /=([a-z]?)=\s*([^=]*[^ ])?\s*==/;
// export const REGEX_GLOBAL = /=([a-z]?)=\s*([^=]*[^ ])?\s*==/g;

// the new regex is strict!
// it doesn't allow a space after the first double equity sign
// it doesn't allow a space before the last double equity sign
// export const REGEX = /=([a-z]?)=(?![\s=])([\s\S]*?)(?<![\s=])==/;
// export const REGEX_GLOBAL = /=([a-z]?)=(?![\s=])([\s\S]*?)(?<![\s=])==/g;
export const REGEX = /=([a-z]?)=(?![\s=])(([\s\S]*?)[^\s=])==/;
export const REGEX_GLOBAL = /=([a-z]?)=(?![\s=])(([\s\S]*?)[^\s=])==/g;


export const REGEX_STARTING = /=([a-z]?)=(?![\s]|=+\s)/;
export const REGEX_STARTING_GLOBAL = /=([a-z]?)=(?![\s]|=+\s)/g;

// export const REGEX_ENDING = /(?<!\s|\s=|\s==|\s===|\s====)==/;
// export const REGEX_ENDING_GLOBAL = /(?<!\s|\s=|\s==|\s===|\s====)==/g;
export const REGEX_ENDING = /(?:\s[=]*)?==/;
export const REGEX_ENDING_GLOBAL = /(?:\s[=]*)?==/g;

export const REGEX_EMPTY = /=([a-z]?)=\s*==/;
export const REGEX_EMPTY_GLOBAL = /=([a-z]?)=\s*==/g;

/**
 *
 * a utility like 'clsx' package
 */
export function clsx<T>(arr: Array<(T | false | null | undefined | 0)>): T[] {
    return arr.filter((item): item is T => !!item);
}

/**
 *
 * This plugin turns ==content== into a <mark> element with customizable classification
 *
 * for example:
 *
 * Here is ==marked text with default color==
 * Here is =r=marked text with red classification==
 *
 */
const plugin: Plugin<[FlexibleMarkerOptions?], Root> = options => {
    const settings = Object.assign(
        {},
        DEFAULT_SETTINGS,
        options,
    ) as PartiallyRequiredFlexibleMarkerOptions;

    if (options?.dictionary && Object.keys(options.dictionary).length) {
        settings.dictionary = Object.assign({}, dictionary, options.dictionary);
    }

    /**
     *
     * constracts the custom Mark node as a MDAST node
     *
     */
    const constructMarkNode = (
        classification: Key | undefined,
        children: PhrasingContent[],
    ): Mark => {
        const color = classification ? settings.dictionary[classification] : undefined;

        const markerTagName
            = typeof settings.markerTagName === 'string'
                ? settings.markerTagName
                : settings.markerTagName(color);

        const markerClassName
            = typeof settings.markerClassName === 'function'
                ? settings.markerClassName(color)
                : clsx<string>([
                    settings.markerClassName,
                    !classification && `${settings.markerClassName}-default`,
                    color && `${settings.markerClassName}-${color}`,
                    !children.length && `${settings.markerClassName}-empty`
                ]);

        let properties: Record<string, unknown> | undefined = undefined;

        if (settings.markerProperties) {
            properties = settings.markerProperties(color);

            Object.entries(properties).forEach(([k, v]) => {
                if (
                    (typeof v === 'string' && v === '')
                        || (Array.isArray(v) && (v as unknown[]).length === 0)
                ) {
                    properties && (properties[k] = undefined);
                }

                if (k === 'className') {
                    delete properties?.['className'];
                };
            });
        }

        // https://github.com/syntax-tree/mdast-util-to-hast#example-supporting-custom-nodes
        return {
            type: 'mark',
            children,
            data: {
                hName: markerTagName,
                hProperties: {
                    className: markerClassName,
                    ...(properties && {...properties})
                }
            }
        };
    };

    /**
     *
     * visits the Text nodes to match with the mark syntax (==marked text content==)
     *
     */
    const visitorFirst: Visitor<Text, Parent> = function (node, index, parent): VisitorResult {
        /* istanbul ignore next */
        if (!parent || typeof index === 'undefined') {
            return;
        };

        if (!REGEX.test(node.value)) {
            return;
        };

        const children: PhrasingContent[] = [];
        const value = node.value;
        let tempValue = '';
        let prevMatchIndex = 0;
        let prevMatchLength = 0;

        const matches = Array.from(value.matchAll(REGEX_GLOBAL));

        matches.forEach(match => {
            const [matched, classification, markedText] = match;
            const mIndex = match.index;
            const mLength = matched.length;

            // could be a text part before each matched part
            const textPartIndex = prevMatchIndex + prevMatchLength;

            prevMatchIndex = mIndex;
            prevMatchLength = mLength;

            // if there is a text part before
            if (mIndex > textPartIndex) {
                const textValue = value.substring(textPartIndex, mIndex);

                const textNode = u('text', textValue);
                children.push(textNode);
            }

            const markerNode = constructMarkNode(classification as Key, [
                {type: 'text', value: markedText.trim()}
            ]);

            children.push(markerNode);

            // control for the last text node if exists after the last match
            tempValue = value.slice(mIndex + mLength);
        });

        // if there is still text after the last match
        if (tempValue) {
            const textNode = u('text', tempValue);
            children.push(textNode);
        }

        if (children.length) {
            parent.children.splice(index, 1, ...children);
        };
    };

    /**
     *
     * visits the Text nodes to find the mark syntax (==marked **text** content==)
     * if parent contains other content phrases
     *
     */
    const visitorSecond: Visitor<Text, Parent> = function (node, index, parent): VisitorResult {
        /* istanbul ignore next */
        if (!parent || typeof index === 'undefined') {
            return;
        };

        // control if the Text node matches with 'starting mark regex'
        if (!REGEX_STARTING.test(node.value)) {
            return;
        };

        const openingNode = node;

        // control if any next child Text node of the parent has 'ending mark regex'
        const closingNode = findAfter(parent, openingNode, function (node) {
            return node.type === 'text' && REGEX_ENDING.test((node as Text).value);
        });

        if (!closingNode) {
            return;
        };

        // now, ensured that the parent has a mark element between opening Text node and closing Text nodes

        const beforeChildren = findAllBefore(parent, openingNode) as PhrasingContent[];
        const markChildren = findAllBetween(parent, openingNode, closingNode) as PhrasingContent[];
        const afterChildren = findAllAfter(parent, closingNode) as PhrasingContent[];

        // /******************** OPENING NODE ***********************/

        // let's analyze the opening Text node
        const value = openingNode.value;

        const match = Array.from(value.matchAll(REGEX_STARTING_GLOBAL))[0];

        const [matched, classification] = match;
        const mLength = matched.length;
        const mIndex = match.index;

        // if there is a text part before
        if (mIndex > 0) {
            const textValue = value.substring(0, mIndex);

            const textNode = u('text', textValue);
            beforeChildren.push(textNode);
        }

        // if there is a text part after
        if (value.length > mIndex + mLength) {
            const textValue = value.slice(mIndex + mLength);

            const textNode = u('text', textValue);
            markChildren.unshift(textNode);
        }

        // /********************* CLOSING NODE ***********************/

        // let's analyze the closing Text node
        const value_ = (closingNode as Text).value;

        const match_ = Array.from(value_.matchAll(REGEX_ENDING_GLOBAL))[0];

        const [matched_] = match_;
        const mLength_ = matched_.length;
        const mIndex_ = match_.index;

        // if there is a text part before
        if (mIndex_ > 0) {
            const textValue = value_.substring(0, mIndex_);

            const textNode = u('text', textValue);
            markChildren.push(textNode);
        }

        // if there is a text part after
        if (value_.length > mIndex_ + mLength_) {
            const textValue = value_.slice(mIndex_ + mLength_);

            const textNode = u('text', textValue);
            afterChildren.unshift(textNode);
        }

        // now it is time to construct a mark node
        const markNode = constructMarkNode(classification as Key, markChildren);

        parent.children = [...beforeChildren, markNode, ...afterChildren];

        return index; // in order to re-visit the same node and children
    };

    /**
     *
     * visits the Text nodes to find empty markers (==== or == ==)
     *
     */
    const visitorThird: Visitor<Text, Parent> = function (node, index, parent): VisitorResult {
        /* istanbul ignore next */
        if (!parent || typeof index === 'undefined') {
            return;
        }

        if (!REGEX_EMPTY.test(node.value)) {
            return;
        }

        if (settings.actionForEmptyContent === 'remove') {
            node.value = node.value.replaceAll(REGEX_EMPTY_GLOBAL, '');

            // https://unifiedjs.com/learn/recipe/remove-node/
            if (node.value.trim() === '') {
                return [SKIP, index];
            }

            return CONTINUE;
        }

        const children: PhrasingContent[] = [];
        const value = node.value;
        let tempValue = '';
        let prevMatchIndex = 0;
        let prevMatchLength = 0;

        const matches = Array.from(value.matchAll(REGEX_EMPTY_GLOBAL));

        matches.forEach(match => {
            const [matched, classification] = match;
            const mIndex = match.index;
            const mLength = matched.length;

            // could be a text part before each matched part
            const textPartIndex = prevMatchIndex + prevMatchLength;

            prevMatchIndex = mIndex;
            prevMatchLength = mLength;

            // if there is a text part before
            if (mIndex > textPartIndex) {
                const textValue = value.substring(textPartIndex, mIndex);

                const textNode = u('text', textValue);
                children.push(textNode);
            }

            // empty marker
            const markerNode = constructMarkNode(classification as Key, []);

            children.push(markerNode);

            // control for the last text node if exists after the last match
            tempValue = value.slice(mIndex + mLength);
        });

        // if there is still text after the last match
        if (tempValue) {
            const textNode = u('text', tempValue);
            children.push(textNode);
        }

        if (children.length) {
            parent.children.splice(index, 1, ...children);
        }
    };

    const transformer: Transformer<Root> = tree => {
        // to find markers in a Text node
        visit(tree, 'text', visitorFirst);

        // to find markers if the parent contains other content phrases
        visit(tree, 'text', visitorSecond);

        // to find empty markers (==== or == ==)
        if (settings.actionForEmptyContent !== 'keep') {
            visit(tree, 'text', visitorThird);
        }

        // to correct the mathematical double equity signs
        if (settings.equalityOperator) {
            const REGEX_EQUALITY = new RegExp(settings.equalityOperator, 'gi');
            visit(tree, 'text', node => {
                node.value = node.value.replaceAll(REGEX_EQUALITY, '==');
            });
        }
    };

    return transformer;
};

export default plugin;
