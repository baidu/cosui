/**
 * @file Map 组件文档预览 Demo
 */

import {Component} from 'san';
import RouteDemo from './route.md';
import MarkerDemo from './marker.md';
import DistrictDemo from './district.md';

export default class Preview extends Component {
    static template = `
        <template>
            <route-demo />
            <marker-demo />
            <district-demo />
        </template>
    `;

    static components = {
        'route-demo': RouteDemo,
        'marker-demo': MarkerDemo,
        'district-demo': DistrictDemo
    };
}