/**
 * @file Fold 组件文档预览 Demo
 */

import {Component} from 'san';
import BasicDemo from './basic.md';
import UnfoldOnlyDemo from './unfold-only.md';
import MoreDemo from './more.md';
import MaskDemo from './mask.md';
import FoldHeightDemo from './fold-height.md';
import AsyncDemo from './async.md';

export default class Preview extends Component {
    static template = `
        <template>
            <basic-demo />
            <unfold-only-demo />
            <more-demo />
            <mask-demo />
            <fold-height-demo />
            <async-demo />
            <switch-demo />
        </template>
    `;

    static components = {
        'basic-demo': BasicDemo,
        'unfold-only-demo': UnfoldOnlyDemo,
        'more-demo': MoreDemo,
        'mask-demo': MaskDemo,
        'fold-height-demo': FoldHeightDemo,
        'async-demo': AsyncDemo
    };
}
