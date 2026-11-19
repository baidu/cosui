/** @file 基础组件 Catalog 入口 */
import {defineCatalog} from '@cosui/cosmic-dynamic-ui';
import {baseDefinition} from './base';

export const CATALOG = defineCatalog({
    ...baseDefinition,
    $id: 'cosui.v2.base',
    title: 'Cosui v2 Base Catalog'
});
