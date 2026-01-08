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
 * @file 兼容代码
 */

import type {PropsConfig} from './interface';
import {isInterp} from './parse-data';

interface StyleConfig {
    [key: string]: {
        key: string;
        defaultValue: string | number;
    };
}

const FLEX_CONTAINER_PROPS: StyleConfig = {
    direction: {
        key: 'flex-direction',
        defaultValue: 'row'
    },
    wrap: {
        key: 'flex-wrap',
        // web: nowrap
        defaultValue: 'wrap'
    },
    // direction,  wrap 简写
    // flow: {
    //     key: 'flex-flow'
    // },
    justifyContent: {
        key: 'justify-content',
        // web: flex-start
        defaultValue: 'center'
    },
    alignItems: {
        key: 'align-items',
        // web: stretch
        defaultValue: 'center'
    },
    alignContent: {
        key: 'align-content',
        // web: stretch
        defaultValue: 'center'
    },
    gap: {
        key: 'gap',
        defaultValue: '9px'
    }
};

const FLEX_CONTAINER_PROPS_ARRAY =  Object.keys(FLEX_CONTAINER_PROPS) || [];

const FLEX_ITEM_PROPS: StyleConfig = {
    // order: {
    //     key: 'order'
    // },
    // grow: {
    //     key: 'flex-grow'
    // },
    // shrink: {
    //     key: 'flex-shrink'
    // },
    // basis: {
    //     key: 'flex-basis'
    // },
    // grow,  shrink  basis 简写
    flex: {
        key: 'flex',
        // web: 0 1 auto
        defaultValue: 1
    },
    alignSelf: {
        key: 'align-self',
        // web: auto
        defaultValue: 'center'
    }
};

const FLEX_ITEM_PROPS_ARRAY =  Object.keys(FLEX_ITEM_PROPS) || [];

export const propsCompatible = {
    text: {
        name(props: PropsConfig) {
            if (typeof props.name !== 'undefined') {
                props.value = props.name;
                delete props.name;
            }
        },
        size(props: PropsConfig) {
            if (props.size) {
                props.class = props.class || '';
                props.class += ' cos-text-' + props.size;
                delete props.size;
            }
        }
    },

    // 栅格列
    'grid-col': {
        span(props: PropsConfig) {
            props.class = props.class || '';

            const col = ' cos-col';
            props.class += col;

            if (props.span) {
                props.class += col + '-' + props.span;
                delete props.span;
            }
            else {
                props.class += col + '-1';
            }
        }
    },

    // 栅格行
    'grid-row': {
        all(props: PropsConfig) {
            props.class = props.class || '';

            const row = ' cos-row';
            props.class += row;

            if (props.columns) {
                props.class += ' cos-row-col-' + props.columns;
                delete props.columns;
            }

            if (props.gutter) {
                props.style = props.style || {};
                props.class += ' cos-gutter';
                props.style['--cos-grid-gutter'] = props.gutter + 'px';
                delete props.gutter;
            }

            if (props.align) {
                props.class += ' cos-items-' + props.align;
                delete props.align;
            }
            if (props.justify) {
                // cosmic cos-justify token key 去掉了 space-
                props.class += ' cos-justify-' + (props.justify as string).replace('space-', '');
                delete props.justify;
            }
            if (props.wrap) {
                props.class += ' cos-flex-wrap';
                delete props.wrap;
            }
        }
    },
    'flex': {
        all(props: PropsConfig) {
            props.class = props.class || '';
            props.class += ' cos-flex';
            props.style = props.style || {};

            FLEX_CONTAINER_PROPS_ARRAY.forEach(key => {
                const item = FLEX_CONTAINER_PROPS[key];
                props.style![item.key] = item.defaultValue;

                if (typeof props[key] !== 'undefined') {
                    props.style![item.key] = props[key] as string;
                    delete props[key];
                }
            });
        }
    },
    'flex-item': {
        all(props: PropsConfig) {
            props.class = props.class ? `cosdy-flex-item ${props.class}` : 'cosdy-flex-item';
            props.style = props.style || {};

            FLEX_ITEM_PROPS_ARRAY.forEach(key => {
                const item = FLEX_ITEM_PROPS[key];
                props.style![item.key] = item.defaultValue;

                if (typeof props[key] !== 'undefined') {
                    props.style![item.key] = props[key] as string;
                    delete props[key];
                }
            });
        }
    },
    'divider': {
        all(props: PropsConfig) {
            props.class = props.class || '';

            let dividerClass = ' cos-divider';

            // vertical: false
            let marginClass = ' cos-space-mt-lg cos-space-mb-lg';

            if (typeof props.vertical !== 'undefined') {

                if (props.vertical) {
                    dividerClass += '-vertical';

                    // vertical: true
                    marginClass = ' cos-space-mr-xxs cos-space-ml-xxs';
                }

                delete props.vertical;
            }

            if (typeof props.inverse !== 'undefined') {
                dividerClass += props.inverse ? '-inverse' : '';
                delete props.inverse;
            }

            props.class += dividerClass + marginClass;

            if (typeof props.height !== 'undefined') {
                props.style = props.style || {};
                props.style.height = props.height as string;
                delete props.height;
            }
        }
    }
};

export function formatForExpr(forExpr: string): string {
    if (isInterp(forExpr)) {
        return forExpr.slice(2, -2);
    }
    return forExpr;
}