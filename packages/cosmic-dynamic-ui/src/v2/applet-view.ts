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
 * @file San 原生模板渲染、属性校验与事件转发
 */

import san from 'san';
import {copyJson, hasOwn} from './json';
import {compileNativeNode, isNativeNode, nativePresentation, ROW_COLUMNS} from './native-nodes';
import type {AppletStore} from './applet-store';
import type {ActionBinding, BuiltinComponentName, ComponentNode, JsonObject, JsonValue} from './types';
import {accessor, compileFor, compileIf, compileProp, compileValue, DATA, hasBinding} from './expression';

const NODES = '__appletNodes';
const TEMPLATES = '__appletTemplates';
const CHILD = '__appletChild';
const ROOT = '__appletRoot';
const camelize = (name: string): string => name.replace(/-([a-z])/g, (_match, letter: string) => letter.toUpperCase());

function node(tagName: string): san.AElement {
    return {tagName, props: [], events: [], directives: {}, children: []};
}

/** Every boundary shares Applet data via native two-way bindings, including native loop aliases. */
function componentReference(key: san.Expr, locals: ReadonlySet<string>): san.AElement {
    const result = node('view');
    result.directives.is = {value: {type: san.ExprType.ACCESSOR,
        paths: [{type: san.ExprType.STRING, value: TEMPLATES}, key]} as san.AccessorExpr};
    result.props = [DATA, ...locals].map(name => ({name, expr: accessor(name), x: 1}));
    result.props.push(...[NODES, TEMPLATES].map(name => ({name, expr: accessor(name)})));
    result.props.push({name: ROW_COLUMNS, expr: compileValue(null)});
    return result;
}

/**
 * Validate bound props after San evaluates them in their render scope. Static props were validated with
 * the message, and component-internal state is never treated as a Catalog field. Bound prop names are part
 * of the template signature; static values are read from the current definition because a template can
 * outlive the definition it was compiled from.
 */
function withCatalogValidation(Base: san.DefinedComponentClass, componentId: string, boundNames: string[],
    appletStore: AppletStore, appletId: string): san.DefinedComponentClass {
    const bound = new Set(boundNames);
    const keys = new Set(boundNames.map(camelize));
    return class extends Base {
        constructor(options?: san.ComponentNewOptions<Record<string, unknown>>) {
            super(options);
            let pending = false;
            let initial = true;
            const validate = () => {
                pending = false;
                const component = appletStore.getState(appletId, false)?.components[componentId];
                if (this.lifeCycle.is('disposed') || !component) {
                    return;
                }
                const values: JsonObject = {};
                for (const [name, value] of Object.entries(component.props || {})) {
                    const current = bound.has(name) ? this.data.get(accessor(camelize(name))) : value;
                    if (current !== undefined) {
                        Object.defineProperty(values, name, {value: current, enumerable: true});
                    }
                }
                const normalized = appletStore.validateProps(appletId, component, values);
                for (const [name, value] of Object.entries(normalized || {})) {
                    // Defaults apply at creation; afterwards only bound props are written back.
                    const key = accessor(camelize(name));
                    if ((initial || bound.has(name)) && JSON.stringify(this.data.get(key)) !== JSON.stringify(value)) {
                        this.data.set(key, value);
                    }
                }
                initial = false;
            };
            validate();
            this.data.listen(change => {
                if (!pending && keys.has(String((change.expr.paths[0] as san.StringLiteral).value))) {
                    pending = true;
                    san.nextTick(validate);
                }
            });
        }
    };
}

export function mountApplet(appletStore: AppletStore, target: Element, appletId: string,
    onDispose: () => void): san.Component {
    const registry: Record<string, san.DefinedComponentClass> = {};
    const templates = new Map<string, string>();
    const implementations = appletStore.getComponentRegistry();
    let nextId = 0;
    let preparedDefinitions: Record<string, ComponentNode> | undefined = void 0;
    let prepared: {nodes: object, tags: object, root: string} | undefined = void 0;
    const prepare = () => {
        const state = appletStore.getState(appletId, false);
        const definitions = state?.components || {};
        if (prepared && definitions === preparedDefinitions) {
            return {...prepared, data: copyJson(state?.data || {})};
        }
        const nodes: Record<string, {props: JsonObject, children: Array<Array<{key: string}>>, revision: number}> = {};
        const tags: Record<string, string> = {};
        const compile = (id: string, inherited: ReadonlySet<string>): string => {
            const key = JSON.stringify([id, [...inherited].sort()]);
            if (nodes[key] || !Object.prototype.hasOwnProperty.call(definitions, id)) {
                return key;
            }
            const component = definitions[id];
            const native = isNativeNode(component.type) && !hasOwn(implementations, component.type);
            const aNode = node('actual');
            const locals = new Set(inherited);
            if (component.for) {
                aNode.directives.for = compileFor(component.for, inherited);
                locals.add(aNode.directives.for.item);
                locals.add(aNode.directives.for.index || '$index');
            }
            if (component.if !== undefined) {
                aNode.directives.if = {value: typeof component.if === 'boolean'
                    ? compileValue(component.if) : compileIf(component.if, locals)};
            }
            const staticProps: JsonObject = {};
            const boundNames: string[] = [];
            // Fully static definitions carry normalized Catalog defaults from message validation,
            // so they are available during the component's own initialization.
            const values = appletStore.getStaticProps(component) || component.props || {};
            for (const [name, value] of Object.entries(values)) {
                if (name === 'slot') {
                    // The parent template places this child; slot is not a prop of the child itself.
                    continue;
                }
                if (hasBinding(value)) {
                    aNode.props.push(compileProp(name, value, locals));
                    boundNames.push(name);
                }
                else {
                    // Components may mutate their props; keep the stored definition isolated.
                    staticProps[native ? name : camelize(name)] = copyJson(value);
                }
            }
            aNode.directives.bind = {value: accessor(NODES, key, 'props')};
            const groups = new Map<string, string[]>();
            groups.set('', []);
            for (const childId of component.children as string[] || []) {
                const slot = definitions[childId]?.props?.slot as string || '';
                if (!groups.has(slot)) {
                    groups.set(slot, []);
                }
                groups.get(slot)!.push(childId);
            }
            const entries = [...groups].sort(([a], [b]) => a.localeCompare(b));
            nodes[key] = {props: staticProps, children: [], revision: appletStore.getComponentRevision(appletId, id)};
            entries.forEach(([slot, children], index) => {
                nodes[key].children.push(children
                    .filter(child => Object.prototype.hasOwnProperty.call(definitions, child))
                    .map(child => ({key: compile(child, locals)})));
                const childNode = componentReference(accessor(CHILD, 'key'), locals);
                if (native && component.type === 'Row') {
                    childNode.props.find(prop => prop.name === ROW_COLUMNS)!.expr
                        = aNode.props.find(prop => prop.name === 'columns')?.expr
                            || accessor(NODES, key, 'props', 'columns');
                }
                childNode.directives.for = {item: CHILD, value: accessor(NODES, key, 'children', String(index)),
                    trackBy: accessor(CHILD, 'key'), trackByRaw: `${CHILD}.key`};
                if (slot) {
                    childNode.props.push({name: 'slot', expr: {type: san.ExprType.STRING, value: slot} as san.Expr});
                }
                aNode.children.push(childNode);
            });
            const eventLocals = new Set([...locals, '$event']);
            for (const [name, actions] of Object.entries(component.events || {})) {
                aNode.events.push({name, modifier: {}, expr: {
                    type: san.ExprType.CALL, name: accessor('handleComponentEvent'), args: [
                        compileValue(id), accessor(NODES, key, 'revision'), compileValue(name), accessor('$event'),
                        compileValue(actions as unknown as JsonValue, eventLocals)
                    ]
                } as san.CallExpr});
            }
            if (native && isNativeNode(component.type)) {
                compileNativeNode(aNode, component.type);
            }
            // Literal props and child lists live in San data. Updating them keeps the same component class.
            const signature = JSON.stringify([id, component.type, [...inherited].sort(), aNode]);
            let tag = templates.get(signature);
            if (!tag) {
                tag = `cosui-template-${nextId++}`;
                if (!native) {
                    const actual = `cosui-component-${nextId++}`;
                    const implementation = implementations[component.type];
                    registry[actual] = boundNames.length
                        ? withCatalogValidation(implementation, id, boundNames, appletStore, appletId) : implementation;
                    aNode.tagName = actual;
                }
                // Attribute and text filters share one bounded cache so defaults agree and errors are not doubled.
                let previousValues = '';
                let previousComponent: ComponentNode | undefined = void 0;
                let normalized: JsonObject = {};
                const presentation = (props: JsonObject, rowColumns?: number | null) => {
                    const current = appletStore.getState(appletId, false)?.components[id];
                    const values = Object.fromEntries(Object.entries(props).filter(([, value]) => value !== undefined));
                    const columns = component.type === 'Column' && rowColumns !== null
                        ? (typeof rowColumns === 'number' ? rowColumns : 12) : undefined;
                    const needsValidation = boundNames.length || columns !== undefined;
                    if (needsValidation && current) {
                        const serialized = JSON.stringify([values, columns]);
                        if (previousComponent !== current || previousValues !== serialized) {
                            previousComponent = current;
                            previousValues = serialized;
                            normalized = appletStore.validateProps(appletId, current, values, columns) || values;
                        }
                    }
                    return nativePresentation(component.type as BuiltinComponentName,
                        needsValidation && current ? normalized : values);
                };
                registry[tag] = san.defineComponent({
                    aNode,
                    inheritAttrs: false,
                    filters: native ? {
                        nativeAttrs(props: JsonObject, rowColumns?: number | null) {
                            const {class: className, style} = presentation(props, rowColumns);
                            return {class: className, style};
                        },
                        nativeText(props: JsonObject) {
                            return presentation(props).value;
                        }
                    } : {},
                    components: registry as unknown as san.ComponentDefineOptionComponents,
                    handleComponentEvent(componentId: string, revision: number, name: string,
                        event: unknown, actions: ActionBinding[]) {
                        void appletStore.processComponentEvent(appletId, componentId, name, event, actions, revision);
                    }
                });
                templates.set(signature, tag);
            }
            tags[key] = tag;
            return key;
        };
        const root = definitions.root ? compile('root', new Set()) : '';
        preparedDefinitions = definitions;
        prepared = {nodes, tags, root};
        return {...prepared, data: copyJson(state?.data || {})};
    };
    let stopListening = (): void => {};
    let applyingMessage = false;
    const rootNode = componentReference(accessor(ROOT), new Set());
    rootNode.directives.if = {value: accessor(ROOT)};
    const View = san.defineComponent({
        aNode: rootNode,
        inheritAttrs: false,
        components: registry as unknown as san.ComponentDefineOptionComponents,
        disposed() {
            stopListening();
            templates.clear();
            onDispose();
        }
    });
    const initial = prepare();
    const view = new View({data: {
        [DATA]: initial.data,
        [NODES]: initial.nodes,
        [TEMPLATES]: initial.tags,
        [ROOT]: initial.root
    }});
    view.data.listen(change => {
        if (!applyingMessage && (change.expr.paths[0] as san.StringLiteral).value === DATA) {
            appletStore.updateViewData(appletId, view.data.get(DATA));
        }
    });
    stopListening = appletStore.listen(id => {
        if (id === appletId) {
            const next = prepare();
            applyingMessage = true;
            try {
                view.data.set(DATA, next.data);
                view.data.set(NODES, next.nodes);
                view.data.set(TEMPLATES, next.tags);
                view.data.set(ROOT, next.root);
            }
            finally {
                applyingMessage = false;
            }
        }
    });
    try {
        view.attach(target);
    }
    catch (error) {
        view.dispose();
        throw error;
    }
    return view;
}
