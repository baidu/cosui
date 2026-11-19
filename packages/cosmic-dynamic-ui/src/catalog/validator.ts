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
 * @file 组件属性与行为参数校验
 */

import {z} from 'zod';
import {assert, copyJson, hasOwn, ProtocolError} from '../v2/json';
import {hasBinding, validateBindings} from '../v2/expression';
import {assertCatalog} from './definition';
import type {CatalogDefinition, ComponentNode, JsonObject, RuntimeCatalog} from '../v2/types';

const empty = z.strictObject({});

/** Ignore only errors that can be caused by an unresolved binding, never unrelated invalid siblings. */
function isDeferredBindingIssue(issue: z.core.$ZodIssue, value: unknown): boolean {
    let current = value;
    for (const part of issue.path) {
        if (typeof current === 'string' && hasBinding(current)) {
            return true;
        }
        current = current !== null && typeof current === 'object'
            ? (current as Record<PropertyKey, unknown>)[part] : undefined;
    }
    if (issue.code === 'invalid_union') {
        return issue.errors.some(branch => branch.every(child => isDeferredBindingIssue(child, current)));
    }
    return typeof current === 'string' && hasBinding(current);
}

export class CatalogValidator {
    readonly catalog: CatalogDefinition;
    // Component props composed with $defs.PropsCommon, built once per component type.
    private readonly propsSchemas = new Map<string, z.ZodObject>();
    constructor(catalog: RuntimeCatalog) {
        assertCatalog(catalog);
        this.catalog = catalog.definition;
    }
    validate(schema: z.ZodType, value: unknown, label: string, template = false): unknown {
        const result = schema.safeParse(value);
        if (result.success) {
            return result.data;
        }
        const issues = template
            ? result.error.issues.filter(issue => !isDeferredBindingIssue(issue, value)) : result.error.issues;
        if (issues.length) {
            const parts = issues[0].path.map(part => String(part).replace(/~/g, '~0').replace(/\//g, '~1'));
            const path = parts.length ? `/${parts.join('/')}` : '';
            const detail = issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join('; ');
            throw new ProtocolError(`${label}: ${detail}`,
                'catalog', undefined, path);
        }
        return value;
    }
    /** Every component inherits $defs.PropsCommon, so components never redeclare those props. */
    propsSchema(type: string): z.ZodObject {
        let schema = this.propsSchemas.get(type);
        if (!schema) {
            const own = this.catalog.components[type].props || empty;
            const common = this.catalog.$defs?.PropsCommon;
            schema = common ? own.extend(common.shape) : own;
            this.propsSchemas.set(type, schema);
        }
        return schema;
    }
    /**
     * Catalog defaults are verified by defineCatalog, so one parse also covers the normalized output.
     * props.slot selects a named slot of the parent and is checked against the parent, not this component.
     */
    props(component: ComponentNode, value: JsonObject, template = false): JsonObject {
        const own = Object.fromEntries(Object.entries(value).filter(([key]) => key !== 'slot')) as JsonObject;
        const result = this.validate(this.propsSchema(component.type), own, `${component.id}.props`, template);
        return template ? own : copyJson(result) as JsonObject;
    }
    /** A component offers its named slots through its own props.slot declaration. */
    slot(parent: ComponentNode, child: ComponentNode): void {
        const name = child.props?.slot;
        if (name !== undefined) {
            const offered = this.catalog.components[parent.type].props?.shape.slot;
            assert(offered?.safeParse(name).success, `${parent.type} has no slot ${String(name)} for ${child.id}`);
        }
    }
    /** Returns the normalized props when they are fully static; bound props are checked in their render scope. */
    component(component: ComponentNode): JsonObject | undefined {
        const capitalized = component.type.charAt(0).toUpperCase() + component.type.slice(1);
        const suggestion = !hasOwn(this.catalog.components, component.type)
            && hasOwn(this.catalog.components, capitalized)
            ? ` (did you mean "${capitalized}"?)` : '';
        assert(hasOwn(this.catalog.components, component.type),
            `Unknown component type: ${component.type}${suggestion}`);
        const definition = this.catalog.components[component.type];
        const common = this.catalog.$defs?.Component;
        if (common) {
            // Check the public common fields only; per-component fields are validated separately.
            const fields = Object.fromEntries(Object.entries(component).filter(([key]) =>
                ['id', 'type', 'if', 'for', 'extensions'].includes(key)));
            this.validate(common, fields, `${component.id}.common`);
        }
        const props = component.props || {};
        const bound = hasBinding(props);
        if (bound) {
            this.props(component, props, true);
            validateBindings(props);
        }
        assert(!component.children || definition.children === true || Array.isArray(definition.children),
            `${component.type} does not allow children`);
        if (component.extensions) {
            assert(this.catalog.$defs?.Extensions, 'Catalog does not declare extensions');
            this.validate(this.catalog.$defs.Extensions, component.extensions, 'extensions');
        }
        for (const [event, actions] of Object.entries(component.events || {})) {
            assert(hasOwn(definition.events || {}, event), `Undeclared event: ${component.type}.${event}`);
            for (const action of actions) {
                assert(hasOwn(this.catalog.actions, action.action), `Unknown Action: ${action.action}`);
                this.validate(this.catalog.actions[action.action].args || empty,
                    action.args || {}, `${action.action}.args`, true);
                validateBindings(action.args || {});
            }
        }
        return bound ? undefined : this.props(component, props);
    }

    /** Check direct row/column relationships; unresolved bindings are checked in their render scope. */
    layout(parent: ComponentNode, child: ComponentNode): void {
        if (parent.type === 'Row' && child.type === 'Column') {
            const columns = parent.props?.columns ?? 12;
            const span = child.props?.span ?? 1;
            if (typeof columns === 'number' && typeof span === 'number') {
                this.columnSpan(child, {span}, columns);
            }
        }
    }

    columnSpan(component: ComponentNode, props: JsonObject, columns?: number): void {
        if (component.type === 'Column' && columns !== undefined && typeof props.span === 'number'
            && props.span > columns) {
            throw new ProtocolError(`Column span ${props.span} exceeds row columns ${columns}`,
                'catalog', component.id, '/span');
        }
    }

    /** args come from San evaluation of the binding; copyJson rejects anything that is not JSON. */
    action(name: string, args: unknown): JsonObject {
        const schema = this.catalog.actions[name].args || empty;
        return copyJson(this.validate(schema, args, `${name}.args`)) as JsonObject;
    }
}
