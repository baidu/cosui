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
 * @file 内置原生节点 Catalog 声明
 */

import {z} from 'zod';
import type {CatalogDefinition, ZodComponentDefinition, BuiltinComponentName} from '../v2/types';

const scalar = z.union([z.string(), z.number()]);
const common = {
    class: z.string().optional(),
    style: z.union([z.string(), z.record(z.string(), scalar)]).optional()
};
const container = (shape: z.ZodRawShape = {}): ZodComponentDefinition => ({
    props: z.strictObject({...common, ...shape}), children: true
});
const align = z.enum(['start', 'center', 'end', 'stretch', 'baseline']);
const justify = z.enum(['start', 'center', 'end', 'between', 'around', 'evenly']);
const count = z.number().int().min(1).max(12);
/** Legacy lowercase names; autofix maps them to the declared PascalCase type. */
export const BUILTIN_TYPE_ALIASES: Readonly<Record<string, BuiltinComponentName>> = {
    div: 'Div', divider: 'Divider', column: 'Column', row: 'Row', flex: 'Flex', text: 'Text'
};
const definitions: Record<BuiltinComponentName, ZodComponentDefinition> = {
    Div: container(),
    Divider: container({vertical: z.boolean().optional(), inverse: z.boolean().optional(), height: scalar.optional()}),
    Column: container({span: count.default(1)}),
    Row: container({columns: count.default(12), gutter: z.number().nonnegative().default(0),
        align: align.default('stretch'), justify: justify.default('start'), wrap: z.boolean().default(true)}),
    Flex: container({direction: z.enum(['row', 'column', 'row-reverse', 'column-reverse']).default('row'),
        wrap: z.boolean().default(false), align: align.default('stretch'), justify: justify.default('start'),
        gap: z.number().nonnegative().default(0)}),
    Text: {props: z.strictObject({...common, value: scalar.optional(), name: scalar.optional(),
        size: scalar.optional()}), children: false}
};

/** Shared fields belong to PropsCommon; explicit host definitions take precedence over defaults. */
export function builtinDefinitions(commonProps: CatalogDefinition['$defs']): Record<string, ZodComponentDefinition> {
    const shared = commonProps?.PropsCommon?.shape || {};
    return Object.fromEntries(Object.entries(definitions).map(([name, definition]) => [name, {
        ...definition,
        props: z.strictObject(Object.fromEntries(Object.entries(definition.props!.shape)
            .filter(([key]) => !Object.prototype.hasOwnProperty.call(shared, key))))
    }]));
}
