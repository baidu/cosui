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
 * @file Catalog 定义校验与 JSON Schema 导出
 */

import {z} from 'zod';
import {builtinDefinitions} from './builtins';
import {assert, copyJson, hasOwn} from '../v2/json';
import type {Catalog, CatalogDefinition, RuntimeCatalog, SchemaObject, WithBuiltinComponents} from '../v2/types';

const catalogs = new WeakSet<object>();

/** Keep the schema instances, copy/freeze containers so the capability set cannot drift. */
function freezeCatalogDefinition<T>(value: T): T {
    if (value instanceof z.ZodType) {
        return value;
    }
    if (Array.isArray(value)) {
        return Object.freeze(value.map(freezeCatalogDefinition)) as T;
    }
    if (value && typeof value === 'object') {
        const entries = Object.entries(value).map(([key, item]) => [key, freezeCatalogDefinition(item)]);
        return Object.freeze(Object.fromEntries(entries)) as T;
    }
    return value;
}

/** Restrict authoring to portable JSON semantics; arbitrary JS checks cannot be exported faithfully. */
function validatePortableSchema(schema: z.ZodType, validatedSchemas = new Set<z.ZodType>()): void {
    if (validatedSchemas.has(schema)) {
        return;
    }
    validatedSchemas.add(schema);
    const def = schema.def as any;
    assert(!def.coerce && !['transform', 'pipe', 'custom', 'catch', 'prefault'].includes(def.type),
        'Catalog schemas cannot coerce, transform, or use custom executable validation');
    assert(!(def.checks || []).some((check: any) => check._zod.def.check === 'custom'),
        'Catalog schemas cannot use custom refinements; use portable unions');
    if (def.type === 'object') {
        assert(def.catchall instanceof z.ZodNever,
            'Catalog objects must use z.strictObject; use z.record for open records');
    }
    if (def.type === 'default') {
        // Zod exposes literal and function defaults through a getter. Compare two reads to reject unstable defaults.
        const value = def.defaultValue;
        assert(JSON.stringify(copyJson(value)) === JSON.stringify(copyJson(def.defaultValue)),
            'Unstable Catalog default');
        assert(def.innerType.safeParse(value).success, 'Invalid Catalog default');
    }
    const visit = (value: unknown): void => {
        if (value instanceof z.ZodType) {
            validatePortableSchema(value, validatedSchemas);
        }
        else if (Array.isArray(value)) {
            value.forEach(visit);
        }
        else if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
            Object.values(value).forEach(visit);
        }
    };
    if (def.type === 'lazy') {
        visit(def.getter());
    }
    Object.values(def).forEach(visit);
}

export function assertCatalog(value: RuntimeCatalog): void {
    assert(catalogs.has(value), 'catalog must be created by defineCatalog');
}

/** Serialize schemas together to preserve stable shared references across the entire Catalog. */
function exportCatalogDefinition(definition: CatalogDefinition): Catalog {
    // toJSONSchema reads metadata only through `.get`; delegate to the global registry so that
    // `.describe()` annotations on props and nested fields survive, overlaying the $defs ids used
    // for extraction. A fresh registry would shadow the global one and drop every description.
    const defIds = new Map<z.ZodType, string>();
    for (const [name, schema] of Object.entries(definition.$defs || {})) {
        defIds.set(schema, name);
    }
    const metadata = {
        get(schema: z.ZodType) {
            const base = z.globalRegistry.get(schema);
            const id = defIds.get(schema);
            return id === undefined ? base : {...base, id};
        }
    } as unknown as typeof z.globalRegistry;
    const schemas: Record<string, z.ZodType> = {};
    let nextId = 0;
    const ref = (schema: z.ZodType): string => {
        const id = `s${nextId++}`;
        schemas[id] = schema;
        return id;
    };
    const output: any = {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        $id: definition.$id, version: definition.version
    };
    for (const key of ['title', 'description', 'usage'] as const) {
        if (definition[key] !== undefined) {
            output[key] = definition[key];
        }
    }
    output.components = Object.fromEntries(Object.entries(definition.components).map(([name, component]) => [name, {
        ...(component.description === undefined ? {} : {description: component.description}),
        ...(component.props ? {props: ref(component.props)} : {}),
        ...(component.children === undefined ? {} : {children: component.children}),
        ...(component.events ? {events: Object.fromEntries(Object.entries(component.events)
            .map(([event, schema]) => [event, ref(schema)]))} : {})
    }]));
    output.actions = Object.fromEntries(Object.entries(definition.actions).map(([name, action]) => [name, {
        ...(action.description === undefined ? {} : {description: action.description}),
        ...(action.args ? {args: ref(action.args)} : {})
    }]));
    const namedSchemas = Object.entries(definition.$defs || {}).map(([name, schema]) => [name, ref(schema)]);
    const defs: Record<string, string> = Object.fromEntries(namedSchemas);
    const document = z.toJSONSchema(z.strictObject(schemas), {
        target: 'draft-2020-12', io: 'input', metadata, reused: 'inline', unrepresentable: 'throw',
        // Catalog objects are closed by default (only z.strictObject is allowed), so never emit
        // `additionalProperties: false`; open records keep their value schema.
        override({jsonSchema}) {
            if (jsonSchema.additionalProperties === false) {
                delete jsonSchema.additionalProperties;
            }
        }
    }) as SchemaObject;
    const extracted = document.$defs || {};
    const get = (id: string): SchemaObject => document.properties[id];
    for (const component of Object.values<any>(output.components)) {
        if (component.props) {
            component.props = get(component.props);
        }
        for (const [event, id] of Object.entries<string>(component.events || {})) {
            component.events[event] = get(id);
        }
    }
    for (const action of Object.values<any>(output.actions)) {
        if (action.args) {
            action.args = get(action.args);
        }
    }
    output.$defs = {...extracted};
    for (const [name, id] of Object.entries(defs)) {
        if (!hasOwn(output.$defs, name)) {
            output.$defs[name] = get(id);
        }
    }
    return copyJson(output) as Catalog;
}

export function defineCatalog<const D extends CatalogDefinition>(
    definition: D
): RuntimeCatalog<WithBuiltinComponents<D>> {
    assert(definition.version === '2.0' && typeof definition.$id === 'string' && !!definition.$id,
        'Catalog requires version 2.0 and a nonempty $id');
    assert(definition.components && definition.actions, 'Catalog requires components and actions');
    definition = {...definition, components: {...builtinDefinitions(definition.$defs), ...definition.components}};
    const visit = (value: unknown): void => {
        if (value instanceof z.ZodType) {
            validatePortableSchema(value);
        }
        else if (Array.isArray(value)) {
            value.forEach(visit);
        }
        else if (value && typeof value === 'object') {
            Object.values(value).forEach(visit);
        }
    };
    visit(definition);
    const catalog = Object.freeze({definition: freezeCatalogDefinition(definition)});
    // Export checks supported, portable schemas before accepting a runtime catalog.
    exportCatalogDefinition(catalog.definition);
    for (const [name, component] of Object.entries(definition.components)) {
        assert(name.length > 0, 'Empty component type');
        assert(component.props === undefined || component.props instanceof z.ZodObject, 'Props must be a Zod object');
        assert(component.children === undefined || typeof component.children === 'boolean'
            || (Array.isArray(component.children)
                && component.children.every(type => hasOwn(definition.components, type))),
        `Invalid children declaration: ${name}`);
        for (const [event, schema] of Object.entries(component.events || {})) {
            assert(/^[A-Za-z][\w-]*$/.test(event) && schema instanceof z.ZodType,
                `Invalid event declaration: ${name}.${event}`);
        }
    }
    for (const action of Object.values(definition.actions)) {
        assert(action.args === undefined || action.args instanceof z.ZodObject, 'Action args must be a Zod object');
    }
    const common = definition.$defs?.Component;
    if (common) {
        assert(common instanceof z.ZodObject, 'Component common definition must be a Zod object');
        assert(Object.keys(common.shape).every(key => ['id', 'type', 'if', 'for', 'extensions'].includes(key)),
            'Props, children and events are not common Component fields');
    }
    const propsCommon = definition.$defs?.PropsCommon;
    if (propsCommon) {
        assert(propsCommon instanceof z.ZodObject, 'PropsCommon must be a Zod object');
        const shared = Object.keys(propsCommon.shape);
        for (const [name, component] of Object.entries(definition.components)) {
            assert(!shared.some(key => hasOwn(component.props?.shape || {}, key)),
                `${name}.props redeclares a PropsCommon field`);
        }
    }
    catalogs.add(catalog);
    return catalog as RuntimeCatalog<WithBuiltinComponents<D>>;
}

export function exportCatalog(catalog: RuntimeCatalog): Catalog {
    assertCatalog(catalog);
    return exportCatalogDefinition(catalog.definition);
}
