import {Component} from 'san';
import Readme from './readme.md';
import API from './api.md';
import Preview from './preview';
import MultiTagLink from './multi-tag-link.md';

export default class Price extends Component {
    static template = `
        <div>
            <readme/>
            <preview/>
            <multi-tag-link/>
            <api/>
        </div>
    `;

    static components = {
        'readme': Readme,
        'api': API,
        'preview': Preview,
        'multi-tag-link': MultiTagLink
    };
}
