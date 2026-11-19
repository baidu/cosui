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
 * @file San 模板表达式编译与 JSON Pointer 转换
 */

import san from 'san';
import {assert, pointerTokens, ProtocolError} from './json';
import type {JsonValue} from './types';

/** Compile expressions only. San owns evaluation, dependencies, loops and assignment. */
export const DATA = '__appletData';
type Expr = san.Expr & {[key: string]: any, paths?: Expr[], value?: unknown};
const unsafeKeys = new Set(['__proto__', 'prototype', 'constructor']);

export function accessor(...keys: string[]): san.AccessorExpr {
    return {type: san.ExprType.ACCESSOR, paths: keys.map(value => ({type: san.ExprType.STRING, value}))};
}

/** Prefix root accessors; loop aliases stay in San's native lexical scope. */
function scopeExpression(expr: Expr, locals: ReadonlySet<string>): void {
    if (!expr || typeof expr !== 'object') {
        return;
    }
    if (expr.type === san.ExprType.ACCESSOR) {
        for (const path of expr.paths!) {
            assert(!unsafeKeys.has(String(path.value)), 'Forbidden expression property');
            scopeExpression(path, locals);
        }
        if (!locals.has(String(expr.paths![0].value))) {
            expr.paths!.unshift({type: san.ExprType.STRING, value: DATA});
        }
        return;
    }
    // Protocol data is JSON; it cannot supply callable host methods.
    assert(expr.type !== san.ExprType.CALL, 'Function calls are not supported in protocol expressions');
    for (const value of Object.values(expr)) {
        if (Array.isArray(value)) {
            value.forEach(item => scopeExpression(item, locals));
        }
        else if (value && typeof value === 'object') {
            scopeExpression(value as Expr, locals);
        }
    }
}

export function compileExpression(source: string, locals: ReadonlySet<string> = new Set()): san.Expr {
    try {
        source = source.trim();
        if (source.startsWith('/')) {
            const tokens = pointerTokens(source);
            tokens.forEach(key => assert(!unsafeKeys.has(key), 'Forbidden expression property'));
            return accessor(DATA, ...tokens);
        }
        // Array wrapping prevents silently accepting a trailing, second expression.
        const parsed = san.parseExpr('[' + source + ']') as san.ArrayLiteral;
        assert(parsed?.type === san.ExprType.ARRAY && parsed.items?.length === 1
            && !parsed.items[0].spread, 'Expected one expression');
        const expr = parsed.items[0].expr;
        scopeExpression(expr as Expr, locals);
        return expr;
    }
    catch (error) {
        throw new ProtocolError(`Invalid expression ${source}: ${(error as Error).message}`, 'binding');
    }
}

/** `if` accepts a bare expression or one wrapped in binding delimiters. */
export function compileIf(source: string, locals?: ReadonlySet<string>): san.Expr {
    return compileExpression(source.replace(/^\{\{([\s\S]*)\}\}$/, '$1'), locals);
}

export function hasBinding(value: JsonValue): boolean {
    return typeof value === 'string' ? value.includes('{{') || /^\s*\{=[\s\S]*=\}\s*$/.test(value)
        : value !== null && typeof value === 'object' && Object.values(value).some(hasBinding);
}

/** Find interpolation boundaries without interpreting the expression within them. */
function normalizeTemplate(text: string, expressions: san.Expr[], locals: ReadonlySet<string>): string {
    let output = '';
    let cursor = 0;
    while (text.includes('{{', cursor)) {
        const start = text.indexOf('{{', cursor);
        output += text.slice(cursor, start).replace(/'/g, '&#39;');
        let quote = '';
        let depth = 0;
        let end = start + 2;
        for (; end < text.length; end++) {
            const char = text[end];
            if (quote) {
                if (char === '\\') {
                    end++;
                }
                else if (char === quote) {
                    quote = '';
                }
            }
            else if (char === '"' || char === "'") {
                quote = char;
            }
            else if (!depth && text.slice(end, end + 2) === '}}') {
                break;
            }
            else if ('{[('.includes(char)) {
                depth++;
            }
            else if ('}])'.includes(char)) {
                depth--;
            }
        }
        if (end >= text.length) {
            throw new ProtocolError('Unclosed binding', 'binding');
        }
        const index = expressions.push(compileExpression(text.slice(start + 2, end), locals)) - 1;
        output += `{{__expression${index}}}`;
        cursor = end + 2;
    }
    return output + text.slice(cursor).replace(/'/g, '&#39;');
}

/** Compile JSON objects/arrays as native San object/array expressions, as in v1. */
export function compileValue(value: JsonValue, locals: ReadonlySet<string> = new Set()): san.Expr {
    if (typeof value === 'string') {
        if (!hasBinding(value)) {
            return {type: san.ExprType.STRING, value} as san.StringLiteral;
        }
        const twoWay = /^\s*\{=([\s\S]*)=\}\s*$/.exec(value);
        if (twoWay) {
            return compileExpression(twoWay[1], locals);
        }
        const expressions: san.Expr[] = [];
        const text = normalizeTemplate(value, expressions, locals);
        const node = (san.parseTemplate(`<x prop-value='${text}' />`) as san.AElement).children[0] as san.AElement;
        const replace = (expr: Expr): san.Expr => {
            if (expr.type === san.ExprType.ACCESSOR) {
                const index = /^__expression(\d+)$/.exec(String(expr.paths![0].value));
                if (index) {
                    return expressions[Number(index[1])];
                }
            }
            for (const [key, value] of Object.entries(expr)) {
                if (Array.isArray(value)) {
                    expr[key] = value.map(item => (item && typeof item === 'object' ? replace(item) : item));
                }
                else if (value && typeof value === 'object') {
                    expr[key] = replace(value as Expr);
                }
            }
            return expr;
        };
        return replace(node.props[0].expr as Expr);
    }
    if (Array.isArray(value)) {
        return {type: san.ExprType.ARRAY,
            items: value.map(item => ({expr: compileValue(item, locals)}))} as san.ArrayLiteral;
    }
    if (value !== null && typeof value === 'object') {
        return {type: san.ExprType.OBJECT, items: Object.entries(value).map(([name, child]) => ({
            name: {type: san.ExprType.STRING, value: name}, expr: compileValue(child, locals)
        }))} as san.Expr;
    }
    return san.parseExpr(JSON.stringify(value));
}

export function compileProp(name: string, value: JsonValue, locals: ReadonlySet<string>): san.AProperty {
    const prop: san.AProperty = {name, expr: compileValue(value, locals)};
    if (typeof value === 'string' && /^\s*\{=[\s\S]*=\}\s*$/.test(value)) {
        // Let San perform native two-way assignment; no path mapping or per-property watchers.
        prop.x = 1;
    }
    return prop;
}

export function compileFor(source: string, locals: ReadonlySet<string> = new Set()): san.ADirectiveFor {
    try {
        source = source.trim().replace(/^\{\{([\s\S]*)\}\}$/, '$1').trim();
        const pointer = /^(.*?\s+in\s+)(\/\S+?)(\s+trackby\s+[\s\S]+)?$/i.exec(source);
        const text = (pointer ? `${pointer[1]}__pointer${pointer[3] || ''}` : source)
            .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,
                literal => JSON.stringify((san.parseExpr(literal) as Expr).value).replace(/'/g, '\\u0027'));
        const node = (san.parseTemplate(`<x s-for='${text}' />`) as san.AElement).children[0] as san.AElement;
        const directive = node.directives.for!;
        // San uses $index implicitly; declaring it also keeps native trackBy reassignment in sync.
        directive.index = directive.index || '$index';
        if (pointer) {
            directive.value = compileExpression(pointer[2], locals);
        }
        else {
            scopeExpression(directive.value as Expr, locals);
        }
        // trackBy is evaluated in the native item scope; retain San's raw representation too.
        return directive;
    }
    catch (error) {
        throw new ProtocolError(`Invalid for expression ${source}: ${(error as Error).message}`, 'binding');
    }
}

export function validateBindings(value: JsonValue): void {
    compileValue(value);
}
