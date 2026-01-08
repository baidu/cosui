import {Component} from 'san';
import api from './api.md';
import preview from './preview';
import readme from './readme.md';

export default class CarScrollDoc extends Component {
    static template = `
    <div>
        <readme />
        <preview />
        <api />
    </div>
    `;

    static components = {
        api,
        preview,
        readme
    };
}

