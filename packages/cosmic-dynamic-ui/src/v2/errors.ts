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
 * @file 协议错误转换
 */

import {ProtocolError} from './json';
import type {AppletError, AppletErrorPhase} from './types';

export function createAppletError(error: unknown, phase: AppletErrorPhase, appletId?: string): AppletError {
    if (error instanceof ProtocolError && phase !== 'action' && phase !== 'render') {
        phase = error.phase;
    }
    return {componentId: error instanceof ProtocolError ? error.componentId : undefined,
        path: error instanceof ProtocolError ? error.path : undefined,
        code: `COSUI_${phase.toUpperCase()}_ERROR`, phase, appletId,
        message: error instanceof Error ? error.message : String(error)};
}

