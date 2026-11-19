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
 * @file 协议消息校验与状态更新
 */

import type san from 'san';
import {removeUndeclaredProps} from './autofix';
import {CatalogValidator} from '../catalog/validator';
import {isNativeNode} from './native-nodes';
import {mountApplet} from './applet-view';
import {assert, copyJson, hasOwn, isObject, shallowCopy, updateData, ProtocolError} from './json';
import {compileFor, compileIf, hasBinding} from './expression';
import type {AppletState, ComponentNode, JsonObject, JsonValue, Message,
    ActionBinding, AppletStoreOptions} from './types';

export interface MessageResult {appletId: string, kind: 'create' | 'delete' | 'update'}

function assertObject(value: unknown, label: string): asserts value is Record<string, unknown> {
    assert(isObject(value), `${label} must be an object`);
}
function assertIdentifier(value: unknown, label: string): asserts value is string {
    assert(typeof value === 'string' && value.length > 0, `${label} must be a nonempty string`);
}
/** San evaluates missing bindings to undefined; omit them as JSON.stringify does. */
function omitUndefined(value: unknown): unknown {
    if (Array.isArray(value)) {
        return value.map(omitUndefined);
    }
    if (isObject(value) && Object.getPrototypeOf(value) === Object.prototype) {
        return Object.fromEntries(Object.entries(value)
            .filter(([, item]) => item !== undefined)
            .map(([key, item]) => [key, omitUndefined(item)]));
    }
    return value;
}
/** Flatten nested definitions; reject duplicate IDs within this component tree. */
function normalizeComponent(
    componentInput: unknown, components: Record<string, ComponentNode>, definedComponentIds: Set<string>
): string {
    assertObject(componentInput, 'Component');
    assertIdentifier(componentInput.id, 'Component.id');
    // type and action names are checked against the Catalog in validateAppletState.
    assert(!definedComponentIds.has(componentInput.id), `Duplicate component ID in message: ${componentInput.id}`);
    definedComponentIds.add(componentInput.id);
    for (const key of ['props', 'events', 'extensions']) {
        if (hasOwn(componentInput, key)) {
            assertObject(componentInput[key], key);
        }
    }
    const slot = (componentInput.props as JsonObject | undefined)?.slot;
    assert(slot === undefined || (typeof slot === 'string' && slot.length > 0 && !hasBinding(slot)),
        'Only static named slots are supported');
    if (hasOwn(componentInput, 'if')) {
        assert(typeof componentInput.if === 'boolean' || typeof componentInput.if === 'string', 'Invalid if condition');
        if (typeof componentInput.if === 'string') {
            compileIf(componentInput.if);
        }
    }
    if (hasOwn(componentInput, 'for')) {
        assertIdentifier(componentInput.for, 'for');
        compileFor(componentInput.for);
    }
    for (const actions of Object.values((componentInput.events || {}) as Record<string, unknown>)) {
        assert(Array.isArray(actions), 'Event binding must be an array');
        for (const binding of actions) {
            assertObject(binding, 'Action');
            if (hasOwn(binding, 'args')) {
                assertObject(binding.args, 'Action.args');
            }
        }
    }
    // processMessage already owns a detached JSON snapshot; only replace this node's children array.
    const component = shallowCopy(componentInput) as unknown as ComponentNode;
    if (hasOwn(componentInput, 'children')) {
        assert(Array.isArray(componentInput.children), 'children must be an array');
        component.children = componentInput.children.map(child => {
            if (typeof child === 'string') {
                assertIdentifier(child, 'Child ID');
                return child;
            }
            return normalizeComponent(child, components, definedComponentIds);
        });
        assert(new Set(component.children).size === component.children.length, 'Duplicate child reference');
    }
    Object.defineProperty(components, component.id, {
        value: component, writable: true, configurable: true, enumerable: true
    });
    return component.id;
}

export class AppletStore {
    private readonly options: AppletStoreOptions;
    private readonly validator: CatalogValidator;
    private readonly appletStates = new Map<string, AppletState>();
    private readonly appletChangeListeners = new Set<(appletId: string) => void>();
    private readonly componentRevisions = new Map<string, Map<string, number>>();
    // Normalized static props per committed definition; definitions are replaced, never mutated.
    private readonly staticProps = new WeakMap<ComponentNode, JsonObject>();
    private disposed = false;
    // Incremented only when a component definition changes; rejects events from old definitions.
    private componentRevisionCounter = 0;
    private readonly mounts = new Map<san.Component, string>();

    constructor(options: AppletStoreOptions) {
        this.options = {...options, components: {...options.components},
            actions: {...options.actions}};
        this.validator = new CatalogValidator(options.catalog);
    }
    /** Isolated state, no views, actions or host callbacks. */
    forkForValidation(): AppletStore {
        const fork = new AppletStore({catalog: this.options.catalog, components: {}, validationOnly: true});
        for (const [id, state] of this.appletStates) {
            fork.appletStates.set(id, copyJson(state));
        }
        return fork;
    }
    getState(appletId = '', clone = true): AppletState | undefined {
        const appletState = this.appletStates.get(appletId);
        return appletState && clone ? copyJson(appletState) : appletState;
    }
    getAppletIds(): string[] {
        return [...this.appletStates.keys()];
    }
    mount(target: Element, appletId = ''): san.Component {
        assert(!this.disposed, 'AppletStore is disposed');
        let view: san.Component | null = null;
        view = mountApplet(this, target, appletId, () => {
            if (view) {
                this.mounts.delete(view);
            }
        });
        this.mounts.set(view, appletId);
        return view;
    }
    /** Only called by mountApplet, after mount has checked disposal. */
    listen(onAppletChanged: (appletId: string) => void): () => void {
        this.appletChangeListeners.add(onAppletChanged);
        return () => this.appletChangeListeners.delete(onAppletChanged);
    }
    getComponentRegistry(): Readonly<AppletStoreOptions['components']> {
        return this.options.components;
    }
    report(error: unknown, phase: 'render' | 'action' | 'binding' = 'render', appletId?: string): void {
        try {
            this.options.onError?.(error, phase, appletId);
        }
        catch { /* Host error callbacks must not change transaction outcomes. */ }
    }
    /** The message must be owned by the Store; AppletContext copies host input once at its boundary. */
    processMessage(message: Message): MessageResult {
        assert(!this.disposed, 'AppletStore is disposed');
        return this.applyMessage(message);
    }
    getComponentRevision(appletId: string, id: string): number {
        return this.componentRevisions.get(appletId)?.get(id) || 0;
    }
    /** Normalized props (with Catalog defaults) of a fully static definition. */
    getStaticProps(component: ComponentNode): JsonObject | undefined {
        return this.staticProps.get(component);
    }
    validateProps(
        appletId: string, component: ComponentNode, props: JsonObject, columns?: number
    ): JsonObject | undefined {
        try {
            if (this.options.autofix) {
                props = copyJson(omitUndefined(props)) as JsonObject;
                removeUndeclaredProps(props, this.validator.propsSchema(component.type), () => {});
            }
            const normalized = this.validator.props(component, props);
            this.validator.columnSpan(component, normalized, columns);
            return normalized;
        }
        catch (error) {
            const detail = error as ProtocolError;
            this.report(new ProtocolError(detail.message, 'catalog', component.id, detail.path), 'binding', appletId);
        }
    }
    /** Observe San's Applet data as a whole, never interpret or assign individual bindings. */
    updateViewData(appletId: string, data: JsonObject): void {
        if (this.disposed) {
            return;
        }
        const previous = this.appletStates.get(appletId);
        if (previous && previous.data !== data) {
            try {
                this.appletStates.set(appletId, {...previous, data: copyJson(data)});
            }
            catch (error) {
                this.report(error, 'binding', appletId);
                return;
            }
            this.options.onAppletUpdated?.(appletId);
        }
    }

    /**
     * $event is the component's original San $event, handed to Action handlers unchanged (same as v1).
     * Failures are reported through onError; the returned promise never rejects.
     */
    async processComponentEvent(appletId: string, componentId: string, eventName: string,
        $event: unknown, actions: ActionBinding[], componentRevision: number): Promise<void> {
        try {
            // dispose clears appletStates, so this also rejects events after disposal.
            const appletState = this.appletStates.get(appletId);
            const component = appletState?.components[componentId];
            assert(appletState && component
                && this.getComponentRevision(appletId, componentId) === componentRevision,
            'Event source no longer exists');
            // Committed data is never mutated in place, so the reference is an event-time snapshot.
            const data = appletState.data;
            // Arguments arrive from the event's native San scope, including loop locals and $event.
            const resolvedActions = actions.map(binding => (
                {name: binding.action, args: this.validator.action(binding.action, omitUndefined(binding.args || {}))}
            ));
            for (const action of resolvedActions) {
                if (this.appletStates.get(appletId)?.components[componentId] !== component) {
                    return;
                }
                await this.options.actions![action.name]({appletId, componentId, eventName,
                    args: action.args, $event, $data: copyJson(data)});
            }
        }
        catch (error) {
            this.report(error, 'action', appletId);
        }
    }
    dispose(): void {
        if (this.disposed) {
            return;
        }
        this.disposed = true;
        const ids = this.getAppletIds();
        this.appletStates.clear();
        this.componentRevisions.clear();
        this.mounts.forEach((appletId, view) => {
            try {
                view.dispose();
            }
            catch (error) {
                this.report(error, 'render', appletId);
            }
        });
        this.mounts.clear();
        ids.forEach(id => this.notifyAppletChanged(id));
        this.appletChangeListeners.clear();
    }
    private notifyAppletChanged(appletId: string): void {
        for (const listener of this.appletChangeListeners) {
            try {
                listener(appletId);
            }
            catch (error) {
                this.report(error, 'render', appletId);
            }
        }
    }
    private applyMessage(message: unknown): MessageResult {
        assertObject(message, 'Message');
        assert(message.version === '2.0', 'Unsupported message version');
        assert(hasOwn(message, 'applet') !== hasOwn(message, 'updates'), 'Message must contain applet or updates');
        let nextAppletState: AppletState | null = null;
        const updatedComponentIds = new Set<string>();
        if (hasOwn(message, 'applet')) {
            assertObject(message.applet, 'applet');
            const applet = message.applet;
            const id = applet.appletId === undefined ? '' : applet.appletId;
            assert(typeof id === 'string', 'appletId must be a string');
            if (hasOwn(applet, 'delete')) {
                assert(applet.delete === true && this.appletStates.has(id), 'Cannot delete missing applet');
                this.appletStates.delete(id);
                this.componentRevisions.delete(id);
                this.notifyAppletChanged(id);
                return {appletId: id, kind: 'delete'};
            }

            assert(!this.appletStates.has(id), `Applet already exists: ${id}`);
            const catalog = applet.catalog === undefined
                ? this.options.catalog.definition.$id : applet.catalog;
            assert(catalog === this.validator.catalog.$id, `Unknown Catalog: ${catalog}`);
            if (hasOwn(applet, 'data')) {
                assertObject(applet.data, 'data');
            }
            nextAppletState = {appletId: id, catalog, data: (applet.data || {}) as JsonObject, components: {}};
            if (hasOwn(applet, 'extensions')) {
                assertObject(applet.extensions, 'extensions');
                nextAppletState.extensions = applet.extensions as JsonObject;
            }
            if (hasOwn(applet, 'components')) {
                assert(Array.isArray(applet.components), 'components must be an array');
                for (const component of applet.components) {
                    normalizeComponent(component, nextAppletState.components, updatedComponentIds);
                }
            }
        }
        else {
            const id = message.appletId === undefined ? '' : message.appletId;
            assert(typeof id === 'string', 'appletId must be a string');
            assert(this.appletStates.has(id), `Applet does not exist: ${id}`);
            assert(Array.isArray(message.updates), 'updates must be an array');
            const previousAppletState = this.appletStates.get(id)!;
            // Definitions are only replaced by normalizeComponent and updateData copies only the written path,
            // so unchanged definitions and data subtrees are shared with the previous state.
            nextAppletState = {...previousAppletState};
            for (const update of message.updates) {
                assertObject(update, 'update');
                if (hasOwn(update, 'id')) {
                    const definedComponentIds = new Set<string>();
                    if (nextAppletState.components === previousAppletState.components) {
                        nextAppletState.components = shallowCopy(previousAppletState.components);
                    }
                    normalizeComponent(update, nextAppletState.components, definedComponentIds);
                    definedComponentIds.forEach(id => updatedComponentIds.add(id));
                }
                else {
                    assert(hasOwn(update, 'value'), 'Data update requires value');
                    const path = update.path === undefined ? '' : update.path;
                    assert(typeof path === 'string', 'path must be a string');
                    nextAppletState.data = updateData(nextAppletState.data, path, update.value as JsonValue);
                }
            }
        }
        if (hasOwn(message, 'applet') || updatedComponentIds.size) {
            this.validateAppletState(nextAppletState, updatedComponentIds);
        }
        const componentRevisions = new Map(this.componentRevisions.get(nextAppletState.appletId));
        for (const id of updatedComponentIds) {
            componentRevisions.set(id, ++this.componentRevisionCounter);
        }
        this.appletStates.set(nextAppletState.appletId, nextAppletState);
        this.componentRevisions.set(nextAppletState.appletId, componentRevisions);
        this.notifyAppletChanged(nextAppletState.appletId);
        return {appletId: nextAppletState.appletId, kind: hasOwn(message, 'applet') ? 'create' : 'update'};
    }
    private validateAppletState(appletState: AppletState, updatedComponentIds: Set<string>): void {
        const validator = this.validator;
        assert(!appletState.components.root?.props?.slot, 'Root component cannot select a parent slot');
        if (appletState.extensions) {
            const schema = validator.catalog.$defs?.Extensions;
            assert(schema, 'Catalog does not declare extensions');
            validator.validate(schema, appletState.extensions, 'Applet.extensions');
        }
        for (const component of Object.values(appletState.components)) {
            if (updatedComponentIds.has(component.id)) {
                const props = validator.component(component);
                if (props) {
                    this.staticProps.set(component, props);
                }
                assert(this.options.validationOnly || isNativeNode(component.type)
                    || hasOwn(this.options.components, component.type),
                `Component implementation is not registered: ${component.type}`);
                for (const actions of Object.values(component.events || {})) {
                    for (const action of actions) {
                        assert(this.options.validationOnly
                            || (typeof this.options.actions![action.action] === 'function'
                            && hasOwn(this.options.actions!, action.action)),
                        `Action not registered: ${action.action}`);
                    }
                }
            }
            const allowed = validator.catalog.components[component.type].children;
            for (const childId of component.children as string[] || []) {
                const child = hasOwn(appletState.components, childId) ? appletState.components[childId] : undefined;
                if (child) {
                    assert(!Array.isArray(allowed) || allowed.includes(child.type),
                        `${component.type} does not accept child ${child.type}`);
                    validator.slot(component, child);
                    validator.layout(component, child);
                }
            }
        }
        const visitingComponentIds = new Set<string>();
        const validatedComponentIds = new Set<string>();
        const visit = (id: string): void => {
            assert(!visitingComponentIds.has(id), 'Cyclic component references');
            if (validatedComponentIds.has(id) || !hasOwn(appletState.components, id)) {
                return;
            }
            visitingComponentIds.add(id);
            (appletState.components[id].children as string[] || []).forEach(visit);
            visitingComponentIds.delete(id);
            validatedComponentIds.add(id);
        };
        Object.keys(appletState.components).forEach(visit);
    }
}
