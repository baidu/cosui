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

import {Component} from 'san';
import type {CompanyGraphProps} from './interface';
import GraphChildNode from './graph-child-node';

const MAX_NODE_NUM = 3;
export default class CompanyGraph extends Component<CompanyGraphProps> {
    static template = `
        <div class="cosd-company-graph cosd-company-graph-{{size}}">
            <component
                s-is="{{linkInfo.href ? 'a' : 'div'}}"
                s-bind="linkInfo"
                class="cosd-company-graph-container"
            >
                <div
                    s-if="_inbound && _inbound.length"
                    class="cosd-company-graph-child cosd-company-graph-inbound-child cosd-company-graph-child-{{
                        _inbound.length}}"
                >
                    <div class="cosd-company-graph-child-node-group">
                        <graph-child-node
                            s-for="item in _inbound"
                            type="inbound"
                            data="{{item}}"
                        />
                    </div>
                    <div
                        s-if="_inbound && _inbound.length > 1"
                        class="cosd-company-graph-child-horizontal-line"
                    ></div>
                    <div
                        s-if="_inbound && _inbound.length % 2 === 0"
                        class="cosd-company-graph-child-vertical-line"
                    ></div>
                </div>
                <div class="cosd-company-graph-main-node">
                    <div class="cosd-company-graph-main-node-box">
                        <div class="cosd-company-graph-main-node-name">
                            {{name}}
                        </div>
                    </div>
                </div>
                <div
                    s-if="_outbound && _outbound.length"
                    class="cosd-company-graph-child cosd-company-graph-outbound-child cosd-company-graph-child-{{
                        _outbound.length}}"
                >
                    <div
                        s-if="_outbound && _outbound.length % 2 === 0"
                        class="cosd-company-graph-child-vertical-line"
                    ></div>
                    <div
                        s-if="_outbound && _outbound.length > 1"
                        class="cosd-company-graph-child-horizontal-line"
                    ></div>
                    <div class="cosd-company-graph-child-node-group">
                        <graph-child-node
                            s-for="item in _outbound"
                            type="outbound"
                            data="{{item}}"
                        />
                    </div>
                </div>
            </component>
        </div>
    `;

    static components = {
        'graph-child-node': GraphChildNode
    };

    static computed = {
        _inbound(this: CompanyGraph) {
            const list = this.data.get('inbound') || [];
            return list.slice(0, MAX_NODE_NUM);
        },

        _outbound(this: CompanyGraph) {
            const list = this.data.get('outbound') || [];
            return list.slice(0, MAX_NODE_NUM);
        }
    };

    initData(): CompanyGraphProps {
        return {
            linkInfo: {},
            size: 'md',
            name: '',
            inbound: [],
            outbound: []
        };
    }
}