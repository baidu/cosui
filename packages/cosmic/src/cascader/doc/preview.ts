/**
 * @file Cascader 组件文档预览 Demo
 */

import {Component} from 'san';
import Vert from './vert.md';
import Multi from './multi.md';
import Horiz from './horiz.md';
import Entry from './entry.md';
import Search from './search.md';

export default class Preview extends Component {
    static template = `
        <template>
            <vert />
            <horiz />
            <multi />
            <entry />
            <search />
        </template>
    `;

    static components = {
        'vert': Vert,
        'horiz': Horiz,
        'multi': Multi,
        'entry': Entry,
        'search': Search
    };
}