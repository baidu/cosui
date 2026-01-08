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
 * @file 节点处理
 */

import {propsCompatible} from './compatible';
import {
    type UI,
    type Context,
    type TagMap,
    type CompileUIOption,
    type NormalizedEventOption,
    ErrorCode
} from './interface';

import {
    createPropTemplate,
    createEventTemplate,
    createForTemplate,
    createIfTemplate,
    createClassTemplate,
    createStyleTemplate
} from './parse-prop';

const CONTAINER: TagMap = {
    block: 'div',
    grid: 'fragment',
    divider: 'div',
    'grid-col': 'div',
    'grid-row': 'div',
    'flex': 'div',
    'flex-item': 'div'
};

const TEXT: TagMap = {
    text: 'span',
    paragraph: 'div'
};

function parseChildren(children: UI['children'], context: Context) {

    if (!children || !children.length) {
        return;
    }

    for (let i = 0, len = children.length; i < len; i++) {

        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        parseNode(children[i], context);
    }
}

function parseContainerNode(node: UI, context: Context, tag: string) {
    context.dataIndex++;
    const finalTag = CONTAINER[tag];
    const props = node.props || {};

    if (tag === 'grid-col') {
        propsCompatible['grid-col'].span(props);
    }

    if (tag === 'grid-row') {
        propsCompatible['grid-row'].all(props);
    }

    if (tag === 'flex') {
        propsCompatible.flex.all(props);
    }

    if (tag === 'flex-item') {
        propsCompatible['flex-item'].all(props);
    }

    if (tag === 'divider') {
        propsCompatible.divider.all(props);
    }

    context.tpl += '<' + finalTag
        + createIfTemplate(node.if)
        + createForTemplate(node.for)
        + createStyleTemplate(props.style)
        + createClassTemplate(props.class)
        + createEventTemplate(node.events, tag, context)
        + '>';
    parseChildren(node.children, context);
    context.tpl += '</' + finalTag + '>';
};

function parseTextNode(node: UI, context: Context, tag: string) {
    context.dataIndex++;
    let finalTag = TEXT[tag];
    const props = node.props || {};

    if (tag === 'text') {
        propsCompatible.text.name(props);
        propsCompatible.text.size(props);
    }

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    context.tpl += '<' + finalTag
        + createIfTemplate(node.if)
        + createForTemplate(node.for)
        + createStyleTemplate(props.style)
        + createClassTemplate(props.class)
        + createEventTemplate(node.events, tag, context)
        + '>'
        + props.value
        + '</' + finalTag + '>';
}

function parseComponentNode(node: UI, context: Context, tag: string) {
    context.dataIndex++;

    const refId = `${tag}-${context.dataIndex}`;
    context.tpl += '<'
        + tag
        + createIfTemplate(node.if)
        + createForTemplate(node.for)
        + ` s-ref="${refId}"`
        + createEventTemplate(node.events, tag, context, refId);

    const props = node.props || node.data || {};
    props.class = props.class ? `cosdy-ui ${props.class}` : 'cosdy-ui';
    props && Object.keys(props).forEach(key => {
        context.tpl += createPropTemplate(key, props[key], context);
    });

    if (node.children) {
        context.tpl += '>';
        parseChildren(node.children, context);
        context.tpl += '</' + tag + '>';
    }
    else {
        context.tpl += ' />';
    }
}

function generateParsers(components?: CompileUIOption['components']) {
    let parsers: Context['parsers'] = {};

    // 容器节点
    Object.keys(CONTAINER).forEach(key => {
        parsers[key] = (node: UI, context: Context) => {
            parseContainerNode(node, context, key);
        };
    });

    // 文本节点
    Object.keys(TEXT).forEach(key => {
        parsers[key] = (node: UI, context: Context) => {
            parseTextNode(node, context, key);
        };
    });

    // 组件节点
    components && Object.keys(components).forEach(key => {
        parsers[key] = (node: UI, context: Context) => {
            parseComponentNode(node, context, key);
        };
    });

    return parsers;
}

export function parseNode(
    node: UI,
    context?: Context,
    components?: CompileUIOption['components'],
    events?: NormalizedEventOption,
    nodes?: Context['nodes']
): Context {
    if (!context) {
        context = {
            tpl: '',
            data: {},
            parsers: generateParsers(components),
            events: events || {},
            nodes: nodes || {},
            asyncComptRefs: [],
            dataIndex: 0,
            parseError: []
        };
    }

    // 修改节点
    const nodeTransformer = context.nodes![node.type || node.component];
    if (typeof nodeTransformer === 'function') {
        try {
            node = JSON.parse(JSON.stringify(nodeTransformer(JSON.parse(JSON.stringify(node)))));
        }
        catch (error) {
            throw new Error(`type: "${node.type}" nodeTransformer error`);
        }
    }

    const type = node.type || node.component;

    if (!type) {
        node.type = 'fragment';
    }

    if (!context.parsers[type]) {
        console.error(`type: "${type}" not support`);
        context.parseError?.push({
            errCode: ErrorCode.NOT_SUPPORT_TYPE,
            errMsg: `type: "${type}" not support`,
            detail: {
                type
            }
        });
        return context;
    }

    context.parsers[type](node, context);
    return context;
}
