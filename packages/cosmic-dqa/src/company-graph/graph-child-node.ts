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
import type {GraphChildNodeProps} from './interface';
import Icon from '@cosui/cosmic/icon';

const DISPLAY_CONFIG_MAP = {
    inbound: ['box', 'line'],
    outbound: ['line', 'box']
};

export default class GraphChildNode extends Component<GraphChildNodeProps> {
    static template = `
        <div class="cosd-company-graph-child-node">
            <template s-for="item in _displayConfig">
                <div s-if="item === 'box'" class="cosd-company-graph-child-node-box">
                    <div class="cosd-company-graph-child-node-name">
                        {{data.name}}
                    </div>
                    <div s-if="data.caption" class="cosd-company-graph-child-node-caption">
                        {{data.caption}}
                    </div>
                </div>
                <div s-if="item === 'line'" class="cosd-company-graph-child-node-vertical-line">
                    <cos-icon name="caret-down" class="cosd-company-graph-child-node-arrow" />
                    <div s-if="data.relation" class="cosd-company-graph-child-node-relation">
                        {{data.relation}}
                    </div>
                </div>
            </template>
        </div>
    `;
    static components = {
        'cos-icon': Icon
    };

    initData(): GraphChildNodeProps {
        return {
            type: 'inbound',
            data: {
                name: '',
                caption: '',
                relation: ''
            }
        };
    }

    static computed = {
        _displayConfig(this: GraphChildNode) {
            const type = this.data.get('type');
            const config = DISPLAY_CONFIG_MAP[type] || DISPLAY_CONFIG_MAP.inbound;
            return config;
        }
    };
}
