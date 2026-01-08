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
 * 处理所有不打印的内容
 * @param text 当前处理的文本包
 * @param storeText 当前文本包中已经打印过的文本
 * @param textIndex 当前文本包中已经打印过的文本最后一个位置索引
 * @returns str 要忽略打印的文本，length 要忽略打印的长度
 */

function handleNotTyping(text: string, storeText: string, textIndex: number) {

    // 解决无序列表闪烁问题，以及多个*号出下划线的问题
    if (text[textIndex + 1] === '*') {
        const match = text.slice(textIndex).match(/^(\*|\s)+/);
        if (match && match[0]) {
            return {
                str: text.slice(textIndex, textIndex + match[0].length),
                length: match[0].length
            };
        }
    }

    // 匹配 \n:::ml-data\n 到\n:::之间的内容不显示
    if (text.substring(textIndex, textIndex + 10) === ':::ml-data') {
        const matchLength = text.slice(textIndex + 10).indexOf(':::\n');
        return {
            str: text.slice(textIndex, textIndex + 14 + matchLength),
            length: matchLength + 14
        };
    }
    // 匹配 ::和: directive 不显示
    if (storeText.match(/:ml$/)) {
        const regex = /^([\w|-]+)?(?:\[([^\]]+)\])?(?:\{([^}]+)\})?/;
        const matches = text.slice(textIndex).match(regex);
        if (matches && matches[0]) {
            return {
                str: text.slice(textIndex, textIndex + matches[0].length),
                length: matches[0].length
            };
        }
    }

    // 修复 \n-或者\n=变成h2标签的问题
    if (storeText.match(/\n\s*-$/) || storeText.match(/\n\s*=$/)) {
        return {
            str: text.slice(textIndex, textIndex + 2),
            length: 2
        };
    }

    // 处理(链接)不打印
    if (storeText.match(/http$/)) {
        const linkRegex = /^s?:\/\/[^\s)]+(\)|")/;
        const matches = text.slice(textIndex).match(linkRegex);
        if (matches && matches[0]) {
            return {
                str: text.slice(textIndex, textIndex + matches[0].length),
                length: matches[0].length
            };
        }
    }
    return {str: '', length: 0};
}

const findLastElement = (parent: HTMLElement) => {
    let lastChild = null;
    for (let i = parent.childNodes.length - 1; i >= 0; i--) {
        const node = parent.childNodes[i];
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue && node.nodeValue.replace(/ /g, '') !== '\n'
            || node.nodeType === Node.ELEMENT_NODE) {
            lastChild = node;
            break;
        }
    }
    if (!lastChild) {
        return parent;
    }
    if (lastChild.nodeType === Node.TEXT_NODE) {
        return lastChild.parentElement;
    }
    if (lastChild.nodeType === Node.COMMENT_NODE) {
        return lastChild.parentElement;
    }
    // // 检查是否为元素节点（非文本节点或注释节点）
    if (lastChild.nodeType === Node.ELEMENT_NODE) {
        // 获取元素的display样式
        const display = window.getComputedStyle(lastChild as Element).display;

        // 判断是否是内联元素
        if (display === 'inline'
            || display === 'inline-block'
            || display === 'inline-flex'
            || display === 'inline-grid'
            || display === 'inline-table'
            || lastChild.nodeName === 'CODE') {
            return lastChild;
        }
    }
    return findLastElement(lastChild as HTMLElement);
};

export {
    handleNotTyping,
    findLastElement
};
