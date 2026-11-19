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
 * @file JSON 数据校验与路径更新
 */

import type {JsonObject, JsonValue, AppletErrorPhase} from './types';

export class ProtocolError extends Error {
    readonly phase: AppletErrorPhase;
    readonly componentId?: string;
    readonly path?: string;
    constructor(message: string, phase: AppletErrorPhase = 'protocol', componentId?: string, path?: string) {
        super(message);
        this.phase = phase;
        this.componentId = componentId;
        this.path = path;
        this.name = 'CosuiProtocolError';
    }
}
export function assert(condition: unknown, message: string): asserts condition {
    if (!condition) {
        throw new ProtocolError(message);
    }
}
export const hasOwn = (value: object, key: string): boolean => Object.prototype.hasOwnProperty.call(value, key);
export function isObject(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}
/** Copy JSON without invoking accessors, accepting prototypes or losing undefined values. */
export function copyJson<T>(value: T, ancestorObjects = new Set<object>()): T {
    if (value === null || typeof value === 'string' || typeof value === 'boolean') {
        return value;
    }
    if (typeof value === 'number') {
        assert(Number.isFinite(value), 'JSON numbers must be finite');
        return value;
    }
    assert(typeof value === 'object' && value !== null, 'Only JSON values are accepted');
    assert(!ancestorObjects.has(value as unknown as object), 'Cyclic JSON is not supported');
    assert(Array.isArray(value) || Object.getPrototypeOf(value) === Object.prototype
        || Object.getPrototypeOf(value) === null, 'Expected a plain JSON object');
    ancestorObjects.add(value as unknown as object);
    const result: Record<string, unknown> | unknown[] = Array.isArray(value) ? [] : {};
    for (const key of Object.keys(value)) {
        if (Array.isArray(value)) {
            assert(/^(0|[1-9]\d*)$/.test(key) && Number(key) < value.length,
                'JSON arrays cannot contain named properties');
        }
        const descriptor = Object.getOwnPropertyDescriptor(value, key)!;
        assert(hasOwn(descriptor, 'value'), 'JSON accessors are not supported');
        Object.defineProperty(result, key, {
            value: copyJson(descriptor.value, ancestorObjects), enumerable: true, writable: true, configurable: true
        });
    }
    if (Array.isArray(value)) {
        assert(Object.keys(value).length === value.length, 'Sparse arrays are not JSON');
    }
    ancestorObjects.delete(value as unknown as object);
    return result as T;
}
export function pointerTokens(path: string): string[] {
    assert(path === '' || path.startsWith('/'), 'path must be a JSON Pointer');
    if (path === '') {
        return [];
    }
    return path.slice(1).split('/').map(token => {
        assert(!/~(?:[^01]|$)/.test(token), 'Invalid JSON Pointer escape');
        return token.replace(/~1/g, '/').replace(/~0/g, '~');
    });
}
const define = (target: object, key: string, value: unknown): void => {
    Object.defineProperty(target, key, {value, enumerable: true, configurable: true, writable: true});
};
/** Spread may compile to Object.assign, whose [[Set]] turns an own "__proto__" key into a prototype. */
export function shallowCopy<T extends object>(value: T): T {
    if (Array.isArray(value)) {
        return value.slice() as T;
    }
    const result = {} as T;
    for (const key of Object.keys(value)) {
        define(result, key, (value as Record<string, unknown>)[key]);
    }
    return result;
}
/**
 * Copy only the containers on the path; untouched subtrees stay shared with the previous data.
 * value must already be a detached JSON value owned by the caller.
 */
export function updateData(data: JsonObject, path: string, value: JsonValue): JsonObject {
    const tokens = pointerTokens(path);
    if (!tokens.length) {
        assert(isObject(value), 'Root data replacement must be an object');
        return value;
    }
    const write = (parent: JsonValue, index: number): JsonValue => {
        const key = tokens[index];
        const last = index === tokens.length - 1;
        assert(parent !== null && typeof parent === 'object',
            last ? 'Data update parent is not a container' : 'Data update parent does not exist');
        if (Array.isArray(parent)) {
            assert(/^(0|[1-9]\d*)$/.test(key), 'Invalid array index');
        }
        const next: any = shallowCopy(parent);
        if (!last) {
            assert(hasOwn(parent, key), 'Data update parent does not exist');
            define(next, key, write((parent as JsonObject)[key], index + 1));
        }
        else if (Array.isArray(next)) {
            const position = Number(key);
            assert(position <= next.length && (value !== null || position < next.length), 'Array index out of bounds');
            if (value === null) {
                next.splice(position, 1);
            }
            else {
                next[position] = value;
            }
        }
        else if (value === null) {
            delete next[key];
        }
        else {
            define(next, key, value);
        }
        return next;
    };
    return write(data, 0) as JsonObject;
}
