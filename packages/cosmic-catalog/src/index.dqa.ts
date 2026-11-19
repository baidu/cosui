/** @file DQA 业务 Catalog 入口 */
import {defineCatalog} from '@cosui/cosmic-dynamic-ui';
import {baseDefinition} from './base';
import {components, $defs} from './cosmic-dqa';

export const CATALOG = defineCatalog({
    ...baseDefinition,
    $id: 'cosui.v2.dqa',
    title: 'Cosui v2 DQA Catalog',
    $defs: {...baseDefinition.$defs, ...$defs},
    components: {...baseDefinition.components, ...components}
});
