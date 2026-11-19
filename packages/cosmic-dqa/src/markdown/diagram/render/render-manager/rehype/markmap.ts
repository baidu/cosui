/**
 * rehype 插件：识别 ```markmap 代码块，替换为含 SVG 占位容器的 div。
 *
 * 只产占位 hast，**同步返回**，不做任何异步渲染。
 * 真实渲染延后到 renderer/render-markmap.ts。
 */

import {createRehypeDiagramPlugin} from './utils';
import {isMarkmapSupported} from '../../markmap';

export const rehypeMarkmap = createRehypeDiagramPlugin({
    targetLang: 'markmap',
    className: 'markmap-container',
    canIUse: isMarkmapSupported
});
