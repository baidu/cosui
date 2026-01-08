import {Component} from 'san';
import Readme from './readme.md';
import API from './api.md';
import Preview from './preview';

export default class Link extends Component {
    static template = `
        <div>
            <readme/>
            <preview/>
            <api/>
        </div>
    `;

    static components = {
        'readme': Readme,
        'api': API,
        'preview': Preview
    };
}