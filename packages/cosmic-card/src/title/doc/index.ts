/**
 * @file Title doc
 */

import {Component} from 'san';
import Readme from './readme.md';
import API from './api.md';
import Preview from './preview';

export default class TitleDoc extends Component {

    static template = `
        <div>
            <doc-readme/>
            <doc-preview/>
            <doc-api/>
        </div>
    `;

    static components = {
        'doc-readme': Readme,
        'doc-api': API,
        'doc-preview': Preview
    };
}
