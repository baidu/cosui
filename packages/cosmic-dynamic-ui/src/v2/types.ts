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
 * @file Applet 协议与宿主接口类型
 */

/** COSUI v2 wire protocol and host integration types. */
import type san from 'san';
import type {z} from 'zod';
export type SchemaObject = Record<string, any>;

export type JsonValue = null | boolean | number | string | JsonValue[] | JsonObject;
export interface JsonObject { [key: string]: JsonValue }
export interface ActionBinding { action: string, args?: JsonObject }
export interface ComponentNode {
    id: string;
    type: string;
    props?: JsonObject;
    children?: Array<string | ComponentNode>;
    events?: Record<string, ActionBinding[]>;
    if?: string | boolean;
    for?: string;
    extensions?: JsonObject;
}
export interface ComponentDefinition {
    description?: string;
    props?: SchemaObject;
    children?: boolean | string[];
    /** Schema of each event's $event, readable in Action args as {{$event.xxx}}; descriptive only, never validated. */
    events?: Record<string, SchemaObject>;
}
export interface Catalog {
    $schema?: string;
    version: '2.0';
    $id: string;
    title?: string;
    description?: string;
    usage?: string;
    components: Record<string, ComponentDefinition>;
    actions: Record<string, {description?: string, args?: SchemaObject}>;
    $defs?: Record<string, SchemaObject>;
}
export interface CreateApplet {
    appletId?: string;
    catalog?: string;
    components?: ComponentNode[];
    data?: JsonObject;
    extensions?: JsonObject;
}
export type Message =
    | {version: '2.0', applet: CreateApplet | {appletId?: string, delete: true}}
    | {version: '2.0', appletId?: string, updates: Update[]};
export interface AppletState {
    appletId: string;
    catalog: string;
    components: Record<string, ComponentNode>;
    data: JsonObject;
    extensions?: JsonObject;
}
export interface ActionContext {
    appletId: string;
    componentId: string;
    eventName: string;
    args: JsonObject;
    /** The component's original San $event (not serialized), same as v1. */
    $event: unknown;
    $data: JsonObject;
}
export interface ZodComponentDefinition {
    description?: string;
    props?: z.ZodObject;
    children?: boolean | readonly string[];
    /** Schema of each event's $event; use z.unknown() when no field is declared. */
    events?: Record<string, z.ZodType>;
}
export interface ZodActionDefinition {description?: string, args?: z.ZodObject}
export interface CatalogDefinition {
    $id: string;
    version: '2.0';
    title?: string;
    description?: string;
    usage?: string;
    components: Record<string, ZodComponentDefinition>;
    actions: Record<string, ZodActionDefinition>;
    $defs?: Record<string, z.ZodType> & {Component?: z.ZodObject, PropsCommon?: z.ZodObject};
}
export type BuiltinComponentName = 'Div' | 'Divider' | 'Column' | 'Row'
    | 'Flex' | 'Text';
export type WithBuiltinComponents<D extends CatalogDefinition> = Omit<D, 'components'> & {
    components: D['components'] & Record<Exclude<BuiltinComponentName, keyof D['components']>, ZodComponentDefinition>;
};
/** Created by defineCatalog; not a JSON wire document. */
export interface RuntimeCatalog<D extends CatalogDefinition = CatalogDefinition> {
    readonly definition: D;
}
export type AppletErrorPhase = 'protocol' | 'catalog' | 'binding' | 'render' | 'action';
export interface AppletError {
    code: string;
    message: string;
    phase: AppletErrorPhase;
    appletId?: string;
    componentId?: string;
    path?: string;
}
export type Update = ComponentNode | {path?: string, value: JsonValue};
export interface AppletUpdate {updates: Update[]}
export type ProcessResult = {ok: true, appletIds: string[], fixes: string[]}
    | {ok: false, errors: AppletError[], fixes: string[]};
export interface ValidateOptions {autofix?: boolean}
export interface ValidationError extends AppletError {messageIndex?: number}
export type ValidationResult<T> = {ok: true, value: T, fixes: string[]}
    | {ok: false, errors: ValidationError[], fixes: string[]};
export interface Applet {
    readonly appletId: string;
    readonly mounted: boolean;
    setRoot(root: HTMLElement): void;
    processMessage(message: AppletUpdate): ProcessResult;
    dispose(): void;
}
export interface CreateAppletOptions {root?: HTMLElement, appletId?: string}
type ArgsOf<A extends ZodActionDefinition> = A extends {args: infer S extends z.ZodType}
    ? z.output<S> : JsonObject;
export type ActionHandler<A extends ZodActionDefinition = ZodActionDefinition> =
    (context: Omit<ActionContext, 'args'> & {args: ArgsOf<A>}) => void | Promise<void>;
export interface AppletContextConfig<D extends CatalogDefinition = CatalogDefinition> {
    autofix?: boolean;
    catalog?: RuntimeCatalog<D>;
    // Only implementations actually used by messages need registration.
    components?: {[K in keyof D['components']]?: san.DefinedComponentClass<
        D['components'][K] extends {props: infer S extends z.ZodObject} ? z.output<S> : Record<string, any>>};
    actions?: {[K in keyof D['actions']]?: ActionHandler<D['actions'][K]>};
}
/** Each listen call appends callbacks; explicit undefined clears all listeners for that event. */
export interface AppletContextListeners {
    onAppletCreated?: (applet: Applet) => void;
    onAppletDeleted?: (info: {appletId: string}) => void;
    onAppletUpdated?: (info: {appletId: string}) => void;
    onError?: (error: AppletError) => void;
}
export type AppletContextOptions<D extends CatalogDefinition = CatalogDefinition> =
    AppletContextConfig<D> & AppletContextListeners;
/** Private engine integration; not exported by the package facade. */
export interface AppletStoreOptions {
    /** Apply prop cleanup after bindings resolve, without changing applet data. */
    autofix?: boolean;
    /** Internal static validation mode; skips host implementation registration checks. */
    validationOnly?: boolean;
    catalog: RuntimeCatalog;
    components: Record<string, san.DefinedComponentClass>;
    actions?: Record<string, (context: ActionContext) => void | Promise<void>>;
    onError?: (error: unknown, phase?: AppletErrorPhase, appletId?: string) => void;
    onAppletUpdated?: (appletId: string) => void;
}
