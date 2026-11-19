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
 * @file Applet 上下文与生命周期管理
 */

import type san from 'san';
import {AppletStore} from './applet-store';
import {createAppletError} from './errors';
import {autofixMessage} from './autofix';
import {validateWithStore} from './validate';
import {assert, copyJson, isObject} from './json';
import type {Applet, AppletContextOptions, AppletContextConfig, AppletContextListeners, AppletError,
    AppletErrorPhase, AppletUpdate, CatalogDefinition, CreateAppletOptions,
    Message, ProcessResult, AppletStoreOptions, ValidationResult} from './types';

/** A reusable owner of Applets. No global state is shared with other Context instances. */
export class AppletContext<D extends CatalogDefinition = CatalogDefinition> {
    private appletContextConfig: AppletContextConfig<D> = {};
    private readonly listeners: AppletContextListeners[] = [];
    private appletStore: AppletStore | undefined = void 0;
    private disposing = false;
    private readonly applets = new Map<string, Applet>();
    private readonly mounts = new Map<string, {root: HTMLElement, view?: san.Component}>();

    constructor(options: AppletContextOptions<D> = {}) {
        this.config(options);
        this.listen(options);
    }

    config(options: AppletContextConfig<D>): void {
        assert(!this.disposing && this.applets.size === 0, 'Cannot configure a Context with active Applets');
        if (options.autofix === undefined && !options.catalog && !options.components && !options.actions
            && !this.appletContextConfig.catalog) {
            return;
        }
        const nextConfig = {...this.appletContextConfig};
        if (options.autofix !== undefined) {
            assert(typeof options.autofix === 'boolean', 'autofix must be a boolean');
            nextConfig.autofix = options.autofix;
        }
        if (options.catalog) {
            nextConfig.catalog = options.catalog;
        }
        if (options.components) {
            nextConfig.components = {...options.components};
        }
        if (options.actions) {
            nextConfig.actions = {...options.actions};
        }
        // Validate before replacing the old Store; active Applets are rejected above.
        const nextAppletStore = nextConfig.catalog ? new AppletStore({
            catalog: nextConfig.catalog,
            autofix: nextConfig.autofix,
            components: (nextConfig.components || {}) as AppletStoreOptions['components'],
            actions: nextConfig.actions as AppletStoreOptions['actions'],
            onError: (error, phase, id) => this.report(error, phase, id),
            onAppletUpdated: id => this.notifyAppletUpdated(id)
        }) : undefined;
        // No Applets exist here; release the previous configuration's caches and listeners.
        this.appletStore?.dispose();
        this.appletContextConfig = nextConfig;
        this.appletStore = nextAppletStore;
    }

    /** Append callbacks in registration order; explicit undefined clears that event's listeners. */
    listen(callbacks: AppletContextListeners): void {
        const nextListeners: AppletContextListeners = {};
        const keys = ['onAppletCreated', 'onAppletDeleted', 'onAppletUpdated', 'onError'] as const;
        for (const key of keys) {
            if (Object.prototype.hasOwnProperty.call(callbacks, key)) {
                const callback = callbacks[key];
                assert(callback === undefined || typeof callback === 'function', 'Invalid listener');
                Object.assign(nextListeners, {[key]: callback});
            }
        }
        // Validate the whole registration before changing existing listeners.
        for (const key of keys) {
            if (Object.prototype.hasOwnProperty.call(nextListeners, key) && nextListeners[key] === undefined) {
                for (const listener of this.listeners) {
                    delete listener[key];
                }
                delete nextListeners[key];
            }
        }
        for (let index = this.listeners.length - 1; index >= 0; index--) {
            if (!Object.keys(this.listeners[index]).length) {
                this.listeners.splice(index, 1);
            }
        }
        if (Object.keys(nextListeners).length) {
            this.listeners.push(nextListeners);
        }
    }

    createApplet({root, appletId = ''}: CreateAppletOptions = {}): Applet {
        try {
            this.getAppletStore().processMessage({version: '2.0', applet: {appletId}});
        }
        catch (error) {
            this.report(error, 'protocol', appletId);
            throw error;
        }
        const applet = this.registerApplet(appletId);
        try {
            if (root !== undefined) {
                applet.setRoot(root);
            }
        }
        catch (error) {
            this.getAppletStore().processMessage({version: '2.0', applet: {appletId, delete: true}});
            this.applets.delete(appletId);
            throw error;
        }
        this.notifyListeners(listener => listener.onAppletCreated?.(applet), appletId);
        return applet;
    }

    validateMessage(message: unknown): ValidationResult<Message> {
        try {
            assert(!this.disposing, 'AppletContext is disposing');
            const store = this.getAppletStore().forkForValidation();
            try {
                return validateWithStore(message, store, this.appletContextConfig.catalog!,
                    this.appletContextConfig.autofix === true);
            }
            finally {
                store.dispose();
            }
        }
        catch (error) {
            return {ok: false, errors: [createAppletError(error, 'protocol')], fixes: []};
        }
    }

    processMessage(message: Message): ProcessResult {
        const fixes: string[] = [];
        let appletId: string | undefined = void 0;
        try {
            assert(!this.disposing, 'AppletContext is disposing');
            message = copyJson(message);
            this.fixMessage(message, fixes);
            // Only used to attribute errors; the Store validates the message itself.
            const copied: unknown = message;
            const holder = isObject(copied) && isObject(copied.applet) ? copied.applet : copied;
            const rawId = isObject(holder) ? holder.appletId : undefined;
            appletId = typeof rawId === 'string' ? rawId : rawId === undefined ? '' : void 0;
            const result = this.getAppletStore().processMessage(message);
            if (result.kind === 'delete') {
                this.removeApplet(result.appletId);
            }
            else if (result.kind === 'create') {
                const applet = this.registerApplet(result.appletId);
                this.notifyListeners(listener => listener.onAppletCreated?.(applet), result.appletId);
            }
            else {
                this.notifyAppletUpdated(result.appletId);
            }
            return {ok: true, appletIds: [result.appletId], fixes};
        }
        catch (error) {
            return {ok: false, errors: [this.report(error, 'protocol', appletId)], fixes};
        }
    }

    dispose(): void {
        if (this.disposing) {
            return;
        }
        this.disposing = true;
        const ids = [...this.applets.keys()];
        this.applets.clear();
        this.appletStore?.dispose();
        this.appletStore = undefined;
        ids.forEach(id => this.removeApplet(id));
        this.disposing = false;
    }

    private fixMessage(message: unknown, fixes: string[]): void {
        if (this.appletContextConfig.autofix) {
            autofixMessage(message, this.appletContextConfig.catalog!, this.getAppletStore(), fixes);
        }
    }

    private getAppletStore(): AppletStore {
        assert(!this.disposing, 'AppletContext is disposing');
        if (!this.appletStore) {
            assert(this.appletContextConfig.catalog, 'Configure a Catalog before creating Applets');
            this.config({});
        }
        return this.appletStore!;
    }

    private report(error: unknown, phase: AppletErrorPhase = 'render', appletId?: string): AppletError {
        const detail = createAppletError(error, phase, appletId);
        for (const listener of this.listeners.map(listener => ({...listener}))) {
            try {
                listener.onError?.(detail);
            }
            catch { /* Host callbacks cannot alter committed state or interrupt other listeners. */ }
        }
        return detail;
    }

    private notifyListeners(callback: (listener: AppletContextListeners) => void, appletId: string | undefined): void {
        // Registrations made during notification take effect on the next event.
        for (const listener of this.listeners.map(listener => ({...listener}))) {
            try {
                callback(listener);
            }
            catch (error) {
                this.report(error, 'render', appletId);
            }
        }
    }

    private notifyAppletUpdated(appletId: string): void {
        this.notifyListeners(listener => listener.onAppletUpdated?.({appletId}), appletId);
    }

    private removeApplet(appletId: string): void {
        const mounted = this.mounts.get(appletId);
        this.mounts.delete(appletId);
        this.applets.delete(appletId);
        try {
            mounted?.view?.dispose();
        }
        catch (error) {
            this.report(error, 'render', appletId);
        }
        this.notifyListeners(listener => listener.onAppletDeleted?.({appletId}), appletId);
    }

    private registerApplet(appletId: string): Applet {
        // Applet getters have their own this; retain the owning Context.
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this;
        const applet: Applet = Object.freeze({
            appletId,
            get mounted() {
                return context.applets.get(appletId) === applet && !!context.mounts.get(appletId)?.view;
            },
            setRoot(root: HTMLElement): void {
                try {
                    assert(context.applets.get(appletId) === applet, 'Applet is disposed');
                    assert(root && root.nodeType === 1, 'setRoot requires an HTMLElement');
                    assert(!context.mounts.has(appletId), 'Applet is already mounted');
                    assert(![...context.mounts.values()].some(mount => mount.root === root),
                        'Container belongs to another Applet');
                    // Reserve the container before San invokes synchronous component lifecycle hooks.
                    const mounted: {root: HTMLElement, view?: san.Component} = {root};
                    context.mounts.set(appletId, mounted);
                    let view: san.Component | undefined = void 0;
                    try {
                        view = context.getAppletStore().mount(root, appletId);
                        assert(context.applets.get(appletId) === applet
                            && context.mounts.get(appletId) === mounted, 'Applet is disposed');
                        mounted.view = view;
                    }
                    catch (error) {
                        if (context.mounts.get(appletId) === mounted) {
                            context.mounts.delete(appletId);
                        }
                        view?.dispose();
                        throw error;
                    }
                }
                catch (error) {
                    context.report(error, 'render', appletId);
                    throw error;
                }
            },
            processMessage(message: AppletUpdate): ProcessResult {
                const fixes: string[] = [];
                try {
                    assert(context.applets.get(appletId) === applet, 'Applet is disposed');
                    const update = copyJson(message);
                    assert(isObject(update), 'AppletUpdate must be an object');
                    const envelope: Message = {version: '2.0', appletId, updates: update.updates};
                    context.fixMessage(envelope, fixes);
                    context.getAppletStore().processMessage(envelope);
                    context.notifyAppletUpdated(appletId);
                    return {ok: true, appletIds: [appletId], fixes};
                }
                catch (error) {
                    return {ok: false, errors: [context.report(error, 'protocol', appletId)], fixes};
                }
            },
            dispose(): void {
                if (context.applets.get(appletId) !== applet) {
                    return;
                }
                context.getAppletStore().processMessage({version: '2.0', applet: {appletId, delete: true}});
                context.removeApplet(appletId);
            }
        });
        this.applets.set(appletId, applet);
        return applet;
    }
}

/** Convenient default Context; use new AppletContext() for independent owners. */
export const appletContext = new AppletContext();
