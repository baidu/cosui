/**
 * @file EntityCard 组件文档入口
 */

import {Component} from 'san';
import Readme from './readme.md';
import API from './api.md';
import Preview from './preview';

export default class EntityCardDoc extends Component {
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
