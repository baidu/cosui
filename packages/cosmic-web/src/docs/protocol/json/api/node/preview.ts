import {Component} from 'san';
import Async from './node.md';
import Swiper from './swiper.md';

export default class Preview extends Component {

    static template = `
        <div>
            <doc-async />
            <doc-swiper />
        </div>
    `;

    static components = {
        'doc-async': Async,
        'doc-swiper': Swiper
    };
}
