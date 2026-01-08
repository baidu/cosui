import {Component} from 'san';
import DefaultDemo from './default.md';

export default class Preview extends Component {
    static template = `
        <div>
            <demo />
        </div>
    `;
    static components = {
        'demo': DefaultDemo
    };
}