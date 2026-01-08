/**
 * @file 路由配置，同时用于导航菜单
 */

import basicComponent from './component-basic';
import cardComponent from './component-card';
import dqaComponent from './component-dqa';
import markdown from './protocol-markdown';
import json from './protocol-json';
import designToken from './design-token';
import practices from './practices';

export default [
    ...basicComponent,
    ...cardComponent,
    ...dqaComponent,
    ...markdown,
    ...json,
    ...designToken,
    ...practices
];
