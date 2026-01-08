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
 */

import EmptyBase from './index.mobile';

const defaultIcon = {
    sm: 'https://gips0.baidu.com/it/u=2200627143,926364859&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f180_180',
    md: 'https://gips3.baidu.com/it/u=188694741,3942177833&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f360_270'
};
export default class Empty extends EmptyBase {
    static trimWhitespace = 'all';
    static template = EmptyBase.template;
    static components = EmptyBase.components;
    static computed = {
        ...EmptyBase.computed,
        _icon(this: Empty): string {
            const size = this.data.get('size');
            const icon = this.data.get('icon');
            return icon || defaultIcon[size];
        }
    };
}