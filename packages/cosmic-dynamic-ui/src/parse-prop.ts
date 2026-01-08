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
 * @file 模板指令处理
 */

import {formatForExpr} from './compatible';
import {
    type UI, type StyleConfig,
    type Context
} from './interface';
import {isInterp, normalizeActionArr, normalizeInterpPropValue} from './parse-data';

export const INNER_DATA_PREFIX = '__dy';

export const ASYNC_NODES: {
    [key: string]: string;
} = {
    markdown: 'render-finished',
    echarts: 'render-finished'
};

export const ASYNC_NODES_RENDEREDKEY = 'rendering';

function formatDataKey(value: string) {
    return value.replace(/-/g, '');
}

export function createPropTemplate(key: string, value: unknown, context: Context): string {

    if (isInterp(value)) {
        return ` ${key}="${value}"`;
    }

    const expr = formatDataKey(`${INNER_DATA_PREFIX}${context.dataIndex}${key}`);

    if (typeof value === 'object' && isInterp(JSON.stringify(value))) {

        // 内部有 JSON.stringify  因此此处用单引号包裹
        return ` ${key}='{{${normalizeInterpPropValue(value)}}}'`;
    }

    context.data[expr] = value;
    return ` ${key}="{{${expr}}}"`;
}

export function createEventTemplate(events: UI['events'], tag: string, context: Context, refId?: string): string {

    let allEvents: {
        [key: string]: {
            dom?: boolean;
            actionArgsStr?: string;
        };
    } = {};

    let tpl = '';

    // 外部声明事件
    const outerEvents = events || {};
    Object.keys(outerEvents).forEach(eventName => {
        const actionArr = outerEvents[eventName];
        allEvents[eventName] = {
            actionArgsStr: normalizeActionArr(actionArr)
        };
    });

    // 内部声明事件
    const innerEvents = context.events[tag] || {};
    Object.keys(innerEvents).forEach(eventName => {
        allEvents[eventName] = allEvents[eventName] || {};
        allEvents[eventName].dom = !!innerEvents[eventName]!.dom;
    });

    // 异步节点事件
    const eventName = ASYNC_NODES[tag];
    if (eventName && refId) {
        allEvents[eventName] = allEvents[eventName] || {};
        context.asyncComptRefs.push(refId);
    }

    Object.keys(allEvents).forEach(eventName => {
        const event = allEvents[eventName];
        tpl += ` on-${eventName}='${
            event.dom ? 'native:' : ''}__handleProxy($event, "${
            eventName}", "${tag}", ${event.actionArgsStr || '[]'})'`;

        if (event.actionArgsStr) {
            tpl += ` ${INNER_DATA_PREFIX}action${eventName}='${event.actionArgsStr}'`;
        }
    });

    return tpl;
}

export function createForTemplate(forExpr?: string): string {
    if (!forExpr) {
        return '';
    }

    // 兼容 agent for="{{item, index in list}}" 语法
    return ' s-for="' + formatForExpr(forExpr) + '"';
}


export function createIfTemplate(ifExpr?: string): string {
    if (!ifExpr) {
        return '';
    }

    return ' s-if="' + ifExpr + '"';
}

export function createClassTemplate(classNames?: string): string {
    if (!classNames) {
        return ' class="cosdy-ui"';
    }

    return ' class="cosdy-ui ' + classNames + '"';
}

export function createStyleTemplate(style?: StyleConfig): string {
    if (!style) {
        return '';
    }

    const keys = Object.keys(style);
    const len = keys.length;

    if (!len) {
        return '';
    }

    let tpl = ' style="';
    keys.forEach(key => {
        const value = style[key];
        tpl += `${key}:${value};`;
    });
    tpl += '"';

    return tpl;
}
