/**
 * @file Cascader 组件文档入口
 */

import {Component} from 'san';
import Readme from './readme.md';
import Preview from './preview';
import API from './api.md';

export default class Cascader extends Component {
    static template = `
        <div>
            <readme />
            <preview />
            <api />
        </div>
    `;

    static components = {
        'readme': Readme,
        'preview': Preview,
        'api': API
    };
}