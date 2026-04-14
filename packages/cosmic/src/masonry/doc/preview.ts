import {Component} from 'san';
import Basic from './basic.md';
export default class Masonry extends Component {

    static template = `
        <template>
            <cos-masonry-basic />
        </template>
    `;

    static components = {
        'cos-masonry-basic': Basic
    };
}
