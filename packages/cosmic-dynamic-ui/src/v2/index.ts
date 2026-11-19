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
 * @file Applet 公共接口出口
 */

export {AppletContext, appletContext} from './applet-context';
export {defineCatalog, exportCatalog} from '../catalog';
export type {
    AppletContextOptions, AppletContextConfig, AppletContextListeners, CreateAppletOptions,
    Applet, AppletError, ProcessResult, ValidateOptions, ValidationError, ValidationResult,
    BuiltinComponentName, WithBuiltinComponents, AppletUpdate, Update, CatalogDefinition,
    RuntimeCatalog, Catalog, Message, ComponentNode,
    ActionContext, ActionHandler
} from './types';

export {validateMessages} from './validate';
