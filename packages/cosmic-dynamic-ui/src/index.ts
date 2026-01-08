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
 * @file 解析器
 */

import san from 'san';

import {
    parseNode
} from './parse-node';

import {
    INNER_DATA_PREFIX,
    ASYNC_NODES,
    ASYNC_NODES_RENDEREDKEY
} from './parse-prop';

import {
    getDataExtends
} from './parse-data';

import {
    type ActionConfig,
    type Data, type AsyncCompt, type CompileOption,
    RenderState,
    type CompileUIOption,
    type AppComponent,
    type EventOption,
    type NormalizedEventOption,
    type UI,
    type ErrorOption,
    ErrorCode
} from './interface';

// 使用者可用 action
const ACTIONS = [
    // 对外只开放前4个
    'link', 'sendPrompt', 'openDrawer', 'closeDrawer',

    // 仅对内
    'openHalfScreen', 'closeHalfScreen', 'dispose', 'disabled', 'log', 'previewImage'
];

const UIJSON = {
    compile(options: CompileOption): AppComponent {
        if (!options.ui) {
            throw new Error('options.ui is required');
        }

        if (!options.components) {
            throw new Error('options.components is required');
        }

        const normalizedEvents = this.normalizeEventOption(options.events || {});
        const tplDataParsed = parseNode(
            options.ui,
            undefined,
            options.components,
            normalizedEvents,
            options.nodes
        );

        const dataExtends = Object.assign({}, options.dataExtends);
        const hasDataExtend = Object.keys(dataExtends).length > 0;
        const dataTransformer = UIJSON.compileDataExtends(dataExtends);

        return san.defineComponent({
            components: options.components || {},
            template: tplDataParsed.tpl,
            __renderState: RenderState.INITED,
            __appRendered: false,
            __asyncComptRendered: false,

            initData() {
                return tplDataParsed.data;
            },

            inited() {
                // 反馈初始化错误
                if (tplDataParsed.parseError) {
                    tplDataParsed.parseError.forEach((error: ErrorOption) => {
                        this.__handleError(error);
                    });
                }
                // 首次 计算 dataExtends
                this.appendData({});
            },


            attached() {

                // 同步组件节点渲染完成处理
                this.nextTick(() => {
                    this.__appRendered = true;
                    this.__handleRendered();
                });
            },

            updated() {
                this.__setState(RenderState.INITED);
                this.nextTick(() => {
                    this.__appRendered = true;
                    this.__handleRendered();
                });
            },

            appendData(data: Data, options?: san.DataChangeOption) {
                const prevData = Object.assign({}, this.data.get());
                Object.keys(data).forEach((key: string) => {
                    this.data.set(key, data[key], options);
                });

                if (!hasDataExtend) {
                    return;
                }

                const extData = dataTransformer(data, prevData, this.data);
                Object.keys(extData).forEach((key: string) => {
                    this.data.set(key, extData[key], options);
                });
            },

            __setState(state: RenderState) {
                if (state === RenderState.INITED) {
                    this.__appRendered = false;
                    this.__asyncComptRendered = false;
                }
                this.__renderState = state;
            },

            __checkAsyncComptRendered(): boolean {
                if (this.__asyncComptRendered) {
                    return true;
                }

                const len = tplDataParsed.asyncComptRefs.length;

                // 判断异步节点是否渲染完成方式，依赖组件实现约束，
                // 若存在 async-compt-ref 且处于 rendering=true 渲染中状态，则认为渲染未完成
                for (let i = len - 1; i >= 0; i--) {
                    const $refEl: AsyncCompt = this.ref(tplDataParsed.asyncComptRefs[i]);
                    if ($refEl?.[ASYNC_NODES_RENDEREDKEY]) {
                        this.__asyncComptRendered = false;
                        return false;
                    }
                }

                this.__asyncComptRendered = true;
                return true;
            },

            __handleRendered() {
                if (this.__renderState === RenderState.RENDERED) {
                    return;
                }

                // 根组件渲染完成
                if (!this.__appRendered) {
                    return;
                }

                // 根组件 和异步组件都渲染完成，才算本次渲染完成
                if (this.__checkAsyncComptRendered()) {
                    this.__setState(RenderState.RENDERED);
                    options.onRendered && options.onRendered();
                }
            },

            __handleProxy($event: unknown, eventName: string, tag: string, actionArr: ActionConfig[]) {
                if (eventName === ASYNC_NODES[tag]) {
                    this.__handleRendered();
                }

                const innerEvent = normalizedEvents[tag];
                if (innerEvent && innerEvent[eventName]) {
                    innerEvent[eventName]!.listener($event);
                }

                if (!options.actions) {
                    return;
                }

                if (!actionArr || !actionArr.length) {
                    return;
                }

                const appData = this.data.get();
                const $data: {
                    [key: string]: unknown;
                } = {};

                Object.keys(appData).forEach((key: string) => {
                    if (!key.startsWith(INNER_DATA_PREFIX)) {
                        $data[key] = appData[key];
                    }
                });

                actionArr.forEach(actionConfig => {
                    const action = actionConfig.action;
                    if (!ACTIONS.includes(action)) {
                        console.error(`${action}, action not support`);
                        this.__handleError({
                            errCode: ErrorCode.NOT_SUPPORT_ACTION,
                            errMsg: `${action} action not support`,
                            detail: {
                                action
                            }
                        });
                        return;
                    }

                    if (!options.actions![action]) {
                        throw new Error(`${action}, action not registered`);
                    }

                    options.actions![action]({
                        $event,
                        $data,
                        args: actionConfig.option || {},
                        node: tag
                    });
                });
            },

            __handleError(err: ErrorOption) {
                if (options.onError && err.errCode && err.errMsg) {
                    options.onError(err);
                }
            }
        });
    },

    compileUI(ui: UI, {components, events, nodes}: CompileUIOption): string {
        if (!ui) {
            throw new Error('ui is required');
        }

        if (!components) {
            throw new Error('options.components is required');
        }

        const normalizedEvents = this.normalizeEventOption(events || {});
        return parseNode(
            ui, undefined,
            components,
            normalizedEvents,
            nodes
        ).tpl;
    },

    compileDataExtends(dataExtends?: CompileOption['dataExtends']) {
        if (!dataExtends) {
            return function (): Data {
                return {};
            };
        }

        return function (data: Data, prevData: Data = {}, sanData?: san.Data): Data {
            return getDataExtends(dataExtends, data, prevData, sanData);
        };
    },

    normalizeEventOption(events: EventOption): NormalizedEventOption {
        const normalized: NormalizedEventOption = {};

        Object.keys(events).forEach((tag: string) => {
            const listenerMap = events[tag];
            normalized[tag] = {};
            Object.keys(listenerMap).forEach((eventName: string) => {
                const listener = listenerMap[eventName];
                normalized[tag][eventName] = typeof listener === 'function'
                    ? {listener}
                    : listener;
            });
        });

        return normalized;
    }
};

export default UIJSON;
