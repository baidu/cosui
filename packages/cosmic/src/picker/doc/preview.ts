import {Component} from 'san';
import Basic from './basic.md';
export default class Doc extends Component {

    static template = `
        <template>
            <cos-picker-basic/>
        </template>
    `;

    static components = {
        'cos-picker-basic': Basic
    };
}
