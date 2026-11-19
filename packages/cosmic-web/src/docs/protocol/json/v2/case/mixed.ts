import {Component} from 'san';
import Basic from './mixed/basic.md';
import Stream from './mixed/stream.md';
import Catalogs from './mixed/catalogs.md';

export default class MixedDemo extends Component {
    static template = '<div><doc-basic /><doc-stream /><doc-catalogs /></div>';

    static components = {
        'doc-basic': Basic,
        'doc-stream': Stream,
        'doc-catalogs': Catalogs
    };
}
