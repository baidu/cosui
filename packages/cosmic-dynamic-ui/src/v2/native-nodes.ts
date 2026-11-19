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
 * @file 内置原生节点渲染
 */

import san from 'san';
import {accessor, compileValue} from './expression';
import type {BuiltinComponentName, JsonObject} from './types';

const tags: Record<BuiltinComponentName, string> = {
    Div: 'div', Divider: 'div', Column: 'div', Row: 'div',
    Flex: 'div', Text: 'span'
};
export const ROW_COLUMNS = '__appletRowColumns';
const alignment: Record<string, string> = {
    start: 'flex-start', end: 'flex-end',
    between: 'space-between', around: 'space-around', evenly: 'space-evenly'
};
export function isNativeNode(type: string): type is BuiltinComponentName {
    return Object.prototype.hasOwnProperty.call(tags, type);
}

interface Presentation {class: string, style: string, value: unknown}

export function nativePresentation(type: BuiltinComponentName, props: JsonObject): Presentation {
    const classes = [props.class || ''];
    const styles: Record<string, string | number> = typeof props.style === 'object' && props.style !== null
        && !Array.isArray(props.style)
        ? {...props.style} as Record<string, string | number> : {};
    const baseStyle = typeof props.style === 'string' ? props.style : '';
    let value: unknown = props.value ?? '';
    if (type === 'Text') {
        if (props.name !== undefined) {
            value = props.name;
        }
        if (props.size) {
            classes.push(`cos-text-${props.size}`);
        }
    }
    if (type === 'Column') {
        classes.push('cos-col', `cos-col-${props.span ?? 1}`);
    }
    if (type === 'Row') {
        classes.push('cos-row', `cos-row-col-${props.columns ?? 12}`, 'cos-gutter');
        // Always reset the gutter so nested rows do not inherit their parent's spacing.
        styles['--cos-grid-gutter'] = `${props.gutter ?? 0}px`;
    }
    if (type === 'Row' || type === 'Flex') {
        classes.push('cos-flex', `cos-items-${props.align ?? 'stretch'}`,
            `cos-justify-${props.justify ?? 'start'}`);
        styles['flex-wrap'] = (props.wrap ?? (type === 'Row')) ? 'wrap' : 'nowrap';
        styles['flex-direction'] = type === 'Row' ? 'row' : String(props.direction ?? 'row');
        const align = String(props.align ?? 'stretch');
        styles['align-items'] = alignment[align] || align;
        const justify = String(props.justify ?? 'start');
        styles['justify-content'] = alignment[justify] || justify;
        if (type === 'Flex') {
            styles.gap = `${props.gap ?? 0}px`;
        }
    }
    if (type === 'Divider') {
        classes.push(`cos-divider${props.vertical ? '-vertical' : ''}${props.inverse ? '-inverse' : ''}`,
            props.vertical ? 'cos-space-mr-xxs cos-space-ml-xxs' : 'cos-space-mt-lg cos-space-mb-lg');
        if (typeof props.height === 'string' || typeof props.height === 'number') {
            styles.height = props.height;
        }
    }
    return {class: classes.filter(Boolean).join(' '),
        style: baseStyle + (baseStyle ? ';' : '')
            + Object.entries(styles).map(([key, item]) => `${key}:${item};`).join(''), value};
}

/** Filters are compiler-owned; protocol expressions cannot invoke these host helpers. */
function filtered(props: san.Expr, name: string): san.Expr {
    return {type: san.ExprType.INTERP, expr: props, filters: [{
        type: san.ExprType.CALL, name: accessor(name), args: [accessor(ROW_COLUMNS)]
    }]} as san.Expr;
}

/** Keep layout inputs out of DOM attributes; emit a native tag and escaped text directly. */
export function compileNativeNode(aNode: san.AElement, type: BuiltinComponentName): void {
    const props = {type: san.ExprType.OBJECT, items: [
        {spread: true, expr: aNode.directives.bind!.value},
        ...aNode.props.map(prop => ({name: compileValue(prop.name), expr: prop.expr}))
    ]} as san.Expr;
    aNode.tagName = tags[type];
    aNode.props = [];
    aNode.directives.bind = {value: filtered(props, 'nativeAttrs')};
    if (type === 'Text') {
        aNode.children = [{textExpr: filtered(props, 'nativeText')} as san.AText];
    }

}
