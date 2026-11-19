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
 * 复制文本
 * @param text 要复制的内容
 * @returns {promise}
 */

/**
 * 兜底复制：把文本写进临时 textarea 再执行 execCommand('copy')。
 * 作为 markdown 内复制能力的唯一实现，diagram 侧的 navigator.clipboard
 * 降级分支也复用这里，避免两份同样的 textarea 流程各自演进。
 */
function execCommandCopy(text: string): boolean {
    const textarea = document.createElement('textarea');
    textarea.style.background = 'transparent';
    textarea.setAttribute('readonly', 'readonly');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    try {
        return document.execCommand('copy', false);
    }
    finally {
        document.body.removeChild(textarea);
    }
}

function copyTextToClipboard(text: string) {
    return new Promise((resolve, reject) => {
        try {
            if (execCommandCopy(text)) {
                resolve('复制成功');
            }
            else {
                reject(new Error('复制失败'));
            }
        }
        catch (err) {
            reject(err);
        }
    });
}

export {
    copyTextToClipboard,
    execCommandCopy
};
