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
 * @file 协议消息自动修复
 */

import type {z} from 'zod';
import {CatalogValidator} from '../catalog/validator';
import {BUILTIN_TYPE_ALIASES} from '../catalog/builtins';
import {hasBinding} from './expression';
import {hasOwn, isObject} from './json';
import type {AppletStore} from './applet-store';
import type {RuntimeCatalog} from './types';

/** Strip only fields of known object schemas; ambiguous unions and open values stay intact. */
export function removeUndeclaredProps(value: unknown, schema: z.ZodType,
    note: (message: string) => void, path: string[] = []): void {
    const def = schema.def as any;
    if (def.type === 'lazy') {
        removeUndeclaredProps(value, def.getter(), note, path);
    }
    else if (def.innerType) {
        removeUndeclaredProps(value, def.innerType, note, path);
    }
    else if (def.type === 'object' && isObject(value)) {
        for (const key of Object.keys(value)) {
            // props.slot belongs to the parent and is repaired separately.
            if (!path.length && key === 'slot') {
                continue;
            }
            const fieldPath = [...path, key];
            if (hasOwn(def.shape, key)) {
                removeUndeclaredProps(value[key], def.shape[key], note, fieldPath);
            }
            else if (def.catchall?.def.type === 'never') {
                delete value[key];
                note(`removed undeclared prop "${fieldPath.join('.')}"`);
            }
        }
    }
    else if (def.type === 'array' && Array.isArray(value)) {
        value.forEach((item, index) => removeUndeclaredProps(item, def.element, note, [...path, String(index)]));
    }
    else if (def.type === 'record' && isObject(value)) {
        for (const key of Object.keys(value)) {
            removeUndeclaredProps(value[key], def.valueType, note, [...path, key]);
        }
    }
    else if (def.type === 'tuple' && Array.isArray(value)) {
        value.forEach((item, index) => {
            const itemSchema = def.items[index] || def.rest;
            if (itemSchema) {
                removeUndeclaredProps(item, itemSchema, note, [...path, String(index)]);
            }
        });
    }
}

/** Repair access tokens, preserving quoted strings and decimal literals. */
function fixExpression(source: string): string {
    source = source.replace(/^(\s*)#/, '$1');
    if (source.trim().startsWith('/')) {
        return source;
    }
    let output = '';
    let quote = '';
    for (let i = 0; i < source.length; i++) {
        const char = source[i];
        if (quote) {
            output += char;
            if (char === '\\') {
                output += source[++i] || '';
            }
            else if (char === quote) {
                quote = '';
            }
            continue;
        }
        if (char === '"' || char === "'") {
            quote = char;
        }
        if (char === '.' && /[\w$\]\)\u3400-\u9fff]/.test(source[i - 1] || '')) {
            const key = /^([\w$\u3400-\u9fff]+)/.exec(source.slice(i + 1))?.[1];
            // A numeric token before the dot is a number, not an accessor (e.g. 1.25).
            const before = /[\w$\u3400-\u9fff]+$/.exec(source.slice(0, i))?.[0];
            if (key && (/^\d+$/.test(key) || /[\u3400-\u9fff]/.test(key))
                && !(before && /^\d+$/.test(before) && !output.endsWith(']'))) {
                output += `[${JSON.stringify(key)}]`;
                i += key.length;
                continue;
            }
        }
        output += char;
    }
    return output;
}

/** Locate complete interpolations with the same quote/depth boundaries as the compiler. */
function fixTemplate(text: string): string {
    let output = '';
    let cursor = 0;
    while (text.includes('{{', cursor)) {
        const start = text.indexOf('{{', cursor);
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
            break;
        }
        output += text.slice(cursor, start) + '{{' + fixExpression(text.slice(start + 2, end)) + '}}';
        cursor = end + 2;
    }
    return output + text.slice(cursor);
}

const camel = (key: string): string => key.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());

/** Kebab-case and legacy lowercase builtin names map to their declared type. */
function normalizeType(type: string): string | undefined {
    if (type.includes('-')) {
        return type.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
    }
    return hasOwn(BUILTIN_TYPE_ALIASES, type) ? BUILTIN_TYPE_ALIASES[type] : undefined;
}

/** Mutates only the owned message. Existing state is read solely to resolve parent slots. */
export function autofixMessage(message: unknown, catalog: RuntimeCatalog, store: AppletStore,
    fixes: string[]): void {
    if (!isObject(message)) {
        return;
    }
    const validator = new CatalogValidator(catalog);
    const definitions = catalog.definition.components;
    const applet = isObject(message.applet) ? message.applet : undefined;
    if (applet && !hasOwn(applet, 'delete') && hasOwn(message, 'components')) {
        if (!hasOwn(applet, 'components')) {
            applet.components = message.components;
            fixes.push('applet: moved components');
        }
        else {
            fixes.push('applet: removed duplicate components');
        }
        delete message.components;
    }
    const incoming: Array<Record<string, unknown>> = [];
    const repairBindings = (value: unknown, label: string): unknown => {
        if (typeof value === 'string') {
            const fixed = fixTemplate(value);
            if (fixed !== value) {
                fixes.push(`${label}: normalized interpolation`);
            }
            return fixed;
        }
        if (Array.isArray(value)) {
            return value.map(item => repairBindings(item, label));
        }
        if (isObject(value)) {
            for (const key of Object.keys(value)) {
                value[key] = repairBindings(value[key], label);
            }
        }
        return value;
    };
    const visit = (node: unknown): void => {
        if (!isObject(node)) {
            return;
        }
        incoming.push(node);
        const label = typeof node.id === 'string' ? node.id : 'component';
        const note = (text: string): void => {
            fixes.push(`${label}: ${text}`);
        };
        if (typeof node.type === 'string') {
            const type = normalizeType(node.type);
            if (type && hasOwn(definitions, type) && !hasOwn(definitions, node.type)) {
                node.type = type;
                note(`normalized type to "${type}"`);
            }
        }
        const definition = typeof node.type === 'string' && hasOwn(definitions, node.type)
            ? definitions[node.type] : undefined;
        if (isObject(node.props)) {
            for (const key of ['if', 'for']) {
                if (hasOwn(node.props, key)) {
                    if (!hasOwn(node, key)) {
                        node[key] = node.props[key];
                    }
                    delete node.props[key];
                    note(`hoisted "${key}"`);
                }
            }
            if (definition) {
                const schema = validator.propsSchema(node.type as string);
                const shape = schema.shape;
                for (const key of Object.keys(node.props)) {
                    if (key === 'slot' || hasOwn(shape, key)) {
                        continue;
                    }
                    const matches = Object.keys(shape).filter(name => camel(name) === camel(key));
                    if (matches.length === 1) {
                        const name = matches[0];
                        if (!hasOwn(node.props, name)) {
                            Object.defineProperty(node.props, name, {
                                value: node.props[key], enumerable: true, configurable: true, writable: true
                            });
                        }
                        delete node.props[key];
                        note(`normalized prop "${key}" to "${name}"`);
                    }
                }
                removeUndeclaredProps(node.props, schema, note);
            }
            repairBindings(node.props, label);
            if (hasOwn(node.props, 'slot') && (node.id === 'root' || typeof node.props.slot !== 'string'
                || !node.props.slot || hasBinding(node.props.slot))) {
                delete node.props.slot;
                note('removed invalid slot');
            }
        }
        for (const key of ['if', 'for']) {
            if (node[key] === null || node[key] === '') {
                delete node[key];
                note(`removed empty ${key}`);
            }
            if (typeof node[key] === 'string') {
                node[key] = repairBindings(node[key], label);
            }
        }
        // Match CatalogValidator: omitted children declarations also forbid children.
        const allowsChildren = definition?.children === true || Array.isArray(definition?.children);
        if (definition && hasOwn(node, 'children') && (!allowsChildren
            || node.children === null || node.children === ''
            || (Array.isArray(node.children) && !node.children.length))) {
            delete node.children;
            note('removed children');
        }
        if (isObject(node.events)) {
            for (const [name, binding] of Object.entries(node.events)) {
                if (definition && !hasOwn(definition.events || {}, name)) {
                    delete node.events[name];
                    note(`removed undeclared event "${name}"`);
                }
                else {
                    if (isObject(binding)) {
                        node.events[name] = [binding];
                        note(`wrapped event "${name}"`);
                    }
                    const actions = node.events[name];
                    if (Array.isArray(actions)) {
                        for (const action of actions) {
                            if (isObject(action) && hasOwn(action, 'args')) {
                                repairBindings(action.args, label);
                            }
                        }
                    }
                }
            }
        }
        if (Array.isArray(node.children)) {
            node.children.forEach(visit);
        }
    };
    const nodes = applet ? applet.components : message.updates;
    if (Array.isArray(nodes)) {
        nodes.forEach(node => {
            if (applet || (isObject(node) && hasOwn(node, 'id'))) {
                visit(node);
            }
        });
    }
    const id = (applet || message).appletId;
    const previous = !applet && (id === undefined || typeof id === 'string')
        ? store.getState(id, false)?.components : undefined;
    const all = new Map<string, Record<string, unknown>>();
    for (const [key, node] of Object.entries(previous || {})) {
        all.set(key, node as unknown as Record<string, unknown>);
    }
    for (const node of incoming) {
        if (typeof node.id === 'string') {
            all.set(node.id, node);
        }
    }
    for (const node of incoming) {
        if (!isObject(node.props) || !hasOwn(node.props, 'slot')) {
            continue;
        }
        const parents = [...all.values()].filter(parent => Array.isArray(parent.children)
            // Inline children become ID references in the store, even when replaced by a later update.
            && parent.children.some(child => child === node.id || (isObject(child) && child.id === node.id)));
        const slot = node.props.slot;
        const invalid = parents.some(parent => {
            const type = parent.type;
            if (typeof type !== 'string' || !hasOwn(definitions, type)) {
                return false;
            }
            return !definitions[type].props?.shape.slot?.safeParse(slot).success;
        });
        if (invalid) {
            delete node.props.slot;
            fixes.push(`${String(node.id)}: removed undeclared slot`);
        }
    }
}
