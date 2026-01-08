import {Component} from 'san';
import api from './api.md';

export default class Doc extends Component {
    static template = `
        <div>
            <api />
        </div>
    `;

    static components = {
        'api': api
    };
}