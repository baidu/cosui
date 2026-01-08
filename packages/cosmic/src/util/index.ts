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
 *
 * @file 工具入口
 * @description cosmic util 会导出给其他业务 package 使用
 * @notice 请注意其他业务 package 引用由于是跨包，因此无法在 ssr 阶段使用
 */

export {default as Debounce} from './debounce';
export {default as Throttle} from './throttle';
export * from './platform';
export * from './constant';
export * from './empty';
export * from './shadow';
export * from './use-lock-scroll';
export * from './animations';
export * from './is-url';