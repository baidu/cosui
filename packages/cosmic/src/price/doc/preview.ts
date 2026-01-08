import {Component} from 'san';
import PriceDemo from './base.md';
import OriginValueDemo from './origin-value.md';
import SizeDemo from './size.md';
import OtherDemo from './other.md';
import RangeDemo from './range.md';

export default class Doc extends Component {
    static template = `
        <template>
            <cos-price />
            <cos-price-size />
            <cos-price-origin-value />
            <cos-price-other />
            <cos-price-range />
        </template>
    `;

    static components = {
        'cos-price': PriceDemo,
        'cos-price-size': SizeDemo,
        'cos-price-origin-value': OriginValueDemo,
        'cos-price-other': OtherDemo,
        'cos-price-range': RangeDemo
    };
}
