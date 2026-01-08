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
 * @file route-planner utils
 */

import {TransportOption, FormattedTransportOption} from './interface';

/**
 * 交通方式 type 和 icon name 的对应关系
 */
const ICON_NAME_MAP = {
    'car': 'taxi',
    'publicTransport': 'bus',
    'walk': 'walk'
};

/**
 * 交通方式展示顺序
 */
const TRANSPORT_OPTION_ORDER = ['car', 'walk', 'publicTransport'];

/**
 * 整理 transportOptions 数据，排序并添加 icon 字段
 */
export function formatTransportOptions(transportOptions: TransportOption[]): FormattedTransportOption[] {
    let formattedTransportOptions: FormattedTransportOption[] = [];

    transportOptions.forEach(option => {
        if (TRANSPORT_OPTION_ORDER.includes(option.type)) {
            formattedTransportOptions.push({
                ...option,
                icon: ICON_NAME_MAP[option.type]
            });
        }
    });

    return formattedTransportOptions.sort(
        (optionOne, optionTwo) =>
            TRANSPORT_OPTION_ORDER.indexOf(optionOne.type) - TRANSPORT_OPTION_ORDER.indexOf(optionTwo.type)
    );
}

/**
 * 计算文字长度，数字算半个字符，其他按正常算
 */
function calculateTextWidth(text: string) {
    const str = String(text);
    if (!str) {
        return 0;
    }
    // 数字字符
    const doubleByte = str.match(/[^\x00-\xff]/igm) || [];
    return str.length - (str.length - doubleByte.length) / 2;
};

/**
 * 整理标签文本，标签文本超出6个字符则展示...
 */
export function formatTag(tag: string): string {
    return `${calculateTextWidth(tag) > 6
        ? tag.slice(0, 6) + '...' : tag}`;
}
