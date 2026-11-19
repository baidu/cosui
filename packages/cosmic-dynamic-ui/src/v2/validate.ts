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
 * @file 无副作用协议消息校验
 */

import {AppletStore} from './applet-store';
import {autofixMessage} from './autofix';
import {createAppletError} from './errors';
import {assert, copyJson, isObject} from './json';
import type {Message, RuntimeCatalog, ValidateOptions, ValidationResult} from './types';

export function validateWithStore(input: unknown, store: AppletStore, catalog: RuntimeCatalog,
    autofix: boolean): ValidationResult<Message> {
    const fixes: string[] = [];
    let appletId: string | undefined = void 0;
    try {
        const message = copyJson(input);
        if (isObject(message)) {
            const holder = isObject(message.applet) ? message.applet : message;
            appletId = typeof holder.appletId === 'string' ? holder.appletId : undefined;
        }
        if (autofix) {
            autofixMessage(message, catalog, store, fixes);
        }
        store.processMessage(message as Message);
        return {ok: true, value: message as Message, fixes};
    }
    catch (error) {
        return {ok: false, errors: [createAppletError(error, 'protocol', appletId)], fixes};
    }
}

/** Validate a complete sequence from empty state, without host implementations or side effects. */
export function validateMessages(messages: readonly unknown[], catalog: RuntimeCatalog,
    options: ValidateOptions = {}): ValidationResult<Message[]> {
    const fixes: string[] = [];
    let store: AppletStore | undefined = void 0;
    try {
        assert(Array.isArray(messages), 'messages must be an array');
        assert(options.autofix === undefined || typeof options.autofix === 'boolean', 'autofix must be a boolean');
        store = new AppletStore({catalog, components: {}, validationOnly: true});
        const value: Message[] = [];
        for (let index = 0; index < messages.length; index++) {
            const result = validateWithStore(messages[index], store, catalog, options.autofix === true);
            fixes.push(...result.fixes.map(fix => `messages[${index}] ${fix}`));
            if (!result.ok) {
                return {ok: false, errors: result.errors.map(error => ({...error, messageIndex: index})), fixes};
            }
            value.push(result.value);
        }
        return {ok: true, value, fixes};
    }
    catch (error) {
        return {ok: false, errors: [createAppletError(error, 'protocol')], fixes};
    }
    finally {
        store?.dispose();
    }
}
