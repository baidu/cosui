/**
 * @file MoreLink 组件文档入口
 */

import {Component} from 'san';
import Readme from './readme.md';
import Preview from './preview';
import Api from './api.md';

export default class More extends Component {
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
        'api': Api
    };
}
